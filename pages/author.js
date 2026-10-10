
import Head from 'next/head'
import Link from 'next/link'

export default function Author() {
  return (
    <>
      <Head>
        <title>Ghulam Muhammad — Founder & Author | BijliBill.pk</title>
        <meta
          name="description"
          content="Meet Ghulam Muhammad, the founder, web developer, author, and content reviewer behind BijliBill.pk, an independent website created to make electricity billing easier to understand."
        />
        <meta
          property="og:title"
          content="Ghulam Muhammad | BijliBill.pk"
        />
        <meta
          property="og:description"
          content="Learn the personal story behind BijliBill.pk and its mission to make electricity billing easier to understand."
        />
        <meta
          property="og:url"
          content="https://bijlibill.pk/author"
        />
        <meta property="og:type" content="profile" />
        <link rel="canonical" href="https://bijlibill.pk/author" />
      </Head>

      <div className="space-y-6">
        {/* Hero */}
        <div className="rounded-[24px] bg-[#1b4d3e] p-6 md:p-10 text-white">
          <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold tracking-widest">
            MEET THE FOUNDER
          </div>

          <div className="mt-5 flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 shrink-0 rounded-full bg-[#a3e635] text-[#1b4d3e] flex items-center justify-center text-[30px] font-black">
              GM
            </div>

            <div>
              <h1 className="text-[28px] md:text-[36px] font-black">
                Ghulam Muhammad
              </h1>

              <p className="mt-2 text-[13px] md:text-[14px] font-bold text-[#a3e635]">
                Founder · Web Developer · Author · Content Reviewer
              </p>

              <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-white/80">
                Building practical online tools to help people understand
                electricity bills, explore calculations, and manage everyday
                budgeting with greater clarity.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="space-y-4">
            {/* My Story */}
            <div className="rounded-[24px] border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <h2 className="text-[20px] font-black">
                My Story: Why I Created BijliBill.pk
              </h2>

              <div className="mt-4 space-y-4 text-[13px] leading-relaxed opacity-80">
                <p>
                  BijliBill.pk started with a problem I experienced myself.
                  I found it difficult to understand my own electricity bill
                  and make sense of the different amounts and charges on it.
                </p>

                <p>
                  I wanted a simpler way to explore electricity calculations
                  without having to struggle through confusing information.
                  That personal experience gave me the idea to build a
                  website where people could use straightforward tools to
                  understand estimates and work through common billing
                  questions.
                </p>

                <p>
                  As a web developer, I began building BijliBill.pk around
                  that goal. What started with a problem I wanted to solve
                  for myself became an independent website designed to make
                  useful calculations and information easier to access.
                </p>

                <p>
                  I understand that electricity costs matter to household
                  budgets. My aim is to make the numbers easier to explore
                  and understand, while being clear that online estimates
                  are not a replacement for an official electricity bill.
                </p>
              </div>
            </div>

            {/* My Role */}
            <div className="rounded-[24px] border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <h2 className="text-[20px] font-black">
                My Role at BijliBill.pk
              </h2>

              <div className="mt-4 space-y-4 text-[13px] leading-relaxed opacity-80">
                <div>
                  <h3 className="font-bold text-[14px] opacity-100">
                    Founder and Web Developer
                  </h3>
                  <p className="mt-1">
                    I build and maintain the website and its interactive
                    tools, with a focus on usability, clear presentation,
                    and making calculations easier to follow.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[14px] opacity-100">
                    Author
                  </h3>
                  <p className="mt-1">
                    I prepare website content to explain billing concepts,
                    calculator features, and practical ways to understand
                    the information users enter and the results they receive.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[14px] opacity-100">
                    Content Reviewer
                  </h3>
                  <p className="mt-1">
                    I review the content and explanations published on
                    BijliBill.pk for clarity and consistency. Where a
                    calculation depends on changing tariffs, taxes, or
                    billing rules, users should consult the relevant
                    electricity provider and official sources.
                  </p>
                </div>
              </div>
            </div>

            {/* What I Build */}
            <div className="rounded-[24px] border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <h2 className="text-[20px] font-black">
                Tools I Work On
              </h2>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                BijliBill.pk brings together practical tools designed to
                help users explore common electricity-billing and budgeting
                questions.
              </p>

              <div className="mt-5 space-y-3">
                <Link
                  href="/protected-200-unit-calculator"
                  className="block rounded-[14px] border p-4 border-zinc-200 dark:border-zinc-700 hover:border-[#1b4d3e] dark:hover:border-[#a3e635] transition"
                >
                  <h3 className="font-bold text-[13px]">
                    Protected 200-Unit Calculator →
                  </h3>
                  <p className="mt-1 text-[12px] leading-relaxed opacity-70">
                    Explore estimated electricity costs using the calculator's
                    available inputs and assumptions.
                  </p>
                </Link>

                <Link
                  href="/bill-tax-decoder"
                  className="block rounded-[14px] border p-4 border-zinc-200 dark:border-zinc-700 hover:border-[#1b4d3e] dark:hover:border-[#a3e635] transition"
                >
                  <h3 className="font-bold text-[13px]">
                    Bill Tax Decoder →
                  </h3>
                  <p className="mt-1 text-[12px] leading-relaxed opacity-70">
                    Explore explanations of common bill charges and taxes.
                  </p>
                </Link>

                <Link
                  href="/solar-net-billing-calculator"
                  className="block rounded-[14px] border p-4 border-zinc-200 dark:border-zinc-700 hover:border-[#1b4d3e] dark:hover:border-[#a3e635] transition"
                >
                  <h3 className="font-bold text-[13px]">
                    Solar Net Billing Calculator →
                  </h3>
                  <p className="mt-1 text-[12px] leading-relaxed opacity-70">
                    Estimate a solar-related bill or credit using the
                    calculator's configured rates and inputs.
                  </p>
                </Link>

                <Link
                  href="/rozana-budget-planner"
                  className="block rounded-[14px] border p-4 border-zinc-200 dark:border-zinc-700 hover:border-[#1b4d3e] dark:hover:border-[#a3e635] transition"
                >
                  <h3 className="font-bold text-[13px]">
                    Rozana Budget Planner →
                  </h3>
                  <p className="mt-1 text-[12px] leading-relaxed opacity-70">
                    Organize everyday expenses and explore a household budget.
                  </p>
                </Link>
              </div>
            </div>

            {/* Editorial Approach */}
            <div className="rounded-[24px] border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <h2 className="text-[20px] font-black">
                My Approach to Accuracy and Transparency
              </h2>

              <div className="mt-4 space-y-3 text-[13px] leading-relaxed opacity-80">
                <p>
                  I aim to make the information on BijliBill.pk clear,
                  useful, and understandable. Calculators depend on their
                  configured rates, assumptions, and user inputs, so results
                  should be treated as estimates rather than official bills.
                </p>

                <p>
                  Electricity tariffs, taxes, and billing rules can change.
                  When a result affects an actual payment decision, users
                  should check the latest information from their electricity
                  provider or the relevant official authority.
                </p>

                <p>
                  I do not present myself as a government representative,
                  a licensed electricity-billing authority, or an energy
                  researcher. BijliBill.pk is an independent project built
                  to make practical information and calculations easier to use.
                </p>
              </div>

              <div className="mt-5 rounded-[14px] bg-[#f0fdf4] dark:bg-[#143a2f] border border-green-200 dark:border-green-900 p-4">
                <p className="text-[12px] font-bold">
                  A note to visitors
                </p>
                <p className="mt-2 text-[12px] leading-relaxed opacity-80">
                  Please compare estimates with your actual bill and consult
                  official sources when you need confirmation of a tariff,
                  charge, or billing rule.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-[24px] border p-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <h2 className="font-bold text-[14px]">
                Author Profile
              </h2>

              <div className="mt-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#a3e635] text-[#1b4d3e] flex items-center justify-center text-[16px] font-black">
                  GM
                </div>

                <div>
                  <p className="font-bold text-[13px]">
                    Ghulam Muhammad
                  </p>
                  <p className="mt-1 text-[11px] opacity-60">
                    Founder of BijliBill.pk
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3 text-[12px]">
                <div className="flex justify-between gap-3 border-b border-zinc-200 dark:border-zinc-700 pb-3">
                  <span className="opacity-60">Role</span>
                  <span className="font-bold text-right">
                    Founder &amp; Author
                  </span>
                </div>

                <div className="flex justify-between gap-3 border-b border-zinc-200 dark:border-zinc-700 pb-3">
                  <span className="opacity-60">Website</span>
                  <span className="font-bold text-right">
                    BijliBill.pk
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="opacity-60">Focus</span>
                  <span className="font-bold text-right">
                    Billing Tools &amp; Budgeting
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border p-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <h2 className="font-bold text-[14px]">
                Get in Touch
              </h2>

              <p className="mt-3 text-[12px] leading-relaxed opacity-70">
                Have a question, spotted an issue, or want to share feedback
                about a calculator? You can contact the BijliBill.pk team.
              </p>

              <Link
                href="/contact-us"
                className="mt-4 flex items-center justify-center w-full h-[44px] rounded-full bg-[#1b4d3e] text-white font-bold text-[12px] hover:bg-[#143a2f] transition"
              >
                Contact Us →
              </Link>
            </div>

            <div className="rounded-[24px] border p-6 bg-[#0f2e25] text-white border-white/10">
              <h2 className="font-bold text-[12px] uppercase tracking-widest opacity-60">
                Explore BijliBill.pk
              </h2>

              <div className="mt-4 space-y-3 text-[13px]">
                <Link
                  href="/about-us"
                  className="block transition hover:text-[#a3e635]"
                >
                  About Us →
                </Link>

                <Link
                  href="/privacy-policy"
                  className="block transition hover:text-[#a3e635]"
                >
                  Privacy Policy →
                </Link>

                <Link
                  href="/disclaimer"
                  className="block transition hover:text-[#a3e635]"
                >
                  Disclaimer →
                </Link>

                <Link
                  href="/"
                  className="block transition hover:text-[#a3e635]"
                >
                  Home →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
