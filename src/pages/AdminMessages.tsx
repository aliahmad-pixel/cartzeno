import { useState } from 'react'
import {
   Mail, Search, Trash2, MessageSquare,
  Clock, ChevronDown, ChevronUp
} from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

import AdminLayout from '../components/AdminLayout'

export default function AdminMessages() {
  useDocumentTitle('Contact Messages')
  const { contactSubmissions, deleteContactSubmission } = useAdmin()

  const [searchQuery, setSearchQuery] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const filtered = contactSubmissions.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.subject && s.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <AdminLayout
      title="Communication Hub"
      subtitle={`Intercepting ${contactSubmissions.length} client transmissions`}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-8 animate-fade-up">
        {/* Search Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative max-w-xl flex-1 group">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Query by intelligence (name, email, or content)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 bg-white border border-border rounded-2xl pl-14 pr-6 text-sm font-bold focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Messages Ledger */}
        <div className="bg-white rounded-[2.5rem] border border-border overflow-hidden shadow-sm">
          {filtered.length === 0 ? (
            <div className="text-center py-24 flex flex-col items-center gap-6">
              <div className="w-24 h-24 rounded-[2rem] bg-secondary flex items-center justify-center text-muted-foreground/20">
                <MessageSquare size={48} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">No Transmissions Detected</p>
                <p className="text-xs font-bold text-muted-foreground/50">Frequency is currently silent.</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filtered.map(submission => (
                <div key={submission.id} className="hover:bg-secondary/20 transition-all group">
                  <div
                    className="p-8 flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedId(expandedId === submission.id ? null : submission.id)}
                  >
                    <div className="flex items-center gap-8 min-w-0">
                      <div className="w-14 h-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform text-primary shadow-inner">
                        <Mail size={20} />
                      </div>
                      <div className="min-w-0 space-y-1">
                        <p className="text-sm font-black text-foreground uppercase tracking-tight truncate group-hover:text-primary transition-colors">{submission.name}</p>
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest truncate">
                          {submission.email} {submission.subject && `\u00B7 ${submission.subject}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 flex-shrink-0">
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.1em] flex items-center justify-end gap-2">
                          <Clock size={12} className="text-primary/40" />
                          {new Date(submission.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setExpandedId(expandedId === submission.id ? null : submission.id)
                          }}
                          className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 transition-all shadow-sm active:scale-95"
                        >
                          {expandedId === submission.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setConfirmDelete(submission.id)
                          }}
                          className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-red-600 hover:border-red-100 transition-all shadow-sm active:scale-95 hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Message Detail Terminal */}
                  {expandedId === submission.id && (
                    <div className="px-8 pb-8 pl-[6.5rem] animate-fade-down">
                      <div className="bg-secondary/30 rounded-[2rem] p-8 border border-border space-y-6">
                        {submission.subject && (
                          <div className="space-y-1">
                            <p className="text-[8px] font-black text-primary uppercase tracking-[0.3em]">Communication Subject</p>
                            <p className="text-sm font-black text-foreground uppercase tracking-tight">{submission.subject}</p>
                          </div>
                        )}
                        <div className="space-y-2">
                          <p className="text-[8px] font-black text-primary uppercase tracking-[0.3em]">Payload Narrative</p>
                          <p className="text-sm font-bold text-foreground/80 leading-relaxed whitespace-pre-wrap">{submission.message}</p>
                        </div>
                        <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <p className="text-[8px] text-muted-foreground font-black uppercase tracking-[0.2em]">
                            Transmission Timestamp: {new Date(submission.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Security Redaction Confirmation */}
      {confirmDelete !== null && (
        <div className="fixed inset-0 z-[100] bg-foreground/60 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white rounded-[3rem] p-10 w-full max-w-sm shadow-2xl animate-zoom-in text-center space-y-8">
            <div className="w-20 h-20 rounded-[2rem] bg-red-50 flex items-center justify-center text-red-600 mx-auto shadow-inner">
              <Trash2 size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-foreground uppercase tracking-tight">Redact Transmission?</h3>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">This payload will be permanently expunged from the terminal ledger.</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 h-14 border border-border rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-secondary transition-all active:scale-95"
              >
                Abort
              </button>
              <button
                onClick={() => { deleteContactSubmission(confirmDelete); setConfirmDelete(null) }}
                className="flex-1 h-14 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-700 transition-all active:scale-95 shadow-xl shadow-red-600/20"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
