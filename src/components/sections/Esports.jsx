import { motion } from 'framer-motion'
import { ESPORTS } from '../../data/content'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
}

const GAME_ICONS = {
  VALORANT: '⬡',
  CS2: '◈',
  Chess: '♟',
}

export default function Esports() {
  return (
    <section id="esports" className="section" style={{ background: 'rgba(10, 0, 18, 0.4)' }}>
      <div className="section-inner">

        <motion.div {...reveal}>
          <p className="section-label">// 05</p>
          <h2 className="section-title">THE <span>ARENA</span></h2>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8, maxWidth: 540, lineHeight: 1.7 }}>
            The same pattern recognition, decision-making under pressure, and systematic thinking that drives competitive gaming also drives my data work.
          </p>
          <div className="section-divider">
            <div className="section-divider-line" style={{ background: 'linear-gradient(90deg, var(--secondary), transparent)' }} />
          </div>
        </motion.div>

        <div className="esports-grid">
          {ESPORTS.map((game, i) => (
            <motion.div
              key={game.id}
              {...reveal}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="card" style={{
                borderColor: game.color + '30',
                borderTopColor: game.color + '70',
                borderTopWidth: 2,
                height: '100%',
              }}>
                {/* Icon + Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{
                    width: 44, height: 44, flexShrink: 0,
                    background: game.color + '12',
                    border: `1px solid ${game.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, color: game.color,
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                  }}>
                    {GAME_ICONS[game.game] || '◈'}
                  </div>
                  <div>
                    <h3 className="rj" style={{ fontSize: 19, fontWeight: 700, letterSpacing: '2px', color: game.color, textTransform: 'uppercase' }}>
                      {game.game}
                    </h3>
                    <span className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '2px' }}>{game.role}</span>
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
                  {game.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* About blurb */}
        <motion.div
          {...reveal}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: 48 }}
        >
          <div className="card" style={{ background: 'rgba(10, 0, 20, 0.7)', borderColor: 'rgba(167,139,250,0.15)', maxWidth: 680 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ width: 5, height: 5, background: 'var(--secondary)', transform: 'rotate(45deg)', boxShadow: '0 0 8px var(--secondary)' }} />
              <span className="mono" style={{ fontSize: 9, letterSpacing: '3px', color: 'var(--secondary)' }}>ABOUT ME</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'rgba(232,244,251,0.65)' }}>
              Building intelligent systems by day. Competing and reading patterns at night.
              Based in <span style={{ color: 'var(--primary)' }}>La Jolla, CA</span> — pursuing an MS in Business Analytics at UCSD.
              I bring the same rigor, feedback loops, and obsession with improvement from competitive gaming into everything I build.
            </p>
            <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="mailto:hi@itsdote.tech" className="mono" style={{ fontSize: 10, letterSpacing: '2px', color: 'var(--primary)', textDecoration: 'none' }}>
                hi@itsdote.tech
              </a>
              <span style={{ color: 'var(--muted)' }}>·</span>
              <a href="https://itsdote.tech" target="_blank" rel="noreferrer" className="mono" style={{ fontSize: 10, letterSpacing: '2px', color: 'var(--muted)', textDecoration: 'none' }}>
                itsdote.tech
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
