import { MessageCircle } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

export default function WhatsAppButton() {
  const { settings } = useAdmin()

  const phone = settings.whatsapp || '03404524811'
  const waNumber = phone.startsWith('0') ? '92' + phone.slice(1) : phone

  return (
    <a
      href={`https://wa.me/${waNumber}?text=Hi%20Cartzeno!%20I%20want%20to%20place%20an%20order.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
      aria-label="Order on WhatsApp"
    >
      <MessageCircle size={20} fill="white" />
      <span className="text-sm font-semibold hidden sm:inline">Order on WhatsApp</span>
    </a>
  )
}
