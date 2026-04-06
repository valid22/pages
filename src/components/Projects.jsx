import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const PROJECTS = [
  {
    id: 'P-001',
    name: 'Skill Rating & Matchmaking',
    subtitle: 'Elo / Glicko-2 / DualMMR System with Rigorous Experimentation',
    desc: 'Implemented 5 rating systems from scratch (Elo, Glicko-2, Contrastive Skill Embedding, DualMMR, Performance-Weighted Elo) benchmarked on 10K synthetic 5v5 matches across 500 players; DualMMR mirrors VALORANT\'s hidden MMR and 27-tier rank architecture. Built greedy SBMM optimizer reducing mean skill disparity from 100.1 → 1.4 (99.53% variance drop). A/B experiment with SRM detection, CUPED, and power analysis yielded Cohen\'s d of 1.007, p=0.000, power=1.0. Deployed 4-signal smurf detection ensemble achieving 54.7% recall at 23.4% precision on 75 injected smurfs across an 80K+ match simulation.',
    metrics: ['Skill disparity 100.1 → 1.4 (99.53% reduction)', 'Cohen\'s d = 1.007, p < 0.0001, power = 1.0', 'Smurf detection: 54.7% recall at 23.4% precision'],
    tags: ['Python', 'PyTorch', 'Elo', 'Glicko-2', 'A/B Testing', 'CUPED'],
    color: 'var(--cyan)',
    type: 'PROJECT', year: '2026',
    github: 'https://github.com/valid22/project-skill',
    live: 'https://project-skills.itsdote.tech/',
  },
  {
    id: 'P-002',
    name: 'Cache-Aware Routing',
    subtitle: 'Distributed Inference Optimization PoC',
    desc: 'Cache-aware request routing PoC for multi-worker ML inference, improving average latency by 12.6× vs random routing under repeated-query workloads. Benchmarked hash/heuristic routing policies, achieving 100% cache efficiency. Analyzed hit-rate vs latency trade-offs under synthetic load.',
    metrics: ['12.6× latency improvement vs random routing', '100% cache efficiency achieved', 'Hash + heuristic routing policies benchmarked'],
    tags: ['Python', 'Distributed Systems', 'Benchmarking', 'Inference'],
    color: 'var(--purple)',
    type: 'RESEARCH', year: 'Feb 2026',
    github: 'https://github.com/valid22/cache-routing',
    live: null,
  },
  {
    id: 'P-003',
    name: 'AI-IaSS',
    subtitle: 'Agentic AI Infra Optimization — Hackathon Winner',
    desc: 'Goal-driven agentic AI system with multi-step planning, decision-making frameworks, validation guardrails, and tool integration (APIs, databases, structured retrieval). Orchestrated LLM workflows evaluating 100+ configurations per request, estimating 20–30% cost reduction. Integrated 50+ security rules and structured retrieval.',
    metrics: ['100+ config evaluation per request', '20–30% cost reduction estimate', '50+ security rules integrated'],
    tags: ['Python', 'LangChain', 'LLM Agents', 'RAG', 'AWS', 'SQL'],
    color: 'var(--orange)',
    type: 'HACKATHON', year: 'Jan 2026',
    github: 'https://github.com/valid22/SDx-v0',
    live: 'https://masda.itsdote.tech/',
  },
  {
    id: 'P-004',
    name: 'VALORANT Player Intelligence',
    subtitle: 'Behavioral Segmentation & Outcome Modeling',
    desc: 'Engineered 12+ per-player behavioral features (entry rate, support score, role entropy, KDA, headshot rate) from real VCT and public competitive match data. Applied global and role-conditioned unsupervised clustering; role-conditioned archetypes were more interpretable, revealing agent-behavior drift in public play. Trained calibrated win-probability models achieving ROC AUC 0.999 (pro) / 0.997 (public), improving Brier error 84% and 81% vs. static baselines.',
    metrics: ['ROC AUC 0.999 (pro) / 0.997 (public)', '84% / 81% Brier error improvement', '12+ behavioral features from VCT + public data'],
    tags: ['Python', 'scikit-learn', 'PyTorch', 'Streamlit', 'Clustering'],
    color: 'var(--purple)',
    type: 'PROJECT', year: '2025',
    github: 'https://github.com/valid22/valo-player-intel',
    live: 'https://project-intel.itsdote.tech/',
  },
  {
    id: 'P-005',
    name: 'RiboSense',
    subtitle: 'Large-Scale Training & Data Pipeline Optimization on TPU',
    desc: 'Scaled model training on 64-core Google TPU via batch/input-pipeline tuning, increasing throughput by 150% and reducing epoch time by 5×. Deduplicated sequences using CD-HIT (similarity 0.96) and parallel preprocessing, cutting preprocessing time by 40%. Achieved 0.98 AUC-ROC on sequence classification task.',
    metrics: ['150% throughput increase on 64-core TPU', '5× epoch time reduction', '0.98 AUC-ROC achieved'],
    tags: ['Python', 'TensorFlow', 'Google TPU', 'Mixed Precision', 'CD-HIT'],
    color: 'var(--green)',
    type: 'RESEARCH', year: 'Jul 2025',
    github: 'https://github.com/APalaniaLab/RiboSense',
    live: 'https://apalanialab.github.io/RiboSense/',
  },
  {
    id: 'P-006',
    name: 'LungeScape AI',
    subtitle: '4-Agent Medical Imaging System — Hackathon Finalist',
    desc: 'Goal-driven 4-agent healthcare AI system: X-ray reading, anomaly understanding, 3D model generation, and RAG-based diagnosis chat agents. Applied prompt engineering and LLM orchestration to detect pulmonary anomalies and deliver patient-facing clinical reasoning. Built hallucination risk evaluation pipeline.',
    metrics: ['4-agent multi-agent pipeline', 'Hallucination risk evaluation built-in', 'Structured 3D lung parameter output'],
    tags: ['Python', 'OpenAI API', 'Claude API', 'LangChain', 'Computer Vision'],
    color: 'var(--cyan)',
    type: 'HACKATHON', year: 'Feb 2026',
    github: null,
    live: null,
  },
]

