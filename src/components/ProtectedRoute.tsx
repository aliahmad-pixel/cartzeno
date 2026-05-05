import { Navigate, Outlet } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'
import { Zap } from 'lucide-react'

export default function ProtectedRoute() {
  const { isAdmin, isAuthLoading } = useAdmin()

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-[2rem] bg-white border border-border flex items-center justify-center shadow-xl animate-pulse">
            <Zap size={32} className="text-primary" />
          </div>
          <div className="absolute inset-0 rounded-[2rem] border-2 border-primary/20 animate-ping" />
        </div>
        <div className="mt-8 space-y-2 text-center">
          <p className="text-[10px] font-black text-foreground uppercase tracking-[0.4em] animate-pulse">Verifying Terminal Identity</p>
          <div className="flex justify-center gap-1">
            <div className="w-1 h-1 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1 h-1 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1 h-1 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />
  }

  return <Outlet />
}
