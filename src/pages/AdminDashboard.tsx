import { useNavigate } from 'react-router-dom'
import {
  Package, ShoppingBag, DollarSign,
  Settings, FileSpreadsheet, TrendingUp,
  ChevronRight, MessageSquare
} from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import AdminLayout from '../components/AdminLayout'

export default function AdminDashboard() {
  useDocumentTitle('Admin Dashboard')
  const { products, orders, formatPrice, contactSubmissions, settings } = useAdmin()
  const navigate = useNavigate()

  const totalProducts = products.length
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 15).length
  const outOfStockProducts = products.filter(p => p.stock === 0).length

  const recentOrders = orders.slice(0, 5)

  const statCards = [
    { label: 'Asset Inventory', value: totalProducts, icon: <Package size={20} />, color: 'bg-blue-500/10 text-blue-600', path: '/admin/products' },
    { label: 'Order Volume', value: totalOrders, icon: <ShoppingBag size={20} />, color: 'bg-green-500/10 text-green-600', path: '/admin/orders' },
    { label: 'Gross Revenue', value: formatPrice(totalRevenue), icon: <DollarSign size={20} />, color: 'bg-amber-500/10 text-amber-600', path: '/admin/orders' },
    { label: 'Awaiting Approval', value: pendingOrders, icon: <TrendingUp size={20} />, color: 'bg-purple-500/10 text-purple-600', path: '/admin/orders' },
  ]

  return (
    <AdminLayout 
      title="Terminal Overview" 
      subtitle={`Enterprise management interface for ${settings.storeName}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-10 space-y-12 animate-fade-up">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => (
            <button
              key={card.label}
              onClick={() => navigate(card.path)}
              className="group bg-white rounded-[2.5rem] p-8 border border-border shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all text-left relative overflow-hidden active:scale-95"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[4rem] -translate-y-16 translate-x-16 transition-transform group-hover:scale-110" />
              <div className={`w-14 h-14 rounded-2xl ${card.color} flex items-center justify-center mb-6 shadow-inner relative z-10`}>
                {card.icon}
              </div>
              <p className="text-3xl font-black text-foreground relative z-10 tracking-tighter">{card.value}</p>
              <p className="text-[10px] text-muted-foreground font-black mt-2 uppercase tracking-[0.2em] relative z-10">{card.label}</p>
            </button>
          ))}
        </div>

        {/* Priority Alerts */}
        {(lowStockProducts > 0 || outOfStockProducts > 0) && (
          <div className="bg-white rounded-[2.5rem] border border-border p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500" />
            <h3 className="text-[10px] font-black text-foreground mb-6 uppercase tracking-[0.3em] flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Critical Inventory Intelligence
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {lowStockProducts > 0 && (
                <div className="flex items-center gap-4 bg-amber-50/50 p-6 rounded-3xl border border-amber-100/50 group hover:bg-amber-50 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-amber-600 shadow-sm">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-amber-900 tracking-tight">{lowStockProducts} SKUs at Threshold</p>
                    <p className="text-[10px] font-bold text-amber-700/70 uppercase tracking-widest mt-0.5">Critical low stock levels detected</p>
                  </div>
                </div>
              )}
              {outOfStockProducts > 0 && (
                <div className="flex items-center gap-4 bg-red-50/50 p-6 rounded-3xl border border-red-100/50 group hover:bg-red-50 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-red-600 shadow-sm">
                    <Package size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-red-900 tracking-tight">{outOfStockProducts} Redacted Assets</p>
                    <p className="text-[10px] font-bold text-red-700/70 uppercase tracking-widest mt-0.5">Inventory depletion confirmed</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] border border-border shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-border flex items-center justify-between bg-secondary/30">
              <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em]">Consolidated Transactions</h3>
              <button
                onClick={() => navigate('/admin/orders')}
                className="text-[10px] text-primary hover:text-primary/70 font-black uppercase tracking-[0.2em] flex items-center gap-2 group"
              >
                Access Ledger <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="flex-1">
              {recentOrders.length === 0 ? (
                <div className="p-20 text-center flex flex-col items-center gap-6">
                  <div className="w-24 h-24 rounded-[2rem] bg-secondary flex items-center justify-center text-muted-foreground/20">
                    <ShoppingBag size={48} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Awaiting Market Signal</p>
                    <p className="text-xs font-bold text-muted-foreground/50">Market interaction has not yet initialized.</p>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {recentOrders.map(order => (
                    <div key={order.id} className="p-8 flex items-center justify-between hover:bg-secondary/20 transition-all group">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-border flex items-center justify-center text-primary font-black text-xs shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all">
                          {order.id.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-black text-foreground uppercase tracking-widest">{order.id}</p>
                          <p className="text-[10px] text-muted-foreground font-black mt-1 uppercase tracking-[0.1em]">{order.customerName} &middot; {order.items.length} units</p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="text-sm font-black text-foreground tracking-tighter">{formatPrice(order.total)}</p>
                        <span className={`inline-block text-[8px] px-3 py-1 rounded-lg font-black uppercase tracking-widest border transition-colors ${
                          order.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                          order.status === 'processing' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          order.status === 'shipped' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                          order.status === 'delivered' ? 'bg-green-50 text-green-600 border-green-100' :
                          'bg-red-50 text-red-600 border-red-100'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Navigation */}
          <div className="space-y-6">
            <div className="bg-white rounded-[3rem] border border-border shadow-sm p-10">
              <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em] mb-8">Navigation Node</h3>
              <div className="space-y-3">
                {[
                  { label: 'Inventory Assets', path: '/admin/products', icon: <Package size={18} /> },
                  { label: 'Order Manifests', path: '/admin/orders', icon: <ShoppingBag size={18} /> },
                  { label: 'Communication Hub', path: '/admin/messages', icon: <MessageSquare size={18} />, count: contactSubmissions.length },
                  { label: 'System Configuration', path: '/admin/settings', icon: <Settings size={18} /> },
                ].map(action => (
                  <button
                    key={action.label}
                    onClick={() => navigate(action.path)}
                    className="w-full flex items-center justify-between p-5 rounded-2xl hover:bg-secondary transition-all group active:scale-95 border border-transparent hover:border-border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:shadow-lg transition-all">
                        {action.icon}
                      </div>
                      <span className="text-xs font-black text-foreground uppercase tracking-widest">{action.label}</span>
                      {action.count && action.count > 0 && (
                        <span className="text-[8px] bg-primary text-white px-2 py-0.5 rounded-lg font-black tracking-tighter">
                          {action.count}
                        </span>
                      )}
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground/30 group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Audit Exports */}
            <div className="bg-foreground text-white rounded-[3rem] p-10 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 blur-[80px] -translate-y-24 translate-x-24" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 relative z-10 text-white/50">Ledger Audits</h3>
              <div className="space-y-4 relative z-10">
                <button
                  onClick={() => navigate('/admin/orders')}
                  className="w-full flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                    <FileSpreadsheet size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest">Revenue Audit</p>
                    <p className="text-[8px] text-white/30 font-bold uppercase tracking-widest mt-0.5">XLSX Export Manifest</p>
                  </div>
                </button>
                <button
                  onClick={() => navigate('/admin/products')}
                  className="w-full flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <FileSpreadsheet size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest">Inventory Audit</p>
                    <p className="text-[8px] text-white/30 font-bold uppercase tracking-widest mt-0.5">XLSX Asset Inventory</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

