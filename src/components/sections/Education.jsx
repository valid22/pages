import { motion } from 'framer-motion'
import { EDUCATION } from '../../data/content'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
}

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="section-inner">

        <motion.div {...reveal}>
          <p className="section-label">// 04</p>
          <h2 className="section-title">EDUCA<span>TION</span></h2>
          <div className="section-divider">
            <div className="section-divider-line" />
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.id}
              {...reveal}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="card card-clip" style={{ height: '100%', borderTopColor: edu.color + '60', borderTopWidth: 2 }}>
                {/* School + badge */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 14 }}>
                  <div>
                    <span className="badge" style={{
                      color: edu.color, borderColor: edu.color + '50', background: edu.color + '10',
                      fontSize: 8, marginBottom: 8, display: 'inline-flex',
                    }}>
                      EDUCATION
                    </span>
                    <h3 className="rj" style={{
                      fontSize: 20, fontWeight: 700, letterSpacing: '1px', color: edu.color,
                      textTransform: 'uppercase',
                    }}>
                      {edu.school}
                    </h3>
                  </div>
                </div>

                {/* Degree */}
                <p style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.5, marginBottom: 10 }}>
                  {edu.degree}
                </p>

                {/* Note */}
                {edu.note && (
                  <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 14 }}>
                    {edu.note}
                  </p>
                )}

                {/* Period + Location */}
                <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: `1px solid ${edu.color}15`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="mono" style={{ fontSize: 10, color: edu.color }}>{edu.period}</span>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>{edu.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
