import { motion } from 'framer-motion'

const LINKS = [
  { l: 'About',      id: 'about' },
  { l: 'Skills',     id: 'skills' },
  { l: 'Experience', id: 'experience' },
  { l: 'Projects',   id: 'projects' },
  { l: 'Contact',    id: 'contact' },
]

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'rgba(4,13,20,0.92)', padding: '32px 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center clip-corner-sm"
              style={{ width: 30, height: 30, border: '1px solid var(--border-h)' }}>
              <span className="section-heading" style={{ fontSize: 12, color: 'var(--cyan)' }}>D</span>
            </div>
            <div>
              <div className="section-heading" style={{ fontSize: 11, letterSpacing: 2 }}>VIGNESHWARAN SIVA SANKARAN</div>
              <div className="label" style={{ fontSize: 8, letterSpacing: '3px', opacity: 0.45, lineHeight: 1.3 }}>// DS & ML ENGINEER</div>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-5 justify-center">
            {LINKS.map(l => (
              <button key={l.id}
                onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' })}
                className="font-mono"
                style={{ fontSize: 9, letterSpacing: '2px', color: 'var(--muted)', cursor: 'none', transition: 'color 0.2s', textTransform: 'uppercase' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
                {l.l}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <div className="label" style={{ fontSize: 8, letterSpacing: '3px', opacity: 0.25 }}>
            © {new Date().getFullYear()} // ALL RIGHTS RESERVED
          </div>
        </div>

        {/* Divider dots */}
        <div className="flex items-center gap-2 justify-center mt-6">
          {[0, 1, 2, 3, 4].map(i => (
            <motion.div key={i} style={{ width: 4, height: 4, background: 'var(--cyan)', transform: 'rotate(45deg)' }}
              animate={{ opacity: [0.1, 0.45, 0.1] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.28 }} />
          ))}
        </div>

        {/* Built with line */}
        <motion.div className="text-center mt-4"
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 4, repeat: Infinity }}>
          <span className="label" style={{ fontSize: 8, letterSpacing: '5px', opacity: 1 }}>
            BUILT WITH REACT + VITE + PRETEXT
          </span>
        </motion.div>
      </div>
    </footer>
  )
}
