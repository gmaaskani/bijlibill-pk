
import Link from 'next/link'

export default function ContactUs() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-[12px]">
        <Link href="/" className="opacity-60 hover:text-[#1b4d3e]">
          Home
        </Link>
        <span>/</span>
        <span className="font-bold">Contact Us</span>
      </div>

      <div className="rounded-[32px] bg-[#1b4d3e] p-6 md:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-[#a3e635]/20 to-transparent pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#a3e635] text-[#1b4d3e] text-[11px] font-bold px-3 py-1 rounded-full mb-4">
            📩 INDEPENDENT SUPPORT • NOT GOVERNMENT
          </div>

          <h1 className="text-[32px] md:text-[44px] font-black leading-[0.95] tracking-tight">
            Contact BijliBill.pk
          </h1>

          <p className="mt-4 text-[14px] md:text-[16px] text-white/80 leading-relaxed">
            Have a question about an electricity bill, protected consumer
            calculations, bill taxes, solar net billing, or household
            budgeting? Contact us by email or use the form below. BijliBill.pk
            is an independent informational platform and is not affiliated
            with NEPRA, the government, or electricity distribution companies.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="mailto:info@bijlibill.pk"
              className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-[13px] font-medium hover:bg-white/20 transition"
            >
              info@bijlibill.pk
            </a>

            <a
              href="mailto:contact@bijlibill.pk"
              className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-[13px] font-medium hover:bg-white/20 transition"
            >
              contact@bijlibill.pk
            </a>

            <div className="bg-[#a3e635] text-[#1b4d3e] px-4 py-2 rounded-full text-[13px] font-bold">
              No Bill Reference Number Required
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Link
              href="/about-us"
              className="bg-white text-[#1b4d3e] px-5 py-2.5 rounded-full font-bold text-[13px] hover:bg-zinc-100 transition"
            >
              About Us
            </Link>

            <Link
              href="/privacy-policy"
              className="bg-white/10 text-white px-5 py-2.5 rounded-full font-bold text-[13px] hover:bg-white/20 transition"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="rounded-[24px] border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1b4d3e] text-white flex items-center justify-center">
              ✉️
            </div>

            <div>
              <h2 className="text-[18px] font-black">
                Send Us a Message
              </h2>
              <p className="text-[11px] opacity-60">
                Your message is submitted through FormSubmit to
                info@bijlibill.pk.
              </p>
            </div>
          </div>

          <form
            action="https://formsubmit.co/info@bijlibill.pk"
            method="POST"
            className="mt-6 space-y-4"
          >
            <input type="hidden" name="_captcha" value="false" />

            <input
              type="hidden"
              name="_next"
              value="https://bijlibill.pk/contact-us?sent=true"
            />

            <input
              type="hidden"
              name="_subject"
              value="BijliBill.pk Contact - New Message"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="text-[11px] font-bold uppercase tracking-widest opacity-60"
                >
                  Your Name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder="e.g. Ali Ahmed"
                  className="mt-2 w-full h-[48px] rounded-[12px] border px-4 text-[14px] font-medium bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#1b4d3e]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="text-[11px] font-bold uppercase tracking-widest opacity-60"
                >
                  Email Address
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  placeholder="ali@gmail.com"
                  className="mt-2 w-full h-[48px] rounded-[12px] border px-4 text-[14px] font-medium bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#1b4d3e]/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="text-[11px] font-bold uppercase tracking-widest opacity-60"
              >
                Message
              </label>

              <textarea
                id="contact-message"
                name="message"
                required
                minLength={5}
                maxLength={5000}
                rows={5}
                placeholder="Write your question in English or Roman Urdu. Please do not include your bill reference number, CNIC, consumer ID, or meter number."
                className="mt-2 w-full rounded-[12px] border p-4 text-[14px] bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
              ></textarea>
            </div>

            <p className="text-[11px] opacity-60 leading-relaxed">
              By submitting this form, you understand that the information
              you provide will be sent through FormSubmit to our contact
              email so we can respond. Please avoid including sensitive
              personal or electricity-account information. See our{' '}
              <Link
                href="/privacy-policy"
                className="underline font-bold"
              >
                Privacy Policy
              </Link>
              .
            </p>

            <button
              type="submit"
              className="w-full h-[52px] rounded-full bg-[#1b4d3e] text-white font-bold text-[14px] hover:bg-[#143a2f] transition"
            >
              Send Message → info@bijlibill.pk
            </button>

            <p className="text-[10px] opacity-50 text-center">
              Contact service: FormSubmit •{' '}
              <Link href="/privacy-policy" className="underline font-bold">
                Privacy Policy
              </Link>
              {' '}•{' '}
              <Link href="/about-us" className="underline font-bold">
                About Us
              </Link>
              {' '}•{' '}
              <Link href="/" className="underline font-bold">
                Home
              </Link>
            </p>
          </form>
        </div>

        <div className="space-y-4">
          <div className="rounded-[24px] border p-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <h2 className="font-bold text-[14px]">
              Direct Contact
            </h2>

            <div className="mt-4 space-y-3 text-[13px]">
              <div className="flex justify-between items-center gap-3 p-3 rounded-[12px] bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                <span className="font-bold text-[12px]">
                  Primary Email
                </span>

                <a
                  href="mailto:info@bijlibill.pk"
                  className="font-mono text-[12px] underline hover:text-[#1b4d3e]"
                >
                  info@bijlibill.pk
                </a>
              </div>

              <div className="flex justify-between items-center gap-3 p-3 rounded-[12px] bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                <span className="font-bold text-[12px]">
                  Support Email
                </span>

                <a
                  href="mailto:contact@bijlibill.pk"
                  className="font-mono text-[12px] underline hover:text-[#1b4d3e]"
                >
                  contact@bijlibill.pk
                </a>
              </div>

              <div className="p-3 rounded-[12px] bg-[#f0fdf4] dark:bg-[#143a2f] border border-green-200">
                <p className="text-[11px] font-bold">
                  Information We Don't Need
                </p>

                <p className="text-[10px] opacity-70 mt-1 leading-relaxed">
                  Please do not send electricity-bill reference numbers,
                  consumer IDs, CNIC numbers, meter numbers, or copies
                  of personal bills. For official bill information, visit{' '}
                  <a
                    href="https://bill.pitc.com.pk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-bold"
                  >
                    bill.pitc.com.pk
                  </a>
                  .
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <Link
                  href="/about-us"
                  className="p-3 rounded-[12px] bg-[#1b4d3e] text-white text-center font-bold text-[12px] hover:bg-[#143a2f] transition"
                >
                  About Us →
                </Link>

                <Link
                  href="/privacy-policy"
                  className="p-3 rounded-[12px] bg-zinc-900 dark:bg-zinc-700 text-white text-center font-bold text-[12px]"
                >
                  Privacy Policy →
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border p-6 bg-[#0f2e25] text-white border-white/10">
            <h3 className="font-bold text-[12px] uppercase tracking-widest opacity-60">
              How We Can Help
            </h3>

            <p className="mt-3 text-[13px] leading-relaxed opacity-80">
              BijliBill.pk was created to make electricity-billing
              information easier to understand. For questions about a
              particular tool, you can visit the relevant page below.
              Response times may vary, and we cannot access or correct
              your official electricity account.
            </p>

            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-[13px]">
              <Link
                href="/protected-200-unit-calculator"
                className="underline text-[#a3e635]"
              >
                Protected 200
              </Link>

              <Link
                href="/bill-tax-decoder"
                className="underline text-[#a3e635]"
              >
                Tax Decoder
              </Link>

              <Link
                href="/solar-net-billing-calculator"
                className="underline text-[#a3e635]"
              >
                Solar 2026
              </Link>

              <Link
                href="/rozana-budget-planner"
                className="underline text-[#a3e635]"
              >
                Budget Planner
              </Link>
            </div>

            <p className="mt-5 text-[11px] opacity-60">
              Independent informational platform • Not affiliated with
              government or electricity providers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
