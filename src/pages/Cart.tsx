import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck, Phone } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAdmin } from '../context/AdminContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Cart() {
  useDocumentTitle('Your Bag Archive')
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart()
  const { formatPrice, settings } = useAdmin()
  const navigate = useNavigate()

  const shipping = totalPrice >= settings.freeShippingThreshold ? 0 : settings.shippingCost
  const cartTotal = totalPrice + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-[#FAFAFA]">
        <div className="text-center space-y-10 px-6 animate-fade-up">
          <div className="w-32 h-32 rounded-[3rem] bg-white border border-border flex items-center justify-center mx-auto shadow-2xl ring-1 ring-border/50">
            <ShoppingBag size={48} className="text-muted-foreground/20" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-foreground tracking-tighter italic uppercase">Your Bag is Empty.</h1>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] max-w-sm mx-auto leading-relaxed">The acquisition queue is currently inactive. Explore our archive to initiate a new protocol.</p>
          </div>
          <Link
            to="/shop"
            className="btn-primary h-16 px-12 inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] shadow-primary/20"
          >
            Access Collection Archive <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen pt-48 pb-40 selection:bg-primary selection:text-white">
      <div className="px-6 md:px-20 max-w-[1400px] mx-auto space-y-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-border pb-16 animate-fade-down">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-[2px] bg-primary" />
              <span className="text-[10px] text-primary font-black uppercase tracking-[0.4em]">Acquisition Queue</span>
            </div>
            <h1 className="text-[clamp(3rem,8vw,6rem)] text-foreground leading-[0.8] font-black tracking-tighter italic">
              Order Details.
            </h1>
          </div>
          <div className="hidden md:block">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">
              Synchronizing <span className="text-primary italic">{totalItems} ACTIVE ARTIFACTS</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-24">
          {/* Cart Item Ledger */}
          <div className="flex-1 space-y-12 animate-fade-up">
            <div className="divide-y divide-border border-t border-border">
              {items.map(item => (
                <div key={item.id} className="group py-12 flex flex-col md:flex-row gap-10 items-stretch md:items-center hover:bg-secondary/20 transition-all duration-700 rounded-[2.5rem] px-8 -mx-8">
                  <Link to={`/product/${item.id}`} className="w-full md:w-48 aspect-[3/4] flex-shrink-0 rounded-[2rem] overflow-hidden bg-white border border-border group-hover:shadow-2xl group-hover:ring-1 ring-primary/20 transition-all duration-700">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  </Link>
                  
                  <div className="flex-1 flex flex-col justify-between py-2 min-w-0">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-6">
                        <div className="space-y-1">
                          <p className="text-[8px] font-black text-primary uppercase tracking-[0.4em]">Artifact Identifier</p>
                          <Link to={`/product/${item.id}`} className="text-xl font-black text-foreground hover:text-primary transition-colors leading-none italic tracking-tight uppercase">
                            {item.name}
                          </Link>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-all active:scale-90"
                          title="Eject item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] opacity-40">Original Prototype Edition &middot; 2024 Protocol</p>
                    </div>
                    
                    <div className="flex flex-row items-end justify-between gap-6 mt-12">
                      <div className="space-y-4">
                        <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-1">Quantity Adjustment</p>
                        <div className="flex items-center bg-white rounded-2xl p-1.5 border border-border shadow-inner ring-1 ring-border/50">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-12 h-12 flex items-center justify-center rounded-xl bg-secondary/50 text-foreground hover:bg-primary hover:text-white transition-all disabled:opacity-10 active:scale-90"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-14 text-center text-xs font-black tracking-tighter">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-12 h-12 flex items-center justify-center rounded-xl bg-secondary/50 text-foreground hover:bg-primary hover:text-white transition-all active:scale-90"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-[10px] text-muted-foreground font-black tracking-[0.2em] uppercase opacity-40 italic">{formatPrice(item.price)} PER UNIT</p>
                        <p className="text-2xl font-black text-foreground tracking-tighter italic">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Logistic Protocol Notifier */}
            {totalPrice < settings.freeShippingThreshold ? (
              <div className="p-10 rounded-[2.5rem] bg-secondary/30 border border-border/50 flex flex-col md:flex-row items-center gap-8 animate-fade-up ring-1 ring-border/50">
                <div className="w-20 h-20 rounded-[1.5rem] bg-white flex items-center justify-center text-primary shadow-2xl ring-1 ring-primary/10">
                  <Truck size={32} />
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">Logistics Protocol</p>
                  <p className="text-sm font-black text-foreground uppercase tracking-widest leading-relaxed">
                    Accumulate <span className="text-primary underline decoration-2 underline-offset-4 italic">{formatPrice(settings.freeShippingThreshold - totalPrice)}</span> more for <span className="text-primary italic">Complimentary Global Freight</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-10 rounded-[2.5rem] bg-green-500/5 border border-green-500/10 flex flex-col md:flex-row items-center gap-8 animate-fade-up ring-1 ring-green-500/10">
                <div className="w-20 h-20 rounded-[1.5rem] bg-white flex items-center justify-center text-green-600 shadow-2xl ring-1 ring-green-500/10">
                  <CheckCircle size={32} />
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <p className="text-[10px] font-black text-green-600/60 uppercase tracking-[0.4em]">Priority Dispatch Enabled</p>
                  <p className="text-sm font-black text-green-600 uppercase tracking-widest leading-relaxed">
                    This acquisition qualifies for <span className="italic underline decoration-2 underline-offset-4">Complimentary Strategic Logistics</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Strategic Summary Sidebar */}
          <div className="lg:w-[400px] flex-shrink-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="bg-white rounded-[3.5rem] p-12 border border-border shadow-2xl sticky top-40 space-y-12 ring-1 ring-border/50">
              <div className="space-y-2">
                <h2 className="text-[10px] font-black text-foreground uppercase tracking-[0.4em] ml-1">Summary</h2>
                <div className="h-px bg-border w-full" />
              </div>
              
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Subtotal Accumulation</span>
                  <span className="text-sm font-black text-foreground italic">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Logistic Premium</span>
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic">{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
                </div>
                <div className="pt-8 border-t border-border flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-foreground uppercase tracking-[0.4em]">Total Commitment</span>
                    <p className="text-[8px] text-muted-foreground font-black uppercase tracking-[0.2em]">VAT INCLUSIVE ARTIFACTS</p>
                  </div>
                  <span className="text-4xl font-black text-primary tracking-tighter italic">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full btn-primary h-20 text-[10px] font-black uppercase tracking-[0.4em] shadow-primary/30 flex items-center justify-center gap-6 group active:scale-95 transition-all"
                >
                  Confirm & Checkout <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
                <Link
                  to="/shop"
                  className="w-full h-16 flex items-center justify-center rounded-[1.5rem] text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] hover:text-foreground transition-all border border-transparent hover:border-border hover:bg-secondary/30 active:scale-95"
                >
                  Back to Archive
                </Link>
              </div>

              {/* Strategic Verification Protocol */}
              <div className="p-8 rounded-[2rem] bg-foreground text-white border border-white/10 shadow-2xl space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary shadow-inner">
                    <Phone size={24} />
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Verification Protocol</p>
                </div>
                <p className="text-[10px] text-white/60 font-medium leading-relaxed uppercase tracking-widest">
                  Acquisitions are <span className="text-primary italic">Verified via Voice Terminal</span> prior to dispatch to ensure white-glove security standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
