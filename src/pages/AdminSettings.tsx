import { useState } from 'react'
import {
 Save, Store, DollarSign, Truck, CreditCard,
  Lock, Eye, EyeOff, Check, Globe, Instagram, Twitter, Facebook, Mail, Phone, Zap
} from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

import AdminLayout from '../components/AdminLayout'

export default function AdminSettings() {
  useDocumentTitle('Store Settings')
  const { settings, updateSettings } = useAdmin()

  const [form, setForm] = useState({ ...settings })
  const [saved, setSaved] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    updateSettings(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <AdminLayout
      title="System Configuration"
      subtitle="Calibrate your global store parameters"
      actions={
        <button
          onClick={handleSave}
          className={`flex items-center gap-3 h-12 px-8 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 ${
            saved
              ? 'bg-green-600 text-white shadow-green-600/20'
              : 'btn-primary shadow-primary/30'
          }`}
        >
          {saved ? <Check size={16} /> : <Save size={16} />}
          {saved ? 'Parameters Secured' : 'Commit Changes'}
        </button>
      }
    >
      <div className="max-w-[1000px] mx-auto px-6 py-12 animate-fade-up">
        <div className="grid gap-12">
          {/* General Node */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[1.25rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                <Store size={24} />
              </div>
              <div>
                <h2 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em]">General Operations</h2>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Core entity identifiers</p>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-border p-10 shadow-sm space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Store Nomenclature</label>
                <input
                  type="text"
                  value={form.storeName}
                  onChange={(e) => handleChange('storeName', e.target.value)}
                  className="w-full h-14 bg-secondary/30 border border-border rounded-2xl px-6 text-sm font-black focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all"
                  placeholder="Official Brand Name"
                />
              </div>
            </div>
          </div>

          {/* Financial Node */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[1.25rem] bg-amber-500/10 flex items-center justify-center text-amber-600 shadow-inner">
                <DollarSign size={24} />
              </div>
              <div>
                <h2 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em]">Financial Matrix</h2>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Currency & Valuation protocols</p>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-border p-10 shadow-sm grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">ISO Currency Code</label>
                <input
                  type="text"
                  value={form.currency}
                  onChange={(e) => handleChange('currency', e.target.value.toUpperCase())}
                  className="w-full h-14 bg-secondary/30 border border-border rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-primary/20 transition-all"
                  maxLength={3}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Monetary Symbol</label>
                <input
                  type="text"
                  value={form.currencySymbol}
                  onChange={(e) => handleChange('currencySymbol', e.target.value)}
                  className="w-full h-14 bg-secondary/30 border border-border rounded-2xl px-6 text-sm font-black focus:outline-none focus:border-primary/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Exchange Multiplier</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.exchangeRate}
                  onChange={(e) => handleChange('exchangeRate', Number(e.target.value))}
                  className="w-full h-14 bg-secondary/30 border border-border rounded-2xl px-6 text-sm font-black focus:outline-none focus:border-primary/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Logistics Node */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[1.25rem] bg-blue-500/10 flex items-center justify-center text-blue-600 shadow-inner">
                <Truck size={24} />
              </div>
              <div>
                <h2 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em]">Logistics Strategy</h2>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Fulfilment & Distribution costs</p>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-border p-10 shadow-sm grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Complimentary Threshold</label>
                <input
                  type="number"
                  value={form.freeShippingThreshold}
                  onChange={(e) => handleChange('freeShippingThreshold', Number(e.target.value))}
                  className="w-full h-14 bg-secondary/30 border border-border rounded-2xl px-6 text-sm font-black focus:outline-none focus:border-primary/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Base Distribution Tariff</label>
                <input
                  type="number"
                  value={form.shippingCost}
                  onChange={(e) => handleChange('shippingCost', Number(e.target.value))}
                  className="w-full h-14 bg-secondary/30 border border-border rounded-2xl px-6 text-sm font-black focus:outline-none focus:border-primary/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Transaction Protocols */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[1.25rem] bg-green-500/10 flex items-center justify-center text-green-600 shadow-inner">
                <CreditCard size={24} />
              </div>
              <div>
                <h2 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em]">Transaction Protocols</h2>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Payment authorization methods</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { id: 'codEnabled', title: 'Cash on Delivery (COD)', desc: 'Direct physical currency exchange on fulfillment' },
                { id: 'cardPaymentEnabled', title: 'Card Authorization', desc: 'Secure electronic credit/debit processing' }
              ].map(method => (
                <label key={method.id} className="group bg-white rounded-[2.5rem] border border-border p-8 shadow-sm hover:border-primary/20 hover:shadow-xl transition-all cursor-pointer flex items-center gap-6">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={(form as any)[method.id]}
                      onChange={(e) => handleChange(method.id, e.target.checked)}
                      className="peer hidden"
                    />
                    <div className="w-12 h-12 rounded-2xl bg-secondary border border-border peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center text-white">
                      <Check size={20} className="scale-0 peer-checked:scale-100 transition-transform" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-black text-foreground uppercase tracking-widest leading-tight">{method.title}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{method.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Marketing Hub */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[1.25rem] bg-orange-500/10 flex items-center justify-center text-orange-600 shadow-inner">
                <Zap size={24} />
              </div>
              <div>
                <h2 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em]">Marketing Intelligence</h2>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Conversion & promotional nodes</p>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-border p-10 shadow-sm space-y-10">
              <label className="flex items-center gap-6 p-6 rounded-3xl bg-secondary/30 border border-border group cursor-pointer hover:bg-secondary/50 transition-all">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={form.saleActive}
                    onChange={(e) => handleChange('saleActive', e.target.checked)}
                    className="peer hidden"
                  />
                  <div className="w-10 h-10 rounded-xl bg-white border border-border peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all flex items-center justify-center text-white shadow-sm">
                    <Check size={16} className="scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black text-foreground uppercase tracking-widest">Active Flash Sale Protocol</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Activate global countdown and promotional overlays</p>
                </div>
              </label>

              {form.saleActive && (
                <div className="grid md:grid-cols-2 gap-8 pt-4 animate-fade-in">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Sale Termination Date</label>
                    <input
                      type="datetime-local"
                      value={form.saleEndTime}
                      onChange={(e) => handleChange('saleEndTime', e.target.value)}
                      className="w-full h-14 bg-secondary/30 border border-border rounded-2xl px-6 text-xs font-bold focus:outline-none focus:border-primary/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Global Discount (%)</label>
                    <input
                      type="number"
                      value={form.saleDiscount}
                      onChange={(e) => handleChange('saleDiscount', Number(e.target.value))}
                      className="w-full h-14 bg-secondary/30 border border-border rounded-2xl px-6 text-sm font-black focus:outline-none focus:border-primary/20 transition-all"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Master Banner Narrative</label>
                    <input
                      type="text"
                      value={form.saleBannerText}
                      onChange={(e) => handleChange('saleBannerText', e.target.value)}
                      className="w-full h-14 bg-secondary/30 border border-border rounded-2xl px-6 text-xs font-bold focus:outline-none focus:border-primary/20 transition-all"
                      placeholder="e.g. FLASH SALE: LIMITED AVAILABILITY"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social Infrastructure */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[1.25rem] bg-purple-500/10 flex items-center justify-center text-purple-600 shadow-inner">
                <Globe size={24} />
              </div>
              <div>
                <h2 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em]">Communication Nodes</h2>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Social integration & client relations</p>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-border p-10 shadow-sm grid md:grid-cols-2 gap-8">
              {[
                { id: 'instagram', label: 'Instagram handle', icon: <Instagram size={18} /> },
                { id: 'twitter', label: 'X / Twitter handle', icon: <Twitter size={18} /> },
                { id: 'facebook', label: 'Facebook handle', icon: <Facebook size={18} /> },
                { id: 'email', label: 'Contact Email', icon: <Mail size={18} /> },
                { id: 'whatsapp', label: 'WhatsApp Mobile', icon: <Phone size={18} /> }
              ].map(link => (
                <div key={link.id} className="space-y-2">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1 flex items-center gap-2">
                    {link.icon} {link.label}
                  </label>
                  <input
                    type="text"
                    value={(form as any)[link.id] || ''}
                    onChange={(e) => handleChange(link.id, e.target.value)}
                    className="w-full h-14 bg-secondary/30 border border-border rounded-2xl px-6 text-xs font-bold focus:outline-none focus:border-primary/20 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Security Protocols */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[1.25rem] bg-red-500/10 flex items-center justify-center text-red-600 shadow-inner">
                <Lock size={24} />
              </div>
              <div>
                <h2 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em]">Security Protocols</h2>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Administrative access control</p>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-border p-10 shadow-sm">
              <div className="space-y-2 max-w-sm">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Terminal Master Key</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.adminPassword}
                    onChange={(e) => handleChange('adminPassword', e.target.value)}
                    className="w-full h-14 bg-secondary/30 border border-border rounded-2xl px-6 text-sm font-black focus:outline-none focus:border-primary/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-[8px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-2 ml-1">Rotate regularly to ensure terminal integrity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
