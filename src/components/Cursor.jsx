import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [clicking, setClicking] = useState(false)
  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const rafId = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return

    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY } }
    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)
    const onOver = (e) => { if (e.target.closest('a,button,[data-hover]')) setHovered(true) }
    const onOut = (e) => { if (e.target.closest('a,button,[data-hover]')) setHovered(false) }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px,${pos.current.y - 4}px)`
      }
      ring.current.x += (pos.current.x - ring.current.x) * 0.11
      ring.current.y += (pos.current.y - ring.current.y) * 0.11
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px,${ring.current.y - 20}px)`
      }
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  const cyan = 'var(--cyan)'
  const orange = 'var(--orange)'
  const color = hovered ? orange : cyan

  return (
    <div className="cursor-wrap">
      {/* Center dot */}
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none',
        width: 8, height: 8, borderRadius: '50%',
        background: color,
        boxShadow: `0 0 10px ${color}`,
        transform: clicking ? 'scale(0.5)' : 'scale(1)',
        transition: 'background 0.2s, box-shadow 0.2s, transform 0.1s',
        willChange: 'transform',
      }} />

      {/* Targeting brackets */}
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9998, pointerEvents: 'none',
        width: 40, height: 40,
        willChange: 'transform',
      }}>
        {/* 4 corner brackets */}
        {[
          { top: 0, left: 0, bT: true, bL: true },
          { top: 0, right: 0, bT: true, bR: true },
          { bottom: 0, left: 0, bB: true, bL: true },
          { bottom: 0, right: 0, bB: true, bR: true },
        ].map(({ bT, bL, bB, bR, ...pos }, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: hovered ? 12 : 9,
            height: hovered ? 12 : 9,
            transition: 'all 0.18s',
            ...pos,
            borderTopWidth:    bT ? '1.5px' : 0,
            borderLeftWidth:   bL ? '1.5px' : 0,
            borderBottomWidth: bB ? '1.5px' : 0,
            borderRightWidth:  bR ? '1.5px' : 0,
            borderStyle: 'solid',
            borderColor: color,
            opacity: 0.85,
          }} />
        ))}
        {/* Crosshair */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: clicking ? 28 : 18, height: 1,
          background: color, transform: 'translate(-50%,-50%)',
          opacity: 0.35, transition: 'all 0.15s',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 1, height: clicking ? 28 : 18,
          background: color, transform: 'translate(-50%,-50%)',
          opacity: 0.35, transition: 'all 0.15s',
        }} />
      </div>
    </div>
  )
}
