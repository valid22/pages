import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef()
  const ringRef = useRef()
  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const [hov, setHov] = useState(false)
  const [click, setClick] = useState(false)
  const raf = useRef()

  useEffect(() => {
    if (window.innerWidth <= 768) return

    const move = e => { pos.current = { x: e.clientX, y: e.clientY } }
    const over  = e => { if (e.target.closest('a,button,[data-hover]')) setHov(true) }
    const out   = e => { if (e.target.closest('a,button,[data-hover]')) setHov(false) }
    const dn    = () => setClick(true)
    const up    = () => setClick(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', dn)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)

    const tick = () => {
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px,${pos.current.y - 4}px)`
      ring.current.x += (pos.current.x - ring.current.x) * 0.1
      ring.current.y += (pos.current.y - ring.current.y) * 0.1
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px,${ring.current.y - 20}px)`
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', dn)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const color = hov ? '#FF5F1F' : '#00D4FF'

  return (
    <div className="cursor">
      <div ref={dotRef} style={{
        position: 'fixed', width: 8, height: 8, borderRadius: '50%',
        background: color, boxShadow: `0 0 10px ${color}`,
        transform: `scale(${click ? 0.5 : 1})`,
        transition: 'background 0.2s, box-shadow 0.2s, transform 0.1s',
        willChange: 'transform', pointerEvents: 'none', zIndex: 9999,
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', width: 40, height: 40, pointerEvents: 'none', zIndex: 9998, willChange: 'transform',
      }}>
        {[[0,0,'tl',true,true,false,false],[0,'auto','tr',true,false,true,false],
          ['auto',0,'bl',false,true,false,true],['auto','auto','br',false,false,true,true]
        ].map(([t,r,k,bT,bL,bR,bB]) => (
          <div key={k} style={{
            position: 'absolute', top: t, right: r,
            bottom: r==='auto'?'auto':undefined, left: bL?0:undefined,
            width: hov ? 12 : 9, height: hov ? 12 : 9,
            borderTopWidth:    bT ? '1.5px' : 0,
            borderLeftWidth:   bL ? '1.5px' : 0,
            borderRightWidth:  bR ? '1.5px' : 0,
            borderBottomWidth: bB ? '1.5px' : 0,
            borderStyle: 'solid', borderColor: color, transition: 'all 0.18s',
          }} />
        ))}
      </div>
    </div>
  )
}
