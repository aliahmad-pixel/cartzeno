import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle, Package, Truck, Home, ArrowRight, Phone, Clock } from 'lucide-react'
import { useEffect } from 'react'
import { useAdmin } from '../context/AdminContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function OrderSuccess() {
  useDocumentTitle('Acquisition Confirmed')
  const location = useLocation()
  const navigate = useNavigate()
  const { formatPrice } = useAdmin()
  const orderData = location.state as { orderId?: string; total?: number; items?: any[] } | null

  useEffect(() => {
    if (!orderData?.orderId) {
      navigate('/')
    }
  }, [orderData, navigate])

  if (!orderData?.orderId) return null

  return (
    <div className="bg-white min-h-screen pt-48 pb-40 selection:bg-primary selection:text-white">
      <div className="px-6 md:px-20 max-w-[1400px] mx-auto space-y-24">
        {/* Elite Success Header */}
        <div className="text-center space-y-12 animate-fade-down">
          <div className="relative inline-block group">
            <div className="w-32 h-32 rounded-[3.5rem] bg-green-500 flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
              <CheckCircle size={56} className="text-white" />
            </div>
            <div className="absolute -top-3 -right-3 w-12 h-12 rounded-[1.2rem] bg-white border border-border flex items-center justify-center text-green-500 shadow-2xl animate-bounce">
              <Package size={20} />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="w-10 h-[2px] bg-green-500" />
              <span className="text-[10px] text-green-500 font-black uppercase tracking-[0.5em]">Protocol Successful</span>
              <div className="w-10 h-[2px] bg-green-500" />
            </div>
            <h1 className="text-[clamp(3.5rem,10vw,7rem)] text-foreground leading-[0.8] font-black tracking-tighter italic uppercase">
              Acquisition <br /><span className="text-primary not-italic">Confirmed.</span>
            </h1>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] max-w-lg mx-auto leading-relaxed">
              Your selection has been securely archived. Our elite logistics unit is now synchronizing for dispatch.
            </p>
          </div>
          
          <div className="inline-flex items-center gap-6 px-10 py-5 bg-secondary/50 rounded-[2rem] border border-border shadow-inner ring-1 ring-border/50 group hover:shadow-2xl transition-all duration-700">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">Protocol ID</span>
            <span className="text-lg font-black text-foreground font-mono tracking-tighter italic">{orderData.orderId}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-20 animate-fade-up" style={{ animationDelay: '200ms' }}>
            {/* Strategic Logistics Notice */}
            <div className="bg-foreground rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group border border-white/5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-[100px] transition-transform group-hover:scale-150 duration-1000" />
              <div className="relative z-10 space-y-10">
                <div className="w-20 h-20 rounded-[1.5rem] bg-white/10 flex items-center justify-center backdrop-blur-2xl shadow-inner group-hover:scale-110 transition-transform duration-700">
                  <Phone size={36} className="text-primary" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black uppercase tracking-tight italic">Concierge Protocol.</h3>
                  <p className="text-[10px] font-medium text-white/40 leading-relaxed uppercase tracking-widest">
                    A member of our elite logistics squad will initiate a voice terminal transmission shortly to verify delivery coordinates. Following synchronization, your artifacts will enter white-glove dispatch status.
                  </p>
                </div>
              </div>
            </div>

            {/* Advanced Logistics Timeline */}
            <div className="space-y-12">
              <div className="space-y-2">
                <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.5em] ml-1">Logistics Roadmap</h3>
                <div className="h-px bg-border w-full" />
              </div>
              
              <div className="relative space-y-12 pl-12">
                <div className="absolute left-[23px] top-6 bottom-6 w-px bg-border dashed-border" />
                {[
                  { icon: <CheckCircle size={20} />, title: 'Finalization', desc: 'Secure Authorization Confirmed.', active: true },
                  { icon: <Phone size={20} />, title: 'Synchronization', desc: 'Awaiting Concierge Verification.', active: false },
                  { icon: <Package size={20} />, title: 'Inspection', desc: 'Artifact Integrity Evaluation.', active: false },
                  { icon: <Truck size={20} />, title: 'Deployment', desc: 'Premium Global Freight Transit.', active: false },
                ].map((step, i) => (
                  <div key={i} className="relative flex items-center gap-8 group">
                    <div className={`relative z-10 w-12 h-12 rounded-[1.2rem] flex items-center justify-center transition-all duration-700 ${
                      step.active ? 'bg-primary text-white shadow-2xl shadow-primary/30 scale-125' : 'bg-white border border-border text-muted-foreground group-hover:border-primary/40 group-hover:scale-110'
                    }`}>
                      {step.icon}
                    </div>
                    <div className="space-y-1">
                      <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${step.active ? 'text-foreground' : 'text-muted-foreground opacity-40'}`}>{step.title}</p>
                      <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em] opacity-30 italic">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-12 animate-fade-up" style={{ animationDelay: '400ms' }}>
            {/* Consolidated Inventory Ledger */}
            <div className="bg-white rounded-[4rem] p-12 border border-border shadow-2xl ring-1 ring-border/50 space-y-12">
              <div className="space-y-2">
                <h2 className="text-[10px] font-black text-foreground uppercase tracking-[0.4em] ml-1">Archive Summary</h2>
                <div className="h-px bg-border w-full" />
              </div>

              {orderData.items && orderData.items.length > 0 && (
                <div className="space-y-10 max-h-[350px] overflow-y-auto pr-4 custom-scrollbar">
                  {orderData.items.map((item: any) => (
                    <div key={item.id} className="flex gap-6 group items-center">
                      <div className="w-20 h-24 rounded-[1.5rem] overflow-hidden bg-white border border-border shadow-sm ring-1 ring-border/30 group-hover:shadow-xl transition-all duration-700 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="text-[8px] font-black text-primary uppercase tracking-[0.3em]">Artifact Node</p>
                        <p className="text-[10px] font-black text-foreground leading-none uppercase tracking-tight italic line-clamp-1">{item.name}</p>
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-40 italic">{formatPrice(item.price)} &times; {item.quantity}</p>
                      </div>
                      <p className="text-sm font-black text-foreground tracking-tighter italic">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-12 border-t border-border flex justify-between items-end">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">Settled Value</span>
                  <p className="text-[8px] text-muted-foreground font-black uppercase tracking-[0.2em]">VAT & FREIGHT INCLUSIVE</p>
                </div>
                <span className="text-5xl font-black text-primary tracking-tighter italic">{formatPrice(orderData.total || 0)}</span>
              </div>
            </div>

            {/* Tactical Arrival Protocol */}
            <div className="bg-secondary/30 rounded-[2.5rem] p-10 flex items-center gap-8 border border-border shadow-inner ring-1 ring-border/50">
              <div className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center text-primary shadow-2xl ring-1 ring-primary/10">
                <Clock size={28} className="animate-spin-slow" />
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">Temporal Estimate</p>
                <p className="text-[10px] text-foreground font-black leading-relaxed uppercase tracking-[0.3em]">
                  Artifact Arrival within <span className="text-primary italic underline decoration-2 underline-offset-4">48-120 Hours</span> Post-Synchronization.
                </p>
              </div>
            </div>

            {/* Strategic CTA Terminals */}
            <div className="grid sm:grid-cols-2 gap-8 pt-6">
              <Link
                to="/"
                className="btn-primary h-20 text-[10px] font-black uppercase tracking-[0.4em] shadow-primary/30 flex items-center justify-center gap-4 group active:scale-95 transition-all"
              >
                <Home size={20} className="group-hover:-translate-y-1 transition-transform" /> Return to Base
              </Link>
              <Link
                to="/shop"
                className="h-20 flex items-center justify-center rounded-[1.5rem] border border-border bg-white text-[10px] font-black text-foreground uppercase tracking-[0.4em] hover:bg-secondary/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 active:scale-95"
              >
                Browse Archive <ArrowRight size={20} className="ml-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
