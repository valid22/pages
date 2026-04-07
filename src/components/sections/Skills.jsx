import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SKILLS } from '../../data/content'

const CATS = ['ML & AI', 'Data Science', 'Engineering', 'Frameworks']

const CAT_COLORS = {
  'ML & AI':      '#00D4FF',
  'Data Science': '#A78BFA',
  'Engineering':  '#FF5F1F',
  'Frameworks':   '#00FF87',
}

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
}

function SkillBar({ skill, color, inView, delay }) {
  return (
    <div className="skill-bar-wrap">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{skill.name}</span>
        <span className="mono" style={{ fontSize: 10, color: color }}>{skill.level}</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${skill.level}%` : 0 }}
          transition={{ duration: 1.2, delay, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef()
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const byCategory = CATS.map(cat => ({
    cat,
    color: CAT_COLORS[cat],
    skills: SKILLS.filter(s => s.cat === cat),
  }))

  return (
    <section id="skills" className="section">
      <div className="section-inner">

        <motion.div {...reveal}>
          <p className="section-label">// 03</p>
          <h2 className="section-title">TECH <span>STACK</span></h2>
          <div className="section-divider">
            <div className="section-divider-line" />
          </div>
        </motion.div>

        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {byCategory.map(({ cat, color, skills }, ci) => (
            <motion.div
              key={cat}
              {...reveal}
              transition={{ duration: 0.55, delay: ci * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="card" style={{ height: '100%' }}>
                {/* Category header */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22,
                  paddingBottom: 14, borderBottom: `1px solid ${color}20`,
                }}>
                  <div style={{ width: 6, height: 6, background: color, transform: 'rotate(45deg)', boxShadow: `0 0 8px ${color}` }} />
                  <span className="rj" style={{ fontSize: 14, fontWeight: 700, letterSpacing: '3px', color, textTransform: 'uppercase' }}>
                    {cat}
                  </span>
                </div>

                {skills.map((s, si) => (
                  <SkillBar
                    key={s.name}
                    skill={s}
                    color={color}
                    inView={inView}
                    delay={ci * 0.1 + si * 0.07}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
