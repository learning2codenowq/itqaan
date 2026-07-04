/* eslint-disable @next/next/no-img-element */
// Mobile-only horizontal marquee of recent work. On desktop the Hero already
// shows these projects (HeroShowcase, hidden < 980px), so this section fills the
// gap and is itself hidden >= 980px. Single row, seamless loop (list duplicated,
// translated by exactly one copy + half a gap). Reuses the same /public/projects
// .webp files as HeroShowcase.
//
// TO ADD A PROJECT: drop a 16:9 .webp into /public/projects and add its filename
// (without extension) to the `projects` array in BOTH this file and HeroShowcase.

const projects = ['anasmarble', 'halalcert', 'mathtutor', 'quranteaching', 'royalthobes', 'tadabbur']

export default function MobileProjects() {
  const list = [...projects, ...projects] // duplicated for a seamless loop
  return (
    <section className="mproj" aria-label="Recent work">
      <p className="mproj-eyebrow"><span className="mproj-dot" aria-hidden="true" />Recent work</p>
      <div className="mproj-viewport">
        <div className="mproj-row" aria-hidden="true">
          {list.map((n, i) => (
            <div className="mproj-card" key={`${n}-${i}`}>
              <img src={`/projects/${n}.webp`} alt="" loading="lazy" draggable={false} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .mproj { display: none; }
        /* Only render below the breakpoint where HeroShowcase hides. */
        @media (max-width: 980px) {
          .mproj {
            display: block;
            padding: 56px 0 64px;
            background: var(--color-void);
            overflow: hidden;
          }
        }
        .mproj-eyebrow {
          display: flex; align-items: center; gap: 12px;
          margin: 0 0 24px; padding: 0 24px;
          font-family: var(--font-mono); font-size: 0.65rem;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--color-ink-48);
        }
        .mproj-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--color-ember); }

        .mproj-viewport {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%);
        }
        .mproj-row {
          display: flex; gap: 14px; width: max-content;
          will-change: transform;
          animation: mproj-scroll 32s linear infinite;
        }
        .mproj-viewport:active .mproj-row { animation-play-state: paused; }
        /* move by exactly one copy: -50% of the duplicated row, minus half a gap */
        @keyframes mproj-scroll { from { transform: translateX(0); } to { transform: translateX(calc(-50% - 7px)); } }

        .mproj-card {
          position: relative; flex-shrink: 0;
          width: clamp(240px, 72vw, 300px);
          aspect-ratio: 16 / 9;
          border-radius: 12px; overflow: hidden;
          border: 1px solid var(--color-ink-10);
          background: var(--color-ink-5);
          box-shadow: 0 14px 36px rgba(0,0,0,0.4);
        }
        .mproj-card img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }
        @media (prefers-reduced-motion: reduce) {
          .mproj-row { animation: none; }
        }
      `}</style>
    </section>
  )
}
