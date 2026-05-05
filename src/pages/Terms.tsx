import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Terms() {
  useDocumentTitle('Terms & Conditions')

  return (
    <div className="bg-white min-h-screen">
      <div className="px-5 md:px-20 max-w-3xl mx-auto pt-32 pb-20">
        <div className="mb-12">
          <span className="inline-block text-xs text-[#4A5DFF] uppercase tracking-[0.2em] font-semibold mb-6 px-4 py-2 bg-[#4A5DFF]/10 rounded-full">
            Legal
          </span>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-[#0A0A0A] mb-3">Terms & Conditions</h1>
          <p className="text-[#999999]">Last updated: May 2026</p>
        </div>

          <div className="space-y-8 text-[#666666] leading-relaxed">
            <section>
              <h2 className="text-[#0A0A0A] text-lg font-medium mb-3">1. Agreement to Terms</h2>
              <p>By accessing or using the Cartzeno website, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the website or make purchases.</p>
            </section>

            <section>
              <h2 className="text-[#0A0A0A] text-lg font-medium mb-3">2. Products and Pricing</h2>
              <p>All product descriptions and prices are subject to change without notice. We reserve the right to modify or discontinue any product at any time. Prices listed are in USD and do not include shipping unless stated.</p>
            </section>

            <section>
              <h2 className="text-[#0A0A0A] text-lg font-medium mb-3">3. Orders and Payment</h2>
              <p>By placing an order, you agree to provide current, complete, and accurate purchase and account information. We accept various payment methods including credit/debit cards, PayPal, and Cash on Delivery (COD) for eligible orders.</p>
            </section>

            <section>
              <h2 className="text-[#0A0A0A] text-lg font-medium mb-3">4. Shipping and Delivery</h2>
              <p>We aim to ship orders within 1-2 business days. Delivery times vary based on location and shipping method selected. We are not responsible for delays caused by customs or courier services.</p>
            </section>

            <section>
              <h2 className="text-[#0A0A0A] text-lg font-medium mb-3">5. Returns and Refunds</h2>
              <p>We offer a 30-day return policy for unused items in original packaging. Refunds are processed within 5-7 business days after we receive the returned item. Shipping costs for returns are the customer's responsibility unless the item was defective.</p>
            </section>

            <section>
              <h2 className="text-[#0A0A0A] text-lg font-medium mb-3">6. Intellectual Property</h2>
              <p>All content on the Cartzeno website, including text, graphics, logos, and images, is the property of Cartzeno Inc. and protected by copyright laws. You may not use our content without express written permission.</p>
            </section>

            <section>
              <h2 className="text-[#0A0A0A] text-lg font-medium mb-3">7. Limitation of Liability</h2>
              <p>Cartzeno shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services or products.</p>
            </section>

            <section>
              <h2 className="text-[#0A0A0A] text-lg font-medium mb-3">8. Changes to Terms</h2>
              <p>We reserve the right to update or modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the website constitutes acceptance of the updated Terms.</p>
            </section>
          </div>
        </div>
      </div>
    )
  }
