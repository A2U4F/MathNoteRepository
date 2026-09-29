/**
 * Sketchbook dressing: drafting-paper grid lines (solid + dashed)
 * and binder hole punches along the left edge.
 */
export function PaperGrid({ holes = true }: { holes?: boolean }) {
  return (
    <>
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="draft-grid" width="98" height="98" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="98" stroke="rgba(33,29,18,0.10)" strokeWidth="1" />
            <line x1="0" y1="0" x2="98" y2="0" stroke="rgba(33,29,18,0.10)" strokeWidth="1" />
            <line
              x1="49"
              y1="0"
              x2="49"
              y2="98"
              stroke="rgba(33,29,18,0.10)"
              strokeWidth="1"
              strokeDasharray="1,5"
            />
            <line
              x1="0"
              y1="49"
              x2="98"
              y2="49"
              stroke="rgba(33,29,18,0.10)"
              strokeWidth="1"
              strokeDasharray="1,5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#draft-grid)" />
      </svg>
      {holes && (
        <div aria-hidden className="pointer-events-none absolute left-3 top-0 hidden h-full md:block lg:left-5">
          <div className="sticky top-0 flex h-screen flex-col justify-evenly">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="block h-4 w-4 rounded-full"
                style={{
                  background: 'var(--paper-read)',
                  boxShadow: 'inset 0 1px 3px rgba(33,29,18,0.45), 0 1px 0 rgba(255,255,255,0.25)',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
