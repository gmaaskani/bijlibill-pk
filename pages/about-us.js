
import Link from 'next/link'

export default function AboutUs() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-[12px]">
        <Link href="/" className="opacity-60 hover:text-[#1b4d3e]">
          Home
        </Link>
        <span>/</span>
        <span className="font-bold">About Us</span>
      </div>

      {/* Hero */}
      <div className="rounded-[32px] bg-[#1b4d3e] p-6 md:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-[#a3e635]/20 to-transparent pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#a3e635] text-[#1b4d3e] text-[11px] font-bold px-3 py-1 rounded-full mb-4">
            💡 INDEPENDENT • BUILT FOR PAKISTAN
          </div>

          <h1 className="text-[32px] md:text-[48px] font-black leading-[0.95] tracking-tight">
            About BijliBill.pk
          </h1>

          <p className="mt-4 text-[14px] md:text-[17px] text-white/80 leading-relaxed">
            Electricity bills can be confusing, especially when tariffs,
            taxes, adjustments, and monthly household usage all affect the
            final amount. I created BijliBill.pk after facing this confusion
            myself. My goal is to make electricity-billing information easier
            to understand and help Pakistani households make more informed
            decisions about their electricity use.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-[13px] font-medium">
              Practical Electricity Tools
            </div>

            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-[13px] font-medium">
              Bill and Usage Planning
            </div>

            <div className="bg-[#a3e635] text-[#1b4d3e] px-4 py-2 rounded-full text-[13px] font-bold">
              Independent Platform
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/protected-200-unit-calculator"
              className="bg-[#a3e635] text-[#1b4d3e] px-6 py-3 rounded-full font-bold text-[13px] hover:scale-[1.02] transition"
            >
              Explore Our Tools →
            </Link>

            <Link
              href="/contact-us"
              className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-full font-bold text-[13px] hover:bg-white/20 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Mission and tools */}
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="rounded-[24px] border p-6 md:p-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 space-y-8">
          <div>
            <h2 className="text-[22px] font-black">
              Our Mission — Bijli Samjho, Behtar Faislay Karo
            </h2>

            <p className="mt-3 text-[14px] leading-[1.8] opacity-80">
              BijliBill.pk is an independent informational platform created
              to make electricity-billing concepts easier for ordinary
              households to understand. The website brings together practical
              calculators and planning tools that help users explore their
              electricity usage, understand common bill components, and
              estimate costs using the assumptions provided.
            </p>

            <p className="mt-3 text-[14px] leading-[1.8] opacity-80">
              Electricity tariffs, taxes, adjustments, and eligibility rules
              can change. Our tools are intended to help users understand
              estimates and scenarios, not to guarantee a particular bill
              amount or replace an official electricity bill. Users should
              check applicable tariff information and their own bill for
              the final figures.
            </p>

            <p className="mt-3 text-[14px] leading-[1.8] opacity-80">
              BijliBill.pk is not affiliated with NEPRA, the Government of
              Pakistan, PITC, LESCO, MEPCO, IESCO, K-Electric, or any other
              electricity distribution company.
            </p>

            <p className="mt-3 text-[14px] leading-[1.8] opacity-80">
              For official bill information, users can visit{' '}
              <a
                href="https://bill.pitc.com.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold text-[#1b4d3e] dark:text-[#a3e635]"
              >
                bill.pitc.com.pk
              </a>
              {' '}or consult their electricity provider.
            </p>
          </div>

          {/* Core tools */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-[16px] border bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
              <h3 className="font-bold text-[13px]">
                What You Can Do Here
              </h3>

              <ul className="mt-3 space-y-3 text-[12px] opacity-80 list-disc pl-4 leading-relaxed">
                <li>
                  <Link
                    href="/protected-200-unit-calculator"
                    className="underline hover:text-[#1b4d3e]"
                  >
                    Protected 200 Unit Calculator
                  </Link>
                  {' '}— explore monthly unit usage and protected-consumer
                  scenarios.
                </li>

                <li>
                  <Link
                    href="/bill-tax-decoder"
                    className="underline hover:text-[#1b4d3e]"
                  >
                    Bill Tax Decoder
                  </Link>
                  {' '}— understand common electricity-bill charges, taxes,
                  and adjustments.
                </li>

                <li>
                  <Link
                    href="/solar-net-billing-calculator"
                    className="underline hover:text-[#1b4d3e]"
                  >
                    Solar Net Billing Calculator
                  </Link>
                  {' '}— explore solar import and export scenarios using
                  the calculator's assumptions.
                </li>

                <li>
                  <Link
                    href="/rozana-budget-planner"
                    className="underline hover:text-[#1b4d3e]"
                  >
                    Rozana Budget Planner
                  </Link>
                  {' '}— track daily electricity-related usage or budget
                  entries and plan household spending.
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-[16px] border bg-[#f0fdf4] dark:bg-[#143a2f] border-green-200">
              <h3 className="font-bold text-[13px]">
                What You Should Know
              </h3>

              <ul className="mt-3 space-y-2 text-[12px] opacity-80 list-disc pl-4 leading-relaxed">
                <li>
                  Our calculators provide estimates, not official bills.
                </li>

                <li>
                  Actual charges depend on applicable tariffs, taxes,
                  adjustments, usage, and your electricity provider.
                </li>

                <li>
                  Our tools do not require you to enter an electricity-bill
                  reference number, CNIC, consumer ID, or meter number.
                </li>

                <li>
                  We are independent and are not an official government,
                  regulatory, or electricity-provider service.
                </li>

                <li>
                  Review our{' '}
                  <Link href="/privacy-policy" className="underline font-bold">
                    Privacy Policy
                  </Link>
                  {' '}to understand how information is handled.
                </li>
              </ul>
            </div>
          </div>

          {/* Why it exists */}
          <div>
            <h3 className="font-bold text-[16px] text-[#1b4d3e] dark:text-[#a3e635]">
              Why I Built BijliBill.pk
            </h3>

            <p className="mt-2 text-[13px] leading-[1.8] opacity-80">
              I built this website because I experienced the difficulty of
              understanding my own electricity bill and wanted a more
              practical way to make sense of the numbers. I wanted to bring
              useful information and simple tools together in one place,
              so people could explore their usage and costs without
              unnecessary confusion.
            </p>

            <p className="mt-3 text-[13px] leading-[1.8] opacity-80">
              My focus is on making the tools understandable, useful, and
              transparent about their limitations. I aim to improve the
              website as I identify areas that can make electricity-billing
              information easier for households to use.
            </p>
          </div>

          {/* Privacy */}
          <div>
            <h3 className="font-bold text-[16px] text-[#1b4d3e] dark:text-[#a3e635]">
              Privacy and Your Information
            </h3>

            <p className="mt-2 text-[13px] leading-[1.8] opacity-80">
              The calculators are designed so you can explore estimates
              without entering your electricity-bill reference number,
              CNIC, consumer ID, or meter number. The Rozana Budget Planner
              uses browser storage to retain its entries on the device
              where you use it. Clearing browser data may remove those
              saved entries.
            </p>

            <p className="mt-3 text-[13px] leading-[1.8] opacity-80">
              If you contact us, the information you submit through the
              contact form or email may be processed to receive and respond
              to your message. Please do not send sensitive account or
              identity information. Read our{' '}
              <Link
                href="/privacy-policy"
                className="underline font-bold text-[#1b4d3e] dark:text-[#a3e635]"
              >
                Privacy Policy
              </Link>
              {' '}for more details.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="p-4 rounded-[16px] bg-[#1b4d3e] text-white">
            <p className="text-[12px] font-bold">
              An Important Note
            </p>

            <p className="text-[11px] mt-2 opacity-80 leading-relaxed">
              BijliBill.pk is an independent informational platform.
              Calculations are estimates and may not include every
              charge or adjustment on an actual bill. Always refer to
              applicable official tariff notifications and your electricity
              provider for authoritative information.
              {' '}
              <Link href="/disclaimer" className="underline">
                Read our Disclaimer
              </Link>
              {' '}·{' '}
             
              
              <Link href="/contact-us" className="underline">
                Contact Us
              </Link>
            </p>
          </div>
        </div>

        {/* Founder and trust information */}
        <div className="space-y-4">
          <div className="rounded-[24px] border p-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <h2 className="font-bold text-[18px]">
              Meet the Founder
            </h2>

            <div className="mt-4 flex items-start gap-4">
              <div className="w-14 h-14 shrink-0 rounded-full bg-[#a3e635] flex items-center justify-center text-[#1b4d3e] font-black text-xl">
                GM
              </div>

              <div>
                <h3 className="font-black text-[16px]">
                  Ghulam Muhammad
                </h3>

                <p className="mt-1 text-[12px] font-semibold text-[#1b4d3e] dark:text-[#a3e635]">
                  Founder, Web Developer, Author &amp; Content Reviewer
                </p>
              </div>
            </div>

            <p className="mt-4 text-[13px] leading-[1.8] opacity-80">
              I created BijliBill.pk after personally experiencing
              difficulties understanding electricity bills. As the
              website's developer and author, I work on its tools and
              content with the goal of making billing information easier
              for Pakistani households to understand.
            </p>

            <p className="mt-3 text-[13px] leading-[1.8] opacity-80">
              My focus is on the usefulness and clarity of the website,
              and on explaining what its calculators can and cannot tell
              users.
            </p>

            <Link
              href="/author"
              className="inline-block mt-4 underline font-bold text-[13px] text-[#1b4d3e] dark:text-[#a3e635]"
            >
              Read the Author Profile →
            </Link>
          </div>

          <div className="rounded-[24px] border p-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <h3 className="font-bold">
              Our Approach
            </h3>

            <div className="mt-3 space-y-3 text-[12px]">
              <div className="flex items-start gap-3 p-3 rounded-[12px] bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                <span className="text-[#1b4d3e] dark:text-[#a3e635] font-black">
                  01
                </span>
                <div>
                  <p className="font-bold">Practical tools</p>
                  <p className="mt-1 opacity-70 leading-relaxed">
                    Calculators and planners designed around common
                    household electricity questions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-[12px] bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                <span className="text-[#1b4d3e] dark:text-[#a3e635] font-black">
                  02
                </span>
                <div>
                  <p className="font-bold">Clear limitations</p>
                  <p className="mt-1 opacity-70 leading-relaxed">
                    Estimates are not presented as official bills or
                    guaranteed savings.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-[12px] bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                <span className="text-[#1b4d3e] dark:text-[#a3e635] font-black">
                  03
                </span>
                <div>
                  <p className="font-bold">User privacy</p>
                  <p className="mt-1 opacity-70 leading-relaxed">
                    The tools do not require electricity-bill reference
                    numbers or identity numbers to calculate estimates.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border p-6 bg-[#0f2e25] text-white border-white/10">
            <h3 className="font-bold text-[12px] uppercase tracking-widest opacity-60">
              Get in Touch
            </h3>

            <p className="mt-3 text-[13px] leading-relaxed opacity-80">
              Have a question, found an issue, or have a suggestion
              for improving BijliBill.pk? I welcome feedback that can
              make the website more useful.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="inline-block bg-[#a3e635] text-[#1b4d3e] px-4 py-2 rounded-full font-bold text-[12px]"
              >
                Contact Us →
              </Link>

              <Link
                href="/privacy-policy"
                className="inline-block bg-white/10 text-white px-4 py-2 rounded-full font-bold text-[12px]"
              >
                Privacy Policy
              </Link>
            </div>

            <p className="mt-5 text-[11px] opacity-60">
              © 2026 BijliBill.pk. An independent informational platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
