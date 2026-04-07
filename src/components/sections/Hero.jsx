import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ROLES = ['ML Engineer', 'Data Scientist', 'AI Engineer', 'Research Engineer']

function useTyping(words, speed = 70, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    let timer
    if (!deleting && charIdx < word.length) {
      timer = setTimeout(() => setCharIdx(c => c + 1), speed)
    } else if (!deleting && charIdx === word.length) {
      timer = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => setCharIdx(c => c - 1), speed / 2)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
    }
    setDisplay(word.slice(0, charIdx))
    return () => clearTimeout(timer)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return display
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const role = useTyping(ROLES)

  return (
    <section id="home" className="hero">
      <div className="section-inner" style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40 }}>

          {/* ── Left: Text ── */}
          <div style={{ flex: 1, maxWidth: 680 }}>

            {/* Status badge */}
            <motion.div {...fadeUp(0.1)} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '5px 14px',
                background: 'rgba(0,255,135,0.06)',
                border: '1px solid rgba(0,255,135,0.2)',
                clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
              }}>
                <div style={{ width: 6, height: 6, background: 'var(--green)', borderRadius: '50%', boxShadow: '0 0 8px var(--green)' }} />
                <span className="mono" style={{ fontSize: 10, letterSpacing: '3px', color: 'var(--text)' }}>AGENT // ONLINE</span>
              </div>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(0,255,135,0.3), transparent)', maxWidth: 120 }} />
            </motion.div>

            {/* Name */}
            <motion.div {...fadeUp(0.2)}>
              <p className="mono" style={{ fontSize: 10, letterSpacing: '6px', color: 'var(--primary)', marginBottom: 10, opacity: 0.7 }}>
                CODENAME: DOTE
              </p>
              <h1 className="hero-name">
                VIGNESH<span className="hero-name-accent">WARAN</span>
              </h1>
              <h2 className="rj" style={{
                fontSize: 'clamp(20px, 3vw, 36px)',
                fontWeight: 600,
                letterSpacing: '4px',
                color: 'rgba(232,244,251,0.45)',
                textTransform: 'uppercase',
                marginTop: 4,
              }}>
                SIVA SANKARAN
              </h2>
            </motion.div>

            {/* Role */}
            <motion.div {...fadeUp(0.35)} style={{ margin: '22px 0 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'var(--primary)', fontFamily: 'monospace', fontSize: 14 }}>&gt;</span>
              <span className="rj" style={{ fontSize: 22, fontWeight: 600, letterSpacing: '3px', color: 'var(--text)' }}>
                {role}
              </span>
              <span className="typing-cursor" />
            </motion.div>

            {/* Description */}
            <motion.p {...fadeUp(0.45)} style={{
              fontSize: 14,
              lineHeight: 1.8,
              color: 'var(--muted)',
              maxWidth: 500,
              marginBottom: 32,
            }}>
              Building intelligent systems across ML, AI, and data engineering.
              Based in <span style={{ color: 'var(--primary)' }}>La Jolla, CA</span> — from model pipelines to agentic AI.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.55)} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
              <button className="btn-primary" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
                View Projects
              </button>
              <button className="btn-outline" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                Get In Touch
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div {...fadeUp(0.65)} style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              {[
                { value: '6+', label: 'ML / AI Projects' },
                { value: '2+', label: 'Yrs Industry Exp' },
                { value: 'UCSD', label: 'MS Analytics' },
                { value: 'LA JOLLA', label: 'California' },
              ].map(s => (
                <div key={s.label}>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Agent card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 90 }}
            style={{ flexShrink: 0 }}
          >
            <div className="agent-card">
              {/* Header */}
              <div style={{
                padding: '14px 20px 12px',
                borderBottom: '1px solid rgba(0,212,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span className="mono" style={{ fontSize: 9, letterSpacing: '3px', color: 'var(--primary)' }}>AGENT CARD</span>
                <span className="mono" style={{ fontSize: 9, color: 'var(--muted)' }}>ID:DOTE-001</span>
              </div>

              {/* Avatar */}
              <div style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                  animate={{ boxShadow: ['0 0 12px rgba(0,212,255,0.2)', '0 0 28px rgba(0,212,255,0.45)', '0 0 12px rgba(0,212,255,0.2)'] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  style={{
                    width: 100, height: 100,
                    background: 'linear-gradient(135deg, #050f1e, #0a1828)',
                    border: '1px solid rgba(0,212,255,0.3)',
                    clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 14,
                    position: 'relative',
                  }}
                >
                  <span className="rj" style={{ fontSize: 52, fontWeight: 700, color: 'var(--primary)', opacity: 0.85 }}>V</span>
                  <div style={{
                    position: 'absolute', bottom: -8, right: -8,
                    background: 'var(--secondary)',
                    padding: '2px 7px',
                    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%)',
                  }}>
                    <span className="mono" style={{ fontSize: 9, color: '#000', fontWeight: 700, letterSpacing: '1px' }}>RADIANT</span>
                  </div>
                </motion.div>

                <div className="rj" style={{ fontSize: 16, fontWeight: 700, letterSpacing: '3px', color: 'var(--text)', textAlign: 'center' }}>
                  VIGNESHWARAN
                </div>
                <div className="mono" style={{ fontSize: 9, letterSpacing: '2px', color: 'var(--primary)', marginTop: 3, marginBottom: 18 }}>
                  DS &amp; ML ENGINEER
                </div>

                {/* Stat bars */}
                {[
                  { label: 'PERFORMANCE', val: 95 },
                  { label: 'PRECISION',   val: 90 },
                  { label: 'ADAPTABILITY', val: 88 },
                ].map(s => (
                  <div key={s.label} style={{ width: '100%', marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '2px' }}>{s.label}</span>
                      <span className="mono" style={{ fontSize: 9, color: 'var(--primary)' }}>{s.val}</span>
                    </div>
                    <div className="skill-row-bar">
                      <motion.div
                        className="skill-row-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${s.val}%` }}
                        transition={{ duration: 1.4, delay: 0.8 }}
                      />
                    </div>
                  </div>
                ))}

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 10, justifyContent: 'center' }}>
                  {['PYTHON', 'ML', 'AI', 'DATA', 'LLM'].map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div style={{
                padding: '10px 20px 14px',
                borderTop: '1px solid rgba(0,212,255,0.08)',
                display: 'flex', justifyContent: 'space-between',
              }}>
                <span className="mono" style={{ fontSize: 9, color: 'var(--muted)' }}>LA JOLLA // CA</span>
                <span className="mono" style={{ fontSize: 9, color: 'rgba(0,212,255,0.35)' }}>UCSD 2026</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="mono" style={{ fontSize: 9, letterSpacing: '4px', color: 'var(--muted)' }}>SCROLL</span>
        <div style={{ width: 1, height: 44, background: 'linear-gradient(180deg, var(--primary), transparent)' }} />
      </motion.div>
    </section>
  )
}
