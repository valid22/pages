import { motion } from 'framer-motion'
import { EXPERIENCE } from '../../data/content'

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-inner">

        <motion.div {...reveal}>
          <p className="section-label">// 01</p>
          <h2 className="section-title">WORK <span>EXPERIENCE</span></h2>
          <div className="section-divider">
            <div className="section-divider-line" />
          </div>
        </motion.div>

        <div className="timeline">
          {EXPERIENCE.map((job, i) => (
            <motion.div
              key={job.id}
              {...reveal}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'relative', marginBottom: i < EXPERIENCE.length - 1 ? 48 : 0 }}
            >
              {/* Timeline dot */}
              <div className="timeline-dot" />

              <div className="card card-clip" style={{ borderLeftColor: job.color + '40', borderLeftWidth: 2 }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span className="badge" style={{ color: job.color, borderColor: job.color + '50', background: job.color + '10' }}>
                        {job.type}
                      </span>
                      <span className="mono" style={{ fontSize: 9, color: 'var(--muted)' }}>{job.id}</span>
                    </div>
                    <h3 className="rj" style={{ fontSize: 20, fontWeight: 700, letterSpacing: '1px', color: 'var(--text)', marginBottom: 3 }}>
                      {job.role}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 14, color: job.color, fontWeight: 600 }}>{job.company}</span>
                      <span style={{ color: 'var(--muted)', fontSize: 12 }}>·</span>
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{job.location}</span>
                    </div>
                  </div>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '1px', flexShrink: 0 }}>
                    {job.period}
                  </span>
                </div>

                {/* Description */}
                <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 18 }}>
                  {job.desc}
                </p>

                {/* Metrics */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 18 }}>
                  {job.metrics.map((m, j) => (
                    <div key={j} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                      padding: '8px 12px',
                      background: 'rgba(0,212,255,0.03)',
                      borderLeft: `2px solid ${job.color}50`,
                      fontSize: 12.5, color: 'rgba(232,244,251,0.75)', lineHeight: 1.5,
                    }}>
                      <span style={{ color: job.color, marginTop: 2, flexShrink: 0 }}>▸</span>
                      {m}
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {job.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
