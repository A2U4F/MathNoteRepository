import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import { getNote, getSubject, notes, subjects } from '../data/notes'
import { Reveal } from '../components/Reveal'

const GITHUB_URL = 'https://github.com/A2U4F/MathNoteRepository'

function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w一-龥]+/g, '-')
}

export default function Note() {
  const { noteId = '' } = useParams()
  const note = getNote(noteId)
  const subject = note ? getSubject(note.subjectId) : undefined
  const [tocOpen, setTocOpen] = useState(false)
  const [content, setContent] = useState<string | null>(null)

  // 正文按需加载：切到哪篇才拉取哪篇的 markdown chunk
  useEffect(() => {
    if (!note) return
    let alive = true
    setContent(null)
    note.content().then((md) => {
      if (alive) setContent(md)
    })
    return () => {
      alive = false
    }
  }, [note])

  const headings = useMemo(() => {
    if (!content) return []
    return content
      .split('\n')
      .filter((l) => l.startsWith('## '))
      .map((l) => l.replace(/^## /, '').trim())
  }, [content])

  if (!note || !subject) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>
          笔记不存在。<Link to="/" className="underline" style={{ color: 'var(--accent)' }}>回到目录</Link>
        </p>
      </div>
    )
  }

  const toc = (
    <nav aria-label="本页大纲">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--ink-faint)' }}>
        大纲
      </p>
      <ul className="space-y-1">
        {headings.map((h, i) => (
          <li key={h}>
            <button
              onClick={() => {
                setTocOpen(false)
                document.getElementById(slugify(h))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="block w-full min-h-[36px] content-center border-l py-1 pl-3 text-left text-sm leading-snug transition-colors hover:border-[#8c2f39] hover:text-[#8c2f39]"
              style={{ borderColor: 'var(--line)', color: 'var(--ink-soft)' }}
            >
              <span className="mr-2 tabular-nums" style={{ color: 'var(--accent)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {h}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )

  // 右侧栏：全站笔记按科目分组列出，正在读的一篇高亮
  const allNotes = (
    <nav aria-label="全部笔记">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--ink-faint)' }}>
        全部笔记
      </p>
      <div className="space-y-6">
        {subjects.map((s) => (
          <div key={s.id}>
            <p className="mb-2 text-[10px] font-bold tracking-[0.25em]" style={{ color: 'var(--ink-faint)' }}>
              {s.no} {s.name}
            </p>
            <ul>
              {notes
                .filter((n) => n.subjectId === s.id)
                .map((n) => {
                  const active = n.id === note.id
                  return (
                    <li key={n.id}>
                      {active ? (
                        <span
                          className="block border-l-2 py-1 pl-3 text-sm leading-snug"
                          style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                        >
                          <span className="font-display font-bold">{n.title}</span>
                          <span className="mt-0.5 block text-xs tabular-nums" style={{ color: 'var(--ink-faint)' }}>
                            {n.date}
                          </span>
                        </span>
                      ) : (
                        <Link
                          to={`/note/${n.id}`}
                          className="group block border-l-2 border-transparent py-1 pl-3 text-sm leading-snug transition-colors"
                          style={{ color: 'var(--ink-soft)' }}
                        >
                          <span
                            className="font-display font-bold transition-colors group-hover:text-[#8c2f39]"
                            style={{ color: 'var(--ink)' }}
                          >
                            {n.title}
                          </span>
                          <span className="mt-0.5 block text-xs tabular-nums" style={{ color: 'var(--ink-faint)' }}>
                            {n.date}
                          </span>
                        </Link>
                      )}
                    </li>
                  )
                })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper-read)' }}>
      {/* sticky top bar */}
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-sm"
        style={{ borderColor: 'var(--line-strong)', background: 'rgba(248,245,230,0.9)' }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3 md:px-8">
          <Link
            to={`/subject/${subject.id}`}
            className="flex min-h-[44px] items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] transition-colors hover:text-[#8c2f39]"
          >
            <span>←</span>
            <span className="hidden sm:inline">{subject.name}</span>
            <span className="sm:hidden">返回</span>
          </Link>
          <span className="truncate text-xs" style={{ color: 'var(--ink-faint)' }}>
            {note.title}
          </span>
        </div>
      </header>

      {/* mobile TOC toggle */}
      <div className="border-b lg:hidden" style={{ borderColor: 'var(--line)' }}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <button
            onClick={() => setTocOpen((v) => !v)}
            aria-expanded={tocOpen}
            className="flex min-h-[44px] w-full items-center justify-between py-2 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: 'var(--ink-soft)' }}
          >
            <span>本页大纲（{headings.length}）</span>
            <span style={{ color: 'var(--accent)' }}>{tocOpen ? '收起 −' : '展开 +'}</span>
          </button>
          {tocOpen && <div className="pb-4">{toc}</div>}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-10 md:px-8 lg:grid-cols-[minmax(180px,21.5%)_minmax(0,1fr)_minmax(180px,22%)] lg:gap-12 lg:py-14">
        {/* left: outline */}
        <div className="hidden lg:block lg:pt-2">
          <div className="lg:sticky lg:top-24">{toc}</div>
        </div>

        {/* center: article */}
        <article className="min-w-0">
          <Reveal>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--accent)' }}>
              {subject.no} {subject.name} · {subject.en}
            </p>
            <h1
              className="font-display font-black leading-[1.15]"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 3.8rem)', letterSpacing: '-0.03em' }}
            >
              {note.title}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
              {note.summary}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 border-y py-3 text-xs" style={{ borderColor: 'var(--line)', color: 'var(--ink-faint)' }}>
              <time className="tabular-nums">{note.date}</time>
              {note.tags.map((t) => (
                <span key={t} className="border px-2 py-0.5" style={{ borderColor: 'var(--line)' }}>
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-4">
            <div className="article-body">
              {content === null ? (
                <p className="text-sm" style={{ color: 'var(--ink-faint)' }}>
                  载入中……
                </p>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkMath, remarkGfm]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    h2: ({ children }: { children?: ReactNode }) => {
                      const text = String(children ?? '')
                      const idx = headings.indexOf(text)
                      return (
                        <h2 id={slugify(text)}>
                          {idx >= 0 && <span className="h2-index">§ {String(idx + 1).padStart(2, '0')}</span>}
                          {children}
                        </h2>
                      )
                    },
                  }}
                >
                  {content}
                </ReactMarkdown>
              )}
            </div>
          </Reveal>

          <footer className="mt-16 border-t pt-6 text-xs" style={{ borderColor: 'var(--line-strong)', color: 'var(--ink-faint)' }}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span>欢迎补充、纠错与催更</span>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 transition-colors hover:text-[#8c2f39]"
              >
                在 GitHub 上查看源码 →
              </a>
            </div>
          </footer>

          {/* mobile only: all notes below the article */}
          <div className="mt-12 lg:hidden">{allNotes}</div>
        </article>

        {/* right: all notes */}
        <div className="hidden lg:block">
          <div className="sticky top-24">{allNotes}</div>
        </div>
      </div>
    </div>
  )
}
