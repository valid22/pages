import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const LINKS = [
  { label: 'EMAIL',    icon: '→', value: 'hi@itsdote.tech',            href: 'mailto:hi@itsdote.tech',                 color: 'var(--cyan)',   desc: 'Fastest response' },
  { label: 'LINKEDIN', icon: '→', value: 'linkedin.com/in/dote10110',  href: 'https://linkedin.com/in/dote10110',       color: 'var(--purple)', desc: 'Professional network' },
  { label: 'WEBSITE',  icon: '→', value: 'itsdote.tech',               href: 'https://itsdote.tech',                   color: 'var(--orange)', desc: 'Portfolio & projects' },
]

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSending(true); setErr(false)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '4e409044-554b-40b7-b3d2-9bda1c962aab',
          ...form,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
        setForm({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSent(false), 5000)
      } else { setErr(true) }
    } catch { setErr(true) }
    finally { setSending(false) }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32"
      style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(0,212,255,0.04), transparent 60%)' }}
      ref={ref}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14">
          <div className="label mb-2" style={{ opacity: 0.6 }}>// 05 — COMMS</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>ESTABLISH CONNECTION</h2>
          <div style={{ width: 56, height: 2, background: 'linear-gradient(90deg, var(--cyan), transparent)', marginTop: 10 }} />
          <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 12, maxWidth: 480 }}>
            Open to full-time roles, research collaborations, and select freelance projects.
            Transmission always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

          {/* ── Contact links ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-3">

            <div className="label mb-2" style={{ fontSize: 9, letterSpacing: '4px', opacity: 0.5 }}>CHANNELS</div>

            {LINKS.map((l, i) => (
              <motion.a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.12 }}
                className="flex items-center gap-4 p-4 group"
                style={{
                  cursor: 'none',
                  background: 'var(--bg-card)',
                  borderLeft: `2px solid ${l.color}`,
                  border: `1px solid ${l.color}20`,
                  clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 20px ${l.color}12`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                <div style={{
                  width: 36, height: 36, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${l.color}12`, border: `1px solid ${l.color}30`,
                  clipPath: 'polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px))',
                  color: l.color, fontSize: 16,
                }}>
                  {l.icon}
                </div>
                <div>
                  <div className="label mb-0.5" style={{ fontSize: 8, color: l.color, letterSpacing: '3px' }}>{l.label}</div>
                  <div className="font-head" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = l.color}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}>
                    {l.value}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{l.desc}</div>
                </div>
              </motion.a>
            ))}

            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.75 }}
              className="mt-2 p-4 clip-corner-sm"
              style={{ background: 'rgba(0,255,135,0.05)', border: '1px solid rgba(0,255,135,0.2)' }}>
              <div className="flex items-center gap-2 mb-1">
                <motion.div className="w-2 h-2 rounded-full" style={{ background: 'var(--green)' }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }} />
                <span className="label" style={{ fontSize: 9, color: 'var(--green)', letterSpacing: '3px' }}>STATUS: ACTIVE</span>
              </div>
              <div className="font-head" style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>Available for new opportunities</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>Full-time roles & select freelance projects</div>
            </motion.div>
          </motion.div>

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3">

            <div className="clip-corner card p-6 md:p-7 relative">
              {/* Terminal bar */}
              <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
                <span className="label" style={{ fontSize: 9, letterSpacing: '4px' }}>SECURE_COMMS.exe</span>
                <div className="flex gap-1.5">
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', opacity: 0.6 }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--orange)', opacity: 0.6 }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', opacity: 0.6 }} />
                </div>
              </div>

              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
                  <div style={{ fontSize: 40, color: 'var(--green)', marginBottom: 12 }}>✓</div>
                  <div className="section-heading mb-2" style={{ fontSize: 20 }}>TRANSMISSION RECEIVED</div>
                  <div className="label" style={{ fontSize: 9, letterSpacing: '3px', opacity: 0.5 }}>Response within 24 hours</div>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: 'name',    label: 'AGENT NAME',    type: 'text',  ph: 'Your name' },
                      { key: 'email',   label: 'COMMS ADDRESS', type: 'email', ph: 'your@email.com' },
                    ].map(f => (
                      <div key={f.key}>
                        <div className="label mb-1.5" style={{ fontSize: 8, letterSpacing: '3px', opacity: 0.6 }}>{f.label}</div>
                        <input type={f.type} required value={form[f.key]}
                          onChange={e => setForm(s => ({ ...s, [f.key]: e.target.value }))}
                          placeholder={f.ph}
                          className="form-input" />
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="label mb-1.5" style={{ fontSize: 8, letterSpacing: '3px', opacity: 0.6 }}>MISSION OBJECTIVE</div>
                    <input type="text" required value={form.subject}
                      onChange={e => setForm(s => ({ ...s, subject: e.target.value }))}
                      placeholder="Subject / Purpose"
                      className="form-input" />
                  </div>

                  <div>
                    <div className="label mb-1.5" style={{ fontSize: 8, letterSpacing: '3px', opacity: 0.6 }}>TRANSMISSION</div>
                    <textarea required rows={5} value={form.message}
                      onChange={e => setForm(s => ({ ...s, message: e.target.value }))}
                      placeholder="Your message..."
                      className="form-input"
                      style={{ resize: 'none', fontFamily: "'Inter',sans-serif" }} />
                  </div>

                  <button type="submit" disabled={sending} className="btn-primary w-full flex items-center justify-center gap-2"
                    style={{ cursor: 'none' }}>
                    {sending ? (
                      <>
                        <motion.div style={{ width: 12, height: 12, border: '1.5px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%' }}
                          animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <span>SEND TRANSMISSION</span>
                    )}
                  </button>

                  {err && (
                    <div className="label text-center" style={{ fontSize: 9, color: 'var(--orange)', letterSpacing: '2px' }}>
                      FAILED — try again or email directly.
                    </div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
