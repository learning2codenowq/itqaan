/* eslint-disable @next/next/no-img-element */
// Vertical marquee of 16:9 website preview cards for the hero (desktop only).
// Images live in /public/projects as .webp. Two columns scroll in opposite
// directions and loop seamlessly (each list is duplicated, then translated by
// exactly one copy's height).
//
// TO ADD A PROJECT: drop a 16:9 .webp into /public/projects and add its
// filename (without extension) to the `projects` array below.

const projects = ['anasmarble', 'halalcert', 'mathtutor', 'quranteaching', 'royalthobes', 'tadabbur']

// 3 per column
const colA = projects.filter((_, i) => i % 2 === 0)
const colB = projects.filter((_, i) => i % 2 === 1)

function Column({ imgs, variant }: { imgs: string[]; variant: 'up' | 'down' }) {
  const list = [...imgs, ...imgs] // duplicated for a seamless loop
  return (
    <div className={`hero-col hero-col--${variant}`}>
      {list.map((n, i) => (
        <div className="hero-shot" key={`${n}-${i}`}>
          <img src={`/projects/${n}.webp`} alt="" loading="eager" draggable={false} />
        </div>
      ))}
    </div>
  )
}

export default function HeroShowcase() {
  return (
    <div className="hero-showcase" aria-hidden="true">
      <Column imgs={colA} variant="up" />
      <Column imgs={colB} variant="down" />
      <style>{`
        .hero-showcase {
          display: flex;
          align-items: flex-start;      /* don't stretch the columns */
          gap: 18px;
          width: 100%;
          height: 580px;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%);
        }
        .hero-col {
          display: flex;
          flex-direction: column;
          gap: 18px;
          flex: 1;
          min-width: 0;
          will-change: transform;
        }
        /* move by exactly one copy: -50% of the (duplicated) column, minus half a
           gap, so the loop is perfectly seamless regardless of card count */
        .hero-col--up   { animation: hero-marq-up 18s linear infinite; }
        .hero-col--down { animation: hero-marq-down 18s linear infinite; animation-delay: -9s; }
        @keyframes hero-marq-up   { from { transform: translateY(0); }                to { transform: translateY(calc(-50% - 9px)); } }
        @keyframes hero-marq-down { from { transform: translateY(calc(-50% - 9px)); } to { transform: translateY(0); } }
        .hero-showcase:hover .hero-col { animation-play-state: paused; }

        /* each card is a clean 16:9 rectangle; the image fills it with no squish */
        .hero-shot {
          position: relative;
          flex-shrink: 0;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--color-ink-10);
          background: var(--color-ink-5);
          box-shadow: 0 18px 44px rgba(0,0,0,0.45);
        }
        .hero-shot img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-col--up, .hero-col--down { animation: none; }
        }
      `}</style>
    </div>
  )
}
