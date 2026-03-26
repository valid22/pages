import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useState } from 'react'

const contactLinks = [
  {
    label: 'EMAIL',
    value: 'hi@itsdote.tech',
    href: 'mailto:hi@itsdote.tech',
    icon: '✉',
    color: '#22D3EE',
    desc: 'Direct line — fastest response',
  },
  {
    label: 'LINKEDIN',
    value: 'linkedin.com/in/dote10110',
    href: 'https://linkedin.com/in/dote10110',
    icon: '⬡',
    color: '#7B73FF',
    desc: 'Professional network',
  },
  {
    label: 'WEBSITE',
    value: 'itsdote.tech',
    href: 'https://itsdote.tech',
    icon: '◈',
    color: '#FB923C',
    desc: 'Portfolio & projects',
  },
]

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError(false)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '4e409044-554b-40b7-b3d2-9bda1c962aab',
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
        setFormState({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSent(false), 5000)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  const inputStyle = {
    background: 'rgba(14, 26, 42, 0.6)',
    border: '1px solid rgba(34, 211, 238, 0.15)',
    color: '#ECE8E1',
    outline: 'none',
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    width: '100%',
    padding: '12px 14px',
    transition: 'border-color 0.3s',
    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(34,211,238,0.05) 0%, transparent 60%)',
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
          <p className="section-label mb-2">// 05 — COMMS</p>
          <h2 className="section-title text-4xl md:text-5xl">ESTABLISH CONNECTION</h2>
          <div className="mt-3 w-20 h-0.5 bg-gradient-to-r from-[#22D3EE] to-transparent" />
          <p className="font-['Inter'] text-sm text-[rgba(236,232,225,0.5)] mt-4 max-w-lg">
            Ready to collaborate or just want to talk tech? Open comms — always ready to receive transmissions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <p className="font-['Share_Tech_Mono'] text-[10px] text-[rgba(34,211,238,0.5)] tracking-[4px] mb-2">
              COMMUNICATION CHANNELS
            </p>

            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="flex items-center gap-4 p-4 group cursor-none transition-all duration-300"
                style={{
                  background: 'rgba(14, 26, 42, 0.5)',
                  border: `1px solid ${link.color}15`,
                  borderLeft: `2px solid ${link.color}`,
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 text-lg transition-all duration-300"
                  style={{
                    background: `${link.color}10`,
                    border: `1px solid ${link.color}30`,
                    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                    color: link.color,
                  }}
                >
                  {link.icon}
                </div>
                <div>
                  <div className="font-['Share_Tech_Mono'] text-[9px] tracking-[3px] mb-0.5" style={{ color: link.color }}>
                    {link.label}
                  </div>
                  <div className="font-['Rajdhani'] text-sm font-semibold text-[#ECE8E1] group-hover:text-[#22D3EE] transition-colors">
                    {link.value}
                  </div>
                  <div className="font-['Inter'] text-[11px] text-[rgba(236,232,225,0.35)]">{link.desc}</div>
                </div>
              </motion.a>
            ))}

            {/* Availability status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-4 p-4"
              style={{
                background: 'rgba(0, 212, 170, 0.05)',
                border: '1px solid rgba(0, 212, 170, 0.2)',
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-[#00D4AA] rounded-full" style={{ boxShadow: '0 0 6px #00D4AA' }} />
                <span className="font-['Share_Tech_Mono'] text-[10px] text-[#00D4AA] tracking-[3px]">AGENT STATUS</span>
              </div>
              <p className="font-['Rajdhani'] text-sm font-bold text-[#ECE8E1] mt-1">Available for new opportunities</p>
              <p className="font-['Inter'] text-xs text-[rgba(236,232,225,0.4)] mt-0.5">
                Open to full-time roles and select freelance projects.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div
              className="p-6 md:p-8 relative"
              style={{
                background: 'rgba(14, 26, 42, 0.5)',
                border: '1px solid rgba(34, 211, 238, 0.1)',
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Terminal header */}
              <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: '1px solid rgba(34,211,238,0.1)' }}>
                <span className="font-['Share_Tech_Mono'] text-[10px] text-[#22D3EE] tracking-[3px]">SECURE_COMMS.exe</span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#22D3EE] opacity-60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FB923C] opacity-60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00D4AA] opacity-60" />
                </div>
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-4xl mb-4" style={{ color: '#00D4AA' }}>✓</div>
                  <h4 className="font-['Rajdhani'] text-xl font-bold text-[#ECE8E1] mb-2">TRANSMISSION RECEIVED</h4>
                  <p className="font-['Share_Tech_Mono'] text-xs text-[rgba(236,232,225,0.5)] tracking-widest">
                    I'll respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-['Share_Tech_Mono'] text-[9px] text-[rgba(34,211,238,0.6)] tracking-[3px] block mb-1.5">
                        AGENT NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                        placeholder="Your name"
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'rgba(34,211,238,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(34,211,238,0.15)'}
                      />
                    </div>
                    <div>
                      <label className="font-['Share_Tech_Mono'] text-[9px] text-[rgba(34,211,238,0.6)] tracking-[3px] block mb-1.5">
                        COMMS ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                        placeholder="your@email.com"
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'rgba(34,211,238,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(34,211,238,0.15)'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-['Share_Tech_Mono'] text-[9px] text-[rgba(34,211,238,0.6)] tracking-[3px] block mb-1.5">
                      MISSION OBJECTIVE
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.subject}
                      onChange={e => setFormState(s => ({ ...s, subject: e.target.value }))}
                      placeholder="Subject / Purpose"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(34,211,238,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(34,211,238,0.15)'}
                    />
                  </div>

                  <div>
                    <label className="font-['Share_Tech_Mono'] text-[9px] text-[rgba(34,211,238,0.6)] tracking-[3px] block mb-1.5">
                      TRANSMISSION
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                      placeholder="Your message..."
                      style={{ ...inputStyle, resize: 'none' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(34,211,238,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(34,211,238,0.15)'}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="val-btn w-full flex items-center justify-center gap-2"
                  >
                    {sending ? (
                      <>
                        <motion.div
                          className="w-3 h-3 border border-current border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        TRANSMITTING...
                      </>
                    ) : (
                      'SEND TRANSMISSION'
                    )}
                  </button>

                  {error && (
                    <p className="font-['Share_Tech_Mono'] text-[10px] text-[#22D3EE] tracking-[2px] text-center">
                      TRANSMISSION FAILED — please try again or email directly.
                    </p>
                  )}
                </form>
              )}

              {/* Corner decor */}
              <div className="absolute bottom-0 right-0 w-5 h-5 overflow-hidden">
                <div className="absolute bottom-0 right-0 w-full h-full bg-[#22D3EE] opacity-20"
                  style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
