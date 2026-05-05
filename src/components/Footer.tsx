import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Instagram, Twitter, Facebook } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

export default function Footer() {
  const { settings } = useAdmin()

  return (
    <footer className="bg-foreground relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* CTA Section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-20 pt-24 pb-20 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="text-white text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-tight tracking-tighter">
            Elevate your <br className="hidden md:block" /> <span className="text-primary">lifestyle.</span>
          </h2>
          <Link
            to="/shop"
            className="w-20 h-20 rounded-full bg-primary flex items-center justify-center hover:scale-110 hover:bg-primary/90 transition-all duration-500 shadow-[0_0_40px_rgba(74,93,255,0.4)] group"
          >
            <ArrowRight size={32} className="text-white group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-20 py-20 border-t border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8">Catalog</h3>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-sm text-white/50 hover:text-primary transition-colors font-medium">New Arrivals</Link></li>
              <li><Link to="/shop?category=Electronics" className="text-sm text-white/50 hover:text-primary transition-colors font-medium">Electronics</Link></li>
              <li><Link to="/shop?category=Home%20%26%20Living" className="text-sm text-white/50 hover:text-primary transition-colors font-medium">Home & Interior</Link></li>
              <li><Link to="/shop?category=Fashion" className="text-sm text-white/50 hover:text-primary transition-colors font-medium">Apparel</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8">Company</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm text-white/50 hover:text-primary transition-colors font-medium">Our Story</Link></li>
              <li><span className="text-sm text-white/30 cursor-default font-medium">Careers</span></li>
              <li><span className="text-sm text-white/30 cursor-default font-medium">Impact</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8">Support</h3>
            <ul className="space-y-4">
              <li><Link to="/faq" className="text-sm text-white/50 hover:text-primary transition-colors font-medium">Knowledge Base</Link></li>
              <li><span className="text-sm text-white/30 cursor-default font-medium">Track Order</span></li>
              <li><span className="text-sm text-white/30 cursor-default font-medium">Return Policy</span></li>
              <li><Link to="/contact" className="text-sm text-white/50 hover:text-primary transition-colors font-medium">Get in Touch</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8">Connect</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${settings.email || 'hello@cartzeno.com'}`}
                  className="text-sm text-white/50 hover:text-primary transition-colors font-bold flex items-center gap-3"
                >
                  <Mail size={16} /> {settings.email || 'hello@cartzeno.com'}
                </a>
              </li>
              <div className="flex gap-4 pt-4">
                {[
                  { icon: <Instagram size={20} />, label: 'Instagram' },
                  { icon: <Twitter size={20} />, label: 'Twitter' },
                  { icon: <Facebook size={20} />, label: 'Facebook' }
                ].map(social => (
                  <button key={social.label} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-primary transition-all">
                    {social.icon}
                  </button>
                ))}
              </div>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-20 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-foreground text-[10px] font-black">C</div>
            <span className="text-[11px] text-white/30 font-bold uppercase tracking-widest">&copy; 2026 {settings.storeName || 'Cartzeno'} Global.</span>
          </div>
          <div className="flex gap-8">
            <Link to="/privacy" className="text-[11px] text-white/30 font-bold uppercase tracking-widest hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-[11px] text-white/30 font-bold uppercase tracking-widest hover:text-white transition-colors">Terms</Link>
            <Link to="/admin-login" className="text-[11px] text-white/30 font-bold uppercase tracking-widest hover:text-primary transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
