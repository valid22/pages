import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer
      className="relative py-10 mt-0"
      style={{
        borderTop: '1px solid rgba(255, 70, 85, 0.1)',
        background: 'rgba(7, 13, 18, 0.8)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 flex items-center justify-center"
              style={{
                border: '1px solid rgba(255, 70, 85, 0.3)',
                clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
              }}
            >
              <span className="font-['Rajdhani'] text-xs font-bold text-[#FF4655]">VS</span>
            </div>
            <div>
              <p className="font-['Rajdhani'] text-xs font-bold text-[#ECE8E1] tracking-[2px]">VIGNESHWARAN SIVA SANKARAN</p>
              <p className="font-['Share_Tech_Mono'] text-[9px] text-[rgba(255,70,85,0.5)] tracking-[3px]">
                // SOFTWARE ENGINEER
              </p>
            </div>
          </div>

          {/* Center */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-px bg-[rgba(255,70,85,0.3)]" />
            <motion.p
              className="font-['Share_Tech_Mono'] text-[9px] text-[rgba(236,232,225,0.2)] tracking-[3px]"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              BUILT WITH REACT + VITE
            </motion.p>
            <div className="w-6 h-px bg-[rgba(255,70,85,0.3)]" />
          </div>

          {/* Right */}
          <p className="font-['Share_Tech_Mono'] text-[9px] text-[rgba(236,232,225,0.2)] tracking-[3px]">
            © {new Date().getFullYear()} // ALL RIGHTS RESERVED
          </p>
        </div>

        {/* Bottom decoration */}
        <div className="mt-6 flex items-center gap-2 justify-center">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-[#FF4655]"
              style={{ transform: 'rotate(45deg)' }}
              animate={{ opacity: [0.1, 0.5, 0.1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </div>
    </footer>
  )
}
