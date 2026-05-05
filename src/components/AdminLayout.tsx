import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, ArrowRight, ArrowLeft } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

interface AdminLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
  backPath?: string
  actions?: ReactNode
}

export default function AdminLayout({ children, title, subtitle, backPath, actions }: AdminLayoutProps) {
  const { settings, logout } = useAdmin()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-secondary/50">
      <header className="glass border-b border-border sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {backPath ? (
              <button onClick={() => navigate(backPath)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary text-muted-foreground hover:text-foreground transition-all">
                <ArrowLeft size={20} />
              </button>
            ) : (
              <button onClick={() => navigate('/admin')} className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">C</div>
                <div className="flex flex-col">
                  <span className="font-black text-foreground leading-none">{settings.storeName}</span>
                  <span className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mt-1">Management</span>
                </div>
              </button>
            )}
            
            <div className="w-px h-8 bg-border hidden md:block" />

            {(title || subtitle) && (
              <div className="hidden sm:block">
                {title && <h1 className="font-black text-foreground text-lg leading-none">{title}</h1>}
                {subtitle && <p className="text-xs text-muted-foreground font-bold mt-1 uppercase tracking-widest">{subtitle}</p>}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {actions}
            <div className="w-px h-8 bg-border mx-2" />
            <button
              onClick={() => navigate('/')}
              className="hidden sm:flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-all px-4 py-2.5 rounded-xl hover:bg-white shadow-sm"
            >
              Public Store <ArrowRight size={14} />
            </button>
            <button
              onClick={() => { logout(); navigate('/') }}
              className="flex items-center gap-2 text-xs font-bold text-destructive hover:bg-destructive/5 transition-all px-4 py-2.5 rounded-xl"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>
      <main className="p-6 md:p-10">
        {children}
      </main>
    </div>
  )
}

