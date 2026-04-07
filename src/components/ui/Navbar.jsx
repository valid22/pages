import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const LINKS = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Education',  href: '#education' },
  { label: 'Esports',    href: '#esports' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{ borderBottomColor: scrolled ? 'rgba(0,212,255,0.18)' : 'rgba(0,212,255,0.08)' }}
    >
      <a href="#home" className="navbar-logo" style={{ textDecoration: 'none' }}>
        DOTE.WORLD
      </a>

      <ul className="navbar-links">
        {LINKS.map(l => (
          <li key={l.label}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>

      <a
        href="mailto:hi@itsdote.tech"
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 10,
          letterSpacing: '2px',
          color: 'var(--primary)',
          textDecoration: 'none',
          border: '1px solid rgba(0,212,255,0.3)',
          padding: '5px 14px',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => e.target.style.background = 'rgba(0,212,255,0.08)'}
        onMouseLeave={e => e.target.style.background = 'transparent'}
      >
        HIRE ME
      </a>
    </motion.nav>
  )
}
