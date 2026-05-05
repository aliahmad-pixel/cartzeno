import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, Minus, Plus, Truck, RotateCcw, ShieldCheck, Check, ChevronRight, X, ZoomIn, AlertCircle, ArrowRight } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { useCart } from '../context/CartContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { products, formatPrice } = useAdmin()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')

  const product = products.find(p => p.id === Number(id))
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4)

  useDocumentTitle(product?.name || 'Product Details')

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-secondary/30">
        <div className="text-center space-y-8">
          <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto border border-border shadow-inner">
            <X size={40} className="text-destructive/40" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-foreground uppercase tracking-tight">Artifact Not Found</h1>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">The requested identity does not exist in our archive.</p>
          </div>
          <Link to="/shop" className="btn-primary inline-flex items-center px-10 h-14">Return to Collection</Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const isLowStock = product.stock > 0 && product.stock <= 15
  const isOutOfStock = product.stock === 0

  return (
    <div className="bg-white min-h-screen pt-32 pb-32 animate-fade-up">
      {/* Dynamic Lightbox Terminal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-foreground/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-500" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-8 right-8 w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95">
            <X size={28} />
          </button>
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-[90vh] object-contain rounded-[3rem] shadow-2xl animate-in zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="px-6 md:px-20 max-w-[1400px] mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] mb-16">
          <Link to="/" className="hover:text-primary transition-colors">Strategic Node</Link>
          <ChevronRight size={10} className="text-primary/30" />
          <Link to="/shop" className="hover:text-primary transition-colors">Archive</Link>
          <ChevronRight size={10} className="text-primary/30" />
          <span className="text-foreground italic">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Visual Identity Section */}
          <div className="space-y-8">
            <div 
              className="relative aspect-[3/4] rounded-[3rem] overflow-hidden bg-secondary/50 group cursor-zoom-in border border-border shadow-sm ring-1 ring-border/50 group-hover:shadow-2xl transition-all duration-1000" 
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute top-8 right-8 w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-2xl">
                <ZoomIn size={24} className="text-foreground" />
              </div>
              {product.badge && (
                <div className="absolute top-8 left-8">
                  <span className="bg-primary text-white text-[10px] uppercase tracking-[0.4em] px-6 py-3 rounded-full font-black shadow-2xl shadow-primary/30">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Intelligence & Specification Section */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] text-primary font-black uppercase tracking-[0.4em] px-4 py-1.5 bg-primary/10 rounded-full border border-primary/10">{product.category}</span>
              {isLowStock && (
                <span className="inline-flex items-center gap-2 text-[10px] bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full font-black uppercase tracking-[0.2em] border border-amber-100 shadow-sm animate-pulse">
                  <AlertCircle size={12} /> Stock Critical: {product.stock} Units
                </span>
              )}
              {isOutOfStock && (
                <span className="text-[10px] bg-red-50 text-red-600 px-4 py-1.5 rounded-full font-black uppercase tracking-[0.2em] border border-red-100">Depleted / Redacted</span>
              )}
            </div>

            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] text-foreground leading-[0.9] font-black tracking-tighter mb-8 italic">
              {product.name}
            </h1>

            <div className="flex items-center gap-6 mb-10 pb-10 border-b border-border">
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-border'}
                  />
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground font-black tracking-[0.2em] uppercase">{product.rating} &middot; {product.reviews} Market Critiques</span>
            </div>

            <div className="flex items-baseline gap-6 mb-12">
              <span className="text-5xl font-black text-foreground tracking-tighter italic">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-2xl text-muted-foreground line-through font-bold opacity-30 tracking-tight">{formatPrice(product.originalPrice)}</span>
              )}
              {product.originalPrice && (
                <div className="ml-4 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/10">
                  <p className="text-[10px] text-green-600 font-black uppercase tracking-[0.2em]">High Value Selection</p>
                </div>
              )}
            </div>

            {/* Dimensional & Edition Selection */}
            <div className="space-y-12 mb-16">
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-6">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-1">Edition Selection</p>
                  <div className="flex gap-5">
                    {product.colors.map(color => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`group relative w-14 h-14 rounded-2xl transition-all duration-500 ${
                          selectedColor === color.name ? 'ring-4 ring-primary/20 scale-110' : 'ring-1 ring-border hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor === color.name && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Check size={20} className={color.name.toLowerCase().includes('white') ? 'text-black' : 'text-white'} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-6">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-1">Dimensional Prototype</p>
                  <div className="flex flex-wrap gap-4">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-14 min-w-[70px] px-8 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] border transition-all duration-500 active:scale-95 ${
                          selectedSize === size
                            ? 'bg-foreground text-white border-foreground shadow-2xl -translate-y-1'
                            : 'bg-white text-muted-foreground border-border hover:border-primary/20 hover:text-foreground hover:bg-secondary/30'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Information Hub Tabs */}
            <div className="flex gap-12 border-b border-border mb-10">
              {[
                { id: 'description', label: 'Identity' },
                { id: 'reviews', label: 'Critiques' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all relative ${activeTab === tab.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {tab.label}
                  {activeTab === tab.id && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary animate-in slide-in-from-left" />}
                </button>
              ))}
            </div>

            <div className="min-h-[250px]">
              {activeTab === 'description' ? (
                <div className="animate-fade-up space-y-10">
                  <p className="text-foreground text-lg leading-relaxed font-medium italic opacity-70">"{product.description}"</p>
                  <div className="space-y-6">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Core Specifications</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {product.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-4 p-5 rounded-3xl bg-secondary/30 text-[10px] font-black uppercase tracking-widest text-foreground border border-border group hover:bg-white hover:shadow-xl hover:border-primary/20 transition-all">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-fade-up">
                  {[
                    { name: "JULIAN VALERIUS", rating: 5, date: "AUGUST 2024", text: "Exceptional quality. The craftsmanship is evident in every detail. Highly recommended for those who appreciate premium standards." },
                    { name: "ELENA SOROKINA", rating: 5, date: "SEPTEMBER 2024", text: "A truly curated experience. Fast shipping and the product exceeded my expectations. A fundamental addition to my collection." },
                  ].map((review, i) => (
                    <div key={i} className="p-8 rounded-[2.5rem] border border-border bg-white shadow-sm hover:shadow-xl transition-all">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-[10px] font-black text-foreground border border-border shadow-inner">
                            {review.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-xs font-black text-foreground tracking-tight">{review.name}</p>
                            <p className="text-[8px] text-muted-foreground font-black tracking-[0.3em] uppercase mt-1">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} size={14} className={j < review.rating ? 'text-amber-400 fill-amber-400' : 'text-border'} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-foreground/70 leading-relaxed font-medium italic">"{review.text}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Strategic Acquisition Controls */}
            <div className="mt-16 space-y-8">
              <div className="flex flex-col sm:flex-row items-stretch gap-6">
                <div className="flex items-center bg-secondary/50 rounded-2xl p-1.5 border border-border shadow-inner">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-14 h-14 flex items-center justify-center rounded-xl bg-white shadow-sm text-foreground hover:bg-primary hover:text-white transition-all disabled:opacity-20 active:scale-95"
                    disabled={quantity <= 1}
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-16 text-center text-sm font-black tracking-tighter">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-14 h-14 flex items-center justify-center rounded-xl bg-white shadow-sm text-foreground hover:bg-primary hover:text-white transition-all disabled:opacity-20 active:scale-95"
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 h-16 rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[10px] transition-all duration-700 shadow-2xl active:scale-95 ${
                    isOutOfStock
                      ? 'bg-secondary text-muted-foreground cursor-not-allowed border border-border'
                      : added
                        ? 'bg-green-600 text-white shadow-green-600/30'
                        : 'btn-primary shadow-primary/30'
                  }`}
                >
                  {isOutOfStock ? 'Identity Depleted' : added ? 'Reservation Confirmed' : 'Initiate Acquisition'}
                </button>
              </div>

              {/* Trust & Ethics Protocol */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-border">
                {[
                  { icon: <Truck size={24} />, title: 'Global Logistics', desc: 'Satellite-tracked' },
                  { icon: <RotateCcw size={24} />, title: 'Elite Guarantee', desc: '30-day resolution' },
                  { icon: <ShieldCheck size={24} />, title: 'Vault Access', desc: 'Military encryption' }
                ].map((badge, i) => (
                  <div key={i} className="flex flex-col items-center text-center group">
                    <div className="w-16 h-16 rounded-[2rem] bg-secondary/50 border border-border flex items-center justify-center text-primary mb-5 transition-all group-hover:scale-110 group-hover:bg-white group-hover:shadow-xl shadow-inner">
                      {badge.icon}
                    </div>
                    <p className="text-[10px] text-foreground font-black uppercase tracking-[0.2em] mb-1.5">{badge.title}</p>
                    <p className="text-[8px] text-muted-foreground font-black tracking-[0.3em] uppercase">{badge.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Cross-Domain Recommendations */}
        {relatedProducts.length > 0 && (
          <div className="mt-48 pt-24 border-t border-border space-y-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[2px] bg-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Strategic Alignment</span>
                </div>
                <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tighter leading-none italic">Curated Peer Selection.</h2>
              </div>
              <Link to="/shop" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] mb-2 hover:text-primary transition-colors">
                Complete Collection Archive <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
              {relatedProducts.map((p, i) => (
                <Link 
                  key={p.id} 
                  to={`/product/${p.id}`} 
                  className="group space-y-6 opacity-0 translate-y-10 animate-fade-up"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-secondary border border-border shadow-sm group-hover:shadow-2xl group-hover:ring-1 ring-primary/20 transition-all duration-700">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="space-y-2 px-2">
                    <h3 className="text-xs font-black text-foreground group-hover:text-primary transition-colors leading-tight truncate uppercase tracking-tight">{p.name}</h3>
                    <p className="text-sm font-black text-foreground tracking-tighter italic">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
