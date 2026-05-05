import { useState } from 'react'
import { Mail, Phone, MessageCircle, Send, MapPin, Clock, CheckCircle } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Contact() {
  useDocumentTitle('Support Hub')
  const { addContactSubmission, settings } = useAdmin()
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addContactSubmission({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email Communications',
      value: settings.email || 'hello@cartzeno.com',
      href: `mailto:${settings.email || 'hello@cartzeno.com'}`,
      note: 'Average response: 2h',
      color: 'bg-primary/5',
      iconColor: 'text-primary'
    },
    {
      icon: <Phone size={24} />,
      title: 'Voice Terminal',
      value: settings.whatsapp || '+92 340 4524811',
      href: `tel:${(settings.whatsapp || '03404524811').replace(/^0/, '+92')}`,
      note: 'Active: 09:00 - 18:00',
      color: 'bg-primary/5',
      iconColor: 'text-primary'
    },
    {
      icon: <MessageCircle size={24} />,
      title: 'WhatsApp Protocol',
      value: 'Instant Connection',
      href: `https://wa.me/${(settings.whatsapp || '923404524811').replace(/^0/, '92')}?text=Hi%20Cartzeno!`,
      note: 'Priority resolution',
      color: 'bg-green-500/5',
      iconColor: 'text-green-600',
      external: true
    },
    {
      icon: <MapPin size={24} />,
      title: 'Physical Node',
      value: 'Clifton Protocol, Karachi',
      note: 'Regional HQ - Pakistan',
      color: 'bg-primary/5',
      iconColor: 'text-primary'
    }
  ]

  return (
    <div className="bg-white min-h-screen selection:bg-primary selection:text-white">
      <div className="px-6 md:px-20 max-w-[1400px] mx-auto pt-48 pb-32">
        <div className="text-center mb-24 animate-fade-down space-y-8">
          <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-2 rounded-full border border-primary/10">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Support Protocol</span>
          </div>
          <h1 className="text-[clamp(3.5rem,10vw,8rem)] text-foreground leading-[0.85] font-black tracking-tighter italic uppercase">
            Get in <br /><span className="text-primary not-italic">Transmission.</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium uppercase tracking-[0.2em] opacity-60">
            Encountered a deviation? Connect with our elite resolution unit via the terminals below.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-20 max-w-7xl mx-auto">
          {/* Intelligence Matrix */}
          <div className="lg:col-span-2 space-y-6 animate-fade-up">
            <div className="space-y-4 mb-12">
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] ml-1">Support Ledger</p>
              <div className="h-px bg-border w-full" />
            </div>
            
            <div className="grid gap-6">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-8 rounded-[2rem] bg-secondary/30 border border-border/50 hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 group">
                  <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-6 shadow-inner`}>
                    <span className={item.iconColor}>{item.icon}</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">{item.title}</h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className="text-lg font-black text-foreground hover:text-primary transition-colors italic tracking-tight"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg font-black text-foreground italic tracking-tight">{item.value}</p>
                    )}
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em]">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Performance Metric */}
            <div className="flex items-center gap-4 p-8 bg-foreground rounded-[2rem] border border-white/10 shadow-2xl">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-primary">
                <Clock size={20} className="animate-spin-slow" />
              </div>
              <span className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em] leading-relaxed">
                Metric Resolution Time: <span className="text-primary italic">Under 120 Minutes</span>
              </span>
            </div>
          </div>

          {/* Acquisition/Support Form */}
          <div className="lg:col-span-3 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] p-10 md:p-16 space-y-8 border border-border shadow-2xl ring-1 ring-border/50">
              {submitted && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-[1.5rem] p-6 text-green-600 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-4 animate-in fade-in zoom-in duration-500">
                  <CheckCircle size={20} />
                  Transmission intercepted successfully. Standing by for resolution.
                </div>
              )}
              
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] ml-1">Identity</label>
                    <input
                      type="text"
                      placeholder="ENTER FULL NAME..."
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-16 bg-secondary/50 border border-border rounded-2xl px-6 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-inner"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] ml-1">Terminal Email</label>
                    <input
                      type="email"
                      placeholder="ADDRESS@DOMAIN.COM"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-16 bg-secondary/50 border border-border rounded-2xl px-6 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] ml-1">Protocol Subject</label>
                  <input
                    type="text"
                    placeholder="NATURE OF TRANSMISSION..."
                    required
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full h-16 bg-secondary/50 border border-border rounded-2xl px-6 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-inner"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] ml-1">Intelligence Body</label>
                  <textarea
                    placeholder="DESCRIBE THE CORE ISSUE OR INQUIRY..."
                    required
                    rows={6}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-secondary/50 border border-border rounded-[2rem] px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-inner resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-primary h-20 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 shadow-2xl active:scale-95 transition-all"
              >
                <Send size={20} className="group-hover:translate-x-2 transition-transform" /> 
                Initiate Transmission
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
