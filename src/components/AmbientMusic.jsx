import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function AmbientMusic() {
  const [playing, setPlaying] = useState(false)
  const audioCtxRef = useRef(null)
  const nodesRef = useRef({})

  const start = useCallback(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    audioCtxRef.current = ctx

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0, ctx.currentTime)
    masterGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2.5)
    masterGain.connect(ctx.destination)

    // Dark ambient drone frequencies (A1, E2, A2, E3)
    const freqs = [55, 82.41, 110, 164.81]
    const oscillators = freqs.map((freq, i) => {
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      osc.type = i % 2 === 0 ? 'sine' : 'triangle'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      osc.detune.setValueAtTime((Math.random() - 0.5) * 6, ctx.currentTime)

      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(500, ctx.currentTime)
      filter.Q.setValueAtTime(1, ctx.currentTime)

      gainNode.gain.setValueAtTime(0.25 / freqs.length, ctx.currentTime)

      osc.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(masterGain)
      osc.start()
      return osc
    })

    // Slow pulse LFO on master
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.type = 'sine'
    lfo.frequency.setValueAtTime(0.08, ctx.currentTime)
    lfoGain.gain.setValueAtTime(0.015, ctx.currentTime)
    lfo.connect(lfoGain)
    lfoGain.connect(masterGain.gain)
    lfo.start()

    nodesRef.current = { oscillators, masterGain, lfo }
  }, [])

  const stop = useCallback(() => {
    const ctx = audioCtxRef.current
    if (!ctx) return
    const { masterGain, oscillators, lfo } = nodesRef.current
    masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5)
    setTimeout(() => {
      oscillators?.forEach(o => { try { o.stop() } catch (_) {} })
      try { lfo?.stop() } catch (_) {}
      ctx.close()
      audioCtxRef.current = null
    }, 1600)
  }, [])

  const toggle = () => {
    if (playing) {
      stop()
      setPlaying(false)
    } else {
      start()
      setPlaying(true)
    }
  }

  const bars = [3, 5, 4, 6, 3]

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      title={playing ? 'Mute ambient' : 'Play ambient music'}
      className="cursor-none flex items-center gap-2 transition-colors duration-300"
      style={{ color: playing ? '#C89B3C' : 'rgba(236,232,225,0.35)' }}
    >
      {/* Sound bars */}
      <span className="flex items-end gap-[2px]" style={{ height: 14 }}>
        {bars.map((h, i) =>
          playing ? (
            <motion.span
              key={i}
              className="w-[2px] rounded-sm bg-[#C89B3C]"
              animate={{ height: [h, h * 2, h] }}
              transition={{ duration: 0.5 + i * 0.1, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
              style={{ display: 'inline-block' }}
            />
          ) : (
            <span
              key={i}
              className="w-[2px] rounded-sm"
              style={{ display: 'inline-block', height: h, background: 'rgba(236,232,225,0.35)' }}
            />
          )
        )}
      </span>
      <span className="font-['Share_Tech_Mono'] text-[9px] tracking-[2px]">
        {playing ? 'BGM' : 'BGM'}
      </span>
    </motion.button>
  )
}
