/**
 * 构建期 Markdown 渲染（Obsidian 风格）
 * ============================================================
 * 笔记正文在构建时由这里的 unified 管线一次性转成 HTML + KaTeX，
 * 浏览器端不再打包 react-markdown / remark-* / rehype-katex / katex.js。
 *
 * 支持的 Obsidian 语法（在标准 GFM + 数学之外）：
 *   - Callout：> [!note] 标题 / > [!tip] / > [!warning] …（+/- 折叠记号会被忽略）
 *   - Wikilink：[[note-id]]、[[note-id|别名]] → 站内 HashRouter 链接
 *   - 二级标题自动加 § 编号与锚点 id（与旧版 react-markdown 行为一致）
 */
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  BookOpen, Bug, CircleAlert, CircleCheck, HelpCircle, Info, ListChecks,
  Lightbulb, OctagonAlert, Quote, TriangleAlert, type LucideIcon,
} from 'lucide-react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'
import type { Element, ElementContent, Root, RootContent } from 'hast'
import type { Plugin as VitePlugin } from 'vite'

/** callout 色板：低饱和、同一明度档，压在纸面上不抢正文。
 *  颜色以 "R, G, B" 三元组传给 --callout-c，与 index.css 及
 *  .obsidian/snippets/mathnote-site.css 的 callout 段保持一致。 */
const CALLOUT_META: Record<string, { c: string; icon: LucideIcon; title: string }> = {
  note: { c: '55, 89, 129', icon: Info, title: '注记' },
  info: { c: '55, 89, 129', icon: Info, title: '说明' },
  todo: { c: '55, 89, 129', icon: ListChecks, title: '待办' },
  abstract: { c: '61, 108, 113', icon: ListChecks, title: '摘要' },
  summary: { c: '61, 108, 113', icon: ListChecks, title: '摘要' },
  tldr: { c: '61, 108, 113', icon: ListChecks, title: '摘要' },
  tip: { c: '57, 111, 98', icon: Lightbulb, title: '提示' },
  hint: { c: '57, 111, 98', icon: Lightbulb, title: '提示' },
  success: { c: '57, 111, 98', icon: CircleCheck, title: '完成' },
  check: { c: '57, 111, 98', icon: CircleCheck, title: '完成' },
  done: { c: '57, 111, 98', icon: CircleCheck, title: '完成' },
  question: { c: '103, 81, 133', icon: HelpCircle, title: '问题' },
  help: { c: '103, 81, 133', icon: HelpCircle, title: '问题' },
  faq: { c: '103, 81, 133', icon: HelpCircle, title: '问题' },
  warning: { c: '151, 112, 53', icon: TriangleAlert, title: '注意' },
  caution: { c: '151, 112, 53', icon: TriangleAlert, title: '注意' },
  attention: { c: '151, 112, 53', icon: TriangleAlert, title: '注意' },
  important: { c: '128, 66, 102', icon: CircleAlert, title: '重要' },
  danger: { c: '140, 47, 57', icon: OctagonAlert, title: '危险' },
  error: { c: '140, 47, 57', icon: OctagonAlert, title: '错误' },
  failure: { c: '140, 47, 57', icon: OctagonAlert, title: '失败' },
  bug: { c: '140, 47, 57', icon: Bug, title: '缺陷' },
  example: { c: '138, 90, 56', icon: BookOpen, title: '例' },
  quote: { c: '110, 104, 88', icon: Quote, title: '引文' },
  cite: { c: '110, 104, 88', icon: Quote, title: '引文' },
}

/** lucide 图标 → 内联 SVG（构建期渲染一次，客户端零开销） */
function iconMarkup(Icon: LucideIcon): string {
  return renderToStaticMarkup(
    createElement(Icon, { size: 14, strokeWidth: 2.2, 'aria-hidden': true }),
  )
}

/** 与站点 Note.tsx 的 slugify 保持一致（锚点/大纲依赖它） */
function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w一-龥]+/g, '-')
}

function isElement(n: RootContent): n is Element {
  return n.type === 'element'
}

/**
 * [[id]] / [[id|别名]] → `[别名](#/note/id)`
 * 围栏代码块和行内代码里的 `[[` 不做转换。
 */