const TYPE_BADGE = {
  PROJECT:  'badge-purple',
  RESEARCH: 'badge-green',
  HACKATHON: 'badge-orange',
}

function Card({ p, i, inView, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.09 }}
      onClick={onClick}
      data-hover
      className="clip-corner card relative overflow-hidden flex flex-col"
      style={{ cursor: 'none', height: '100%' }}>

      {/* Hover gradient overlay */}
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${p.color}10, transparent 65%)` }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* Top row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: 2 }}>{p.id}</span>
            <div style={{ width: 1, height: 12, background: p.color, opacity: 0.4 }} />
            <span className={`badge ${TYPE_BADGE[p.type]}`}>{p.type}</span>
          </div>
          <div className="flex items-center gap-1">
            <div style={{ width: 5, height: 5, background: p.color, transform: 'rotate(45deg)', opacity: 0.7 }} />
            <span className="font-mono" style={{ fontSize: 9, color: 'var(--muted)' }}>{p.year}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="section-heading mb-1 transition-colors duration-250"
          style={{ fontSize: 18 }}
          onMouseEnter={e => e.currentTarget.style.color = p.color}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
        >
          {p.name}
        </h3>
        <p style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 12, lineHeight: 1.4 }}>{p.subtitle}</p>

        {/* Brief description (truncated) */}
        <p style={{ fontSize: 12, color: 'rgba(232,244,248,0.58)', lineHeight: 1.65, marginBottom: 14,
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {p.desc}
        </p>

        {/* Metrics */}
        <div className="space-y-1.5 mb-4">
          {p.metrics.map((m, j) => (
            <div key={j} className="flex items-center gap-2">
              <div style={{ width: 4, height: 4, flexShrink: 0, background: p.color, transform: 'rotate(45deg)' }} />
              <span style={{ fontSize: 11, color: 'rgba(232,244,248,0.5)' }}>{m}</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto mb-3">
          {p.tags.slice(0, 4).map(t => (
            <span key={t} className="chip" style={{ fontSize: 9 }}>{t}</span>
          ))}
          {p.tags.length > 4 && (
            <span className="chip" style={{ fontSize: 9, opacity: 0.5 }}>+{p.tags.length - 4}</span>
          )}
        </div>

        {/* Click hint */}
        <div className="flex items-center gap-2 mt-1">
          <span className="font-mono" style={{ fontSize: 9, color: p.color, opacity: 0.6, letterSpacing: 2 }}>
            CLICK TO EXPAND
          </span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${p.color}30, transparent)` }} />
        </div>
      </div>

      {/* Corner accents */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: 14, height: 14,
        background: p.color, opacity: 0.2, clipPath: 'polygon(100% 0,100% 100%,0 0)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 10, height: 10,
        background: p.color, opacity: 0.12, clipPath: 'polygon(0 0,0 100%,100% 100%)' }} />
    </motion.div>
  )
}

