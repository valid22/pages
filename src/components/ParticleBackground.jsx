import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let mouse = { x: -1000, y: -1000 }
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', onMouse)

    // Particle class
    class Particle {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.baseX = this.x
        this.baseY = this.y
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.alpha = Math.random() * 0.5 + 0.1
        this.color = Math.random() > 0.7 ? '#22D3EE' : Math.random() > 0.5 ? '#FB923C' : '#ECE8E1'
        this.type = Math.random() > 0.8 ? 'diamond' : 'circle'
        this.pulse = Math.random() * Math.PI * 2
        this.pulseSpeed = 0.02 + Math.random() * 0.02
      }

      update() {
        this.pulse += this.pulseSpeed
        const pulseAlpha = this.alpha + Math.sin(this.pulse) * 0.1

        // Drift
        this.x += this.vx
        this.y += this.vy

        // Wrap
        if (this.x < -10) this.x = canvas.width + 10
        if (this.x > canvas.width + 10) this.x = -10
        if (this.y < -10) this.y = canvas.height + 10
        if (this.y > canvas.height + 10) this.y = -10

        // Mouse repulsion
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (120 - dist) / 120
          this.x += dx * force * 0.03
          this.y += dy * force * 0.03
        }

        // Draw
        ctx.save()
        ctx.globalAlpha = Math.max(0, Math.min(1, pulseAlpha))
        ctx.fillStyle = this.color

        if (this.type === 'diamond') {
          ctx.translate(this.x, this.y)
          ctx.rotate(Math.PI / 4)
          ctx.fillRect(-this.size, -this.size, this.size * 2, this.size * 2)
        } else {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }
    }

    // Grid lines
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.03)'
      ctx.lineWidth = 1
      const spacing = 80
      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    // Initialize particles
    const count = Math.min(80, Math.floor(window.innerWidth / 15))
    for (let i = 0; i < count; i++) {
      particles.push(new Particle())
    }

    // Connect nearby particles
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.save()
            ctx.globalAlpha = (1 - dist / 100) * 0.08
            ctx.strokeStyle = '#22D3EE'
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawGrid()
      connectParticles()
      particles.forEach(p => p.update())
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, opacity: 0.7 }}
    />
  )
}
