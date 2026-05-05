import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {  Truck, RotateCcw, ShieldCheck, Zap, Star, ArrowRight } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { useCart } from '../context/CartContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import NewsletterModal from '../components/NewsletterModal'

import { toast } from 'sonner'

export default function Home() {
  useDocumentTitle('')
  const { products, formatPrice, settings, categories } = useAdmin()
  const { addItem } = useCart()
  const sectionsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-10')
          }
        })
      },
      { threshold: 0.1 }
    )

    sectionsRef.current.forEach(el => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const addToSectionRef = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

  const featuredProducts = products.slice(0, 8)

  return (
    <div className="bg-white selection:bg-primary selection:text-white">
      {/* Dynamic Hero Terminal */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAFAFA]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070"
            alt="Luxury Retail Concept"
            className="w-full h-full object-cover opacity-[0.15] grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-white" />
          {/* Abstract Geometric Elements */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-primary/10 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md px-6 py-2 rounded-full border border-border shadow-sm animate-fade-down">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">Summer 2024 Collection Live</span>
            </div>
            <h1 className="text-[clamp(3rem,10vw,8rem)] text-foreground font-black leading-[0.9] tracking-tighter animate-fade-up">
              Refined <br /> <span className="text-primary italic">Essentials.</span>
            </h1>
          </div>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed animate-fade-up delay-150">
            A curated convergence of luxury and utility. Designed for the modern individual who demands excellence in every artifact.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 animate-fade-up delay-300">
            <Link to="/shop" className="btn-primary h-16 px-12 text-xs">
              Explore Collection
            </Link>
            <Link to="/about" className="group flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] hover:text-primary transition-colors">
              The Brand Story <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce-subtle">
          <div className="w-[1px] h-20 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* Trust Ledger */}
      <section className="border-y border-border bg-white overflow-hidden py-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {['VOGUE', 'GQ', 'HYPEBEAST', 'WIRED', 'MONOCLE', 'ESQUIRE'].map(brand => (
              <span key={brand} className="text-xl font-black tracking-tighter italic">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Global USP Pipeline */}
      <section className="bg-secondary/30 py-8 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Truck size={18} />, text: `Complimentary Logistics Over ${settings.currencySymbol}${settings.freeShippingThreshold}` },
              { icon: <RotateCcw size={18} />, text: '30-Day Satisfaction Protocol' },
              { icon: <ShieldCheck size={18} />, text: 'Encrypted Transactional Safety' },
              { icon: <Zap size={18} />, text: 'Accelerated Priority Dispatch' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-tight">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Catalog Terminal */}
      <section className="py-32 px-6 max-w-[1400px] mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Curated Selection</span>
            </div>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tighter leading-none">Market Leaders.</h2>
          </div>
          <Link to="/shop" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
            View Complete Archive <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {featuredProducts.map((product, i) => (
            <div
              key={product.id}
              className="group opacity-0 translate-y-10 transition-all duration-1000"
              ref={addToSectionRef}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <Link to={`/product/${product.id}`} className="block space-y-6">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-secondary shadow-sm ring-1 ring-border/50 group-hover:shadow-2xl group-hover:ring-primary/20 transition-all duration-700">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {product.badge && (
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-[8px] font-black uppercase tracking-[0.2em] shadow-xl border border-border">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-x-6 bottom-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
                      }}
                      className="w-full h-14 bg-white text-foreground rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-primary hover:text-white transition-all active:scale-95"
                    >
                      Instant Acquisition
                    </button>
                  </div>
                </div>

                <div className="space-y-2 px-2">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-sm font-black text-foreground uppercase tracking-tight leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="text-sm font-black text-foreground tracking-tighter">{formatPrice(product.price)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star size={10} className="text-amber-400 fill-amber-400" />
                      <span className="text-[10px] font-black text-muted-foreground">{product.rating}</span>
                    </div>
                    {product.originalPrice && (
                      <span className="text-[10px] text-muted-foreground line-through decoration-primary/30 font-bold">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Category Infrastructure */}
      <section className="py-32 bg-secondary/20">
        <div className="max-w-[1400px] mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tighter">Strategic Domains.</h2>
            <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.3em]">Vertical browsing experience</p>
          </div>

          <div className="grid gap-8">
            {categories.map((cat, i) => (
              <Link
                key={cat.name}
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group relative overflow-hidden rounded-[3rem] border border-border bg-white h-[400px] md:h-[500px] opacity-0 translate-y-10 transition-all duration-1000"
                ref={addToSectionRef}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-24 space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">{cat.count} Artifacts</span>
                    <h3 className="text-white text-[clamp(2.5rem,5vw,5rem)] font-black tracking-tighter leading-none italic uppercase">
                      {cat.name}
                    </h3>
                  </div>
                  <div className="pt-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                    <span className="inline-flex items-center gap-4 bg-white text-foreground px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl">
                      Access Domain <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Global Strategic Banner */}
      <section className="bg-foreground py-40 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full -translate-y-1/2" />
        
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-primary/20 text-primary px-8 py-3 rounded-full border border-primary/30">
              <Zap size={16} className="fill-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Limited Strategic Window</span>
            </div>
            <h2 className="text-white text-[clamp(3rem,8vw,6rem)] font-black tracking-tighter leading-[0.9]">
              Acquire for <span className="text-primary italic">50% Less.</span>
            </h2>
          </div>
          
          <p className="text-white/40 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Our global clearance protocol is now active. Access peak aesthetics at half the transactional value.
          </p>

          <div className="pt-8">
            <Link to="/shop" className="btn-primary h-20 px-16 text-xs bg-white text-foreground hover:bg-primary hover:text-white border-none shadow-2xl">
              Initiate Acquisition
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Ethos Pipeline */}
      <section className="py-40 px-6 max-w-[1400px] mx-auto grid md:grid-cols-3 gap-16">
        {[
          {
            icon: <Truck size={32} />,
            title: 'Express Logistics',
            desc: `Seamless global distribution for all orders exceeding ${settings.currencySymbol}${settings.freeShippingThreshold}. End-to-end satellite tracking.`
          },
          {
            icon: <RotateCcw size={32} />,
            title: 'Concierge Support',
            desc: '24/7 dedicated brand ambassadors ready to facilitate your journey. White-glove returns within 30 solar days.'
          },
          {
            icon: <ShieldCheck size={32} />,
            title: 'Vault Security',
            desc: 'Military-grade encryption for every transactional payload. Your financial data remains strictly confidential.'
          }
        ].map((item, i) => (
          <div
            key={item.title}
            className="group space-y-8 p-12 rounded-[3rem] border border-transparent hover:border-border hover:bg-white hover:shadow-2xl transition-all duration-700 opacity-0 translate-y-10"
            ref={addToSectionRef}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            <div className="w-20 h-20 rounded-[2rem] bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner">
              {item.icon}
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-black text-foreground uppercase tracking-tight">{item.title}</h3>
              <p className="text-sm font-bold text-muted-foreground leading-relaxed uppercase tracking-widest">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Intelligence Terminal (Newsletter) */}
      <section className="bg-foreground py-40 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="max-w-2xl mx-auto text-center space-y-12 relative z-10">
          <div className="space-y-4">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Neural Link</span>
            <h2 className="text-white text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tighter leading-none italic">Join the Elite.</h2>
            <p className="text-white/30 text-xs font-black uppercase tracking-[0.2em] max-w-sm mx-auto">First-look intelligence on future collections and hidden drops.</p>
          </div>

          <form
            className="flex flex-col md:flex-row gap-4 p-4 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 group focus-within:border-primary/50 transition-all"
            onSubmit={(e) => {
              e.preventDefault()
              toast.success('Access Granted.')
            }}
          >
            <input
              type="email"
              placeholder="YOUR_IDENTITY@HOST.COM"
              required
              className="flex-1 h-16 bg-transparent px-8 text-[10px] font-black uppercase tracking-[0.2em] text-white placeholder-white/20 focus:outline-none"
            />
            <button type="submit" className="h-16 px-12 bg-white text-foreground rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all shadow-2xl active:scale-95">
              Secure Access
            </button>
          </form>
        </div>
      </section>

      <NewsletterModal />
    </div>
  )
}