import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Loader from './components/ui/Loader'
import Cursor from './components/ui/Cursor'
import Navbar from './components/ui/Navbar'
import Background from './components/Background'
import Hero from './components/sections/Hero'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Education from './components/sections/Education'
import Esports from './components/sections/Esports'
import Contact from './components/sections/Contact'

export default function App() {
  const [loading, setLoading] = useState(true)
  const handleLoaderDone = useCallback(() => setLoading(false), [])

  return (
    <>
      <Cursor />
      <Background />

      <AnimatePresence>
        {loading && <Loader onComplete={handleLoaderDone} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <Experience />
            <Projects />
            <Skills />
            <Education />
            <Esports />
            <Contact />
          </main>
        </>
      )}
    </>
  )
}
