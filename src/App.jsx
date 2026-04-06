import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <Cursor />
      <div className="scanlines" />
      <div className="grid-overlay" />

      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <ScrollProgress />
          <div className="relative z-10">
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </div>
        </>
      )}
    </>
  )
}
