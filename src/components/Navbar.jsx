import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const pos = window.scrollY + 140
      for (let i = NAV.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV[i].toLowerCase())
        if (el && el.offsetTop <= pos) { setActive(NAV[i]); break }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          padding: scrolled ? '10px 0' : '18px 0',
          background: scrolled ? 'rgba(4,13,20,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          transition: 'all 0.3s',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => scrollTo('home')} className="group flex items-center gap-3" style={{ cursor: 'none' }}>
            <div className="relative flex items-center justify-center clip-corner-sm"
              style={{ width: 34, height: 34, border: '1.5px solid var(--border-h)', transition: 'border-color 0.2s' }}>
              <span className="section-heading group-hover:text-[var(--orange)] transition-colors"
                style={{ fontSize: 14, color: 'var(--cyan)' }}>D</span>
            </div>
            <div>
              <div className="section-heading" style={{ fontSize: 13, letterSpacing: 3 }}>DOTE</div>
              <div className="label" style={{ fontSize: 8, letterSpacing: 3, opacity: 0.5, lineHeight: 1 }}>// PORTFOLIO</div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {NAV.map(item => (
              <button key={item} onClick={() => scrollTo(item)}
                className={`nav-link ${active === item ? 'active' : ''}`}
                style={{ cursor: 'none', fontSize: 11 }}>
                {item}
              </button>
            ))}
          </div>

          {/* Right: status dot + hire badge */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 clip-corner-sm"
              style={{ border: '1px solid rgba(0,255,135,0.25)', background: 'rgba(0,255,135,0.05)' }}>
              <motion.div className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--green)' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.8, repeat: Infinity }} />
              <span className="label" style={{ fontSize: 9, color: 'var(--green)', letterSpacing: '3px' }}>AVAILABLE</span>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden flex flex-col gap-1.5 p-2" style={{ cursor: 'none' }}
            onClick={() => setMenuOpen(!menuOpen)}>
            <motion.div className="w-5 h-0.5 bg-[var(--cyan)]" animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} />
            <motion.div className="w-5 h-0.5 bg-[var(--cyan)]" animate={{ opacity: menuOpen ? 0 : 1 }} />
            <motion.div className="w-5 h-0.5 bg-[var(--cyan)]" animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: 'rgba(4,13,20,0.98)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-7">
              {NAV.map((item, i) => (
                <motion.button key={item}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(item)}
                  className="section-heading"
                  style={{ fontSize: 28, cursor: 'none', letterSpacing: 4 }}>
                  {item}
                </motion.button>
              ))}
            </div>
            <div className="p-6 flex justify-end">
              <button onClick={() => setMenuOpen(false)} className="label" style={{ cursor: 'none' }}>[ CLOSE ]</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
