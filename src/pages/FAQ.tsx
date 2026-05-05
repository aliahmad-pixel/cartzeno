import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function FAQ() {
  useDocumentTitle('FAQ')
  const { faqs } = useAdmin()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="bg-white min-h-screen">
      <div className="px-5 md:px-20 max-w-3xl mx-auto pt-32 pb-20">
        <div className="text-center mb-16">
          <span className="inline-block text-xs text-[#4A5DFF] uppercase tracking-[0.2em] font-semibold mb-6 px-4 py-2 bg-[#4A5DFF]/10 rounded-full">
            Support Center
          </span>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-[#0A0A0A] mb-4">FAQ</h1>
          <p className="text-[#666666] text-lg max-w-xl mx-auto">
            Find answers to common questions about orders, shipping, returns, and payments.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === i ? 'border-[#4A5DFF]/30 shadow-md shadow-[#4A5DFF]/5' : 'border-[#E5E5E5]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`w-full flex items-center gap-4 p-5 text-left transition-colors ${
                  openIndex === i ? 'bg-[#4A5DFF]/5' : 'hover:bg-[#FAFAFA]'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                  openIndex === i ? 'bg-[#4A5DFF] text-white' : 'bg-[#F5F5F5] text-[#999999]'
                }`}>
                  <HelpCircle size={16} />
                </div>
                <span className={`font-medium flex-1 pr-4 ${openIndex === i ? 'text-[#4A5DFF]' : 'text-[#0A0A0A]'}`}>
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-[#999999] flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-5 pl-[4.5rem]">
                  <p className="text-[#666666] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still need help? */}
        <div className="mt-16 text-center p-8 bg-[#FAFAFA] rounded-2xl">
          <h3 className="text-lg font-semibold text-[#0A0A0A] mb-2">Still have questions?</h3>
          <p className="text-[#666666] text-sm mb-5">Our support team is here to help you with anything.</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#4A5DFF] text-white px-6 py-3 rounded-full font-medium hover:bg-[#3A4DE8] transition-colors shadow-lg shadow-[#4A5DFF]/20"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}
