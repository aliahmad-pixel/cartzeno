import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Banknote, ArrowRight, Check, Truck, RotateCcw, ShieldCheck, Phone } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAdmin } from '../context/AdminContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Checkout() {
  useDocumentTitle('Finalization Protocol')
  const { items, totalPrice, clearCart } = useCart()
  const { settings, saveOrder } = useAdmin()
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod')
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  })

  const shipping = totalPrice >= settings.freeShippingThreshold ? 0 : settings.shippingCost
  const total = totalPrice + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else {
      const orderItems = items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity
      }))

      const orderId = saveOrder({
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        paymentMethod,
        items: orderItems,
        subtotal: totalPrice,
        shipping,
        total
      })

      clearCart()
      navigate('/order-success', {
        state: {
          orderId,
          total,
          items: orderItems
        }
      })
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-[#FAFAFA]">
        <div className="text-center px-6 space-y-10 animate-fade-up">
          <div className="w-32 h-32 bg-white rounded-[3rem] flex items-center justify-center mx-auto border border-border shadow-2xl ring-1 ring-border/50">
            <ShoppingBag size={48} className="text-muted-foreground/20" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-foreground tracking-tighter italic uppercase">Bag Depleted.</h1>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] max-w-sm mx-auto leading-relaxed">The finalization protocol requires active artifacts. Access the archive to continue.</p>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="btn-primary h-16 px-12 text-[10px] font-black uppercase tracking-[0.3em] shadow-primary/20 active:scale-95 transition-all"
          >
            Access Collection Archive
          </button>
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
              <span className="text-[10px] text-primary font-black uppercase tracking-[0.4em]">Finalization Protocol</span>
            </div>
            <h1 className="text-[clamp(3rem,8vw,6rem)] text-foreground leading-[0.8] font-black tracking-tighter italic">
              Checkout.
            </h1>
          </div>
          
          {/* Advanced Progress Terminal */}
          <div className="flex items-center gap-4 bg-secondary/30 rounded-[2rem] p-3 pr-8 border border-border shadow-inner ring-1 ring-border/50">
            <div className={`flex items-center gap-4 px-6 py-3 rounded-[1.5rem] transition-all duration-700 ${step >= 1 ? 'bg-primary text-white shadow-2xl shadow-primary/20 -translate-y-1' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black ${step >= 1 ? 'bg-white/20' : 'bg-secondary'}`}>
                {step > 1 ? <Check size={16} /> : '01'}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Logistics</span>
            </div>
            <div className={`w-8 h-px ${step >= 2 ? 'bg-primary' : 'bg-border'}`} />
            <div className={`flex items-center gap-4 px-6 py-3 rounded-[1.5rem] transition-all duration-700 ${step >= 2 ? 'bg-primary text-white shadow-2xl shadow-primary/20 -translate-y-1' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black ${step >= 2 ? 'bg-white/20' : 'bg-secondary'}`}>
                02
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Settlement</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-24">
          <form onSubmit={handleSubmit} className="flex-1 max-w-3xl space-y-16 animate-fade-up">
            {step === 1 ? (
              <div className="space-y-16">
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10 shadow-inner">
                      <Phone size={24} />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-[10px] font-black text-foreground uppercase tracking-[0.4em]">Contact Intelligence</h2>
                      <p className="text-[8px] text-muted-foreground font-black uppercase tracking-[0.2em]">Required for acquisition verification</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] ml-1">First Identity</label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="NAME_HOLDER..."
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full h-16 bg-secondary/50 border border-border rounded-2xl px-6 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] ml-1">Last Identity</label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="SURNAME_HOLDER..."
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full h-16 bg-secondary/50 border border-border rounded-2xl px-6 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-inner"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] ml-1">Transmission Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="ADDRESS@DOMAIN.COM"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full h-16 bg-secondary/50 border border-border rounded-2xl px-6 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-inner"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] ml-1">Voice Terminal (WhatsApp Required)</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+XX 000 000 0000"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full h-16 bg-secondary/50 border border-border rounded-2xl px-6 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10 shadow-inner">
                      <Truck size={24} />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-[10px] font-black text-foreground uppercase tracking-[0.4em]">Logistic Parameters</h2>
                      <p className="text-[8px] text-muted-foreground font-black uppercase tracking-[0.2em]">Global Freight coordinates</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] ml-1">Physical Coordinate Address</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="STREET_PROTOCOL_1..."
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full h-16 bg-secondary/50 border border-border rounded-2xl px-6 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-inner"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] ml-1">City Node</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="MUNICIPAL_IDENTITY..."
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full h-16 bg-secondary/50 border border-border rounded-2xl px-6 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] ml-1">Logistic Index (Postal)</label>
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="POSTAL_CODE..."
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full h-16 bg-secondary/50 border border-border rounded-2xl px-6 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-inner"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-16">
                <div className="space-y-10">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10 shadow-inner">
                      <ShieldCheck size={24} />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-[10px] font-black text-foreground uppercase tracking-[0.4em]">Settlement Terminal</h2>
                      <p className="text-[8px] text-muted-foreground font-black uppercase tracking-[0.2em]">Encrypted transaction protocol</p>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    {settings.codEnabled && (
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`group w-full flex items-center gap-8 p-8 border-2 rounded-[2.5rem] transition-all duration-500 text-left ${
                          paymentMethod === 'cod'
                            ? 'border-primary bg-primary/5 shadow-2xl shadow-primary/10 -translate-y-2'
                            : 'border-border bg-white hover:border-primary/20'
                        }`}
                      >
                        <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center transition-all duration-700 shadow-inner ${paymentMethod === 'cod' ? 'bg-primary text-white scale-110' : 'bg-secondary text-muted-foreground group-hover:scale-105'}`}>
                          <Banknote size={32} />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-black text-foreground uppercase tracking-[0.3em]">Cash Protocol (COD)</p>
                          <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em] opacity-40 italic">Telephone verification required for dispatch</p>
                        </div>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          paymentMethod === 'cod' ? 'border-primary bg-primary text-white' : 'border-border'
                        }`}>
                          {paymentMethod === 'cod' && <Check size={16} />}
                        </div>
                      </button>
                    )}

                    {settings.cardPaymentEnabled && (
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`group w-full flex items-center gap-8 p-8 border-2 rounded-[2.5rem] transition-all duration-500 text-left ${
                          paymentMethod === 'card'
                            ? 'border-primary bg-primary/5 shadow-2xl shadow-primary/10 -translate-y-2'
                            : 'border-border bg-white hover:border-primary/20'
                        }`}
                      >
                        <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center transition-all duration-700 shadow-inner ${paymentMethod === 'card' ? 'bg-primary text-white scale-110' : 'bg-secondary text-muted-foreground group-hover:scale-105'}`}>
                          <CreditCard size={32} />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-black text-foreground uppercase tracking-[0.3em]">Vault Terminal (Card)</p>
                          <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em] opacity-40 italic">SSL 256-BIT military-grade encryption</p>
                        </div>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          paymentMethod === 'card' ? 'border-primary bg-primary text-white' : 'border-border'
                        }`}>
                          {paymentMethod === 'card' && <Check size={16} />}
                        </div>
                      </button>
                    )}
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-8 pt-10 animate-fade-up">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] ml-1">Card Terminal Index</label>
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="0000 0000 0000 0000"
                          required={paymentMethod === 'card'}
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full h-16 bg-secondary/50 border border-border rounded-2xl px-6 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-inner"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] ml-1">Temporal Expiry</label>
                          <input
                            type="text"
                            name="cardExpiry"
                            placeholder="MM / YY"
                            required={paymentMethod === 'card'}
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            className="w-full h-16 bg-secondary/50 border border-border rounded-2xl px-6 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-inner"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] ml-1">Security Core (CVC)</label>
                          <input
                            type="text"
                            name="cardCvc"
                            placeholder="CVC_CODE..."
                            required={paymentMethod === 'card'}
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            className="w-full h-16 bg-secondary/50 border border-border rounded-2xl px-6 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-inner"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-8 rounded-[2.5rem] bg-foreground text-white border border-white/10 shadow-2xl flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-inner flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Verification Alert</p>
                    <p className="text-[10px] text-white/50 font-medium leading-relaxed uppercase tracking-widest">
                      Our concierge will <span className="text-primary italic">Verify Identity via Voice Link</span> prior to artifact dispatch to ensure elite security.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch gap-6 pt-16 border-t border-border">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="h-20 px-12 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all active:scale-95 border border-transparent hover:border-border"
                >
                  Edit Parameters
                </button>
              )}
              <button
                type="submit"
                className="flex-1 btn-primary h-20 text-[10px] font-black uppercase tracking-[0.4em] shadow-primary/30 flex items-center justify-center gap-6 group active:scale-95 transition-all"
              >
                {step === 1 ? 'Proceed to Settlement' : `Authorize Acquisition — ${formatPrice(total)}`}
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </form>

          {/* Selection Inventory Side Summary */}
          <div className="lg:w-[450px] flex-shrink-0 animate-fade-up" style={{ animationDelay: '300ms' }}>
            <div className="bg-white rounded-[4rem] p-12 border border-border shadow-2xl sticky top-40 space-y-12 ring-1 ring-border/50">
              <div className="space-y-2">
                <h2 className="text-[10px] font-black text-foreground uppercase tracking-[0.4em] ml-1">Selection Inventory</h2>
                <div className="h-px bg-border w-full" />
              </div>
              
              <div className="space-y-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map(item => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="relative w-24 h-32 flex-shrink-0 rounded-[1.5rem] overflow-hidden bg-white border border-border shadow-sm ring-1 ring-border/30 group-hover:shadow-xl transition-all duration-700">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white text-[10px] rounded-xl flex items-center justify-center font-black border-4 border-white shadow-2xl">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 py-4 flex flex-col justify-between">
                      <div className="space-y-1">
                        <p className="text-[8px] font-black text-primary uppercase tracking-[0.3em]">Identifier</p>
                        <p className="text-sm font-black text-foreground leading-none italic uppercase tracking-tight line-clamp-2">{item.name}</p>
                      </div>
                      <p className="text-[10px] font-black text-foreground tracking-tighter italic">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-8 pt-12 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Subtotal</span>
                  <span className="text-sm font-black text-foreground italic">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Logistics Protocol</span>
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic">{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
                </div>
                <div className="pt-8 border-t border-border flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-foreground uppercase tracking-[0.4em]">Grand Commitment</span>
                    <p className="text-[8px] text-muted-foreground font-black uppercase tracking-[0.2em]">Final Authorization</p>
                  </div>
                  <span className="text-5xl font-black text-primary tracking-tighter italic">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Advanced Trust Matrix */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: <Truck size={20} />, label: 'VIP Freight' },
                  { icon: <RotateCcw size={20} />, label: 'Guaranteed' },
                  { icon: <ShieldCheck size={20} />, label: 'Encrypted' }
                ].map((badge, i) => (
                  <div key={i} className="text-center p-4 rounded-[1.5rem] bg-secondary/50 border border-border/50 group hover:bg-white hover:shadow-2xl transition-all duration-700">
                    <span className="text-primary mx-auto mb-2.5 block transition-transform group-hover:scale-110">{badge.icon}</span>
                    <p className="text-[8px] text-muted-foreground font-black uppercase tracking-[0.2em]">{badge.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
