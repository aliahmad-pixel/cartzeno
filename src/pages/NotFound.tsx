import { Link } from 'react-router-dom'
import { ArrowLeft, Search, X } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Node Not Found')
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-6 selection:bg-primary selection:text-white relative overflow-hidden">
      {/* Tactical Background Elements */}
      <div className="absolute top-0 right-0 w-[70vw] h-[70vw] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-secondary/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="text-center max-w-xl relative z-10 animate-fade-up">
        <div className="relative inline-block group mb-12">
          <div className="w-32 h-32 rounded-[3.5rem] bg-white border border-border flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-700 ring-1 ring-border/50">
            <Search size={48} className="text-primary animate-pulse" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-foreground text-white rounded-2xl flex items-center justify-center shadow-2xl animate-bounce">
            <X size={20} />
          </div>
        </div>
        
        <div className="space-y-6 mb-12">
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-[2px] bg-primary" />
            <span className="text-[10px] text-primary font-black uppercase tracking-[0.5em]">Protocol Error</span>
            <div className="w-10 h-[2px] bg-primary" />
          </div>
          <h1 className="text-[clamp(4rem,15vw,10rem)] text-foreground leading-[0.7] font-black tracking-tighter italic uppercase">
            404.
          </h1>
          <div className="space-y-4 pt-6">
            <h2 className="text-2xl font-black text-foreground tracking-tight uppercase italic">Target Node Redacted.</h2>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] max-w-sm mx-auto leading-relaxed">
              The requested directory coordinate does not exist in the master archive or has been moved to a high-security sector.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/"
            className="w-full sm:w-auto btn-primary h-18 px-10 text-[10px] font-black uppercase tracking-[0.4em] shadow-primary/30 flex items-center justify-center gap-4 group active:scale-95 transition-all"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Return to Base
          </Link>
          <Link
            to="/shop"
            className="w-full sm:w-auto h-18 px-10 flex items-center justify-center rounded-2xl border border-border bg-white text-[10px] font-black text-foreground uppercase tracking-[0.4em] hover:bg-secondary/30 transition-all active:scale-95 shadow-sm"
          >
            Browse Archive
          </Link>
        </div>

        <div className="mt-20 flex flex-col items-center gap-2 opacity-30">
          <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.5em]">
            Cartzeno Infrastructure Guard
          </p>
          <div className="w-1 h-1 rounded-full bg-primary" />
        </div>
      </div>
    </div>
  )
}
