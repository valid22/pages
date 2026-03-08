import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useState } from 'react'

const projects = [
  {
    id: 'P-001',
    name: 'LungeScape AI',
    subtitle: 'Medical Imaging Agentic System — Hackathon Finalist',
    description:
      'Goal-driven 4-agent healthcare AI system: X-ray reading, anomaly understanding, 3D model generation, and RAG-based diagnosis chat agents. Applied prompt engineering and LLM orchestration to detect pulmonary anomalies and deliver patient-facing clinical reasoning.',
    tags: ['Python', 'OpenAI API', 'Claude API', 'LangChain', 'Computer Vision'],
    color: '#FF4655',
    status: 'HACKATHON',
    year: 'Feb 2026',
    links: { github: null, live: null },
    features: ['4-agent multi-agent pipeline', 'Hallucination risk evaluation', 'Structured 3D lung parameter output'],
  },
  {
    id: 'P-002',
    name: 'AI-IaSS',
    subtitle: 'Agentic AI System for Infra Optimization — Hackathon Winner',
    description:
      'Goal-driven agentic AI system with multi-step planning, decision-making frameworks, validation guardrails, and tool integration (APIs, databases, structured retrieval). Orchestrated LLM workflows evaluating 100+ configurations per request, estimating 20–30% cost reduction.',
    tags: ['Python', 'LangChain', 'LLM Agents', 'RAG', 'AWS', 'SQL'],
    color: '#C89B3C',
    status: 'HACKATHON',
    year: 'Jan 2026',
    links: { github: null, live: null },
    features: ['100+ config evaluation per request', '50+ security rules integrated', '20–30% cost reduction estimate'],
  },
  {
    id: 'P-003',
    name: 'Cache-Aware Routing',
    subtitle: 'Distributed Inference Optimization',
    description:
      'Cache-aware request routing PoC for multi-worker ML inference, improving average latency by 12.6× vs random routing under repeated-query workloads. Benchmarked hash/heuristic routing policies, achieving 100% cache efficiency.',
    tags: ['Python', 'Distributed Systems', 'Benchmarking'],
    color: '#7B73FF',
    status: 'RESEARCH',
    year: 'Feb 2026',
    links: { github: null, live: null },
    features: ['12.6× latency improvement', '100% cache efficiency', 'Hit-rate vs latency trade-off analysis'],
  },
  {
    id: 'P-004',
    name: 'RiboSense',
    subtitle: 'Large-Scale Training & Data Pipeline Optimization',
    description:
      'Scaled model training on 64-core Google TPU via batch/input-pipeline tuning, increasing throughput by 150% and reducing epoch time by 5×. Deduplicated sequences using CD-HIT (similarity 0.96) and parallel preprocessing, cutting preprocessing time by 40%. Achieved 0.98 AUC-ROC.',
    tags: ['Python', 'TensorFlow', 'Google TPU', 'CD-HIT', 'Mixed Precision'],
    color: '#00D4AA',
    status: 'RESEARCH',
    year: 'Jul 2025',
    links: { github: null, live: null },
    features: ['150% throughput increase on 64-core TPU', '40% preprocessing time cut', '0.98 AUC-ROC'],
  },
  {
    id: 'P-005',
    name: 'Skill Rating & Matchmaking',
    subtitle: 'Elo / Glicko-2 System with Experimentation',
    description:
      'Implemented Elo and Glicko-2 rating systems with volatility and uncertainty tracking per player. Reduced win-probability calibration error by 8% vs static MMR baselines. Designed matchmaking optimizer reducing mean skill variance per match by 15% under 1K+ concurrent user load.',
    tags: ['Python', 'SQL', 'Elo', 'Glicko-2', 'A/B Testing', 'CUPED'],
    color: '#FF4655',
    status: 'PROJECT',
    year: '2026',
    links: { github: null, live: null },
    features: ['8% calibration error reduction', '15% skill variance improvement', 'Validated on 10K+ simulated matches'],
  },
  {
    id: 'P-006',
    name: 'VALORANT Player Intelligence',
    subtitle: 'Segmentation & Outcome Modeling',
    description:
      'Pulled live match data via public Riot API; engineered per-player behavioral features and applied unsupervised clustering to segment players into 5 distinct play-style archetypes across 10K+ matches. Built win-probability model improving calibration by 10% vs static rank-difference baseline.',
    tags: ['Python', 'Riot API', 'scikit-learn', 'Clustering', 'Win Probability'],
    color: '#7B73FF',
    status: 'PROJECT',
    year: '2025',
    links: { github: null, live: null },
    features: ['5 play-style archetypes identified', '10% calibration improvement', 'Reliability diagrams & Brier score'],
  },
]

