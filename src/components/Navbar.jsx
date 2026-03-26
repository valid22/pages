import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AmbientMusic from './AmbientMusic'

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
          background: scrolled ? 'rgba(6, 10, 16, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(34, 211, 238, 0.1)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-3 group cursor-none"
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 border border-[#22D3EE] group-hover:border-[#FB923C] transition-colors duration-300"
                style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
              />
              <span className="absolute inset-0 flex items-center justify-center font-['Rajdhani'] font-bold text-sm text-[#22D3EE] group-hover:text-[#FB923C] transition-colors">D</span>
            </div>
            <div>
              <div className="font-['Rajdhani'] font-bold text-sm text-[#ECE8E1] tracking-[2px] leading-none">DOTE</div>
              <div className="font-['Share_Tech_Mono'] text-[9px] text-[#22D3EE] tracking-[3px] leading-none">// DEV</div>
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
            <AmbientMusic />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden cursor-none flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.div
              className="w-6 h-0.5 bg-[#22D3EE]"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-[#22D3EE]"
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-[#22D3EE]"
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
            style={{ background: 'rgba(6, 10, 16, 0.98)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col items-center justify-center flex-1 gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(item)}
                  className="font-['Rajdhani'] text-3xl font-bold text-[#ECE8E1] hover:text-[#22D3EE] transition-colors tracking-widest uppercase"
                >
                  {item}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4"
              >
                <AmbientMusic />
              </motion.div>
            </div>
            {/* Close button */}
            <div className="p-6 flex justify-end">
              <button
                onClick={() => setMenuOpen(false)}
                className="font-['Share_Tech_Mono'] text-xs text-[#22D3EE] tracking-widest"
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
