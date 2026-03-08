import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const posRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const isMobile = window.innerWidth <= 768
    if (isMobile) return

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }

    const animate = () => {
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.12
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPosRef.current.x}px`
        ringRef.current.style.top = `${ringPosRef.current.y}px`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    const onEnter = () => setIsHovering(true)
    const onLeave = () => setIsHovering(false)
    const onDown = () => setIsClicking(true)
    const onUp = () => setIsClicking(false)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    const interactiveEls = document.querySelectorAll('a, button, [data-hover]')
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Main dot */}
      <div
        ref={dotRef}
        className="custom-cursor"
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none' }}
      >
        <div
          className="cursor-dot"
          style={{
            width: isClicking ? '4px' : isHovering ? '12px' : '8px',
            height: isClicking ? '4px' : isHovering ? '12px' : '8px',
            background: isHovering ? '#ECE8E1' : '#FF4655',
            borderRadius: '50%',
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.15s ease, height 0.15s ease, background 0.15s ease',
          }}
        />
      </div>

      {/* Ring / crosshair */}
      <div
        ref={ringRef}
        className="custom-cursor"
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 9998, pointerEvents: 'none' }}
      >
        {/* Crosshair ring */}
        <div
          style={{
            width: isHovering ? '48px' : isClicking ? '20px' : '32px',
            height: isHovering ? '48px' : isClicking ? '20px' : '32px',
            border: `1.5px solid ${isHovering ? '#ECE8E1' : '#FF4655'}`,
            position: 'absolute',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            transition: 'all 0.2s ease',
            opacity: isClicking ? 1 : 0.7,
          }}
        />
        {/* Crosshair lines */}
        <div style={{
          width: isHovering ? '0' : '10px',
          height: '1px',
          background: '#FF4655',
          position: 'absolute',
          top: '0',
          left: '-20px',
          transform: 'translateY(-50%)',
          transition: 'width 0.2s ease',
          opacity: 0.6,
        }} />
        <div style={{
          width: isHovering ? '0' : '10px',
          height: '1px',
          background: '#FF4655',
          position: 'absolute',
          top: '0',
          right: '-20px',
          transform: 'translateY(-50%)',
          transition: 'width 0.2s ease',
          opacity: 0.6,
        }} />
        <div style={{
          width: '1px',
          height: isHovering ? '0' : '10px',
          background: '#FF4655',
          position: 'absolute',
          left: '0',
          top: '-20px',
          transform: 'translateX(-50%)',
          transition: 'height 0.2s ease',
          opacity: 0.6,
        }} />
        <div style={{
          width: '1px',
          height: isHovering ? '0' : '10px',
          background: '#FF4655',
          position: 'absolute',
          left: '0',
          bottom: '-20px',
          transform: 'translateX(-50%)',
          transition: 'height 0.2s ease',
          opacity: 0.6,
        }} />
      </div>
    </>
  )
}
