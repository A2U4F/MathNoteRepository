import { Link } from 'react-router'
import { subjects, notes } from '../data/notes'
import { PaperGrid } from '../components/PaperGrid'
import { Reveal } from '../components/Reveal'

export default function Home() {
  return (
    <div className="relative min-h-screen" style={{ background: 'var(--paper-sage)' }}>
      <PaperGrid />

      <div className="relative mx-auto max-w-6xl px-6 pb-16 md:pl-20 lg:pl-24">
        {/* masthead */}
        <header className="flex items-center justify-between border-b py-5" style={{ borderColor: 'var(--line-strong)' }}>
          <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.22em] md:text-xs md:tracking-[0.3em]">Class Notes Archive</span>
          <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.22em] md:text-xs md:tracking-[0.3em]">2026 届 · 群内共享</span>
        </header>

        {/* staggered display title */}
        <div className="py-10 md:py-14">
          <Reveal>
            <h1
              className="font-display font-black leading-[0.95]"
              style={{ fontSize: 'clamp(2.9rem, 7.5vw, 6.8rem)', letterSpacing: '-0.04em' }}
            >
              <span className="block" style={{ paddingLeft: '2vw' }}>
                数学笔记
              </span>
              <span className="block" style={{ paddingLeft: '14vw', color: 'var(--accent)' }}>
                共享讲义
              </span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p
              className="mt-8 max-w-md text-sm leading-relaxed md:ml-[2vw]"
              style={{ color: 'var(--ink-soft)' }}
            >
              本学期四门课的学习笔记汇总：数学物理方程、实变函数与泛函分析、微分几何、运筹学。
              会持续更新，欢迎补充与纠错——直接群里喊我。
            </p>
          </Reveal>
        </div>

        {/* table of contents */}
        <nav className="mt-4">
          <Reveal delay={150}>
            <div
              className="flex items-baseline justify-between border-b pb-2 text-xs font-bold uppercase tracking-[0.3em]"
              style={{ borderColor: 'var(--line-strong)' }}
            >
              <span>目录 · Contents</span>
              <span>{notes.length} 篇笔记</span>
            </div>
          </Reveal>
          <ul>
            {subjects.map((s, i) => {
              const count = notes.filter((n) => n.subjectId === s.id).length
              return (
                <Reveal key={s.id} delay={180 + i * 90}>
                  <li>
                    <Link
                      to={`/subject/${s.id}`}
                      className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 border-b py-6 transition-colors duration-300 md:gap-8 md:py-8"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      <span
                        className="font-display text-2xl leading-none md:text-4xl"
                        style={{ color: 'var(--accent)' }}
                      >
                        {s.no}
                      </span>
                      <span>
                        <span
                          className="font-display block text-2xl font-bold leading-tight transition-colors duration-300 group-hover:text-[#8c2f39] md:text-4xl"
                          style={{ letterSpacing: '-0.02em' }}
                        >
                          {s.name}
                        </span>
                        <span className="mt-1 block text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--ink-faint)' }}>
                          {s.en}
                        </span>
                        <span className="mt-2 block text-sm" style={{ color: 'var(--ink-soft)' }}>
                          {s.blurb}
                        </span>
                      </span>
                      <span className="text-right text-sm tabular-nums" style={{ color: 'var(--ink-soft)' }}>
                        {count} 篇
                        <span className="mt-1 block transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#8c2f39]">
                          →
                        </span>
                      </span>
                    </Link>
                  </li>
                </Reveal>
              )
            })}
          </ul>
        </nav>

        {/* footer */}
        <footer className="mt-14 flex flex-col items-start justify-between gap-3 text-xs md:flex-row md:items-center" style={{ color: 'var(--ink-faint)' }}>
          <span>© 2026 届数学笔记共享 · 仅供本班同学学习使用</span>
          <span className="uppercase tracking-[0.3em]">Ink on paper, math in mind.</span>
        </footer>
      </div>
    </div>
  )
}
