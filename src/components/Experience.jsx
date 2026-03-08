import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'Software Engineer',
    company: 'Company Name',
    period: '2023 — Present',
    location: 'San Diego, CA',
    type: 'Full-time',
    color: '#FF4655',
    highlights: [
      'Architected and deployed scalable microservices handling 10k+ req/s using Python and FastAPI',
      'Led frontend development of React dashboards, reducing load time by 40%',
      'Implemented CI/CD pipelines with GitHub Actions and Docker, cutting deploy time by 60%',
      'Collaborated with cross-functional teams in an Agile environment',
    ],
    tags: ['Python', 'React', 'FastAPI', 'Docker', 'AWS'],
  },
  {
    role: 'Software Engineering Intern',
    company: 'Tech Company',
    period: 'Summer 2022',
    location: 'Remote',
    type: 'Internship',
    color: '#C89B3C',
    highlights: [
      'Built RESTful APIs with Node.js and Express serving 50k+ daily active users',
      'Designed and optimized PostgreSQL schemas, improving query performance by 35%',
      'Developed responsive React components and integrated with backend APIs',
      'Participated in code reviews and engineering best practices discussions',
    ],
    tags: ['Node.js', 'React', 'PostgreSQL', 'Express', 'REST'],
  },
  {
    role: 'Research Assistant',
    company: 'University Lab',
    period: '2021 — 2022',
    location: 'San Diego, CA',
    type: 'Part-time',
    color: '#7B73FF',
    highlights: [
      'Conducted ML research on computer vision models for real-time object detection',
      'Implemented and benchmarked models using PyTorch, achieving 15% accuracy improvement',
      'Authored technical documentation and presented findings to research group',
      'Contributed to published paper on deep learning applications',
    ],
    tags: ['PyTorch', 'Python', 'CV', 'ML', 'Research'],
  },
]

const education = [
  {
    degree: 'B.S. Computer Science',
    school: 'University of California',
    period: '2019 — 2023',
    location: 'San Diego, CA',
    gpa: '3.8 GPA',
    color: '#00D4AA',
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
          <p className="section-label mb-2">// 03 — MISSION LOG</p>
          <h2 className="section-title text-4xl md:text-5xl">OPERATIONS HISTORY</h2>
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
              WORK EXPERIENCE // CLASSIFIED
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
                  <span className="font-['Rajdhani'] text-sm font-bold" style={{ color: edu.color }}>{edu.gpa}</span>
                </div>
              </motion.div>
            ))}

            {/* Certifications */}
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
                CERTIFICATIONS
              </span>
              {[
                { name: 'AWS Cloud Practitioner', org: 'Amazon Web Services' },
                { name: 'Professional Scrum Master', org: 'Scrum.org' },
                { name: 'Meta React Developer', org: 'Meta' },
              ].map((cert, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <div className="font-['Rajdhani'] text-sm font-semibold text-[#ECE8E1]">{cert.name}</div>
                  <div className="font-['Share_Tech_Mono'] text-[9px] text-[rgba(236,232,225,0.4)]">{cert.org}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
