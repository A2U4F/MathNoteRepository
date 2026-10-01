// 处理 Obsidian 的 callout 语法：
//   > [!note] 自定义标题
//   > 正文……
// 标准管线会把整块当普通 blockquote、把 "[!note]" 当字面文本；
// 本插件剥掉标记、把标题挂到 blockquote 的 data 上，
// 再由 Note.tsx 里的 blockquote 组件读出来渲染成站点风格的提示框。
// 折叠标记 [!note]- / [!note]+ 在网页上不折叠，按展开渲染。
//
// 色板与 Obsidian 片段 .obsidian/snippets/mathnote-site.css 的 callout 段保持一致。

const CALLOUT_RE = /^\[!([A-Za-z]+)\]([+-]?)([ \t]*)/

export default function remarkCallout() {
  return (tree: any) => {
    walk(tree)
  }
}

function walk(node: any) {
  const children = node?.children
  if (!Array.isArray(children)) return
  if (node.type === 'blockquote') tryCallout(node)
  for (const child of children) walk(child)
}

function tryCallout(q: any) {
  const p = q.children?.[0]
  if (p?.type !== 'paragraph') return
  const t = p.children?.[0]
  if (t?.type !== 'text') return
  const m = CALLOUT_RE.exec(t.value)
  if (!m) return

  const type = m[1].toLowerCase()
  const rest = t.value.slice(m[0].length)
  const nl = rest.indexOf('\n')
  const title = (nl === -1 ? rest : rest.slice(0, nl)).trim()

  if (nl === -1) {
    // 首行只有「标记 + 标题」：首段整体只服务标题
    if (p.children.length === 1) q.children = q.children.slice(1)
    else p.children = p.children.slice(1)
  } else {
    t.value = rest.slice(nl + 1)
    if (!t.value.trim() && p.children.length === 1) q.children = q.children.slice(1)
  }

  q.data = {
    ...(q.data ?? {}),
    hProperties: {
      ...(q.data?.hProperties ?? {}),
      calloutType: type,
      calloutTitle: title,
    },
  }
}
