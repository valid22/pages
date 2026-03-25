import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const facts = [
  { label: 'LOCATION', value: 'La Jolla, CA' },
  { label: 'STATUS', value: 'Open to Opportunities' },
  { label: 'SPECIALIZATION', value: 'ML, AI & Data Science' },
  { label: 'EDUCATION', value: 'M.S. @ UCSD' },
]

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-0 top-0 bottom-0 w-px opacity-20"
          style={{ background: 'linear-gradient(180deg, transparent, #FF4655, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-px opacity-20"
          style={{ background: 'linear-gradient(180deg, transparent, #C89B3C, transparent)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-2">// 01 — ABOUT</p>
          <h2 className="section-title text-4xl md:text-5xl">THE PLAYER</h2>
          <div className="mt-3 w-20 h-0.5 bg-gradient-to-r from-[#FF4655] to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Mission briefing text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Terminal-style header */}
            <div
              className="px-4 py-2 mb-5 flex items-center gap-3"
              style={{
                background: 'rgba(255, 70, 85, 0.05)',
                borderLeft: '2px solid #FF4655',
              }}
            >
              <span className="font-['Share_Tech_Mono'] text-[10px] text-[#FF4655] tracking-[4px]">PLAYER BIO // LOADED</span>
            </div>

            <div className="space-y-5 font-['Inter'] text-[rgba(236,232,225,0.75)] leading-relaxed text-sm md:text-base">
              <p>
                I'm a <span className="text-[#FF4655] font-semibold">DS/AI/ML Engineer</span> with a track record
                of building and shipping intelligent systems across diverse domains — from defense-grade autonomous
                drones to healthcare imaging agents and esports analytics platforms.
              </p>
              <p>
                My work spans <span className="text-[#C89B3C]">agentic AI</span>,{' '}
                <span className="text-[#C89B3C]">LLM orchestration</span>,{' '}
                <span className="text-[#C89B3C]">statistical experimentation</span>, and{' '}
                <span className="text-[#C89B3C]">production ML pipelines</span>. I thrive at the intersection of
                rigorous data science and real-world engineering — building systems that reason, adapt, and scale.
              </p>
              <p>
                Currently pursuing an <span className="text-[#FF4655]">M.S. in Business Analytics at UCSD</span>,
                with a focus on Machine Learning, Agentic AI Systems, and Data-Driven Decision Systems.
              </p>
              <p>
                Off the clock I'm a competitive player — <span className="text-[#7B73FF]">Valorant</span>,{' '}
                <span className="text-[#7B73FF]">CS2</span>, and{' '}
                <span className="text-[#7B73FF]">Chess</span>. The same instincts — pattern recognition,
                decision-making under pressure, reading systems before others do — are what I bring to data and AI.
              </p>
            </div>

            {/* Facts grid */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {facts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="p-3"
                  style={{
                    background: 'rgba(27, 36, 46, 0.5)',
                    borderLeft: '1px solid rgba(255, 70, 85, 0.2)',
                    borderTop: '1px solid rgba(255, 70, 85, 0.1)',
                  }}
                >
                  <div className="font-['Share_Tech_Mono'] text-[9px] text-[rgba(255,70,85,0.6)] tracking-[3px] mb-1">{fact.label}</div>
                  <div className="font-['Rajdhani'] text-sm font-semibold text-[#ECE8E1] tracking-wide">{fact.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {[
                { label: 'LINKEDIN', href: 'https://linkedin.com/in/dote10110' },
                { label: 'EMAIL', href: 'mailto:hi@itsdote.tech' },
                { label: 'WEBSITE', href: 'https://itsdote.tech' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-['Share_Tech_Mono'] text-[10px] tracking-[3px] text-[rgba(236,232,225,0.5)] hover:text-[#FF4655] transition-colors flex items-center gap-2 cursor-none"
                >
                  <span className="text-[#FF4655]">{'>'}</span>
                  {link.label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Visual element */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Main box */}
              <div
                className="relative p-6"
                style={{
                  background: 'rgba(27, 36, 46, 0.6)',
                  border: '1px solid rgba(255, 70, 85, 0.2)',
                  clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-3" style={{ borderBottom: '1px solid rgba(255,70,85,0.1)' }}>
                  <span className="font-['Share_Tech_Mono'] text-[10px] text-[#FF4655] tracking-[3px]">PLAYER_PROFILE.exe</span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF4655] opacity-70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C89B3C] opacity-70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00D4AA] opacity-70" />
                  </div>
                </div>

                {/* Code-style content */}
                <div className="font-['Share_Tech_Mono'] text-xs space-y-2">
                  {[
                    { key: 'name', val: '"Vigneshwaran Siva Sankaran"', color: '#C89B3C' },
                    { key: 'role', val: '"DS & ML Engineer"', color: '#7B73FF' },
                    { key: 'location', val: '"La Jolla, CA"', color: '#C89B3C' },
                    { key: 'stack', val: '["Python", "PyTorch", "LangChain"]', color: '#00D4AA' },
                    { key: 'games', val: '["Valorant", "CS2", "Chess"]', color: '#7B73FF' },
                    { key: 'available', val: 'true', color: '#00D4AA' },
                    { key: 'focus', val: '"ML, Agentic AI & Data Science"', color: '#C89B3C' },
                  ].map((line, i) => (
                    <motion.div
                      key={line.key}
                      initial={{ opacity: 0, x: 10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.08 }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-[rgba(236,232,225,0.3)] min-w-4 text-right">{i + 1}</span>
                      <span className="text-[rgba(255,70,85,0.8)]">  {line.key}</span>
                      <span className="text-[rgba(236,232,225,0.4)]">:</span>
                      <span style={{ color: line.color }}>{line.val}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-full h-full bg-[#FF4655] opacity-20"
                    style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
                </div>
              </div>

              {/* Decorative floating element */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16"
                style={{
                  border: '1px solid rgba(200,155,60,0.2)',
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                }}
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-10 h-10"
                style={{ border: '1px solid rgba(255,70,85,0.2)' }}
                animate={{ rotate: [0, -90, -180, -270, -360] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
