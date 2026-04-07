import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function KeyHint({ label, active }) {
  return (
    <div className={`hud-key${active ? ' active' : ''}`}>{label}</div>
  )
}

export function IntroHUD({ keys }) {
  return (
    <AnimatePresence>
      <motion.div className="hud"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <div className="hud-controls">
          <div className="hud-key-grid">
            <div />
            <KeyHint label="W" active={keys.KeyW || keys.ArrowUp} />
            <div />
            <KeyHint label="A" active={keys.KeyA || keys.ArrowLeft} />
            <KeyHint label="S" active={keys.KeyS || keys.ArrowDown} />
            <KeyHint label="D" active={keys.KeyD || keys.ArrowRight} />
          </div>
          <div className="hud-label">Walk to the portal</div>
        </div>

        <div style={{
          position: 'absolute', top: 24, left: 24,
          fontFamily: "'Share Tech Mono', monospace", fontSize: 10,
          letterSpacing: '3px', color: 'rgba(0,212,255,0.5)',
        }}>
          // DOTE.WORLD v3.0
        </div>

        <div style={{
          position: 'absolute', top: 24, right: 24,
          fontFamily: "'Share Tech Mono', monospace", fontSize: 10,
          letterSpacing: '3px', color: 'rgba(0,212,255,0.5)',
          textAlign: 'right',
        }}>
          INTRO // RPG
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export function ScrollHUD({ scrollPct }) {
  const zone = scrollPct < 0.55
    ? 'THE LAB // PROFESSIONAL'
    : scrollPct < 0.88
    ? 'THE ARENA // PERSONAL'
    : 'CONTACT HUB'

  const zoneColor = scrollPct < 0.55 ? '#00D4FF' : scrollPct < 0.88 ? '#A78BFA' : '#00FF87'

  return (
    <motion.div className="hud"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>

      <div className="hud-zone" style={{ color: zoneColor }}>
        {zone}
        <div style={{ marginTop: 6, fontSize: 8, opacity: 0.5 }}>
          CLICK ARTIFACTS TO EXPLORE
        </div>
      </div>

      <div className="hud-progress">
        <div className="hud-progress-fill" style={{ height: `${scrollPct * 100}%` }} />
      </div>

      <div style={{
        position: 'absolute', top: 24, left: 24,
        fontFamily: "'Share Tech Mono', monospace", fontSize: 10,
        letterSpacing: '3px', color: 'rgba(0,212,255,0.4)',
      }}>
        // DOTE.WORLD v3.0
      </div>
    </motion.div>
  )
}
