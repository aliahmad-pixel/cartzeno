import { useEffect, useState, useCallback } from 'react'
import { useAdmin } from '../context/AdminContext'
import { Zap, X } from 'lucide-react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

function calculateTimeLeft(targetTime: string): TimeLeft {
  const difference = new Date(targetTime).getTime() - Date.now()
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    expired: false
  }
}

export default function SaleBanner() {
  const { settings } = useAdmin()
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true })
  const [dismissed, setDismissed] = useState(() => {
    const stored = localStorage.getItem('sale-banner-dismissed')
    if (!stored) return false
    const dismissedUntil = parseInt(stored, 10)
    return dismissedUntil > Date.now()
  })

  const isActive = settings.saleActive && settings.saleEndTime

  const updateTimer = useCallback(() => {
    if (!isActive) return
    const tl = calculateTimeLeft(settings.saleEndTime)
    setTimeLeft(tl)
    if (tl.expired) {
      setDismissed(true)
    }
  }, [isActive, settings.saleEndTime])

  useEffect(() => {
    if (!isActive) return
    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [isActive, updateTimer])

  if (!isActive || timeLeft.expired || dismissed) return null

  const pad = (n: number) => n.toString().padStart(2, '0')

  const timerBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <div className="bg-[#0A0A0A] text-white text-center relative z-[55]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-20 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#4A5DFF] flex items-center justify-center flex-shrink-0">
            <Zap size={16} fill="white" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-bold uppercase tracking-wider truncate">
              {settings.saleBannerText || 'Flash Sale!'}
            </p>
            <p className="text-xs text-white/60 hidden sm:inline">
              {settings.saleDiscount}% off everything — ends soon!
            </p>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {timerBlocks.map((block, i) => (
            <div key={block.label} className="flex items-center gap-1 sm:gap-2">
              <div className="text-center">
                <div className="bg-white/10 rounded-lg px-2 py-1 min-w-[36px] sm:min-w-[48px]">
                  <span className="text-sm sm:text-lg font-bold font-mono tabular-nums">
                    {pad(block.value)}
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-white/50 uppercase mt-0.5 block">{block.label}</span>
              </div>
              {i < timerBlocks.length - 1 && (
                <span className="text-white/40 font-bold text-sm sm:text-lg -mt-3">:</span>
              )}
            </div>
          ))}
        </div>

        {/* Dismiss */}
        <button
          onClick={() => {
            setDismissed(true)
            localStorage.setItem('sale-banner-dismissed', String(Date.now() + 1000 * 60 * 60 * 24))
          }}
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors ml-2"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
