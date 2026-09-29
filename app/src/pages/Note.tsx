import { useMemo, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { getNote, getSubject, getNotesBySubject } from '../data/notes'
import { Reveal } from '../components/Reveal'

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

  const headings = useMemo(() => {
    if (!note) return []
    return note.content
      .split('\n')
      .filter((l) => l.startsWith('## '))
      .map((l) => l.replace(/^## /, '').trim())
  }, [note])

  const related = useMemo(() => {
    if (!note) return []
    return getNotesBySubject(note.subjectId).filter((n) => n.id !== note.id)
  }, [note])

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

  const marginalia = (
    <aside aria-label="笔记信息" className="space-y-8">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--ink-faint)' }}>
          信息
        </p>
        <dl className="space-y-2 text-sm" style={{ color: 'var(--ink-soft)' }}>
          <div className="flex justify-between gap-3 border-b pb-2" style={{ borderColor: 'var(--line)' }}>
            <dt>科目</dt>
            <dd className="text-right font-medium" style={{ color: 'var(--ink)' }}>{subject.name}</dd>
          </div>
          <div className="flex justify-between gap-3 border-b pb-2" style={{ borderColor: 'var(--line)' }}>
            <dt>更新</dt>
            <dd className="tabular-nums">{note.date}</dd>
          </div>
          <div className="flex justify-between gap-3 border-b pb-2" style={{ borderColor: 'var(--line)' }}>
            <dt>标签</dt>
            <dd className="text-right">{note.tags.join(' · ')}</dd>
          </div>
        </dl>
      </div>
    </aside>
  )

  const relatedNotes = related.length > 0 && (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--ink-faint)' }}>
        同科目笔记
      </p>
      <ul className="space-y-3">
        {related.map((r) => (
          <li key={r.id}>
            <Link
              to={`/note/${r.id}`}
              className="group block text-sm leading-snug"
              style={{ color: 'var(--ink-soft)' }}
            >
              <span className="font-display font-bold transition-colors group-hover:text-[#8c2f39]" style={{ color: 'var(--ink)' }}>
                {r.title}
              </span>
              <span className="mt-0.5 block text-xs tabular-nums">{r.date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
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
        {/* left: same-subject notes + meta */}
        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            {relatedNotes}
            {marginalia}
          </div>
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
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
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
                {note.content}
              </ReactMarkdown>
            </div>
          </Reveal>

          <footer className="mt-16 border-t pt-6 text-xs" style={{ borderColor: 'var(--line-strong)', color: 'var(--ink-faint)' }}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span>如发现错漏，群里直接 @我 改。</span>
              <Link to={`/subject/${subject.id}`} className="underline underline-offset-4 hover:text-[#8c2f39]">
                更多{subject.name}笔记 →
              </Link>
            </div>
          </footer>

          {/* mobile only: same-subject notes below the article */}
          <div className="mt-12 lg:hidden">{relatedNotes}</div>
        </article>

        {/* right: outline */}
        <div className="hidden lg:block lg:pt-2">
          <div className="lg:sticky lg:top-24">{toc}</div>
        </div>
      </div>
    </div>
  )
}
