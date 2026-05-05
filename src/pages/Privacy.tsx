import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Privacy() {
  useDocumentTitle('Privacy Policy')

  return (
    <div className="bg-white min-h-screen">
      <div className="px-5 md:px-20 max-w-3xl mx-auto pt-32 pb-20">
        <div className="mb-12">
          <span className="inline-block text-xs text-[#4A5DFF] uppercase tracking-[0.2em] font-semibold mb-6 px-4 py-2 bg-[#4A5DFF]/10 rounded-full">
            Legal
          </span>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-[#0A0A0A] mb-3">Privacy Policy</h1>
          <p className="text-[#999999]">Last updated: May 2026</p>
        </div>

          <div className="space-y-8 text-[#9A9A9A] leading-relaxed">
            <section>
              <h2 className="text-[#0A0A0A] text-lg font-medium mb-3">1. Introduction</h2>
              <p>At Cartzeno, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.</p>
            </section>

            <section>
              <h2 className="text-[#0A0A0A] text-lg font-medium mb-3">2. Information We Collect</h2>
              <p>We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Name, email address, and phone number</li>
                <li>Shipping and billing addresses</li>
                <li>Payment information (processed securely by our payment partners)</li>
                <li>Order history and preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[#0A0A0A] text-lg font-medium mb-3">3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders</li>
                <li>Send promotional emails (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[#0A0A0A] text-lg font-medium mb-3">4. Data Security</h2>
              <p>We implement industry-standard security measures including SSL encryption, secure payment processing, and regular security audits. We never store your full card details on our servers.</p>
            </section>

            <section>
              <h2 className="text-[#0A0A0A] text-lg font-medium mb-3">5. Your Rights</h2>
              <p>You have the right to access, update, or delete your personal information. You can also opt out of marketing communications at any time. Contact us at hello@cartzeno.com for data-related requests.</p>
            </section>

            <section>
              <h2 className="text-[#0A0A0A] text-lg font-medium mb-3">6. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at hello@cartzeno.com or via our Contact page.</p>
            </section>
          </div>
        </div>
      </div>
    )
  }
