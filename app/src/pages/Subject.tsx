import { Link, useParams } from 'react-router'
import { getSubject, getNotesBySubject } from '../data/notes'
import { PaperGrid } from '../components/PaperGrid'
import { Reveal } from '../components/Reveal'

export default function Subject() {
  const { subjectId = '' } = useParams()
  const subject = getSubject(subjectId)
  const list = getNotesBySubject(subjectId)

  if (!subject) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>
          没有这个科目。<Link to="/" className="underline" style={{ color: 'var(--accent)' }}>回到目录</Link>
        </p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--paper-sage)' }}>
      <PaperGrid />

      <div className="relative mx-auto max-w-6xl px-6 pb-16 md:pl-20 lg:pl-24">
        {/* sticky section header */}
        <header
          className="sticky top-0 z-40 flex items-center justify-between border-b py-4 backdrop-blur-sm"
          style={{ borderColor: 'var(--line-strong)', background: 'rgba(241,234,208,0.88)' }}
        >
          <Link
            to="/"
            className="min-h-[44px] content-center text-xs font-bold uppercase tracking-[0.3em] transition-colors hover:text-[#8c2f39]"
          >
            ← 目录
          </Link>
          <span className="text-xs font-bold uppercase tracking-[0.3em]">{subject.en}</span>
        </header>

        <div className="py-10 md:py-14">
          <Reveal>
            <h1 className="font-display font-black leading-none" style={{ fontSize: 'clamp(2.6rem, 9vw, 7rem)', letterSpacing: '-0.04em' }}>
              <span style={{ color: 'var(--accent)', fontSize: '0.5em', verticalAlign: '0.35em', marginRight: '0.2em' }}>
                {subject.no}
              </span>
              {subject.name}
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 max-w-lg text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
              {subject.blurb}
            </p>
          </Reveal>
        </div>

        <section>
          <Reveal delay={140}>
            <div
              className="flex items-baseline justify-between border-b pb-2 text-xs font-bold uppercase tracking-[0.3em]"
              style={{ borderColor: 'var(--line-strong)' }}
            >
              <span>笔记列表</span>
              <span>{list.length} 篇</span>
            </div>
          </Reveal>
          <ul>
            {list.map((n, i) => (
              <Reveal key={n.id} delay={170 + i * 80}>
                <li>
                  <Link
                    to={`/note/${n.id}`}
                    className="group block border-b py-7 md:py-9"
                    style={{ borderColor: 'var(--line)' }}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h2
                        className="font-display text-xl font-bold leading-snug transition-colors duration-300 group-hover:text-[#8c2f39] md:text-3xl"
                        style={{ letterSpacing: '-0.02em' }}
                      >
                        {n.title}
                      </h2>
                      <time className="shrink-0 text-xs tabular-nums" style={{ color: 'var(--ink-faint)' }}>
                        {n.date}
                      </time>
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
                      {n.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {n.tags.map((t) => (
                        <span
                          key={t}
                          className="border px-2.5 py-1 text-xs"
                          style={{ borderColor: 'var(--line)', color: 'var(--ink-soft)' }}
                        >
                          {t}
                        </span>
                      ))}
                      <span className="ml-auto self-center transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--accent)' }}>
                        →
                      </span>
                    </div>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>

        <footer className="mt-14 text-xs" style={{ color: 'var(--ink-faint)' }}>
          <Link to="/" className="underline underline-offset-4 hover:text-[#8c2f39]">
            返回全部科目
          </Link>
        </footer>
      </div>
    </div>
  )
}
