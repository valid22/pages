import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS } from '../../data/content'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
}

const TYPE_COLORS = {
  PROJECT:   '#00D4FF',
  RESEARCH:  '#00FF87',
  HACKATHON: '#FF5F1F',
}

function ProjectModal({ item, onClose }) {
  const d = item
  const c = d.color

  return (
    <>
      {/* Overlay */}
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="modal-panel"
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span className="mono" style={{ fontSize: 9, color: c }}>{d.id}</span>
                <span className="badge" style={{
                  color: TYPE_COLORS[d.type] || c,
                  borderColor: (TYPE_COLORS[d.type] || c) + '50',
                  background: (TYPE_COLORS[d.type] || c) + '12',
                }}>
                  {d.type}
                </span>
                <span className="mono" style={{ fontSize: 9, color: 'var(--muted)' }}>{d.year}</span>
              </div>
              <h3 className="rj" style={{ fontSize: 22, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text)', marginBottom: 4 }}>
                {d.name}
              </h3>
              <p style={{ fontSize: 12, color: 'var(--muted)' }}>{d.subtitle}</p>
            </div>
            <button className="modal-close" onClick={onClose}>[ CLOSE ]</button>
          </div>
        </div>

        <div className="modal-body">
          <div style={{ marginBottom: 22 }}>
            <div className="modal-section-title">Description</div>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>{d.desc}</p>
          </div>

          <div style={{ marginBottom: 22 }}>
            <div className="modal-section-title">Key Metrics</div>
            {d.metrics.map((m, i) => (
              <div key={i} className="modal-metric">
                <span style={{ color: c, marginTop: 1, flexShrink: 0 }}>▸</span>
                {m}
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 22 }}>
            <div className="modal-section-title">Tech Stack</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {d.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>

          {(d.github || d.live) && (
            <div>
              <div className="modal-section-title">Links</div>
              {d.github && (
                <a href={d.github} target="_blank" rel="noreferrer" className="modal-link">
                  GITHUB →
                </a>
              )}
              {d.live && (
                <a href={d.live} target="_blank" rel="noreferrer" className="modal-link"
                  style={{ borderColor: 'rgba(255,95,31,0.35)', color: 'var(--accent)' }}>
                  LIVE DEMO →
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}

function ProjectCard({ project, onClick, delay }) {
  const [hov, setHov] = useState(false)
  const tc = TYPE_COLORS[project.type] || project.color

  return (
    <motion.div
      {...reveal}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="project-card"
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ borderColor: hov ? project.color + '50' : 'var(--border)' }}
      >
        {/* Color accent top */}
        <div className="project-card-top" style={{ background: project.color }} />

        <div className="project-card-body">
          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge" style={{ color: tc, borderColor: tc + '50', background: tc + '10', fontSize: 8 }}>
                {project.type}
              </span>
              <span className="mono" style={{ fontSize: 9, color: 'var(--muted)' }}>{project.year}</span>
            </div>
            <span className="mono" style={{ fontSize: 9, color: 'var(--muted)' }}>{project.id}</span>
          </div>

          {/* Title */}
          <h3 className="rj" style={{
            fontSize: 18, fontWeight: 700, letterSpacing: '1px',
            color: hov ? project.color : 'var(--text)',
            textTransform: 'uppercase', marginBottom: 4,
            transition: 'color 0.2s',
          }}>
            {project.name}
          </h3>
          <p style={{ fontSize: 11.5, color: 'var(--muted)', marginBottom: 12 }}>{project.subtitle}</p>

          {/* Desc preview */}
          <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 16,
            display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {project.desc}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
            {project.tags.slice(0, 4).map(t => <span key={t} className="tag">{t}</span>)}
            {project.tags.length > 4 && (
              <span className="tag" style={{ opacity: 0.5 }}>+{project.tags.length - 4}</span>
            )}
          </div>

          {/* Open hint */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ flex: 1, height: '1px', background: `${project.color}25` }} />
            <span className="mono" style={{ fontSize: 9, color: project.color, opacity: hov ? 1 : 0.5, transition: 'opacity 0.2s' }}>
              VIEW DETAILS →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="projects" className="section">
      <div className="section-inner">

        <motion.div {...reveal}>
          <p className="section-label">// 02</p>
          <h2 className="section-title">SHIPPED <span>PROJECTS</span></h2>
          <div className="section-divider">
            <div className="section-divider-line" />
          </div>
        </motion.div>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              onClick={() => setSelected(p)}
              delay={(i % 3) * 0.08}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
