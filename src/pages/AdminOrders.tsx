import { useState } from 'react'
import {
 FileSpreadsheet, Search, Package, Eye,
  X, ChevronDown, Trash2
} from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const

import AdminLayout from '../components/AdminLayout'

export default function AdminOrders() {
  useDocumentTitle('Manage Orders')
  const { orders, updateOrderStatus, deleteOrder, exportOrdersToExcel, formatPrice } = useAdmin()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const filtered = orders.filter(o => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const orderDetail = orders.find(o => o.id === selectedOrder)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700 ring-1 ring-amber-200'
      case 'processing': return 'bg-blue-100 text-blue-700 ring-1 ring-blue-200'
      case 'shipped': return 'bg-purple-100 text-purple-700 ring-1 ring-purple-200'
      case 'delivered': return 'bg-green-100 text-green-700 ring-1 ring-green-200'
      case 'cancelled': return 'bg-red-100 text-red-700 ring-1 ring-red-200'
      default: return 'bg-gray-100 text-gray-700 ring-1 ring-gray-200'
    }
  }

  return (
    <AdminLayout
      title="Orders Management"
      subtitle={`${orders.length} total transactions found`}
      actions={
        <button
          onClick={exportOrdersToExcel}
          disabled={orders.length === 0}
          className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-600/20 active:scale-95"
        >
          <FileSpreadsheet size={16} /> Export Consolidated Data
        </button>
      }
    >
      <div className="max-w-[1400px] mx-auto px-6 py-10 space-y-8 animate-fade-up">
        {/* Statistics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Pending Approval', count: orders.filter(o => o.status === 'pending').length, color: 'amber' },
            { label: 'In Fulfilment', count: orders.filter(o => o.status === 'processing').length, color: 'blue' },
            { label: 'Successful Delivery', count: orders.filter(o => o.status === 'delivered').length, color: 'green' },
            { label: 'Total Volume', count: orders.length, color: 'primary' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-border shadow-sm group hover:shadow-xl transition-all">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">{stat.label}</p>
              <p className="text-3xl font-black text-foreground tracking-tighter group-hover:scale-110 transition-transform origin-left">{stat.count}</p>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-6 rounded-[2rem] border border-border shadow-sm flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
            <input
              type="text"
              placeholder="Filter by Order ID, Client Name, or Electronic Mail..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 bg-secondary/30 border border-border rounded-2xl pl-14 pr-6 text-xs font-bold focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all"
            />
          </div>
          <div className="relative w-full md:w-64">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-14 bg-secondary/30 border border-border rounded-2xl px-6 pr-12 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Fulfilment States</option>
              {STATUS_OPTIONS.map(s => (
                <option key={s} value={s}>{s.toUpperCase()}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-[2rem] border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/30 border-b border-border">
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Transaction / Method</th>
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Principal Client</th>
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Date Logged</th>
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Items Count</th>
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Gross Revenue</th>
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Fulfilment</th>
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Administrative</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(order => (
                  <tr key={order.id} className="hover:bg-secondary/10 transition-colors group">
                    <td className="px-8 py-6">
                      <p className="text-xs font-black text-foreground font-mono tracking-tighter uppercase">{order.id}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{order.paymentMethod.toUpperCase()}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs font-black text-foreground uppercase tracking-tight">{order.customerName}</p>
                      <p className="text-[10px] font-bold text-muted-foreground lowercase mt-0.5">{order.email}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-xs font-black text-foreground tracking-tighter uppercase">{order.items.length} Units</td>
                    <td className="px-8 py-6 text-sm font-black text-primary tracking-tighter">{formatPrice(order.total)}</td>
                    <td className="px-8 py-6">
                      <div className="relative">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className={`text-[10px] px-4 py-2 rounded-xl font-black uppercase tracking-widest appearance-none cursor-pointer border-0 shadow-sm transition-all hover:scale-105 active:scale-95 ${getStatusColor(order.status)}`}
                        >
                          {STATUS_OPTIONS.map(s => (
                            <option key={s} value={s}>{s.toUpperCase()}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setSelectedOrder(order.id)}
                          className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 hover:shadow-lg transition-all"
                          title="Review Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(order.id)}
                          className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive/20 hover:shadow-lg transition-all"
                          title="Purge Record"
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
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">No transaction records detected</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {orderDetail && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center p-6 overflow-y-auto animate-fade-in backdrop-blur-sm bg-black/20">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl my-8 shadow-2xl border border-border overflow-hidden animate-zoom-in">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-border p-8 flex items-center justify-between z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <h2 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em]">Order Specification</h2>
                </div>
                <p className="text-2xl font-black text-foreground tracking-tighter uppercase">{orderDetail.id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="w-12 h-12 rounded-2xl bg-secondary hover:bg-border text-muted-foreground transition-all flex items-center justify-center">
                <X size={24} />
              </button>
            </div>

            <div className="p-10 space-y-10">
              {/* Customer Info */}
              <div className="bg-secondary/30 rounded-[2rem] p-8 space-y-6 border border-border">
                <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em] flex items-center gap-3">
                  <div className="w-6 h-px bg-primary" /> Principal Entity Information
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Legal Name</p>
                    <p className="text-sm font-black text-foreground tracking-tight">{orderDetail.customerName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Communication Channel</p>
                    <p className="text-sm font-black text-foreground tracking-tight">{orderDetail.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Mobile Contact</p>
                    <p className="text-sm font-black text-foreground tracking-tight">{orderDetail.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Payment Protocol</p>
                    <p className="text-sm font-black text-foreground tracking-tight">{orderDetail.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Secure Card Authorization'}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-border space-y-1">
                  <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Logistics Destination</p>
                  <p className="text-sm font-black text-foreground tracking-tight leading-relaxed">{orderDetail.address}, {orderDetail.city}, {orderDetail.postalCode}</p>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em] flex items-center gap-3">
                  <div className="w-6 h-px bg-primary" /> Manifest Inventory
                </h3>
                <div className="space-y-4">
                  {orderDetail.items.map(item => (
                    <div key={item.id} className="flex gap-6 items-center group bg-white hover:bg-secondary/30 p-4 rounded-3xl border border-transparent hover:border-border transition-all">
                      <div className="w-20 h-24 rounded-2xl bg-secondary border border-border overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      </div>
                      <div className="flex-1 min-w-0 py-2 flex flex-col justify-between self-stretch">
                        <p className="text-xs font-black text-foreground uppercase tracking-widest leading-tight line-clamp-2">{item.name}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{formatPrice(item.price)} × {item.quantity} Units</p>
                      </div>
                      <p className="text-sm font-black text-foreground tracking-tighter self-end py-2">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="bg-secondary/10 rounded-[2rem] p-8 border border-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Subtotal Manifest</span>
                  <span className="text-sm font-black text-foreground">{formatPrice(orderDetail.subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Logistics Allocation</span>
                  <span className="text-sm font-black text-foreground">{orderDetail.shipping === 0 ? 'Complimentary' : formatPrice(orderDetail.shipping)}</span>
                </div>
                <div className="h-px bg-border my-4" />
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-foreground uppercase tracking-[0.2em]">Gross Total Settlement</span>
                  <span className="text-3xl font-black text-primary tracking-tighter">{formatPrice(orderDetail.total)}</span>
                </div>
              </div>

              {/* Status Update */}
              <div className="flex items-center justify-between gap-6 pt-6 border-t border-border">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Administrative Override Status</p>
                <select
                  value={orderDetail.status}
                  onChange={(e) => updateOrderStatus(orderDetail.id, e.target.value as any)}
                  className={`text-[10px] px-6 py-3 rounded-2xl font-black uppercase tracking-widest appearance-none cursor-pointer border-0 shadow-lg shadow-primary/5 transition-all hover:scale-105 active:scale-95 ${getStatusColor(orderDetail.status)}`}
                >
                  {STATUS_OPTIONS.map(s => (
                    <option key={s} value={s}>{s.toUpperCase()}</option>
                  ))}
                </select>
              </div>
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
              <h3 className="text-xl font-black text-foreground tracking-tight">Purge Transaction Record?</h3>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-relaxed">This action will permanently redact this transaction from the consolidated ledger. This cannot be undone.</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 h-14 rounded-2xl bg-secondary text-[10px] font-black text-foreground uppercase tracking-widest hover:bg-border transition-all"
              >
                Retain
              </button>
              <button
                onClick={() => { deleteOrder(confirmDelete); setConfirmDelete(null) }}
                className="flex-1 h-14 rounded-2xl bg-red-600 text-[10px] font-black text-white uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95"
              >
                Purge Record
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
