import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const CATS = [
  {
    id: 'ml', idx: '01', label: 'ML & AI', sub: 'Deep learning, agents, LLM systems',
    color: 'var(--green)', skills: [
      { n: 'Agentic AI / LLM Orchestration', v: 88 },
      { n: 'PyTorch / TensorFlow',           v: 85 },
      { n: 'RAG / NLP / Prompt Engineering', v: 86 },
      { n: 'CNN / RNN / LSTM',               v: 83 },
      { n: 'MC Dropout / Model Calibration', v: 80 },
    ],
  },
  {
    id: 'ds', idx: '02', label: 'DATA SCIENCE', sub: 'Experimentation, stats, behavioral modeling',
    color: 'var(--purple)', skills: [
      { n: 'Feature Engineering / EDA',          v: 90 },
      { n: 'A/B Testing / CUPED / Power Analysis', v: 87 },
      { n: 'Statistical Inference / Bayesian',   v: 85 },
      { n: 'Skill Rating (Elo / Glicko-2)',       v: 82 },
      { n: 'Time Series Forecasting',             v: 78 },
    ],
  },
  {
    id: 'eng', idx: '03', label: 'ENGINEERING', sub: 'Pipelines, infra, production systems',
    color: 'var(--cyan)', skills: [
      { n: 'Python / SQL',                   v: 93 },
      { n: 'Spark (PySpark) / Polars',        v: 88 },
      { n: 'AWS / Docker / Kubernetes',       v: 85 },
      { n: 'CI/CD / ETL Pipelines',           v: 83 },
      { n: 'FastAPI / REST APIs',             v: 82 },
    ],
  },
  {
    id: 'fw', idx: '04', label: 'FRAMEWORKS', sub: 'ML stack, orchestration, data tooling',
    color: 'var(--orange)', skills: [
      { n: 'scikit-learn / Spark MLlib',  v: 87 },
      { n: 'LangChain / LlamaIndex',      v: 85 },
      { n: 'NumPy / Polars / Pandas',     v: 90 },
      { n: 'Linux / Bash / Git',          v: 85 },
      { n: 'C/C++ / Java / JavaScript',   v: 72 },
    ],
  },
]

const TOOLS = ['Python', 'SQL', 'PyTorch', 'Spark', 'LangChain', 'Jupyter', 'Git', 'Docker', 'AWS', 'VS Code', 'Pandas', 'FastAPI']

function Bar({ n, v, color, inView, delay }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'center' }}>
        <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 13, fontWeight: 500, color: 'rgba(232,244,248,0.85)' }}>{n}</span>
        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, color }}>{v}</span>
      </div>
      <div className="skill-track">
        <motion.div className="skill-fill"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${v}%` } : {}}
          transition={{ duration: 1.3, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [active, setActive] = useState('ml')
  const cat = CATS.find(c => c.id === active)

  return (
    <section id="skills" className="relative py-24 md:py-32"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(0,212,255,0.015), transparent)' }}
      ref={ref}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14">
          <div className="label mb-2" style={{ opacity: 0.6 }}>// 02 — ARSENAL</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>SKILLS & TOOLS</h2>
          <div style={{ width: 56, height: 2, background: 'linear-gradient(90deg, var(--cyan), transparent)', marginTop: 10 }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

          {/* ── Tab selector ── */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            {CATS.map((c, i) => {
              const isActive = active === c.id
              return (
                <motion.button key={c.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  onClick={() => setActive(c.id)}
                  style={{
                    cursor: 'none', textAlign: 'left',
                    padding: '14px 16px',
                    background: isActive ? `rgba(0,0,0,0.3)` : 'rgba(8,20,31,0.5)',
                    borderLeft: `2px solid ${isActive ? c.color : 'rgba(255,255,255,0.06)'}`,
                    clipPath: 'polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))',
                    position: 'relative', overflow: 'hidden',
                    transition: 'all 0.25s',
                  }}>
                  {isActive && (
                    <motion.div layoutId="skillTab" style={{
                      position: 'absolute', inset: 0,
                      background: `radial-gradient(ellipse at left, ${c.color}15, transparent 70%)`,
                    }} />
                  )}
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 3,
                        color: isActive ? c.color : 'rgba(232,244,248,0.7)', textTransform: 'uppercase' }}>{c.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2, fontFamily: "'Inter',sans-serif" }}>{c.sub}</div>
                    </div>
                    <span className="label" style={{ fontSize: 8, opacity: 0.4 }}>{c.idx}</span>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* ── Skill bars panel ── */}
          <motion.div key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-3 clip-corner card p-6 relative">

            <div className="flex items-center justify-between mb-6 pb-4"
              style={{ borderBottom: '1px solid var(--border)' }}>
              <span className="label" style={{ fontSize: 10, letterSpacing: '4px', color: cat.color }}>{cat.label}</span>
              <div style={{ width: 8, height: 8, background: cat.color, transform: 'rotate(45deg)',
                boxShadow: `0 0 8px ${cat.color}` }} />
            </div>

            {cat.skills.map((s, i) => (
              <Bar key={s.n} n={s.n} v={s.v} color={cat.color} inView={inView} delay={0.1 + i * 0.1} />
            ))}

            {/* Corner accent */}
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 14, height: 14,
              background: cat.color, opacity: 0.3,
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
          </motion.div>
        </div>

        {/* Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65 }}
          className="mt-12">
          <div className="label mb-4" style={{ fontSize: 9, letterSpacing: '4px', opacity: 0.55 }}>TOOLS & UTILITIES</div>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map((t, i) => (
              <motion.span key={t}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.05 }}
                className="chip">
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
