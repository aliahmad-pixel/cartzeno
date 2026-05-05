import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function AdminLogin() {
  useDocumentTitle('Terminal Access')
  const { login } = useAdmin()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    const result = await login(email, password)
    
    if (result.success) {
      navigate('/admin')
    } else {
      setError(result.error || 'Identity verification failed. Access denied.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-6 selection:bg-primary selection:text-white relative overflow-hidden">
      {/* Strategic Background Elements */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-secondary/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      
      <div className="w-full max-w-md relative z-10 animate-fade-up">
        <button
          onClick={() => navigate('/')}
          className="group flex items-center gap-4 text-[10px] font-black text-muted-foreground hover:text-foreground transition-all mb-12 uppercase tracking-[0.4em]"
        >
          <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center group-hover:bg-secondary group-hover:-translate-x-1 transition-all">
            <ArrowLeft size={16} />
          </div>
          Return to Archive
        </button>

        <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl border border-border ring-1 ring-border/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[4rem] -translate-y-16 translate-x-16 transition-transform group-hover:scale-110" />
          
          <div className="space-y-8 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-[1.5rem] bg-primary flex items-center justify-center shadow-2xl shadow-primary/30 ring-4 ring-primary/10">
                <Lock size={28} className="text-white" />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl font-black text-foreground tracking-tighter italic uppercase">Terminal Access.</h1>
                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em]">Management Protocol Hub</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] ml-1">Identity Terminal (Email)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ADMIN@CARTZENO.COM"
                    className="w-full h-16 bg-secondary/50 border border-border rounded-2xl px-6 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-inner"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] ml-1">Secure Passphrase</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full h-16 bg-secondary/50 border border-border rounded-2xl px-6 text-[10px] font-black tracking-widest focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-inner"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-[10px] font-black px-6 py-4 rounded-2xl border border-red-100 animate-shake uppercase tracking-widest">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-18 btn-primary text-[10px] font-black uppercase tracking-[0.4em] shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-4 group"
              >
                {loading ? 'Authenticating Identity...' : 'Initialize Terminal'}
                {!loading && <div className="w-6 h-px bg-white/30 group-hover:w-10 transition-all" />}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em] opacity-40">
            System Protocol v1.0.42
          </p>
          <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </div>
  )
}
