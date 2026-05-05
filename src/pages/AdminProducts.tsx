import { useState, useRef } from 'react'
import {
  Plus, Search, Pencil, Trash2, X, Package,
  ChevronDown, Save, Upload
} from 'lucide-react'
import { toast } from 'sonner'
import { useAdmin } from '../context/AdminContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import type { Product } from '../data/products'

const CATEGORIES = ['Electronics', 'Home & Living', 'Fashion', 'Sports', 'Beauty', 'Other']

const emptyProduct: Omit<Product, 'id'> = {
  name: '',
  price: 0,
  originalPrice: undefined,
  image: '',
  category: 'Electronics',
  rating: 4.5,
  reviews: 0,
  description: '',
  features: [],
  stock: 0,
  badge: '',
  sizes: [],
  colors: []
}

import AdminLayout from '../components/AdminLayout'

export default function AdminProducts() {
  useDocumentTitle('Manage Products')
  const { products, addProduct, updateProduct, deleteProduct, formatPrice } = useAdmin()

  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(emptyProduct)
  const [featureInput, setFeatureInput] = useState('')
  const [sizeInput, setSizeInput] = useState('')
  const [colorNameInput, setColorNameInput] = useState('')
  const [colorHexInput, setColorHexInput] = useState('#000000')
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const openAdd = () => {
    setEditingProduct(null)
    setFormData(emptyProduct)
    setFeatureInput('')
    setSizeInput('')
    setColorNameInput('')
    setColorHexInput('#000000')
    setShowModal(true)
  }

  const openEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({ ...product })
    setFeatureInput('')
    setSizeInput('')
    setColorNameInput('')
    setColorHexInput('#000000')
    setShowModal(true)
  }

  const handleSave = () => {
    if (!formData.name || !formData.image || formData.price <= 0) return
    if (editingProduct) {
      updateProduct(editingProduct.id, formData)
    } else {
      addProduct(formData)
    }
    setShowModal(false)
  }

  const handleDelete = (id: number) => {
    deleteProduct(id)
    setConfirmDelete(null)
  }

  const addFeature = () => {
    if (!featureInput.trim()) return
    setFormData(prev => ({ ...prev, features: [...prev.features, featureInput.trim()] }))
    setFeatureInput('')
  }

  const removeFeature = (idx: number) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== idx) }))
  }

  const addSize = () => {
    if (!sizeInput.trim()) return
    setFormData(prev => ({ ...prev, sizes: [...(prev.sizes || []), sizeInput.trim()] }))
    setSizeInput('')
  }

  const removeSize = (idx: number) => {
    setFormData(prev => ({ ...prev, sizes: (prev.sizes || []).filter((_, i) => i !== idx) }))
  }

  const addColor = () => {
    if (!colorNameInput.trim()) return
    setFormData(prev => ({ ...prev, colors: [...(prev.colors || []), { name: colorNameInput.trim(), hex: colorHexInput }] }))
    setColorNameInput('')
    setColorHexInput('#000000')
  }

  const removeColor = (idx: number) => {
    setFormData(prev => ({ ...prev, colors: (prev.colors || []).filter((_, i) => i !== idx) }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be smaller than 2MB')
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const clearImage = () => {
    setFormData(prev => ({ ...prev, image: '' }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <AdminLayout
      title="Inventory Control"
      subtitle={`${products.length} curated products in catalog`}
      actions={
        <button
          onClick={openAdd}
          className="btn-primary px-6 h-12 text-[10px] shadow-primary/30"
        >
          <Plus size={16} className="mr-2" /> Catalog New Product
        </button>
      }
    >
      <div className="max-w-[1400px] mx-auto px-6 py-10 space-y-8 animate-fade-up">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Catalog', count: products.length, color: 'primary' },
            { label: 'Critical Stock', count: products.filter(p => p.stock <= 10).length, color: 'red' },
            { label: 'Out of Stock', count: products.filter(p => p.stock === 0).length, color: 'gray' },
            { label: 'Total Value', count: formatPrice(products.reduce((acc, p) => acc + (p.price * p.stock), 0)), color: 'green' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-3xl border border-border shadow-sm">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">{stat.label}</p>
              <p className="text-2xl font-black text-foreground tracking-tighter">{stat.count}</p>
            </div>
          ))}
        </div>

        {/* Search & Utility */}
        <div className="bg-white p-6 rounded-[2rem] border border-border shadow-sm">
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
            <input
              type="text"
              placeholder="Search by Product Name or Category Specification..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 bg-secondary/30 border border-border rounded-2xl pl-14 pr-6 text-xs font-bold focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all"
            />
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-[2rem] border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/30 border-b border-border">
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Product / Specification</th>
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Classification</th>
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Unit Valuation</th>
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Inventory Units</th>
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(product => (
                  <tr key={product.id} className="hover:bg-secondary/10 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-16 rounded-2xl bg-secondary border border-border overflow-hidden flex-shrink-0 group-hover:shadow-xl transition-all">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package size={20} className="text-muted-foreground/30" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-black text-foreground uppercase tracking-tight">{product.name}</p>
                          {product.badge && (
                            <span className="inline-block text-[8px] bg-primary/5 text-primary border border-primary/10 px-2 py-0.5 rounded-lg font-black uppercase tracking-widest">{product.badge}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{product.category}</span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-foreground tracking-tighter">{formatPrice(product.price)}</p>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <p className="text-[10px] text-muted-foreground font-bold line-through tracking-widest">{formatPrice(product.originalPrice)}</p>
                      )}
                    </td>
                    <td className="px-8 py-6 text-xs font-black text-foreground tracking-tighter uppercase">{product.stock} Units</td>
                    <td className="px-8 py-6">
                      {product.stock === 0 ? (
                        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-600 px-3 py-1 rounded-xl border border-red-100">Redacted</span>
                      ) : product.stock <= 15 ? (
                        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-amber-50 text-amber-600 px-3 py-1 rounded-xl border border-amber-100">Low Volume</span>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-600 px-3 py-1 rounded-xl border border-green-100">Optimal</span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEdit(product)}
                          className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 hover:shadow-lg transition-all"
                          title="Modify Entry"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(product.id)}
                          className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive/20 hover:shadow-lg transition-all"
                          title="Purge Entry"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-32 space-y-4">
              <div className="w-20 h-20 bg-secondary rounded-[2rem] flex items-center justify-center mx-auto text-muted-foreground/30">
                <Package size={40} />
              </div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Catalog search yielded no results</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center p-6 overflow-y-auto animate-fade-in backdrop-blur-sm bg-black/20">
          <div className="bg-white rounded-[3rem] w-full max-w-4xl my-8 shadow-2xl border border-border overflow-hidden animate-zoom-in">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-border p-8 flex items-center justify-between z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <h2 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em]">Product Specification</h2>
                </div>
                <p className="text-2xl font-black text-foreground tracking-tighter">
                  {editingProduct ? 'Modify Existing Entry' : 'Catalog New Inventory'}
                </p>
              </div>
              <button onClick={() => setShowModal(false)} className="w-12 h-12 rounded-2xl bg-secondary hover:bg-border text-muted-foreground transition-all flex items-center justify-center">
                <X size={24} />
              </button>
            </div>

            <div className="p-10 grid md:grid-cols-2 gap-12 max-h-[70vh] overflow-y-auto">
              <div className="space-y-8">
                {/* Visual Identity */}
                <div className="space-y-6">
                  <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em] flex items-center gap-3">
                    <div className="w-6 h-px bg-primary" /> Visual Identity
                  </h3>
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {formData.image ? (
                      <div className="relative rounded-[2rem] overflow-hidden bg-secondary border border-border group w-full aspect-[4/5]">
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-12 h-12 rounded-2xl bg-white text-foreground hover:scale-110 transition-transform flex items-center justify-center shadow-xl"
                          >
                            <Upload size={20} />
                          </button>
                          <button
                            type="button"
                            onClick={clearImage}
                            className="w-12 h-12 rounded-2xl bg-destructive text-white hover:scale-110 transition-transform flex items-center justify-center shadow-xl"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full aspect-[4/5] bg-secondary/30 border-2 border-dashed border-border rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-primary/20 hover:bg-primary/5 transition-all group"
                      >
                        <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-sm flex items-center justify-center text-muted-foreground group-hover:scale-110 transition-transform">
                          <Upload size={32} />
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] font-black text-foreground uppercase tracking-widest">Upload Master Image</p>
                          <p className="text-[8px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Maximum volume 2.0MB</p>
                        </div>
                      </button>
                    )}
                  </div>
                </div>

                {/* Narrative */}
                <div className="space-y-6">
                  <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em] flex items-center gap-3">
                    <div className="w-6 h-px bg-primary" /> Narrative Description
                  </h3>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={6}
                    className="w-full bg-secondary/30 border border-border rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all resize-none leading-relaxed"
                    placeholder="Articulate the product's value proposition..."
                  />
                </div>
              </div>

              <div className="space-y-10">
                {/* Core Specifications */}
                <div className="space-y-6">
                  <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em] flex items-center gap-3">
                    <div className="w-6 h-px bg-primary" /> Core Specifications
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Legal Nomenclature</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full h-14 bg-secondary/30 border border-border rounded-2xl px-6 text-sm font-black focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all"
                        placeholder="Master Product Name"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Classification</label>
                        <div className="relative">
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full h-14 bg-secondary/30 border border-border rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer"
                          >
                            {CATEGORIES.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                          </select>
                          <ChevronDown size={16} className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Status Badge</label>
                        <input
                          type="text"
                          value={formData.badge || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value || undefined }))}
                          className="w-full h-14 bg-secondary/30 border border-border rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all"
                          placeholder="SALE, NEW, LIMITED"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Current Val.</label>
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                          className="w-full h-14 bg-secondary/30 border border-border rounded-2xl px-6 text-sm font-black focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Original Val.</label>
                        <input
                          type="number"
                          value={formData.originalPrice || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value ? Number(e.target.value) : undefined }))}
                          className="w-full h-14 bg-secondary/30 border border-border rounded-2xl px-6 text-sm font-black focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Inventory</label>
                        <input
                          type="number"
                          value={formData.stock}
                          onChange={(e) => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
                          className="w-full h-14 bg-secondary/30 border border-border rounded-2xl px-6 text-sm font-black focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attributes Management */}
                <div className="space-y-10">
                  {/* Features */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em] flex items-center gap-3">
                      <div className="w-6 h-px bg-primary" /> Strategic Features
                    </h3>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                        className="flex-1 h-12 bg-secondary/30 border border-border rounded-xl px-4 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-primary/20"
                        placeholder="Add Attribute..."
                      />
                      <button
                        type="button"
                        onClick={addFeature}
                        className="h-12 px-6 bg-foreground text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg active:scale-95"
                      >
                        Insert
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.features.map((f, i) => (
                        <span key={i} className="inline-flex items-center gap-2 bg-primary/5 text-primary text-[8px] px-3 py-1.5 rounded-lg font-black uppercase tracking-[0.1em] border border-primary/10">
                          {f}
                          <button onClick={() => removeFeature(i)} className="hover:text-destructive transition-colors"><X size={10} /></button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Size Matrix */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em] flex items-center gap-3">
                      <div className="w-6 h-px bg-primary" /> Dimension Matrix
                    </h3>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={sizeInput}
                        onChange={(e) => setSizeInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())}
                        className="flex-1 h-12 bg-secondary/30 border border-border rounded-xl px-4 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-primary/20"
                        placeholder="Specify Dimension..."
                      />
                      <button
                        type="button"
                        onClick={addSize}
                        className="h-12 px-6 bg-foreground text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg active:scale-95"
                      >
                        Insert
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(formData.sizes || []).map((s, i) => (
                        <span key={i} className="inline-flex items-center gap-2 bg-secondary text-foreground text-[8px] px-3 py-1.5 rounded-lg font-black uppercase tracking-[0.1em] border border-border">
                          {s}
                          <button onClick={() => removeSize(i)} className="hover:text-destructive transition-colors"><X size={10} /></button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em] flex items-center gap-3">
                      <div className="w-6 h-px bg-primary" /> Aesthetic Palette
                    </h3>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={colorNameInput}
                        onChange={(e) => setColorNameInput(e.target.value)}
                        placeholder="Name"
                        className="flex-1 h-12 bg-secondary/30 border border-border rounded-xl px-4 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-primary/20"
                      />
                      <div className="relative w-12 h-12 rounded-xl border border-border overflow-hidden bg-white shadow-inner">
                        <input
                          type="color"
                          value={colorHexInput}
                          onChange={(e) => setColorHexInput(e.target.value)}
                          className="absolute inset-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] cursor-pointer"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={addColor}
                        className="h-12 px-6 bg-foreground text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg active:scale-95"
                      >
                        Insert
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(formData.colors || []).map((c, i) => (
                        <span key={i} className="inline-flex items-center gap-2 bg-secondary text-foreground text-[8px] px-3 py-1.5 rounded-lg font-black uppercase tracking-[0.1em] border border-border">
                          <span className="w-3 h-3 rounded-full border border-white shadow-sm" style={{ backgroundColor: c.hex }} />
                          {c.name}
                          <button onClick={() => removeColor(i)} className="hover:text-destructive transition-colors"><X size={10} /></button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-border p-8 flex items-center justify-end gap-4 z-10">
              <button
                onClick={() => setShowModal(false)}
                className="px-10 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              >
                Abort Changes
              </button>
              <button
                onClick={handleSave}
                disabled={!formData.name || !formData.image || formData.price <= 0}
                className="flex-1 max-w-[240px] btn-primary h-14 text-[10px] shadow-primary/30"
              >
                <Save size={16} className="mr-2" /> {editingProduct ? 'Commit Modification' : 'Confirm Cataloging'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {confirmDelete !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in backdrop-blur-md bg-black/20">
          <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-sm shadow-2xl border border-border text-center space-y-8 animate-zoom-in">
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto text-red-600">
              <Trash2 size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-foreground tracking-tight">Purge Product?</h3>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-relaxed">This action will permanently remove this entry from the catalog. This cannot be undone.</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 h-14 rounded-2xl bg-secondary text-[10px] font-black text-foreground uppercase tracking-widest hover:bg-border transition-all"
              >
                Retain
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 h-14 rounded-2xl bg-red-600 text-[10px] font-black text-white uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95"
              >
                Purge Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
