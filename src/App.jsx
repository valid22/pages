import { useState, Suspense, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence, motion } from 'framer-motion'
import { WorldContext } from './WorldContext'
import IntroScene from './components/IntroScene'
import ScrollScene from './components/ScrollScene'
import Effects from './components/Effects'
import Loader from './components/ui/Loader'
import Cursor from './components/ui/Cursor'
import InfoPanel from './components/ui/InfoPanel'
import { IntroHUD, ScrollHUD } from './components/ui/HUD'

export default function App() {
  const [phase, setPhase] = useState('loading')     // loading | intro | transitioning | scroll
  const [selected, setSelected] = useState(null)
  const [keys, setKeys] = useState({})
  const [scrollPct, setScrollPct] = useState(0)

  const handleLoaderDone = useCallback(() => setPhase('intro'), [])

  const handlePortalEnter = useCallback(() => {
    setPhase('transitioning')
    // After fade-out, switch to scroll and enable body scroll
    setTimeout(() => {
      document.body.classList.add('scroll-mode')
      setPhase('scroll')
    }, 900)
  }, [])

  const handleScrollChange = useCallback((t) => setScrollPct(t), [])

  return (
    <WorldContext.Provider value={{ selected, setSelected }}>
      <Cursor />

      {/* Boot loader */}
      <AnimatePresence>
        {phase === 'loading' && (
          <Loader onComplete={handleLoaderDone} />
        )}
      </AnimatePresence>

      {/* Transition overlay (fade to black on portal enter) */}
      <AnimatePresence>
        {phase === 'transitioning' && (
          <motion.div className="transition-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* Three.js canvas */}
      {phase !== 'loading' && (
        <div className="canvas-wrap">
          <Canvas
            camera={{ position: [0, 4, 8], fov: 65 }}
            gl={{ antialias: true, alpha: false }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              {(phase === 'intro' || phase === 'transitioning') && (
                <IntroScene
                  onTransition={handlePortalEnter}
                  onKeysChange={setKeys}
                />
              )}
              {phase === 'scroll' && (
                <ScrollScene onScrollChange={handleScrollChange} />
              )}
              <Effects />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* HUD overlay */}
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div key="intro-hud"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <IntroHUD keys={keys} />
          </motion.div>
        )}
        {phase === 'scroll' && (
          <motion.div key="scroll-hud"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ScrollHUD scrollPct={scrollPct} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info panel (slides in when artifact clicked) */}
      <AnimatePresence>
        {selected && <InfoPanel item={selected} />}
      </AnimatePresence>
    </WorldContext.Provider>
  )
}
