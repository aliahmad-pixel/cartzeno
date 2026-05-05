import { useState, useMemo, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, Star, ChevronDown, X, ShoppingBag, Search, Check } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { useCart } from '../context/CartContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Shop() {
  useDocumentTitle('Collection Archive')
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  const searchParam = searchParams.get('search')
  const { products, formatPrice, settings } = useAdmin()
  const { addItem } = useCart()

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'All')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300])
  const [minRating, setMinRating] = useState<number>(0)
  const [sortBy, setSortBy] = useState<string>('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState(searchParam || '')

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
    }

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory)
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating)
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return result
  }, [selectedCategory, priceRange, minRating, sortBy, searchQuery, products])

  const gridRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.product-card')
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add('opacity-100', 'translate-y-0')
                card.classList.remove('opacity-0', 'translate-y-8')
              }, i * 60)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 }
    )
    if (gridRef.current) observer.observe(gridRef.current)
    return () => observer.disconnect()
  }, [filteredProducts])

  const activeFiltersCount = (selectedCategory !== 'All' ? 1 : 0) + (priceRange[1] < 300 ? 1 : 0) + (minRating > 0 ? 1 : 0)

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-40 pb-40 selection:bg-primary selection:text-white">
      <div className="px-6 md:px-20 max-w-[1400px] mx-auto space-y-20">
        {/* Strategic Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-border pb-16 animate-fade-down">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-[2px] bg-primary" />
              <span className="text-[10px] text-primary font-black uppercase tracking-[0.4em]">Protocol 2024</span>
            </div>
            <h1 className="text-[clamp(3rem,8vw,6rem)] text-foreground leading-[0.8] font-black tracking-tighter italic">
              Global Archive.
            </h1>
            <p className="text-muted-foreground font-black text-[10px] uppercase tracking-[0.3em]">
              Synchronizing <span className="text-primary">{filteredProducts.length}</span> Active Artifacts
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="relative group min-w-[240px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none bg-white border border-border rounded-2xl px-8 py-5 pr-14 text-[10px] font-black uppercase tracking-[0.2em] text-foreground focus:outline-none focus:ring-4 focus:ring-primary/5 cursor-pointer transition-all hover:border-primary/20 shadow-sm"
              >
                <option value="featured">Priority: Strategic</option>
                <option value="price-low">Value: Ascending</option>
                <option value="price-high">Value: Descending</option>
                <option value="rating">Metric: Top Rated</option>
              </select>
              <ChevronDown size={16} className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-4 bg-white border border-border rounded-2xl px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-foreground hover:border-primary/20 transition-all md:hidden shadow-sm active:scale-95"
            >
              <SlidersHorizontal size={16} />
              Filter Array
              {activeFiltersCount > 0 && (
                <span className="w-6 h-6 bg-primary text-white text-[10px] rounded-full flex items-center justify-center font-black border-2 border-white shadow-xl">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Intelligence Query Terminal */}
        <div className="relative max-w-3xl animate-fade-up">
          <div className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="LOCATE ARTIFACT BY IDENTITY OR METADATA..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-20 bg-white border border-border rounded-[2rem] pl-24 pr-16 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-xl placeholder:text-muted-foreground/30"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl bg-secondary hover:bg-red-50 hover:text-red-600 transition-all active:scale-90"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* Dimensional Sidebar */}
          <aside className={`lg:w-80 flex-shrink-0 space-y-12 ${showFilters ? 'block' : 'hidden lg:block'} animate-fade-up`}>
            <div className="bg-white rounded-[3rem] p-10 border border-border shadow-2xl sticky top-40 space-y-12 ring-1 ring-border/50">
              <div className="flex items-center justify-between border-b border-border pb-6">
                <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.4em]">Domain Filters</h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={() => {
                      setSelectedCategory('All')
                      setPriceRange([0, 300])
                      setMinRating(0)
                    }}
                    className="text-[8px] text-primary font-black uppercase tracking-[0.2em] hover:opacity-70 transition-all flex items-center gap-2"
                  >
                    Reset Grid <RotateCcw size={10} />
                  </button>
                )}
              </div>

              <div className="space-y-12">
                <div>
                  <h4 className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Sector
                  </h4>
                  <div className="space-y-3">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`group w-full flex items-center justify-between py-4 px-6 rounded-2xl transition-all text-[10px] font-black uppercase tracking-[0.2em] ${
                          selectedCategory === cat
                            ? 'bg-primary text-white shadow-xl shadow-primary/20 -translate-y-1'
                            : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                        }`}
                      >
                        {cat}
                        {selectedCategory === cat && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Price Ceiling
                  </h4>
                  <div className="space-y-8 px-2">
                    <input
                      type="range"
                      min="0"
                      max="300"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                      className="w-full h-1.5 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between items-center bg-secondary/30 rounded-2xl px-6 py-4 border border-border/50 shadow-inner">
                      <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em]">Limit</span>
                      <span className="text-sm font-black text-foreground italic">{settings.currencySymbol}{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Metric Rank
                  </h4>
                  <div className="space-y-3">
                    {[4, 3, 2, 0].map(rating => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`w-full flex items-center justify-between py-4 px-6 rounded-2xl transition-all text-[10px] font-black uppercase tracking-[0.2em] ${
                          minRating === rating
                            ? 'bg-secondary/50 text-primary border border-primary/20 shadow-sm'
                            : 'text-muted-foreground border border-transparent hover:border-border'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-border'}
                              />
                            ))}
                          </div>
                          {rating > 0 && <span className="text-[8px] font-black opacity-40">& up</span>}
                          {rating === 0 && <span className="text-[8px] font-black opacity-40">Any</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Catalog Terminal */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-48 bg-white rounded-[4rem] border border-border shadow-2xl space-y-12 ring-1 ring-border/50 animate-fade-up">
                <div className="w-32 h-32 bg-secondary/50 rounded-[3rem] flex items-center justify-center mx-auto shadow-inner">
                  <ShoppingBag size={48} className="text-muted-foreground/20" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-foreground italic">Grid Empty.</h3>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] max-w-xs mx-auto leading-relaxed">No artifact matches the current dimensional parameters.</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('All')
                    setPriceRange([0, 300])
                    setMinRating(0)
                    setSearchQuery('')
                  }}
                  className="btn-primary px-12 h-16 shadow-primary/20 text-[10px] font-black uppercase tracking-[0.3em]"
                >
                  Reset Dimensional Array
                </button>
              </div>
            ) : (
              <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12">
                {filteredProducts.map(product => (
                  <div key={product.id} className="group product-card opacity-0 translate-y-8 transition-all duration-1000">
                    <Link to={`/product/${product.id}`} className="block space-y-8">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-[3rem] bg-white border border-border group-hover:shadow-2xl group-hover:ring-1 ring-primary/20 transition-all duration-700">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {product.badge && (
                          <div className="absolute top-6 left-6">
                            <span className="bg-white/90 backdrop-blur-md text-[8px] text-foreground border border-border px-4 py-2 rounded-full font-black uppercase tracking-[0.2em] shadow-2xl">
                              {product.badge}
                            </span>
                          </div>
                        )}
                        
                        <div className="absolute bottom-8 left-8 right-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
                            }}
                            className="w-full h-14 bg-white text-foreground rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-primary hover:text-white transition-all active:scale-95"
                          >
                            Fast Acquisition
                          </button>
                        </div>
                      </div>
                      
                      <div className="px-4 space-y-4">
                        <div className="space-y-1">
                          <p className="text-[8px] text-primary font-black uppercase tracking-[0.4em]">{product.category}</p>
                          <h3 className="text-sm font-black text-foreground group-hover:text-primary transition-colors leading-tight uppercase tracking-tight truncate italic">{product.name}</h3>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-black text-foreground tracking-tighter">{formatPrice(product.price)}</span>
                            {product.originalPrice && (
                              <span className="text-[10px] text-muted-foreground line-through font-bold opacity-30 tracking-tighter italic">{formatPrice(product.originalPrice)}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 bg-secondary/50 rounded-full border border-border/50">
                            <Star size={10} className="text-amber-400 fill-amber-400" />
                            <span className="text-[9px] font-black text-foreground">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
