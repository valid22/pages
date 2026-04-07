import { motion, AnimatePresence } from 'framer-motion'

function TypeBadge({ type }) {
  const colors = {
    PROJECT:   { bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.4)', color: '#A78BFA' },
    RESEARCH:  { bg: 'rgba(0,255,135,0.1)',    border: 'rgba(0,255,135,0.4)',   color: '#00FF87' },
    HACKATHON: { bg: 'rgba(255,95,31,0.12)',   border: 'rgba(255,95,31,0.4)',   color: '#FF5F1F' },
    'FULL-TIME': { bg: 'rgba(0,212,255,0.1)', border: 'rgba(0,212,255,0.4)',   color: '#00D4FF' },
    INTERNSHIP:{ bg: 'rgba(255,95,31,0.1)',   border: 'rgba(255,95,31,0.3)',   color: '#FF5F1F' },
    EDUCATION: { bg: 'rgba(0,255,135,0.08)',  border: 'rgba(0,255,135,0.3)',   color: '#00FF87' },
    GAME:      { bg: 'rgba(255,70,85,0.1)',   border: 'rgba(255,70,85,0.3)',   color: '#FF4655' },
  }
  const s = colors[type] || colors.PROJECT
  return (
    <span style={{
      fontFamily: "'Share Tech Mono', monospace", fontSize: 9, letterSpacing: 2,
      padding: '3px 8px', background: s.bg, border: `1px solid ${s.border}`, color: s.color,
    }}>
      {type}
    </span>
  )
}

function ProjectPanel({ item }) {
  const d = item.data
  return (
    <>
      <div className="info-panel-header">
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="info-label" style={{ color: d.color }}>{d.id}</span>
            <TypeBadge type={d.type} />
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{d.year}</span>
          </div>
          <div className="info-title">{d.name}</div>
          <div className="info-sub">{d.subtitle}</div>
        </div>
        <button className="info-close" onClick={item.onClose}>[ CLOSE ]</button>
      </div>
      <div className="info-panel-body">
        <div className="info-section">
          <div className="info-section-title">Description</div>
          <p className="info-desc">{d.desc}</p>
        </div>
        <div className="info-section">
          <div className="info-section-title">Key Metrics</div>
          {d.metrics.map((m, i) => (
            <div key={i} className="info-metric">
              <div className="info-metric-dot" style={{ background: d.color }} />
              {m}
            </div>
          ))}
        </div>
        <div className="info-section">
          <div className="info-section-title">Tech Stack</div>
          <div className="chip-list">{d.tags.map(t => <span key={t} className="chip">{t}</span>)}</div>
        </div>
        {(d.github || d.live) && (
          <div className="info-section">
            <div className="info-section-title">Links</div>
            {d.github && <a href={d.github} target="_blank" rel="noreferrer" className="info-link">GITHUB →</a>}
            {d.live && <a href={d.live} target="_blank" rel="noreferrer" className="info-link" style={{ color: '#FF5F1F', borderColor: 'rgba(255,95,31,0.4)' }}>LIVE DEMO →</a>}
          </div>
        )}
      </div>
    </>
  )
}

function ExperiencePanel({ item }) {
  const d = item.data
  return (
    <>
      <div className="info-panel-header">
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="info-label" style={{ color: d.color }}>{d.id}</span>
            <TypeBadge type={d.type} />
          </div>
          <div className="info-title">{d.role}</div>
          <div className="info-sub">{d.company} · {d.location}</div>
        </div>
        <button className="info-close" onClick={item.onClose}>[ CLOSE ]</button>
      </div>
      <div className="info-panel-body">
        <div className="info-section">
          <div className="info-section-title">Period</div>
          <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: d.color }}>{d.period}</p>
        </div>
        <div className="info-section">
          <div className="info-section-title">What I Did</div>
          <p className="info-desc">{d.desc}</p>
        </div>
        <div className="info-section">
          <div className="info-section-title">Impact</div>
          {d.metrics.map((m, i) => (
            <div key={i} className="info-metric">
              <div className="info-metric-dot" style={{ background: d.color }} />
              {m}
            </div>
          ))}
        </div>
        <div className="info-section">
          <div className="info-section-title">Tech Stack</div>
          <div className="chip-list">{d.tags.map(t => <span key={t} className="chip">{t}</span>)}</div>
        </div>
      </div>
    </>
  )
}

function EducationPanel({ item }) {
  const d = item.data
  return (
    <>
      <div className="info-panel-header">
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <TypeBadge type="EDUCATION" />
          </div>
          <div className="info-title">{d.degree}</div>
          <div className="info-sub">{d.school} · {d.location}</div>
        </div>
        <button className="info-close" onClick={item.onClose}>[ CLOSE ]</button>
      </div>
      <div className="info-panel-body">
        <div className="info-section">
          <div className="info-section-title">Period</div>
          <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: d.color }}>{d.period}</p>
        </div>
        {d.note && (
          <div className="info-section">
            <div className="info-section-title">Focus</div>
            <p className="info-desc">{d.note}</p>
          </div>
        )}
      </div>
    </>
  )
}

function GamePanel({ item }) {
  const d = item.data
  return (
    <>
      <div className="info-panel-header">
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <TypeBadge type="GAME" />
          </div>
          <div className="info-title">{d.game}</div>
          <div className="info-sub">{d.role}</div>
        </div>
        <button className="info-close" onClick={item.onClose}>[ CLOSE ]</button>
      </div>
      <div className="info-panel-body">
        <p className="info-desc">{d.desc}</p>
      </div>
    </>
  )
}

export default function InfoPanel({ item }) {
  if (!item) return null

  const panels = {
    project:    ProjectPanel,
    experience: ExperiencePanel,
    education:  EducationPanel,
    game:       GamePanel,
  }
  const Panel = panels[item.type] || ProjectPanel

  return (
    <AnimatePresence>
      <motion.div className="info-panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}>
        <Panel item={item} />
      </motion.div>
    </AnimatePresence>
  )
}
