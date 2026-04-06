import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const EXP = [
  {
    role: 'Founding Innovation & Development Engineer',
    company: 'RSKD Labs Pvt Ltd.',
    period: 'Jul 2023 — Jun 2025',
    location: 'Chennai, India',
    type: 'FULL-TIME',
    color: 'var(--cyan)',
    highlights: [
      'Shipped production ML systems across defense (Indian Navy autonomous drone), edtech (LLM-driven learning paths), and CV (30 FPS real-time inference at 600ms) — end-to-end from data pipeline to deployment.',
      'Built multi-agent AI workflows (RAG + LLM + tool use) and optimized inference pipelines across 600k–800k records, cutting latency ~30% and increasing production value ~25%.',
    ],
    tags: ['Python', 'PyTorch', 'LangChain', 'RAG', 'AWS', 'Docker', 'CI/CD'],
  },
  {
    role: 'Member Technical Staff Intern',
    company: 'Zoho Corporation',
    period: 'Jan 2023 — May 2023',
    location: 'Kattankulathur, India',
    type: 'INTERNSHIP',
    color: 'var(--orange)',
    highlights: [
      'Staged A/B rollout of optimized payroll API across 1M+ users — cut load latency from 5s to 2s.',
      'Optimized SQL execution paths and data-access layers, reducing query time by 15% across payroll pipelines at tens-of-millions scale.',
    ],
    tags: ['SQL', 'A/B Testing', 'Python', 'Backend', 'ETL'],
  },
]

const EDU = [
  {
    degree: 'M.S. in Business Analytics',
    school: 'UC San Diego',
    period: 'Jul 2025 — Dec 2026',
    location: 'La Jolla, CA',
    note: 'ML, Agentic AI, Data-Driven Decision Systems',
    color: 'var(--green)',
  },
  {
    degree: 'Diploma in Data Science & Programming',
    school: 'IIT Madras',
    period: 'Aug 2020 — Dec 2022',
    location: 'Chennai, India',
    note: '',
    color: 'var(--purple)',
  },
  {
    degree: 'Bachelor of Technology',
    school: 'SASTRA University',
    period: 'Jun 2019 — May 2023',
    location: 'Thanjavur, India',
    note: '',
    color: 'var(--orange)',
  },
]

const DOMAINS = [
  { n: 'Gaming & Esports Analytics', t: 'Skill Rating · SBMM · Analytics' },
  { n: 'Healthcare AI',               t: 'Medical Imaging · Agents · RAG' },
  { n: 'Autonomous Systems',          t: 'Drones · CV · Navigation' },
  { n: 'Infra Optimization',          t: 'LLM Agents · Cost Modeling' },
]

function ExpCard({ exp, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.18 }}
      className="relative pl-8 mb-8 last:mb-0">

      {/* Vertical timeline line */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 1,
        background: `linear-gradient(180deg, ${exp.color}, transparent)`,
      }} />

      {/* Diamond dot */}
      <div style={{
        position: 'absolute', left: 0, top: 6,
        width: 10, height: 10,
        background: exp.color,
        transform: 'translate(-50%, 0) rotate(45deg)',
        boxShadow: `0 0 10px ${exp.color}`,
      }} />

      {/* Card */}
      <div className="clip-corner card p-5 relative">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="section-heading" style={{ fontSize: 18 }}>{exp.role}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono" style={{ fontSize: 12, color: exp.color }}>{exp.company}</span>
              <span style={{ color: 'var(--muted)', fontSize: 10 }}>·</span>
              <span className="font-mono" style={{ fontSize: 10, color: 'var(--muted)' }}>{exp.location}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="font-mono" style={{ fontSize: 10, color: 'var(--muted)' }}>{exp.period}</span>
            <span className="badge badge-cyan" style={{ color: exp.color, borderColor: exp.color + '50', background: exp.color + '15' }}>
              {exp.type}
            </span>
          </div>
        </div>

        {/* Highlights */}
        <ul className="space-y-2 mb-4">
          {exp.highlights.map((h, j) => (
            <li key={j} className="flex items-start gap-2">
              <span style={{ marginTop: 6, width: 5, height: 5, flexShrink: 0, background: exp.color, transform: 'rotate(45deg)' }} />
              <span style={{ fontSize: 13, color: 'rgba(232,244,248,0.65)', lineHeight: 1.6 }}>{h}</span>
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {exp.tags.map(t => (
            <span key={t} className="chip" style={{ fontSize: 9, color: exp.color, borderColor: exp.color + '40' }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="experience" className="relative py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14">
          <div className="label mb-2" style={{ opacity: 0.6 }}>// 03 — HISTORY</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>CAREER LOG</h2>
          <div style={{ width: 56, height: 2, background: 'linear-gradient(90deg, var(--cyan), transparent)', marginTop: 10 }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">

          {/* ── Experience timeline ── */}
          <div className="lg:col-span-2">
            <div className="label mb-8" style={{ fontSize: 9, letterSpacing: '4px', opacity: 0.5 }}>
              WORK EXPERIENCE // LOADED
            </div>
            {EXP.map((e, i) => <ExpCard key={i} exp={e} i={i} inView={inView} />)}
          </div>

          {/* ── Right sidebar ── */}
          <div className="lg:col-span-1">
            {/* Education */}
            <div className="label mb-6" style={{ fontSize: 9, letterSpacing: '4px', opacity: 0.5 }}>
              TRAINING & EDUCATION
            </div>
            {EDU.map((e, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 28 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.14 }}
                className="mb-4 p-4 clip-corner-sm"
                style={{ background: 'var(--bg-card)', borderLeft: `2px solid ${e.color}`, border: `1px solid ${e.color}20` }}>
                <div className="label mb-1" style={{ fontSize: 8, color: e.color, letterSpacing: '3px' }}>EDUCATION</div>
                <div className="section-heading" style={{ fontSize: 14, marginBottom: 2 }}>{e.degree}</div>
                <div className="font-mono" style={{ fontSize: 11, color: e.color }}>{e.school}</div>
                <div className="flex justify-between mt-2">
                  <span style={{ fontSize: 10, color: 'var(--muted)' }}>{e.period}</span>
                  <span style={{ fontSize: 10, color: 'var(--muted)' }}>{e.location}</span>
                </div>
                {e.note && <p style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4, lineHeight: 1.5 }}>{e.note}</p>}
              </motion.div>
            ))}

            {/* Domain interests */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.75 }}
              className="p-4 mt-4 clip-corner-sm"
              style={{ background: 'var(--bg-card)', borderLeft: '2px solid var(--orange)', border: '1px solid rgba(255,95,31,0.15)' }}>
              <div className="label mb-3" style={{ fontSize: 8, color: 'var(--orange)', letterSpacing: '3px' }}>DOMAIN INTERESTS</div>
              {DOMAINS.map((d, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <div className="font-head" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{d.n}</div>
                  <div className="font-mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: 1 }}>{d.t}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