function Modal({ p, onClose }) {
  return (
    <motion.div className="modal-backdrop" onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}>
      <motion.div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl clip-corner"
        style={{
          background: 'var(--bg-card)',
          border: `1px solid ${p.color}40`,
          maxHeight: '85vh',
          overflowY: 'auto',
          boxShadow: `0 0 60px ${p.color}15`,
        }}
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.25 }}>

        {/* Modal header */}
        <div className="sticky top-0 flex items-center justify-between px-6 py-4"
          style={{ background: 'rgba(8,20,31,0.96)', borderBottom: `1px solid ${p.color}20`, backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center gap-3">
            <span className="font-mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: 2 }}>{p.id}</span>
            <span className={`badge ${TYPE_BADGE[p.type]}`}>{p.type}</span>
            <span className="font-mono" style={{ fontSize: 9, color: 'var(--muted)' }}>{p.year}</span>
          </div>
          <button onClick={onClose} data-hover className="font-mono"
            style={{ fontSize: 10, color: 'var(--muted)', cursor: 'none', letterSpacing: 2, padding: '4px 8px',
              border: '1px solid var(--border)', background: 'transparent' }}>
            [ CLOSE ]
          </button>
        </div>

        {/* Modal body */}
        <div className="px-6 py-6">
          <h2 className="section-heading mb-1" style={{ fontSize: 26, color: p.color }}>{p.name}</h2>
          <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 20 }}>{p.subtitle}</p>

          {/* Description */}
          <div className="mb-6 px-4 py-4" style={{ background: 'rgba(0,0,0,0.2)', borderLeft: `2px solid ${p.color}` }}>
            <p style={{ fontSize: 13, color: 'rgba(232,244,248,0.75)', lineHeight: 1.75 }}>{p.desc}</p>
          </div>

          {/* Metrics */}
          <div className="mb-6">
            <div className="label mb-3" style={{ fontSize: 9, color: p.color, letterSpacing: '4px' }}>KEY METRICS</div>
            <div className="space-y-2">
              {p.metrics.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-3 clip-corner-sm"
                  style={{ background: `${p.color}08`, border: `1px solid ${p.color}20` }}>
                  <div style={{ width: 6, height: 6, flexShrink: 0, background: p.color, transform: 'rotate(45deg)' }} />
                  <span style={{ fontSize: 13, color: 'var(--text)' }}>{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full tags */}
          <div className="mb-6">
            <div className="label mb-3" style={{ fontSize: 9, letterSpacing: '4px', opacity: 0.5 }}>TECH STACK</div>
            <div className="flex flex-wrap gap-2">
              {p.tags.map(t => <span key={t} className="chip">{t}</span>)}
            </div>
          </div>

          {/* Links */}
          {(p.github || p.live) && (
            <div className="flex gap-4">
              {p.github && (
                <a href={p.github} target="_blank" rel="noreferrer" className="btn-primary" style={{ cursor: 'none' }}>
                  <span>GITHUB →</span>
                </a>
              )}
              {p.live && (
                <a href={p.live} target="_blank" rel="noreferrer" className="btn-ghost" style={{ cursor: 'none' }}>
                  LIVE DEMO
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const [selected, setSelected] = useState(null)

  return (
    <section id="projects" className="relative py-24 md:py-32"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(0,212,255,0.03), transparent 60%)' }}
      ref={ref}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14">
          <div className="label mb-2" style={{ opacity: 0.6 }}>// 04 — PROJECTS</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>SHIPPED SYSTEMS</h2>
          <div style={{ width: 56, height: 2, background: 'linear-gradient(90deg, var(--cyan), transparent)', marginTop: 10 }} />
          <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 12, maxWidth: 480 }}>
            ML systems, agentic AI, data science, gaming analytics, and distributed infrastructure.
            Click any card for full details.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {PROJECTS.map((p, i) => (
            <Card key={p.id} p={p} i={i} inView={inView} onClick={() => setSelected(p)} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center">
          <a href="https://linkedin.com/in/dote10110" target="_blank" rel="noreferrer" className="btn-primary" style={{ cursor: 'none' }}>
            <span>VIEW LINKEDIN</span>
            <span style={{ fontSize: 14 }}>→</span>
          </a>
        </motion.div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selected && <Modal p={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
