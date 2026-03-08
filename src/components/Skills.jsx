import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useState } from 'react'

const skillCategories = [
  {
    id: 'frontend',
    label: 'SOVA // FRONTEND',
    icon: '⬡',
    color: '#7B73FF',
    description: 'Precision-built UIs with surgical accuracy',
    skills: [
      { name: 'React / Next.js', level: 92 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Three.js / WebGL', level: 70 },
      { name: 'Redux / Zustand', level: 82 },
    ],
  },
  {
    id: 'backend',
    label: 'BREACH // BACKEND',
    icon: '◈',
    color: '#FF4655',
    description: 'Powerful server-side systems built to scale',
    skills: [
      { name: 'Python / FastAPI', level: 90 },
      { name: 'Node.js / Express', level: 85 },
      { name: 'PostgreSQL / MySQL', level: 82 },
      { name: 'MongoDB / Redis', level: 78 },
      { name: 'REST / GraphQL', level: 88 },
    ],
  },
  {
    id: 'cloud',
    label: 'OMEN // CLOUD & DEVOPS',
    icon: '⬟',
    color: '#C89B3C',
    description: 'Shadow infrastructure across cloud platforms',
    skills: [
      { name: 'AWS (EC2/S3/Lambda)', level: 85 },
      { name: 'Docker / Kubernetes', level: 78 },
      { name: 'CI/CD (GitHub Actions)', level: 82 },
      { name: 'Terraform / IaC', level: 72 },
      { name: 'Linux / Bash', level: 85 },
    ],
  },
  {
    id: 'ml',
    label: 'CYPHER // AI & DATA',
    icon: '◇',
    color: '#00D4AA',
    description: 'Intelligence gathering through data & models',
    skills: [
      { name: 'PyTorch / TensorFlow', level: 75 },
      { name: 'Scikit-learn / Pandas', level: 82 },
      { name: 'LLM / Prompt Eng.', level: 78 },
      { name: 'Data Pipelines (ETL)', level: 80 },
      { name: 'Computer Vision', level: 70 },
    ],
  },
]

const tools = ['Git', 'VS Code', 'Postman', 'Figma', 'Jira', 'Notion', 'Slack', 'Jupyter']

function SkillBar({ name, level, color, inView, delay }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1.5 items-center">
        <span className="font-['Rajdhani'] text-sm font-medium text-[rgba(236,232,225,0.8)]">{name}</span>
        <span className="font-['Share_Tech_Mono'] text-[10px]" style={{ color }}>{level}</span>
      </div>
      <div className="h-0.5 bg-[rgba(255,255,255,0.05)] relative overflow-hidden">
        <motion.div
          className="h-full absolute top-0 left-0"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [activeCategory, setActiveCategory] = useState('frontend')
  const active = skillCategories.find(c => c.id === activeCategory)

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(15,25,35,0.5), transparent)',
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
          <p className="section-label mb-2">// 02 — LOADOUT</p>
          <h2 className="section-title text-4xl md:text-5xl">ABILITIES & SKILLS</h2>
          <div className="mt-3 w-20 h-0.5 bg-gradient-to-r from-[#FF4655] to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Category selector — agent abilities style */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            {skillCategories.map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                onClick={() => setActiveCategory(cat.id)}
                className="text-left p-4 transition-all duration-300 relative overflow-hidden cursor-none"
                style={{
                  background: activeCategory === cat.id
                    ? `rgba(${cat.color === '#FF4655' ? '255,70,85' : cat.color === '#7B73FF' ? '123,115,255' : cat.color === '#C89B3C' ? '200,155,60' : '0,212,170'}, 0.1)`
                    : 'rgba(27, 36, 46, 0.4)',
                  borderLeft: `2px solid ${activeCategory === cat.id ? cat.color : 'rgba(255,255,255,0.05)'}`,
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                }}
              >
                {/* Active indicator */}
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeSkill"
                    className="absolute inset-0 opacity-5"
                    style={{ background: cat.color }}
                  />
                )}
                <div className="flex items-center gap-3">
                  <span className="text-xl" style={{ color: cat.color }}>{cat.icon}</span>
                  <div>
                    <div className="font-['Rajdhani'] font-bold text-sm text-[#ECE8E1] tracking-widest leading-tight">
                      {cat.label}
                    </div>
                    <div className="font-['Inter'] text-xs text-[rgba(236,232,225,0.4)] mt-0.5 leading-tight">
                      {cat.description}
                    </div>
                  </div>
                </div>
                {/* Key indicator */}
                <div
                  className="absolute top-2 right-3 font-['Share_Tech_Mono'] text-[9px] tracking-widest"
                  style={{ color: cat.color, opacity: 0.5 }}
                >
                  {['Q', 'E', 'C', 'X'][i]}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Skill bars panel */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-3 p-6 relative"
            style={{
              background: 'rgba(27, 36, 46, 0.5)',
              border: '1px solid rgba(255, 70, 85, 0.1)',
              backdropFilter: 'blur(10px)',
              clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
            }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between mb-6 pb-3" style={{ borderBottom: '1px solid rgba(255,70,85,0.1)' }}>
              <span className="font-['Share_Tech_Mono'] text-[10px] tracking-[3px]" style={{ color: active.color }}>
                {active.label}
              </span>
              <div className="w-2 h-2" style={{ background: active.color, transform: 'rotate(45deg)', boxShadow: `0 0 8px ${active.color}` }} />
            </div>

            {/* Skills */}
            <div>
              {active.skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={active.color}
                  inView={inView}
                  delay={0.1 + i * 0.12}
                />
              ))}
            </div>

            {/* Corner decoration */}
            <div
              className="absolute bottom-0 right-0 w-4 h-4"
              style={{ background: active.color, opacity: 0.3, clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
            />
          </motion.div>
        </div>

        {/* Tools / Tech */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12"
        >
          <p className="font-['Share_Tech_Mono'] text-[10px] text-[rgba(255,70,85,0.6)] tracking-[4px] mb-4">
            TOOLS & UTILITIES
          </p>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.05 }}
                className="font-['Rajdhani'] text-sm font-semibold text-[rgba(236,232,225,0.6)] hover:text-[#FF4655] transition-colors tracking-wider px-3 py-1.5 cursor-none"
                style={{
                  background: 'rgba(27, 36, 46, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
