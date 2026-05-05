import { useState } from 'react'
import { X, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem('announcement-dismissed') === 'true'
  })
  const { settings } = useAdmin()

  if (dismissed) return null

  return (
    <div className="bg-[#4A5DFF] text-white text-center text-xs sm:text-sm py-2.5 px-4 relative z-[60]">
      <div className="flex items-center justify-center gap-2">
        <Truck size={14} />
        <span className="font-medium">
          Free shipping on orders over {settings.currencySymbol}{settings.freeShippingThreshold}
        </span>
        <span className="hidden sm:inline text-white/70">|</span>
        <Link to="/shop" className="hidden sm:inline font-semibold underline underline-offset-2 hover:text-white/80 transition-colors">
          Shop Now
        </Link>
      </div>
      <button
        onClick={() => {
          setDismissed(true)
          localStorage.setItem('announcement-dismissed', 'true')
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  )
}
