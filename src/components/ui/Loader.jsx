import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINES = [
  { t: '> INITIALIZING DOTE.WORLD v3.0...', c: '#00D4FF', d: 0 },
  { t: '> [NEURAL_ENGINE]........... OK',   c: '#00FF87', d: 200 },
  { t: '> [WORLD_RENDERER].......... OK',   c: '#00FF87', d: 380 },
  { t: '> [ESPORTS_CORE]............ OK',   c: '#00FF87', d: 540 },
  { t: '> [AGENTIC_AI_STACK]........ OK',   c: '#00FF87', d: 700 },
  { t: '> [PHYSICS_ENGINE].......... OK',   c: '#00FF87', d: 860 },
  { t: '> PLAYER: VIGNESHWARAN SIVA SANKARAN', c: '#fff', d: 1040 },
  { t: '> STATUS: AVAILABLE FOR OPPORTUNITIES', c: '#FF5F1F', d: 1200 },
  { t: '> BOOT COMPLETE — ENTERING WORLD ✓', c: '#00D4FF', d: 1400, final: true },
]

export default function Loader({ onComplete }) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timers = LINES.map((l, i) => setTimeout(() => setStep(i + 1), l.d))
    const fin = setTimeout(() => {
      setDone(true)
      setTimeout(onComplete, 600)
    }, 1900)
    return () => { timers.forEach(clearTimeout); clearTimeout(fin) }
  }, [onComplete])

  const pct = done ? 100 : Math.round((step / LINES.length) * 100)

  return (
    <motion.div className="loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}>
      <div className="loader-term">
        {LINES.slice(0, step).map((l, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.08 }}
            style={{ color: l.color || l.c, marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
            {l.t}
            {i === step - 1 && !done && (
              <motion.span
                style={{ display: 'inline-block', width: 7, height: 13, background: '#00D4FF', marginLeft: 2 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }} />
            )}
          </motion.div>
        ))}
      </div>

      <div className="loader-bar">
        <motion.div className="loader-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3 }} />
      </div>

      <div style={{ marginTop: 16, fontFamily: "'Share Tech Mono', monospace", fontSize: 9,
        letterSpacing: '8px', color: 'rgba(0,212,255,0.25)', textTransform: 'uppercase' }}>
        DOTE.WORLD — PORTFOLIO
      </div>
    </motion.div>
  )
}
