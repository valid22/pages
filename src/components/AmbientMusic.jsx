import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

// A minor pentatonic — game / cinematic feel
const ARP_NOTES  = [220, 261.63, 329.63, 392, 440, 523.25, 659.26]
const BASS_NOTES = [55, 55, 82.41, 55, 55, 73.42, 82.41, 55] // rhythmic A1/E2/D2 pattern
const BPM  = 78
const BEAT = 60 / BPM

export default function AmbientMusic() {
  const [playing, setPlaying] = useState(false)
  const ctxRef    = useRef(null)
  const masterRef = useRef(null)
  const timerRef  = useRef(null)
  const nextBeat  = useRef(0)
  const step      = useRef(0)

  // Schedule the next chunk of notes into the AudioContext timeline
  const schedule = useCallback(() => {
    const ctx    = ctxRef.current
    const master = masterRef.current
    if (!ctx || !master) return

    while (nextBeat.current < ctx.currentTime + 0.35) {
      const t = nextBeat.current
      const s = step.current

      // --- Bass hit (sawtooth → lowpass → envelope) ---
      const bassFreq = BASS_NOTES[s % BASS_NOTES.length]
      const bOsc  = ctx.createOscillator()
      const bGain = ctx.createGain()
      const bFilt = ctx.createBiquadFilter()
      bOsc.type             = 'sawtooth'
      bOsc.frequency.value  = bassFreq
      bFilt.type            = 'lowpass'
      bFilt.frequency.value = 220
      bGain.gain.setValueAtTime(0, t)
      bGain.gain.linearRampToValueAtTime(0.28, t + 0.015)
      bGain.gain.exponentialRampToValueAtTime(0.001, t + BEAT * 0.85)
      bOsc.connect(bFilt)
      bFilt.connect(bGain)
      bGain.connect(master)
      bOsc.start(t)
      bOsc.stop(t + BEAT)

      // --- Arp note every 2nd beat (triangle → bandpass → envelope) ---
      if (s % 2 === 0) {
        const arpFreq = ARP_NOTES[Math.floor(Math.random() * ARP_NOTES.length)]
        const aOsc  = ctx.createOscillator()
        const aGain = ctx.createGain()
        const aFilt = ctx.createBiquadFilter()
        aOsc.type             = 'triangle'
        aOsc.frequency.value  = arpFreq
        aFilt.type            = 'bandpass'
        aFilt.frequency.value = arpFreq
        aFilt.Q.value         = 3
        aGain.gain.setValueAtTime(0, t)
        aGain.gain.linearRampToValueAtTime(0.07, t + 0.01)
        aGain.gain.exponentialRampToValueAtTime(0.001, t + BEAT * 0.45)
        aOsc.connect(aFilt)
        aFilt.connect(aGain)
        aGain.connect(master)
        aOsc.start(t)
        aOsc.stop(t + BEAT)
      }

      nextBeat.current += BEAT
      step.current = (step.current + 1) % 16
    }

    timerRef.current = setTimeout(schedule, 120)
  }, [])

  const start = useCallback(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    ctxRef.current = ctx

    const master = ctx.createGain()
    master.gain.setValueAtTime(0, ctx.currentTime)
    master.gain.linearRampToValueAtTime(0.72, ctx.currentTime + 2.5)
    master.connect(ctx.destination)
    masterRef.current = master

    // Sustained pad — A minor chord (sine oscillators, very quiet)
    ;[110, 164.81, 220, 329.63].forEach(freq => {
      const osc  = ctx.createOscillator()
      const g    = ctx.createGain()
      const filt = ctx.createBiquadFilter()
      osc.type             = 'sine'
      osc.frequency.value  = freq
      osc.detune.value     = (Math.random() - 0.5) * 7
      filt.type            = 'lowpass'
      filt.frequency.value = 800
      g.gain.value         = 0.035
      osc.connect(filt)
      filt.connect(g)
      g.connect(master)
      osc.start()
    })

    // Slow LFO for breathing effect on pad (connected to a separate gain, not master)
    const padLfoOsc  = ctx.createOscillator()
    const padLfoGain = ctx.createGain()
    padLfoOsc.type             = 'sine'
    padLfoOsc.frequency.value  = 0.09
    padLfoGain.gain.value      = 0.006
    padLfoOsc.connect(padLfoGain)
    padLfoGain.connect(master.gain)
    padLfoOsc.start()

    nextBeat.current = ctx.currentTime + 0.05
    step.current     = 0
    schedule()
  }, [schedule])

  const stop = useCallback(() => {
    clearTimeout(timerRef.current)
    timerRef.current = null
    // Fade out quickly then close
    const ctx    = ctxRef.current
    const master = masterRef.current
    if (ctx && master) {
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime)
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4)
      setTimeout(() => {
        ctx.close()
        ctxRef.current    = null
        masterRef.current = null
      }, 500)
    }
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
      title={playing ? 'Mute BGM' : 'Play ambient BGM'}
      className="cursor-none flex items-center gap-2 transition-colors duration-300"
      style={{ color: playing ? '#C89B3C' : 'rgba(236,232,225,0.35)' }}
    >
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
      <span className="font-['Share_Tech_Mono'] text-[9px] tracking-[2px]">BGM</span>
    </motion.button>
  )
}
