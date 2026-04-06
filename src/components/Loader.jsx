import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const BOOT = [
  { text: '> INITIALIZING DOTE.SYS v2.0...', color: 'var(--cyan)', delay: 0 },
  { text: '> [NEURAL_ENGINE]........... OK', color: 'var(--green)', delay: 220 },
  { text: '> [ML_CORE]................. OK', color: 'var(--green)', delay: 400 },
  { text: '> [ESPORTS_ANALYTICS]....... OK', color: 'var(--green)', delay: 580 },
  { text: '> [AGENTIC_AI_STACK]........ OK', color: 'var(--green)', delay: 760 },
  { text: '> [TACTICAL_SYSTEMS]........ OK', color: 'var(--green)', delay: 920 },
  { text: '> USER: VIGNESHWARAN SIVA SANKARAN', color: '#E8F4F8', delay: 1100 },
  { text: '> ROLE: AI/ML ENGINEER // DS & ML', color: '#E8F4F8', delay: 1260 },
  { text: '> STATUS: AVAILABLE', color: 'var(--orange)', delay: 1420 },
  { text: '> BOOT SEQUENCE COMPLETE ✓', color: 'var(--cyan)', delay: 1620, final: true },
]

export default function Loader({ onComplete }) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timers = BOOT.map((line, i) =>
      setTimeout(() => setStep(i + 1), line.delay)
    )
    const finish = setTimeout(() => {
      setDone(true)
      setTimeout(onComplete, 500)
    }, 2000)

    return () => { timers.forEach(clearTimeout); clearTimeout(finish) }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'var(--bg)' }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45 }}
    >
      {/* Scanline on loader */}
      <div className="scanlines" />

      <div className="w-full max-w-lg px-6">
        {/* Terminal header */}
        <div style={{
          border: '1px solid var(--border)',
          background: 'rgba(8,20,31,0.9)',
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{
            borderBottom: '1px solid var(--border)',
            background: 'rgba(4,13,20,0.8)',
            padding: '10px 16px',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', opacity: 0.7 }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--orange)', opacity: 0.7 }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', opacity: 0.7 }} />
            <span className="font-mono label ml-2" style={{ opacity: 0.4, fontSize: 9 }}>
              dote@system:~$ boot
            </span>
          </div>

          {/* Boot lines */}
          <div style={{ padding: '20px 20px', minHeight: 240 }}>
            {BOOT.slice(0, step).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1 }}
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 12,
                  color: line.color,
                  letterSpacing: '0.05em',
                  marginBottom: 8,
                  display: 'flex', alignItems: 'center',
                }}
              >
                {line.text}
                {i === step - 1 && !done && (
                  <motion.span
                    style={{ display: 'inline-block', width: 7, height: 13, background: 'var(--cyan)', marginLeft: 4 }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 2, background: 'var(--bg-card)', marginTop: 12, overflow: 'hidden' }}>
          <motion.div
            style={{ height: '100%', background: 'linear-gradient(90deg, var(--cyan), var(--orange))', boxShadow: '0 0 8px var(--cyan)' }}
            initial={{ width: '0%' }}
            animate={{ width: done ? '100%' : `${(step / BOOT.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="label text-center mt-4" style={{ opacity: 0.3, letterSpacing: '8px', fontSize: 9 }}>
          DOTE.SYS PORTFOLIO
        </div>
      </div>
    </motion.div>
  )
}
