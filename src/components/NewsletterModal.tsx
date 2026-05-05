import { useState, useEffect } from 'react'
import { X, Mail } from 'lucide-react'

export default function NewsletterModal() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem('newsletter-dismissed')
      if (!dismissed) setVisible(true)
    }, 8000)
    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setVisible(false)
    localStorage.setItem('newsletter-dismissed', 'true')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setVisible(false)
      localStorage.setItem('newsletter-dismissed', 'true')
    }, 2000)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/50" onClick={handleDismiss} />
      <div className="relative bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#666666] hover:bg-[#E5E5E5] transition-colors"
        >
          <X size={16} />
        </button>

        <div className="w-12 h-12 rounded-xl bg-[#4A5DFF]/10 flex items-center justify-center mb-5">
          <Mail size={20} className="text-[#4A5DFF]" />
        </div>

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-green-600">
                <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#0A0A0A] mb-2">You're subscribed!</h3>
            <p className="text-sm text-[#666666]">Welcome to the Cartzeno family.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2">Join the inner circle</h3>
            <p className="text-sm text-[#666666] mb-6">
              Get exclusive offers, early access to new arrivals, and curated content delivered to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 h-11 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl px-4 text-sm focus:outline-none focus:border-[#4A5DFF] transition-colors"
              />
              <button
                type="submit"
                className="h-11 bg-[#4A5DFF] text-white px-5 rounded-xl font-medium hover:bg-[#3A4DE8] transition-colors shadow-lg shadow-[#4A5DFF]/20 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-[#999999] mt-4">No spam, ever. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </div>
  )
}
