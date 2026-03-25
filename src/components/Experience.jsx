import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'Founding Innovation & Development Engineer',
    company: 'RSKD Labs Pvt Ltd.',
    period: 'Jul 2023 — Jun 2025',
    location: 'Chennai, India',
    type: 'Full-time',
    color: '#FF4655',
    highlights: [
      'Shipped production ML systems across defense (Indian Navy autonomous drone), edtech (LLM-driven learning paths), and CV (30 FPS real-time inference at 600ms) — owning end-to-end from data pipeline to deployment.',
      'Built multi-agent AI workflows (RAG + LLM + tool use) and optimized inference pipelines across 600k–800k records, cutting latency ~30% and increasing production value ~25%.',
    ],
    tags: ['Python', 'PyTorch', 'LangChain', 'RAG', 'AWS', 'Docker', 'CI/CD'],
  },
  {
    role: 'Member Technical Staff Intern',
    company: 'Zoho Corporation',
    period: 'Jan 2023 — May 2023',
    location: 'Kattankulathur, India',
    type: 'Internship',
    color: '#C89B3C',
    highlights: [
      'Staged A/B rollout of optimized payroll API across 1M+ users — cut load latency from 5s to 2s.',
      'Optimized SQL execution paths and data-access layers, reducing query time by 15% across payroll pipelines at tens-of-millions scale.',
    ],
    tags: ['SQL', 'A/B Testing', 'Python', 'Backend', 'ETL'],
  },
]

const education = [
  {
    degree: 'M.S. in Business Analytics',
    school: 'University of California, San Diego',
    period: 'Jul 2025 — Dec 2026',
    location: 'La Jolla, CA',
    note: 'Focus: ML, Agentic AI Systems & Data-Driven Decision Systems',
    color: '#00D4AA',
  },
  {
    degree: 'Diploma in Data Science & Programming',
    school: 'Indian Institute of Technology, Madras',
    period: 'Aug 2020 — Dec 2022',
    location: 'Chennai, India',
    note: '',
    color: '#7B73FF',
  },
  {
    degree: 'Bachelor of Technology',
    school: 'SASTRA University',
    period: 'Jun 2019 — May 2023',
    location: 'Thanjavur, India',
    note: '',
    color: '#C89B3C',
  },
]

function TimelineItem({ exp, index, inView }) {
  const isLeft = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative pl-8 mb-10 last:mb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: `linear-gradient(180deg, ${exp.color}, transparent)` }} />

      {/* Timeline dot */}
      <div
        className="absolute left-0 top-1.5 w-2.5 h-2.5 -translate-x-1/2"
        style={{
          background: exp.color,
          transform: 'translate(-50%, 0) rotate(45deg)',
          boxShadow: `0 0 10px ${exp.color}`,
        }}
      />

      {/* Card */}
      <div
        className="p-5 relative"
        style={{
          background: 'rgba(27, 36, 46, 0.5)',
          border: `1px solid ${exp.color}22`,
          borderLeft: `2px solid ${exp.color}44`,
          clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-['Rajdhani'] text-xl font-bold text-[#ECE8E1] tracking-wide">{exp.role}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-['Share_Tech_Mono'] text-sm" style={{ color: exp.color }}>{exp.company}</span>
              <span className="text-[rgba(236,232,225,0.3)] text-xs">|</span>
              <span className="font-['Share_Tech_Mono'] text-xs text-[rgba(236,232,225,0.4)]">{exp.location}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-['Share_Tech_Mono'] text-xs text-[rgba(236,232,225,0.5)]">{exp.period}</span>
            <span
              className="font-['Rajdhani'] text-[10px] font-bold tracking-widest px-2 py-0.5"
              style={{
                background: `${exp.color}15`,
                border: `1px solid ${exp.color}40`,
                color: exp.color,
              }}
            >
              {exp.type.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Highlights */}
        <ul className="space-y-2 mb-4">
          {exp.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 w-1 h-1 flex-shrink-0" style={{ background: exp.color, transform: 'rotate(45deg)' }} />
              <span className="font-['Inter'] text-xs text-[rgba(236,232,225,0.65)] leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {exp.tags.map(tag => (
            <span
              key={tag}
              className="font-['Share_Tech_Mono'] text-[9px] tracking-wider px-2 py-0.5"
              style={{
                color: exp.color,
                border: `1px solid ${exp.color}30`,
                background: `${exp.color}08`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-2">// 03 — HISTORY</p>
          <h2 className="section-title text-4xl md:text-5xl">CAREER LOG</h2>
          <div className="mt-3 w-20 h-0.5 bg-gradient-to-r from-[#FF4655] to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="font-['Share_Tech_Mono'] text-[10px] text-[rgba(255,70,85,0.5)] tracking-[4px] mb-8"
            >
              WORK EXPERIENCE // LOADED
            </motion.p>
            {experiences.map((exp, i) => (
              <TimelineItem key={i} exp={exp} index={i} inView={inView} />
            ))}
          </div>

          {/* Education & side panel */}
          <div className="lg:col-span-1">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="font-['Share_Tech_Mono'] text-[10px] text-[rgba(255,70,85,0.5)] tracking-[4px] mb-8"
            >
              TRAINING & EDUCATION
            </motion.p>

            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="mb-6 p-5 relative"
                style={{
                  background: 'rgba(27, 36, 46, 0.5)',
                  border: `1px solid ${edu.color}22`,
                  borderLeft: `2px solid ${edu.color}`,
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                }}
              >
                <span className="font-['Share_Tech_Mono'] text-[9px] tracking-[3px] mb-2 block" style={{ color: edu.color }}>
                  EDUCATION
                </span>
                <h4 className="font-['Rajdhani'] text-lg font-bold text-[#ECE8E1] tracking-wide">{edu.degree}</h4>
                <p className="font-['Share_Tech_Mono'] text-xs" style={{ color: edu.color }}>{edu.school}</p>
                <div className="flex justify-between mt-2">
                  <span className="font-['Inter'] text-xs text-[rgba(236,232,225,0.4)]">{edu.period}</span>
                  <span className="font-['Inter'] text-xs text-[rgba(236,232,225,0.4)]">{edu.location}</span>
                </div>
                {edu.note ? <p className="font-['Inter'] text-[11px] text-[rgba(236,232,225,0.4)] mt-1 leading-snug">{edu.note}</p> : null}
              </motion.div>
            ))}

            {/* Domains */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="p-5"
              style={{
                background: 'rgba(27, 36, 46, 0.5)',
                border: '1px solid rgba(200, 155, 60, 0.15)',
                borderLeft: '2px solid #C89B3C',
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              }}
            >
              <span className="font-['Share_Tech_Mono'] text-[9px] tracking-[3px] mb-3 block text-[#C89B3C]">
                DOMAIN INTERESTS
              </span>
              {[
                { name: 'Gaming & Esports Analytics', tag: 'Esports, Skill Rating, Analytics' },
                { name: 'Healthcare AI', tag: 'Medical Imaging, Agents' },
                { name: 'Autonomous Systems', tag: 'Drones, CV, Navigation' },
                { name: 'Infrastructure Optimization', tag: 'LLM Agents, Cost Modeling' },
              ].map((d, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <div className="font-['Rajdhani'] text-sm font-semibold text-[#ECE8E1]">{d.name}</div>
                  <div className="font-['Share_Tech_Mono'] text-[9px] text-[rgba(236,232,225,0.4)]">{d.tag}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
