import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'

const floatingShapes = [
  { size: 6, x: '10%', y: '20%', delay: 0, color: '#FF4655' },
  { size: 4, x: '85%', y: '30%', delay: 1, color: '#C89B3C' },
  { size: 8, x: '75%', y: '70%', delay: 2, color: '#FF4655' },
  { size: 3, x: '20%', y: '75%', delay: 0.5, color: '#C89B3C' },
  { size: 5, x: '50%', y: '15%', delay: 1.5, color: '#7B73FF' },
  { size: 4, x: '90%', y: '60%', delay: 2.5, color: '#FF4655' },
]

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #060b10 0%, #070D12 50%, #07111a 100%)' }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large diagonal line */}
        <div
          className="absolute"
          style={{
            width: '200vw',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,70,85,0.15), transparent)',
            top: '35%',
            left: '-50%',
            transform: 'rotate(-15deg)',
          }}
        />
        <div
          className="absolute"
          style={{
            width: '200vw',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(200,155,60,0.1), transparent)',
            top: '65%',
            left: '-50%',
            transform: 'rotate(-15deg)',
          }}
        />

        {/* Corner frame top-left */}
        <div className="absolute top-6 left-6 md:top-12 md:left-12">
          <div className="w-16 h-16 border-t-2 border-l-2 border-[#FF4655] opacity-30" />
        </div>
        {/* Corner frame bottom-right */}
        <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12">
          <div className="w-16 h-16 border-b-2 border-r-2 border-[#FF4655] opacity-30" />
        </div>
        {/* Corner frame top-right */}
        <div className="absolute top-6 right-6 md:top-12 md:right-12">
          <div className="w-10 h-10 border-t border-r border-[#C89B3C] opacity-20" />
        </div>
        {/* Corner frame bottom-left */}
        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
          <div className="w-10 h-10 border-b border-l border-[#C89B3C] opacity-20" />
        </div>

        {/* Floating geometric shapes */}
        {floatingShapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
              background: shape.color,
              opacity: 0.4,
              transform: 'rotate(45deg)',
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.6, 0.2],
              rotate: [45, 90, 45],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: shape.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Right side decorative vertical line */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(255,70,85,0.3), transparent)' }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">

          {/* Left: Text content */}
          <div className="flex-1 text-left">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex items-center gap-2 px-3 py-1.5"
                style={{
                  background: 'rgba(255, 70, 85, 0.1)',
                  border: '1px solid rgba(255, 70, 85, 0.3)',
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                }}
              >
                <div className="w-2 h-2 bg-[#00D4AA] rounded-full" style={{ boxShadow: '0 0 6px #00D4AA' }} />
                <span className="font-['Share_Tech_Mono'] text-xs text-[#ECE8E1] tracking-[3px]">AGENT // ONLINE</span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-[rgba(255,70,85,0.3)] to-transparent" />
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-3"
            >
              <p className="font-['Share_Tech_Mono'] text-xs text-[#FF4655] tracking-[6px] mb-3">CODENAME: DOTE</p>
              <h1
                className="font-['Rajdhani'] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#ECE8E1] tracking-tight leading-none glitch-text"
                data-text="VIGNESHWARAN"
                style={{ textShadow: '0 0 40px rgba(255,70,85,0.2)' }}
              >
                VIGNESHWARAN
              </h1>
              <h2 className="font-['Rajdhani'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
                style={{ color: '#FF4655' }}
              >
                SIVA SANKARAN
              </h2>
            </motion.div>

            {/* Role typing animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="font-['Share_Tech_Mono'] text-[#FF4655] text-sm">{'>'}</span>
                <TypeAnimation
                  sequence={[
                    'ML Engineer',
                    2000,
                    'Data Scientist',
                    2000,
                    'AI Engineer',
                    2000,
                    'Research Engineer',
                    2000,
                    'Data Engineer',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="font-['Rajdhani'] text-xl sm:text-2xl font-semibold text-[#ECE8E1] tracking-widest"
                />
                <span className="w-0.5 h-6 bg-[#FF4655] inline-block" style={{ animation: 'blink 1s step-start infinite' }} />
              </div>
              <p className="font-['Inter'] text-sm sm:text-base text-[rgba(236,232,225,0.6)] max-w-lg leading-relaxed mt-4">
                Building intelligent systems across ML, AI, and data. Based in{' '}
                <span className="text-[#FF4655]">La Jolla, CA</span> — from model pipelines to agentic AI.
              </p>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="val-btn"
              >
                View Projects
              </button>
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="font-['Rajdhani'] font-semibold text-sm tracking-[3px] text-[rgba(236,232,225,0.7)] hover:text-[#ECE8E1] transition-colors uppercase cursor-none flex items-center gap-2"
              >
                <span className="text-[#FF4655]">{'>'}</span>
                Contact Me
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-12 flex flex-wrap gap-6 sm:gap-10"
            >
              {[
                { label: 'ML / AI Projects', value: '6+' },
                { label: 'Yrs Industry Exp.', value: '2+' },
                { label: 'Location', value: 'LA JOLLA' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="font-['Rajdhani'] text-2xl sm:text-3xl font-bold text-[#FF4655]">{stat.value}</div>
                  <div className="font-['Share_Tech_Mono'] text-[10px] text-[rgba(236,232,225,0.4)] tracking-[2px] uppercase mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Agent card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 100 }}
            className="hidden lg:flex flex-col items-center"
            style={{
              transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
              transition: 'transform 0.1s ease',
            }}
          >
            {/* Agent card */}
            <div
              className="relative w-64 xl:w-72"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
                background: 'rgba(27, 36, 46, 0.7)',
                border: '1px solid rgba(255, 70, 85, 0.3)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Card header */}
              <div className="px-5 pt-4 pb-3 border-b border-[rgba(255,70,85,0.15)]">
                <div className="flex items-center justify-between">
                  <span className="font-['Share_Tech_Mono'] text-[10px] text-[#FF4655] tracking-[3px]">AGENT CARD</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#FF4655] opacity-60" style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }} />
                    <div className="w-2 h-2 bg-[#C89B3C] opacity-60" style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }} />
                  </div>
                </div>
              </div>

              {/* Avatar placeholder with animated border */}
              <div className="px-5 py-6 flex flex-col items-center">
                <div className="relative mb-4">
                  <motion.div
                    className="w-28 h-28 rounded-none flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #1B242E, #0F1923)',
                      clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                      border: '1px solid rgba(255, 70, 85, 0.4)',
                    }}
                    animate={{ boxShadow: ['0 0 10px rgba(255,70,85,0.2)', '0 0 30px rgba(255,70,85,0.5)', '0 0 10px rgba(255,70,85,0.2)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {/* VS monogram */}
                    <span className="font-['Rajdhani'] text-5xl font-bold text-[#FF4655] opacity-80">D</span>
                  </motion.div>
                  {/* Rank badge */}
                  <div
                    className="absolute -bottom-2 -right-2 px-2 py-0.5"
                    style={{
                      background: '#C89B3C',
                      clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%)',
                    }}
                  >
                    <span className="font-['Share_Tech_Mono'] text-[9px] text-[#070D12] font-bold tracking-wider">RADIANT</span>
                  </div>
                </div>

                <h3 className="font-['Rajdhani'] text-lg font-bold text-[#ECE8E1] tracking-widest text-center">
                  VIGNESHWARAN
                </h3>
                <p className="font-['Share_Tech_Mono'] text-[10px] text-[#FF4655] tracking-[2px] mb-5">DS & ML ENGINEER</p>

                {/* Stats */}
                <div className="w-full space-y-2">
                  {[
                    { label: 'PERFORMANCE', val: 95 },
                    { label: 'PRECISION', val: 90 },
                    { label: 'ADAPTABILITY', val: 88 },
                  ].map(s => (
                    <div key={s.label}>
                      <div className="flex justify-between mb-1">
                        <span className="font-['Share_Tech_Mono'] text-[9px] text-[rgba(236,232,225,0.5)] tracking-widest">{s.label}</span>
                        <span className="font-['Share_Tech_Mono'] text-[9px] text-[#FF4655]">{s.val}</span>
                      </div>
                      <div className="h-0.5 bg-[rgba(255,70,85,0.1)] relative overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#FF4655] to-[#C89B3C]"
                          initial={{ width: 0 }}
                          animate={{ width: `${s.val}%` }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4 justify-center">
                  {['PYTHON', 'ML', 'AI', 'DATA'].map(tag => (
                    <span
                      key={tag}
                      className="font-['Share_Tech_Mono'] text-[9px] text-[#FF4655] tracking-wider px-2 py-0.5"
                      style={{
                        border: '1px solid rgba(255, 70, 85, 0.3)',
                        background: 'rgba(255, 70, 85, 0.05)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card footer */}
              <div className="px-5 pb-4 pt-2 border-t border-[rgba(255,70,85,0.1)] flex justify-between items-center">
                <span className="font-['Share_Tech_Mono'] text-[9px] text-[rgba(236,232,225,0.3)]">LA JOLLA // CA</span>
                <span className="font-['Share_Tech_Mono'] text-[9px] text-[rgba(255,70,85,0.5)]">ID:DOTE-001</span>
              </div>
            </div>

            {/* Floating accent */}
            <motion.div
              className="mt-4 flex items-center gap-2"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-8 h-px bg-[#FF4655]" />
              <span className="font-['Share_Tech_Mono'] text-[9px] text-[#FF4655] tracking-[4px]">PORTFOLIO v2.0</span>
              <div className="w-8 h-px bg-[#FF4655]" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="font-['Share_Tech_Mono'] text-[9px] text-[rgba(236,232,225,0.3)] tracking-[4px]">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#FF4655] to-transparent" />
      </motion.div>
    </section>
  )
}
