import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      // Determine active section
      const sections = navItems.map(n => document.getElementById(n.toLowerCase()))
      const scrollPos = window.scrollY + 120
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPos) {
          setActive(navItems[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        style={{
          background: scrolled ? 'rgba(7, 13, 18, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 70, 85, 0.1)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-3 group cursor-none"
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 border border-[#FF4655] group-hover:border-[#C89B3C] transition-colors duration-300"
                style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
              />
              <span className="absolute inset-0 flex items-center justify-center font-['Rajdhani'] font-bold text-sm text-[#FF4655] group-hover:text-[#C89B3C] transition-colors">VS</span>
            </div>
            <div>
              <div className="font-['Rajdhani'] font-bold text-sm text-[#ECE8E1] tracking-[2px] leading-none">VIGNESH</div>
              <div className="font-['Share_Tech_Mono'] text-[9px] text-[#FF4655] tracking-[3px] leading-none">// AGENT</div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`nav-link cursor-none ${active === item ? 'active' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="val-btn text-xs"
            >
              Resume
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden cursor-none flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.div
              className="w-6 h-0.5 bg-[#FF4655]"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-[#FF4655]"
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-[#FF4655]"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            />
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: 'rgba(7, 13, 18, 0.98)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col items-center justify-center flex-1 gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(item)}
                  className="font-['Rajdhani'] text-3xl font-bold text-[#ECE8E1] hover:text-[#FF4655] transition-colors tracking-widest uppercase"
                >
                  {item}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="val-btn mt-4"
              >
                Resume
              </motion.a>
            </div>
            {/* Close button */}
            <div className="p-6 flex justify-end">
              <button
                onClick={() => setMenuOpen(false)}
                className="font-['Share_Tech_Mono'] text-xs text-[#FF4655] tracking-widest"
              >
                [ CLOSE ]
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