function translateWikiLinks(md: string): string {
  let inFence = false
  return md
    .split('\n')
    .map((line) => {
      if (/^[ \t]*(```|~~~)/.test(line)) {
        inFence = !inFence
        return line
      }
      if (inFence) return line
      return line
        .split(/(`[^`]*`)/g)
        .map((seg) => {
          if (seg.startsWith('`')) return seg
          return seg.replace(
            /\[\[([^\[\]|]+)(?:\|([^\[\]]+))?\]\]/g,
            (raw: string, target: string, alias?: string) => {
              const id = target.trim().split('#')[0].trim()
              if (!id) return raw
              const text = (alias ?? id).trim()
              return `[${text}](#/note/${id})`
            },
          )
        })
        .join('')
    })
    .join('\n')
}

function textOf(el: Element): string {
  return el.children
    .map((c) => (c.type === 'text' ? c.value : c.type === 'element' ? textOf(c) : ''))
    .join('')
}

/** `> [!type] 标题` 开头的 blockquote → aside.callout（结构与旧版 Callout 组件一致）。
 *  remark-rehype 会在块级子节点之间夹空白文本节点，找首段时要跳过它们。 */
function asCallout(bq: Element): Element | null {
  let pIndex = -1
  for (let k = 0; k < bq.children.length; k++) {
    const n: RootContent | ElementContent = bq.children[k]
    if (n.type === 'text') {
      if (n.value.trim()) return null
      continue
    }
    if (isElement(n) && n.tagName === 'p') {
      pIndex = k
      break
    }
    return null
  }
  if (pIndex === -1) return null
  const first = bq.children[pIndex] as Element
  if (first.children.length === 0) return null
  const lead = first.children[0]
  if (lead.type !== 'text') return null
  const m = /^\[!(\w+)\][+-]?[ \t]*(.*)/.exec(lead.value.split('\n')[0])
  if (!m) return null

  const type = m[1].toLowerCase()
  const meta = CALLOUT_META[type] ?? CALLOUT_META.note
  const title = m[2].trim() || meta.title

  const rest: ElementContent[] = bq.children.slice(pIndex + 1)
  const remainder = lead.value.slice(m[0].length).replace(/^\n/, '')
  if (remainder.trim()) {
    first.children = [{ type: 'text', value: remainder }, ...first.children.slice(1)]
    rest.unshift(first)
  }

  const titleP: Element = {
    type: 'element',
    tagName: 'p',
    properties: { className: ['callout-title'] },
    children: [
      { type: 'raw', value: iconMarkup(meta.icon) },
      { type: 'text', value: title },
    ],
  }
  const body: Element = {
    type: 'element',
    tagName: 'div',
    properties: { className: ['callout-body'] },
    children: rest,
  }
  return {
    type: 'element',
    tagName: 'aside',
    properties: {
      className: ['callout'],
      style: `--callout-c:${meta.c}`,
    },
    children: [titleP, body],
  }
}

function transformCallouts(children: RootContent[]): void {
  for (let i = 0; i < children.length; i++) {
    const node = children[i]
    if (!isElement(node)) continue
    if (node.tagName === 'blockquote') {
      const callout = asCallout(node)
      if (callout) {
        children[i] = callout
        continue
      }
    }
    transformCallouts(node.children)
  }
}

/** h2：加锚点 id + § 编号徽标，收集标题文本供右侧大纲用 */
function numberH2(children: RootContent[], headings: string[]): void {
  for (const node of children) {
    if (!isElement(node)) continue
    if (node.tagName === 'h2') {
      const text = textOf(node).trim()
      headings.push(text)
      node.properties = { ...node.properties, id: slugify(text) }
      node.children.unshift({
        type: 'element',
        tagName: 'span',
        properties: { className: ['h2-index'] },
        children: [{ type: 'text', value: `§ ${String(headings.length).padStart(2, '0')}` }],
      })
    } else {
      numberH2(node.children, headings)
    }
  }
}

export interface NoteBody {
  html: string
  headings: string[]
}

export async function renderMarkdown(md: string): Promise<NoteBody> {
  const headings: string[] = []
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(() => async (tree: unknown) => {
      const root = tree as Root
      transformCallouts(root.children)
      numberH2(root.children, headings)
    })
    .use(rehypeKatex)
    // callout 标题里的内联 SVG（我们自己生成的 lucide 图标）要以原样输出
    .use(rehypeStringify, { allowDangerousHtml: true })

  const file = await processor.process(translateWikiLinks(md))
  return { html: String(file), headings }
}

/** Vite 插件：`*.md?html` → 已渲染的 { html, headings } 模块 */
export function notesMarkdownPlugin(): VitePlugin {
  return {
    name: 'notes-markdown',
    enforce: 'pre',
    resolveId(id, importer) {
      if (!id.endsWith('.md?html')) return null
      // glob 传来的可能是相对 id：以导入方（index.ts）所在目录解析成绝对路径
      if (id.startsWith('.') && importer) return resolve(dirname(importer), id)
      return id
    },
    async load(id) {
      if (!id.endsWith('.md?html')) return null
      const file = id.replace(/\?html$/, '')
      this.addWatchFile(file)
      const md = readFileSync(file, 'utf-8')
      const doc = await renderMarkdown(md)
      return `export default ${JSON.stringify(doc)}`
    },
  }
}
