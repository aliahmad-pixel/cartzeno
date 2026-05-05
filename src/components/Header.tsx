import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, ShoppingBag, Menu, X, Minus, Plus, Trash2, ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAdmin } from '../context/AdminContext'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { totalItems, items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalPrice } = useCart()
  const { products, formatPrice, settings } = useAdmin()
  const navigate = useNavigate()
  const location = useLocation()
  const searchInputRef = useRef<HTMLInputElement>(null)

  const shipping = totalPrice >= settings.freeShippingThreshold ? 0 : settings.shippingCost
  const cartTotal = totalPrice + shipping

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setIsCartOpen(false)
    setSearchOpen(false)
    setSearchQuery('')
  }, [location.pathname])

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  const navLinks = [
    { label: 'Shop', path: '/shop' },
    { label: 'About', path: '/about' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' }
  ]

  const searchResults = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : []

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass py-1 shadow-2xl shadow-primary/5' : 'bg-foreground py-2'
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[64px] px-6 md:px-10">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">C</div>
            <span className={`font-black text-xl tracking-tight transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}>
              Cartzeno
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.path}
                className={`text-sm px-5 py-2 rounded-xl font-bold transition-all duration-300 ${
                  location.pathname === link.path 
                    ? (scrolled ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white/10 text-white')
                    : (scrolled ? 'text-muted-foreground hover:text-foreground hover:bg-secondary' : 'text-white/70 hover:text-white hover:bg-white/10')
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
                scrolled ? 'text-foreground hover:bg-secondary' : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl relative transition-all duration-300 ${
                scrolled ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-destructive text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border-2 border-white shadow-lg animate-fade-up">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className={`md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
                scrolled ? 'text-foreground hover:bg-secondary' : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
          <div className="pt-20 px-5 max-w-2xl mx-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    setSearchOpen(false)
                    navigate(`/shop?search=${encodeURIComponent(searchQuery)}`)
                  }
                }}
                className="w-full h-14 bg-white rounded-xl pl-12 pr-12 text-[#0A0A0A] text-base focus:outline-none shadow-xl"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[#F5F5F5] text-[#666666] hover:bg-[#E5E5E5] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {searchQuery.trim() && (
              <div className="mt-3 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[60vh] overflow-y-auto border border-border">
                {searchResults.length > 0 ? (
                  <div>
                    {searchResults.map(p => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSearchOpen(false)
                          navigate(`/product/${p.id}`)
                        }}
                        className="w-full flex items-center gap-4 p-5 hover:bg-secondary transition-colors text-left border-b border-border last:border-0"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-foreground truncate">{p.name}</p>
                          <p className="text-xs text-muted-foreground font-medium">{p.category} · {formatPrice(p.price)}</p>
                        </div>
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setSearchOpen(false)
                        navigate(`/shop?search=${encodeURIComponent(searchQuery)}`)
                      }}
                      className="w-full text-center py-4 text-sm text-primary font-bold hover:bg-secondary transition-colors"
                    >
                      View all results
                    </button>
                  </div>
                ) : (
                  <div className="p-10 text-center">
                    <p className="text-muted-foreground font-medium">No products found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            )}

            {!searchQuery.trim() && (
              <div className="mt-4 text-center">
                <p className="text-white/50 text-sm">Type to search products, categories, or brands</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] bg-[#0A0A0A] flex flex-col transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="flex items-center justify-between h-[60px] px-5">
          <span className="text-white font-bold text-lg">Cartzeno</span>
          <button
            className="w-9 h-9 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-2 px-5">
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-light py-3 px-6 rounded-xl transition-all ${
                location.pathname === link.path ? 'text-[#4A5DFF] bg-[#4A5DFF]/10' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div
        className={`fixed inset-0 z-[70] transition-opacity duration-500 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-[440px] bg-white shadow-2xl transform transition-transform duration-500 flex flex-col ${
            isCartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-8 border-b border-border">
            <div>
              <h2 className="text-foreground text-xl font-black">Shopping Cart</h2>
              <p className="text-muted-foreground text-xs font-bold mt-1 uppercase tracking-widest">{totalItems} curated items</p>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary text-muted-foreground hover:text-foreground transition-all">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground/50">
                <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
                  <ShoppingBag size={40} className="opacity-20" />
                </div>
                <p className="text-sm font-bold">Your cart is feeling light.</p>
                <button
                  onClick={() => { setIsCartOpen(false); navigate('/shop') }}
                  className="mt-6 btn-primary"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map(item => (
                  <div key={item.id} className="flex gap-5 group">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-secondary flex-shrink-0 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-foreground text-sm font-bold truncate group-hover:text-primary transition-colors">{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground/30 hover:text-destructive transition-colors p-1"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <p className="text-primary text-sm font-bold mt-1">{formatPrice(item.price)}</p>
                      </div>
                      
                      <div className="flex items-center gap-3 bg-secondary/50 rounded-xl p-1 w-fit mt-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-foreground text-sm font-bold w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-8 bg-secondary/30 border-t border-border space-y-5">
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-bold' : 'text-foreground font-bold'}>
                    {shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
                  </span>
                </div>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between items-end">
                <span className="text-foreground font-black text-lg">Total Amount</span>
                <span className="text-primary font-black text-2xl tracking-tight">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <button
                onClick={() => { setIsCartOpen(false); navigate('/checkout') }}
                className="btn-primary w-full h-14 text-base"
              >
                Proceed to Secure Checkout
              </button>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <ShieldCheck size={14} className="text-green-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">SSL Encrypted Transaction</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
