import { motion } from 'framer-motion'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
}

const LINKS = [
  {
    label: 'Email',
    value: 'hi@itsdote.tech',
    href: 'mailto:hi@itsdote.tech',
    color: '#00FF87',
    icon: '✉',
    sub: 'Best way to reach me',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/dote10110',
    href: 'https://linkedin.com/in/dote10110',
    color: '#00D4FF',
    icon: '◈',
    sub: 'Professional profile',
  },
  {
    label: 'Website',
    value: 'itsdote.tech',
    href: 'https://itsdote.tech',
    color: '#A78BFA',
    icon: '◆',
    sub: 'Portfolio & projects',
  },
  {
    label: 'GitHub',
    value: 'github.com/valid22',
    href: 'https://github.com/valid22',
    color: '#FF5F1F',
    icon: '⬡',
    sub: 'Open source work',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section" style={{ paddingBottom: 120 }}>
      <div className="section-inner">

        <motion.div {...reveal}>
          <p className="section-label">// 06</p>
          <h2 className="section-title">ESTABLISH <span>CONTACT</span></h2>
          <div className="section-divider">
            <div className="section-divider-line" style={{ background: 'linear-gradient(90deg, var(--green), transparent)' }} />
          </div>
        </motion.div>

        {/* Availability badge */}
        <motion.div {...reveal} transition={{ duration: 0.5, delay: 0.1 }} style={{ marginBottom: 40 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '10px 20px',
            background: 'rgba(0,255,135,0.05)',
            border: '1px solid rgba(0,255,135,0.2)',
          }}>
            <div style={{ width: 6, height: 6, background: '#00FF87', borderRadius: '50%', boxShadow: '0 0 10px #00FF87' }} />
            <span className="mono" style={{ fontSize: 10, letterSpacing: '3px', color: '#00FF87' }}>
              AVAILABLE FOR FULL-TIME ROLES & RESEARCH
            </span>
          </div>
        </motion.div>

        {/* Contact links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14, marginBottom: 48 }}>
          {LINKS.map((l, i) => (
            <motion.div
              key={l.label}
              {...reveal}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="contact-link">
                <div style={{
                  width: 40, height: 40, flexShrink: 0,
                  background: l.color + '10',
                  border: `1px solid ${l.color}35`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, color: l.color,
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                }}>
                  {l.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="mono" style={{ fontSize: 9, letterSpacing: '2px', color: l.color, marginBottom: 3 }}>{l.label.toUpperCase()}</div>
                  <div style={{ fontSize: 13, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 1 }}>{l.sub}</div>
                </div>
                <span style={{ color: 'var(--muted)', fontSize: 16, flexShrink: 0 }}>→</span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          {...reveal}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ textAlign: 'center', paddingTop: 32, borderTop: '1px solid rgba(0,212,255,0.08)' }}
        >
          <div className="rj" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '6px', color: 'rgba(232,244,251,0.08)', textTransform: 'uppercase', marginBottom: 12 }}>
            VIGNESHWARAN SIVA SANKARAN
          </div>
          <div className="mono" style={{ fontSize: 9, letterSpacing: '4px', color: 'var(--muted)' }}>
            ML ENGINEER · DATA SCIENTIST · ESPORTS PLAYER · LA JOLLA, CA
          </div>
          <div className="mono" style={{ fontSize: 9, letterSpacing: '3px', color: 'rgba(0,212,255,0.2)', marginTop: 20 }}>
            DOTE.WORLD © 2026
          </div>
        </motion.div>
      </div>
    </section>
  )
}