const statusColors = {
  'HACKATHON': '#FF4655',
  'RESEARCH': '#00D4AA',
  'PROJECT': '#7B73FF',
}

function ProjectCard({ project, index, inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="h-full p-5 relative overflow-hidden transition-all duration-300 cursor-none"
        style={{
          background: hovered ? `${project.color}08` : 'rgba(27, 36, 46, 0.5)',
          border: `1px solid ${hovered ? project.color + '40' : 'rgba(255,255,255,0.05)'}`,
          clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
          backdropFilter: 'blur(10px)',
          boxShadow: hovered ? `0 0 30px ${project.color}15` : 'none',
        }}
      >
        {/* Card top */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className="font-['Share_Tech_Mono'] text-[9px] tracking-[2px] text-[rgba(236,232,225,0.3)]"
            >{project.id}</span>
            <div
              className="w-0.5 h-3"
              style={{ background: `${project.color}40` }}
            />
            <span
              className="font-['Share_Tech_Mono'] text-[9px] tracking-[2px] px-1.5 py-0.5"
              style={{
                color: statusColors[project.status] || '#ECE8E1',
                border: `1px solid ${statusColors[project.status] || '#ECE8E1'}30`,
                background: `${statusColors[project.status] || '#ECE8E1'}08`,
              }}
            >
              {project.status}
            </span>
          </div>
          {/* Year */}
          <div className="flex items-center gap-1">
            <div className="w-2 h-2" style={{ background: project.color, transform: 'rotate(45deg)', opacity: 0.7 }} />
            <span className="font-['Share_Tech_Mono'] text-[10px] text-[rgba(236,232,225,0.4)]">{project.year}</span>
          </div>
        </div>

        {/* Project name */}
        <h3
          className="font-['Rajdhani'] text-2xl font-bold tracking-wide mb-0.5 transition-colors duration-300"
          style={{ color: hovered ? project.color : '#ECE8E1' }}
        >
          {project.name}
        </h3>
        <p className="font-['Inter'] text-xs text-[rgba(236,232,225,0.4)] mb-3 tracking-wide">{project.subtitle}</p>

        {/* Description */}
        <p className="font-['Inter'] text-xs text-[rgba(236,232,225,0.6)] leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Features */}
        <div className="space-y-1 mb-4">
          {project.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1 h-1 flex-shrink-0" style={{ background: project.color, transform: 'rotate(45deg)' }} />
              <span className="font-['Inter'] text-[11px] text-[rgba(236,232,225,0.5)]">{f}</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="font-['Share_Tech_Mono'] text-[9px] tracking-wider px-1.5 py-0.5"
              style={{
                color: project.color,
                border: `1px solid ${project.color}25`,
                background: `${project.color}05`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 mt-auto">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-['Share_Tech_Mono'] text-[10px] tracking-[2px] text-[rgba(236,232,225,0.4)] hover:text-[#ECE8E1] transition-colors flex items-center gap-1 cursor-none"
            >
              <span style={{ color: project.color }}>{'>'}</span> GITHUB
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="font-['Share_Tech_Mono'] text-[10px] tracking-[2px] flex items-center gap-1 transition-colors cursor-none"
              style={{ color: project.color }}
            >
              <span>{'>'}</span> LIVE DEMO
            </a>
          )}
        </div>

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-4 h-4"
          style={{ background: project.color, opacity: hovered ? 0.4 : 0.15 }}
          animate={{ opacity: hovered ? 0.4 : 0.15 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-4 h-4"
          style={{ background: project.color, opacity: hovered ? 0.2 : 0.05 }}
        />
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,70,85,0.05) 0%, transparent 70%)',
        }}
      />
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-2">// 04 — INTEL</p>
          <h2 className="section-title text-4xl md:text-5xl">TACTICAL OPERATIONS</h2>
          <div className="mt-3 w-20 h-0.5 bg-gradient-to-r from-[#FF4655] to-transparent" />
          <p className="font-['Inter'] text-sm text-[rgba(236,232,225,0.5)] mt-4 max-w-xl">
            A selection of projects across ML systems, agentic AI, data science, gaming analytics, and distributed infrastructure.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a
            href="https://linkedin.com/in/dote10110"
            target="_blank"
            rel="noreferrer"
            className="val-btn inline-block"
          >
            View on LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  )
}
