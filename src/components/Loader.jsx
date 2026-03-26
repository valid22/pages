import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const bootLines = [
  { text: 'booting portfolio v2.0',                              ok: false },
  { text: 'user  : vigneshwaran siva sankaran',                  ok: false },
  { text: 'role  : ds & ml engineer // la jolla, ca',           ok: false },
  { text: 'stack : python · pytorch · langchain · sql · aws',   ok: true  },
  { text: 'projects  [6 shipped]............... loading',        ok: true  },
  { text: 'experience [2yr+ industry].......... loading',        ok: true  },
  { text: 'status : available for new opportunities',            ok: false },
  { text: 'all systems ready.',                                  ok: false, ready: true },
]

const STEP = 210 // ms per line

export default function Loader({ onComplete }) {
  const [visible, setVisible] = useState(0)
  const [done, setDone]       = useState(false)

  useEffect(() => {
    const timers = bootLines.map((_, i) =>
      setTimeout(() => setVisible(i + 1), i * STEP)
    )
    const finish = setTimeout(() => {
      setDone(true)
      setTimeout(onComplete, 450)
    }, bootLines.length * STEP + 350)

    return () => { timers.forEach(clearTimeout); clearTimeout(finish) }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: '#060A10' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-xl px-8 md:px-0">
        {/* Terminal chrome */}
        <div
          className="rounded-none border border-[rgba(34,211,238,0.12)]"
          style={{ background: 'rgba(14,26,42,0.5)', backdropFilter: 'blur(10px)' }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(34,211,238,0.08)]"
            style={{ background: 'rgba(6,10,16,0.6)' }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#22D3EE] opacity-50" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FB923C] opacity-50" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#00D4AA] opacity-50" />
            <span className="font-['Share_Tech_Mono'] text-[10px] text-[rgba(34,211,238,0.35)] ml-3 tracking-widest">
              dote@portfolio:~
            </span>
          </div>

          {/* Boot output */}
          <div className="px-5 py-5 space-y-2 min-h-[220px]">
            {bootLines.slice(0, visible).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.12 }}
                className="flex items-center gap-2"
              >
                {/* Prompt */}
                <span
                  className="font-['Share_Tech_Mono'] text-xs flex-shrink-0"
                  style={{ color: line.ready ? '#00D4AA' : 'rgba(34,211,238,0.5)' }}
                >
                  {line.ready ? '✓' : '>'}
                </span>

                {/* Text */}
                <span
                  className="font-['Share_Tech_Mono'] text-xs flex-1"
                  style={{
                    color: line.ready
                      ? '#22D3EE'
                      : i === 0
                      ? 'rgba(236,232,225,0.9)'
                      : 'rgba(236,232,225,0.65)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {line.text}
                </span>

                {/* OK badge */}
                {line.ok && (
                  <span
                    className="font-['Share_Tech_Mono'] text-[9px] tracking-widest flex-shrink-0"
                    style={{ color: '#00D4AA' }}
                  >
                    [ OK ]
                  </span>
                )}

                {/* Blinking cursor on current line */}
                {i === visible - 1 && !done && (
                  <motion.span
                    className="inline-block w-[7px] h-[13px] flex-shrink-0"
                    style={{ background: '#22D3EE' }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Name below terminal */}
        <motion.p
          className="font-['Share_Tech_Mono'] text-[10px] text-center mt-4 tracking-[6px]"
          style={{ color: 'rgba(34,211,238,0.2)' }}
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          VIGNESHWARAN // PORTFOLIO
        </motion.p>
      </div>
    </motion.div>
  )
}
