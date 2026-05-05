import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', toggle)
    return () => window.removeEventListener('scroll', toggle)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-24 right-6 z-40 w-11 h-11 bg-[#0A0A0A] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#4A5DFF] transition-colors"
      aria-label="Scroll to top"
    >
      <ArrowUp size={18} />
    </button>
  )
}
