/**
 * HeroCanvas — keyword grid background using @chenglou/pretext
 * pretext lets us measure text dimensions precisely on canvas
 * without triggering DOM reflows, enabling perfect tiling.
 */
import { useEffect, useRef } from 'react'

// AI/ML + Esports keyword universe
const KEYWORDS = [
  'PYTORCH', 'LANGCHAIN', 'TRANSFORMER', 'RAG', 'AGENTIC-AI', 'LLM',
  'SKLEARN', 'CNN', 'LSTM', 'GLICKO-2', 'ELO', 'SBMM', 'VALORANT',
  'MMELO', 'SPARK', 'POLARS', 'FASTAPI', 'DOCKER', 'AWS', 'CUPED',
  'A/B TEST', 'BAYESIAN', 'PYSPARK', 'PANDAS', 'TENSORFLOW', 'LLAMA',
  'CS2', 'CHESS', 'ESPORTS', 'WIN-PROB', 'SMURF', 'KILL-PREDICT',
  'CLUSTER', 'UCSD', 'RSKD', 'DRIFT', 'CI/CD', 'GEMINI', 'GPT-4',
  'CLAUDE', 'RLHF', 'REWARD', 'CALIBRATE', 'MC-DROPOUT', 'LATENCY',
  'INFERENCE', 'EMBEDDING', 'VECTOR-DB', 'TPU', 'MIXED-PRECISION',
]

const FONT = '11px "Share Tech Mono", monospace'
const PAD_X = 28
const PAD_Y = 22
const BASE_OPACITY = 0.032
const GLOW_OPACITY = 0.09

export default function HeroCanvas() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Dynamically import pretext — falls back gracefully if unavailable
    let cells = []

    const buildGrid = async () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      ctx.font = FONT

      // Build tiled grid using canvas measureText (pretext-compatible approach)
      // pretext is used here for precise width measurements
      let pretextAvail = false
      let ptPrepare, ptMeasure

      try {
        const pt = await import('@chenglou/pretext')
        ptPrepare = pt.prepare
        ptMeasure = pt.measureNaturalWidth
        pretextAvail = true
      } catch {
        // Graceful fallback to canvas measureText
      }

      cells = []
      let y = 0
      let kwIndex = 0

      while (y < canvas.height + PAD_Y) {
        let x = 0
        while (x < canvas.width + 60) {
          const kw = KEYWORDS[kwIndex % KEYWORDS.length]
          kwIndex++

          // Measure width: prefer pretext (no DOM reflow), fallback to canvas
          let w
          if (pretextAvail) {
            try {
              const prepared = ptPrepare(kw, FONT)
              w = ptMeasure(prepared)
            } catch {
              w = ctx.measureText(kw).width
            }
          } else {
            w = ctx.measureText(kw).width
          }

          // Slightly randomize position within cell for organic look
          const jitterX = (Math.random() - 0.5) * 6
          const jitterY = (Math.random() - 0.5) * 4
          const isGlow = Math.random() < 0.06 // 6% chance of "glowing" word

          cells.push({ kw, x: x + jitterX, y: y + jitterY, w, isGlow })
          x += w + PAD_X
        }
        y += PAD_Y
      }
    }

    // Drift offset
    let offset = 0

    const draw = () => {
      if (!canvas.width) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = FONT

      const drift = offset % (PAD_Y * 2)

      for (const cell of cells) {
        const drawY = cell.y - drift
        // Only draw cells in visible range
        if (drawY < -PAD_Y || drawY > canvas.height + PAD_Y) continue

        const opacity = cell.isGlow ? GLOW_OPACITY : BASE_OPACITY
        ctx.fillStyle = `rgba(0, 212, 255, ${opacity})`
        ctx.fillText(cell.kw, cell.x, drawY)
      }

      offset += 0.18
      animRef.current = requestAnimationFrame(draw)
    }

    buildGrid().then(() => {
      animRef.current = requestAnimationFrame(draw)
    })

    const handleResize = () => {
      cancelAnimationFrame(animRef.current)
      buildGrid().then(() => {
        animRef.current = requestAnimationFrame(draw)
      })
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
