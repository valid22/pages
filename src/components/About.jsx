import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const FACTS = [
  { k: 'LOCATION',    v: 'La Jolla, CA' },
  { k: 'STATUS',      v: 'Open to Opportunities' },
  { k: 'EDUCATION',   v: 'M.S. @ UCSD (Analytics)' },
  { k: 'GAMES',       v: 'Valorant · CS2 · Chess' },
]

const CODE = [
  { k: 'name',      v: '"Vigneshwaran Siva Sankaran"', c: 'var(--orange)' },
  { k: 'role',      v: '"DS & ML Engineer"',           c: 'var(--purple)' },
  { k: 'location',  v: '"La Jolla, CA"',               c: 'var(--orange)' },
  { k: 'stack',     v: '["PyTorch","LangChain","Spark"]', c: 'var(--green)' },
  { k: 'games',     v: '["Valorant","CS2","Chess"]',   c: 'var(--purple)' },
  { k: 'available', v: 'true',                          c: 'var(--green)' },
  { k: 'focus',     v: '"Agentic AI, ML Systems"',     c: 'var(--orange)' },
]

const LINKS = [
  { label: 'LINKEDIN', href: 'https://linkedin.com/in/dote10110' },
  { label: 'EMAIL',    href: 'mailto:hi@itsdote.tech' },
  { label: 'WEBSITE',  href: 'https://itsdote.tech' },
]

function reveal(inView, delay = 0, dir = 'y') {
  const init = dir === 'x' ? { opacity: 0, x: -32 } : dir === 'xr' ? { opacity: 0, x: 32 } : { opacity: 0, y: 28 }
  return {
    initial: init,
    animate: inView ? { opacity: 1, x: 0, y: 0 } : init,
    transition: { duration: 0.65, delay },
  }
}

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="about" className="relative py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div {...reveal(inView)} className="mb-14">
          <div className="label mb-2" style={{ opacity: 0.6 }}>// 01 — ABOUT</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>THE PLAYER</h2>
          <div style={{ width: 56, height: 2, background: 'linear-gradient(90deg, var(--cyan), transparent)', marginTop: 10 }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Left: Bio ── */}
          <motion.div {...reveal(inView, 0.15, 'x')}>

            {/* Bio header bar */}
            <div className="flex items-center gap-3 mb-5 px-4 py-2"
              style={{ background: 'rgba(0,212,255,0.05)', borderLeft: '2px solid var(--cyan)' }}>
              <span className="label" style={{ fontSize: 9, letterSpacing: '4px' }}>PLAYER BIO // LOADED</span>
            </div>

            <div className="space-y-4" style={{ color: 'rgba(232,244,248,0.72)', fontSize: 14, lineHeight: 1.75 }}>
              <p>
                I'm a <span className="text-highlight">DS/AI/ML Engineer</span> with a track record
                of building and shipping intelligent systems — from defense-grade autonomous drones
                to healthcare imaging agents and esports analytics platforms.
              </p>
              <p>
                My work spans <span style={{ color: 'var(--orange)' }}>agentic AI</span>,{' '}
                <span style={{ color: 'var(--orange)' }}>LLM orchestration</span>,{' '}
                <span style={{ color: 'var(--orange)' }}>statistical experimentation</span>, and{' '}
                <span style={{ color: 'var(--orange)' }}>production ML pipelines</span>.
                I thrive at the intersection of rigorous data science and real-world engineering.
              </p>
              <p>
                Currently pursuing an <span className="text-highlight">M.S. in Business Analytics @ UCSD</span>,
                focused on Machine Learning, Agentic AI Systems, and Data-Driven Decision Systems.
              </p>
              <p>
                Off the clock I'm a competitive gamer —{' '}
                <span style={{ color: 'var(--purple)' }}>Valorant</span>,{' '}
                <span style={{ color: 'var(--purple)' }}>CS2</span>, and{' '}
                <span style={{ color: 'var(--purple)' }}>Chess</span>. The same instincts —
                pattern recognition, decision-making under pressure, reading systems fast —
                transfer directly to data and AI work.
              </p>
            </div>

            {/* Facts grid */}
            <div className="grid grid-cols-2 gap-2 mt-8">
              {FACTS.map((f, i) => (
                <motion.div key={f.k}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.45 + i * 0.09 }}
                  className="p-3"
                  style={{ background: 'var(--bg-card)', borderLeft: '1px solid var(--border-h)', borderTop: '1px solid var(--border)' }}>
                  <div className="label mb-1" style={{ fontSize: 8, letterSpacing: '3px', opacity: 0.6 }}>{f.k}</div>
                  <div className="font-head" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{f.v}</div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.85 }}
              className="flex flex-wrap gap-5 mt-7">
              {LINKS.map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 font-mono transition-colors"
                  style={{ fontSize: 11, letterSpacing: '2px', color: 'var(--muted)', cursor: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
                  <span style={{ color: 'var(--cyan)' }}>{'>'}</span>
                  {l.label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Code card ── */}
          <motion.div {...reveal(inView, 0.25, 'xr')} className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="clip-corner card p-0 overflow-hidden">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3"
                  style={{ background: 'rgba(4,13,20,0.7)', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', opacity: 0.7 }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--orange)', opacity: 0.7 }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', opacity: 0.7 }} />
                  <span className="font-mono ml-2" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: 2 }}>player_profile.json</span>
                </div>

                {/* Code body */}
                <div className="px-5 py-5">
                  <div className="font-mono" style={{ fontSize: 12 }}>
                    <div style={{ color: 'var(--border-h)' }}>{'{'}</div>
                    {CODE.map((line, i) => (
                      <motion.div key={line.k}
                        initial={{ opacity: 0, x: 10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + i * 0.08 }}
                        style={{ paddingLeft: 20, marginBottom: 6, display: 'flex', gap: 8 }}>
                        <span style={{ color: 'var(--muted)', minWidth: 20, textAlign: 'right', fontSize: 10 }}>{i + 1}</span>
                        <span style={{ color: 'var(--cyan)', opacity: 0.85 }}>{line.k}</span>
                        <span style={{ color: 'var(--muted)' }}>:</span>
                        <span style={{ color: line.c }}>{line.v}</span>
                        <span style={{ color: 'var(--muted)' }}>,</span>
                      </motion.div>
                    ))}
                    <div style={{ color: 'var(--border-h)' }}>{'}'}</div>
                  </div>
                </div>
              </div>

              {/* Decorative rotating squares */}
              <motion.div className="absolute -top-5 -right-5 w-16 h-16 pointer-events-none"
                style={{ border: '1px solid rgba(255,95,31,0.2)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} />
              <motion.div className="absolute -bottom-5 -left-5 w-10 h-10 pointer-events-none"
                style={{ border: '1px solid var(--border)' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
