import { Link } from 'react-router-dom'
import { Target, Heart, Users, Sparkles, ArrowRight, Check, Package, Globe } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function About() {
  useDocumentTitle('About Us')
  return (
    <div className="bg-white min-h-screen selection:bg-primary selection:text-white">
      {/* Dynamic Brand Hero */}
      <div className="px-6 md:px-20 max-w-[1400px] mx-auto text-center pt-48 pb-32 animate-fade-down">
        <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-2 rounded-full border border-primary/10 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Our Core Identity</span>
        </div>
        <h1 className="text-[clamp(3.5rem,10vw,8rem)] text-foreground leading-[0.85] font-black tracking-tighter mb-10 italic">
          Less Clutter.<br /><span className="text-primary not-italic">More Living.</span>
        </h1>
        <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed opacity-80">
          Cartzeno was born from a singular protocol: the artifacts you possess should amplify your existence, not complicate your trajectory.
        </p>
      </div>

      {/* Strategic Mission Terminal */}
      <div className="px-6 md:px-20 max-w-[1400px] mx-auto py-32 border-t border-border">
        <div className="grid lg:grid-cols-2 gap-24 lg:gap-32 items-center">
          <div className="space-y-10 animate-fade-up">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">The Directive</span>
              </div>
              <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] text-foreground font-black tracking-tighter leading-[0.9] italic">Curated Excellence.</h2>
            </div>
            <div className="space-y-6">
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                We believe in the power of calculated curation. Every artifact in our archive is hand-selected after rigorous tactical evaluation. We don't distribute everything — we distribute the things that fulfill.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                From the moment you query our archive to the day your acquisition reaches your terminal, we're committed to a seamless luxury experience.
              </p>
            </div>
            <div className="pt-6">
              <Link
                to="/shop"
                className="btn-primary h-16 px-12 text-[10px] font-black uppercase tracking-[0.3em] inline-flex items-center gap-4"
              >
                Access Catalog <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          
          <div className="bg-secondary/30 rounded-[3rem] p-12 md:p-16 border border-border shadow-inner ring-1 ring-border/50">
            <div className="grid grid-cols-2 gap-10">
              {[
                { icon: <Target size={32} />, stat: '50K+', label: 'Acquisitions' },
                { icon: <Heart size={32} />, stat: '99%', label: 'Metric Success' },
                { icon: <Users size={32} />, stat: '25+', label: 'Ambassadors' },
                { icon: <Sparkles size={32} />, stat: '500+', label: 'Artifacts' }
              ].map((item, i) => (
                <div key={i} className="text-center space-y-4 p-8 rounded-[2rem] bg-white border border-transparent hover:border-primary/20 hover:shadow-2xl transition-all duration-700 group">
                  <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto transition-transform group-hover:scale-110 group-hover:rotate-6">
                    <span className="text-primary">{item.icon}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-black text-foreground tracking-tighter italic">{item.stat}</p>
                    <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em]">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Value Ledger */}
      <div className="bg-foreground py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="max-w-[1400px] mx-auto relative z-10 space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-white text-[clamp(2.5rem,5vw,5rem)] font-black tracking-tighter leading-none italic">The Cartzeno Standard.</h2>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em] max-w-xl mx-auto">Foundational Principles guiding every transmission.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Check size={28} />,
                title: 'Integrity First',
                desc: 'We never compromise on the artifact core. Every product must exceed our threshold before it enters your collection.'
              },
              {
                icon: <Package size={28} />,
                title: 'Sustainability',
                desc: 'We prioritize ecological equilibrium. A superior planet is the ultimate premium objective for the next generation.'
              },
              {
                icon: <Globe size={28} />,
                title: 'Full Transparency',
                desc: 'Zero hidden protocols, zero falsified feedback. What you intercept is exactly what you acquire in our domain.'
              }
            ].map((v, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-12 hover:bg-white/10 transition-all duration-700 group">
                <div className="w-16 h-16 rounded-[1.5rem] bg-primary/20 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform">
                  <span className="text-primary">{v.icon}</span>
                </div>
                <h3 className="text-white text-xl font-black uppercase tracking-tight mb-4 italic">{v.title}</h3>
                <p className="text-white/40 leading-relaxed text-sm font-medium uppercase tracking-widest">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Strategic CTA */}
      <div className="px-6 md:px-20 max-w-[1400px] mx-auto py-40 text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] text-foreground font-black tracking-tighter leading-[0.9] italic uppercase">
            Initiate Your <br /><span className="text-primary">Journey Today.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium uppercase tracking-widest leading-relaxed">
            Join thousands of elite customers who have recalibrated their lifestyle via Cartzeno.
          </p>
        </div>
        <div className="pt-8">
          <Link
            to="/shop"
            className="btn-primary h-20 px-16 text-[10px] font-black uppercase tracking-[0.4em] inline-flex items-center gap-6 shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            Start Acquisition <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  )
}
