import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import HeroCanvas from './HeroCanvas'

const STATS = [
  { label: 'PERFORMANCE', val: 95 },
  { label: 'PRECISION',   val: 90 },
  { label: 'ADAPTABILITY', val: 88 },
]

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const h = (e) => setMouse({
      x: (e.clientX / window.innerWidth  - 0.5) * 18,
      y: (e.clientY / window.innerHeight - 0.5) * 18,
    })
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--bg)' }}>

      {/* Keyword field (pretext-powered canvas) */}
      <HeroCanvas />

      {/* Radial glow blobs */}
      <div className="hero-glow" style={{ width: 600, height: 600, background: 'rgba(0,212,255,0.04)', top: '-10%', left: '-5%' }} />
      <div className="hero-glow" style={{ width: 500, height: 500, background: 'rgba(255,95,31,0.04)', bottom: '0%', right: '-10%' }} />

      {/* Corner brackets */}
      <div className="absolute top-8 left-8 w-12 h-12 pointer-events-none" style={{ borderTop: '1.5px solid var(--border-h)', borderLeft: '1.5px solid var(--border-h)' }} />
      <div className="absolute top-8 right-8 w-12 h-12 pointer-events-none" style={{ borderTop: '1.5px solid rgba(255,95,31,0.3)', borderRight: '1.5px solid rgba(255,95,31,0.3)' }} />
      <div className="absolute bottom-8 left-8 w-12 h-12 pointer-events-none" style={{ borderBottom: '1.5px solid rgba(255,95,31,0.2)', borderLeft: '1.5px solid rgba(255,95,31,0.2)' }} />
      <div className="absolute bottom-8 right-8 w-12 h-12 pointer-events-none" style={{ borderBottom: '1.5px solid var(--border)', borderRight: '1.5px solid var(--border)' }} />

      {/* Main layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-8">

          {/* ── Left: Content ── */}
          <div className="flex-1 max-w-2xl">

            {/* System badge */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-7"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 clip-corner-sm"
                style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid var(--border)' }}>
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--green)' }}
                  animate={{ boxShadow: ['0 0 4px var(--green)', '0 0 10px var(--green)', '0 0 4px var(--green)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="label" style={{ fontSize: 9, letterSpacing: '3px' }}>DOTE.SYS // ONLINE</span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent max-w-[120px]" />
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-5"
            >
              <div className="label mb-3" style={{ letterSpacing: '5px', fontSize: 10 }}>CODENAME: DOTE — ID: 001</div>
              <h1
                className="section-heading glitch"
                data-text="VIGNESH"
                style={{ fontSize: 'clamp(52px, 9vw, 110px)', lineHeight: 0.9, marginBottom: 4 }}
              >
                VIGNESH
              </h1>
              <h1
                className="section-heading"
                style={{
                  fontSize: 'clamp(52px, 9vw, 110px)',
                  lineHeight: 0.9,
                  color: 'var(--cyan)',
                  textShadow: '0 0 40px rgba(0,212,255,0.25)',
                }}
              >
                WARAN
              </h1>
              <div className="label mt-3" style={{ opacity: 0.4, letterSpacing: '4px', fontSize: 9 }}>
                SIVA SANKARAN
              </div>
            </motion.div>

            {/* Role typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-7"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono" style={{ color: 'var(--cyan)', fontSize: 13 }}>{'>'}</span>
                <TypeAnimation
                  sequence={[
                    'ML Engineer', 2200,
                    'Data Scientist', 2200,
                    'AI Engineer', 2200,
                    'Research Engineer', 2200,
                    'Esports Analyst', 2200,
                  ]}
                  wrapper="span"
                  speed={55}
                  repeat={Infinity}
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 600,
                    fontSize: 'clamp(18px, 3vw, 26px)',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: 'var(--text)',
                  }}
                />
                <span className="blink" style={{ color: 'var(--cyan)', fontSize: 18, marginLeft: 2 }}>_</span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, maxWidth: 480 }}>
                Building intelligent systems across{' '}
                <span className="text-highlight">agentic AI</span>,{' '}
                <span className="text-highlight">ML pipelines</span>, and{' '}
                <span className="text-highlight">esports analytics</span>.
                {' '}Based in La Jolla, CA — currently @ UCSD MS Analytics.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <button className="btn-primary"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                <span>VIEW PROJECTS</span>
                <span style={{ fontSize: 14 }}>→</span>
              </button>
              <button className="btn-ghost"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                CONTACT ME
              </button>
            </motion.div>

            {/* Bottom stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="flex flex-wrap gap-8"
            >
              {[
                { v: '6+',     l: 'SHIPPED PROJECTS' },
                { v: '2+',     l: 'YRS INDUSTRY' },
                { v: '2×',     l: 'HACKATHON WINS' },
                { v: 'UCSD',   l: 'MS ANALYTICS' },
              ].map(s => (
                <div key={s.l}>
                  <div className="section-heading" style={{ fontSize: 28, color: 'var(--cyan)' }}>{s.v}</div>
                  <div className="label" style={{ fontSize: 9, letterSpacing: '2px', opacity: 0.45, marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Player Card ── */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35, type: 'spring', stiffness: 90 }}
            style={{
              transform: `translate(${mouse.x * 0.28}px,${mouse.y * 0.28}px)`,
              transition: 'transform 0.08s linear',
            }}
          >
            <div className="relative clip-corner"
              style={{
                width: 260,
                background: 'rgba(8,20,31,0.85)',
                border: '1px solid var(--border-h)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 40px rgba(0,212,255,0.07)',
              }}>

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3"
                style={{ borderBottom: '1px solid var(--border)' }}>
                <span className="label" style={{ fontSize: 9, letterSpacing: '3px' }}>PLAYER CARD</span>
                <div className="flex gap-1">
                  <div style={{ width: 6, height: 6, background: 'var(--cyan)', transform: 'rotate(45deg)', opacity: 0.7 }} />
                  <div style={{ width: 6, height: 6, background: 'var(--orange)', transform: 'rotate(45deg)', opacity: 0.7 }} />
                </div>
              </div>

              {/* Avatar */}
              <div className="flex flex-col items-center px-5 py-5">
                <div className="relative mb-4">
                  <motion.div
                    className="flex items-center justify-center clip-corner"
                    style={{
                      width: 100, height: 100,
                      background: 'linear-gradient(135deg, #0C1C2C, #081420)',
                      border: '1px solid var(--border-h)',
                    }}
                    animate={{ boxShadow: ['0 0 10px rgba(0,212,255,0.2)', '0 0 28px rgba(0,212,255,0.5)', '0 0 10px rgba(0,212,255,0.2)'] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <span className="section-heading" style={{ fontSize: 48, color: 'var(--cyan)', opacity: 0.85 }}>D</span>
                  </motion.div>
                  <div className="absolute -bottom-2 -right-2 px-2 py-0.5"
                    style={{ background: 'var(--orange)', clipPath: 'polygon(0 0,100% 0,100% calc(100% - 4px),calc(100% - 4px) 100%,0 100%)' }}>
                    <span className="font-mono" style={{ fontSize: 8, color: 'var(--bg)', fontWeight: 700, letterSpacing: 2 }}>RANKED</span>
                  </div>
                </div>

                <div className="section-heading text-center mb-0.5" style={{ fontSize: 15, letterSpacing: 3 }}>VIGNESHWARAN</div>
                <div className="label text-center mb-4" style={{ fontSize: 9, letterSpacing: 2, color: 'var(--cyan)' }}>DS & ML ENGINEER</div>

                {/* Stat bars */}
                <div className="w-full space-y-3">
                  {STATS.map(s => (
                    <div key={s.label}>
                      <div className="flex justify-between mb-1">
                        <span className="font-mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: 2 }}>{s.label}</span>
                        <span className="font-mono" style={{ fontSize: 9, color: 'var(--cyan)' }}>{s.val}</span>
                      </div>
                      <div className="stat-bar">
                        <motion.div className="stat-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${s.val}%` }}
                          transition={{ duration: 1.6, delay: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tag chips */}
                <div className="flex flex-wrap gap-1.5 mt-4 justify-center">
                  {['PYTHON', 'ML', 'AI', 'ESPORTS'].map(t => (
                    <span key={t} className="chip" style={{ fontSize: 9, padding: '3px 7px' }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center px-5 pb-4 pt-2"
                style={{ borderTop: '1px solid var(--border)' }}>
                <span className="font-mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: 2 }}>LA JOLLA · CA</span>
                <span className="label" style={{ fontSize: 9, color: 'var(--cyan)', opacity: 0.5 }}>ID: DOTE-001</span>
              </div>
            </div>

            {/* Below card label */}
            <motion.div className="flex items-center gap-2 mt-4 justify-center"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}>
              <div style={{ width: 24, height: 1, background: 'var(--cyan)' }} />
              <span className="label" style={{ fontSize: 8, letterSpacing: '5px' }}>PORTFOLIO v2.0</span>
              <div style={{ width: 24, height: 1, background: 'var(--cyan)' }} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-bounce">
        <span className="label" style={{ fontSize: 8, letterSpacing: '4px', opacity: 0.3 }}>SCROLL</span>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(180deg, var(--cyan), transparent)' }} />
      </div>
    </section>
  )
}
