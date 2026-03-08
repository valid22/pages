import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)

  const messages = [
    'INITIALIZING SYSTEM...',
    'LOADING AGENT DATA...',
    'ESTABLISHING CONNECTION...',
    'DEPLOYING PORTFOLIO...',
    'ACCESS GRANTED',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 8 + 2
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 800)
          return 100
        }
        setPhase(Math.floor(next / 25))
        return next
      })
    }, 80)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: '#070D12' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo / Agent icon */}
      <div className="mb-12 relative">
        <div className="w-24 h-24 relative">
          {/* Rotating rings */}
          <motion.div
            className="absolute inset-0 border border-[#FF4655]"
            style={{ borderRadius: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-3 border border-[#C89B3C] opacity-60"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-['Rajdhani'] font-bold text-2xl text-[#FF4655]">VS</span>
          </div>
          {/* Corner accents */}
          {[0,1,2,3].map(i => (
            <div
              key={i}
              className="absolute w-3 h-3 border-[#FF4655]"
              style={{
                borderTopWidth: i < 2 ? 2 : 0,
                borderBottomWidth: i >= 2 ? 2 : 0,
                borderLeftWidth: i % 2 === 0 ? 2 : 0,
                borderRightWidth: i % 2 === 1 ? 2 : 0,
                top: i < 2 ? -1 : 'auto',
                bottom: i >= 2 ? -1 : 'auto',
                left: i % 2 === 0 ? -1 : 'auto',
                right: i % 2 === 1 ? -1 : 'auto',
              }}
            />
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="mb-8 text-center">
        <h1 className="font-['Rajdhani'] text-2xl font-bold text-[#ECE8E1] tracking-[8px] uppercase mb-1">
          Vigneshwaran
        </h1>
        <p className="font-['Share_Tech_Mono'] text-xs text-[#FF4655] tracking-[4px]">
          // PORTFOLIO SYSTEM
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-64 mb-4">
        <div className="flex justify-between mb-2">
          <span className="font-['Share_Tech_Mono'] text-xs text-[#FF4655]">{messages[Math.min(phase, messages.length - 1)]}</span>
          <span className="font-['Share_Tech_Mono'] text-xs text-[#ECE8E1]">{Math.floor(progress)}%</span>
        </div>
        <div className="h-px bg-[#1B242E] relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FF4655] to-[#C89B3C]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
          {/* Shimmer */}
          <motion.div
            className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            animate={{ x: ['0%', '400%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        {/* Sub bars */}
        <div className="flex gap-1 mt-1">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="flex-1 h-0.5 transition-all duration-300"
              style={{
                background: i * 5 <= progress ? '#FF4655' : '#1B242E',
                opacity: i * 5 <= progress ? 1 : 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Random hex codes */}
      <div className="flex flex-col items-center gap-1">
        {[...Array(3)].map((_, i) => (
          <motion.p
            key={i}
            className="font-['Share_Tech_Mono'] text-[10px] text-[#FF4655] opacity-30"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          >
            {`0x${Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0')}`}
          </motion.p>
        ))}
      </div>
    </motion.div>
  )
}
