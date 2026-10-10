
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Electricity Bill Calculator Pakistan | BijliBill.pk</title>
        <meta
          name="description"
          content="Estimate your electricity bill in Pakistan, understand electricity taxes and charges, explore solar net billing, and track daily electricity usage with BijliBill.pk."
        />
        <link rel="canonical" href="https://bijlibill.pk/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Electricity Bill Calculator Pakistan | BijliBill.pk"
        />
        <meta
          property="og:description"
          content="Understand electricity bills in Pakistan with online bill estimation, tax explanation, solar net billing, and daily usage tools."
        />
        <meta property="og:url" content="https://bijlibill.pk/" />
      </Head>

      <div className="mx-auto w-full max-w-7xl space-y-8">
        {/* HERO */}
        <div className="relative overflow-hidden rounded-3xl bg-[#1b4d3e] p-6 text-white shadow-lg sm:p-8 md:p-12">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-[60%] bg-gradient-to-l from-[#a3e635]/20 to-transparent" />

          <div className="relative z-10 max-w-3xl">
            <div className="mb-4 inline-flex flex-wrap items-center gap-2 rounded-full bg-[#a3e635] px-3 py-2 text-xs font-bold text-[#1b4d3e] sm:text-sm">
              INDEPENDENT • NOT GOVERNMENT • BILL ESTIMATION TOOLS
            </div>

            <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Electricity Bill Calculator Pakistan
            </h1>

            <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base md:text-lg">
              Bijli ke bill ko samajhna ab asaan. Estimate your electricity
              charges, understand bill taxes, explore solar net billing, and
              track your daily electricity usage with simple online tools.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                Electricity Bill Estimates
              </div>
              <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                Bill Tax Breakdown
              </div>
              <div className="rounded-full bg-[#a3e635] px-4 py-2 text-sm font-bold text-[#1b4d3e]">
                Daily Usage Tracking
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/protected-200-unit-calculator"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#a3e635] px-6 py-3 text-center text-sm font-bold text-[#1b4d3e] transition duration-200 hover:scale-[1.02] hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#1b4d3e]"
              >
                Check Protected Status →
              </Link>

              <Link
                href="/bill-tax-decoder"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-center text-sm font-bold text-[#1b4d3e] transition duration-200 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-white"
              >
                Decode Taxes
              </Link>
            </div>
          </div>
        </div>

        {/* FOUR TOOL CARDS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <Link
            href="/protected-200-unit-calculator"
            className="group cursor-pointer rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-6 md:p-7"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1b4d3e] text-xl text-white transition-transform group-hover:scale-105">
                ⚡
              </div>
              <span className="rounded-full bg-[#a3e635] px-2.5 py-1.5 text-xs font-bold text-[#1b4d3e] sm:text-sm">
                Bill Estimator
              </span>
            </div>

            <h2 className="mt-5 text-lg font-bold text-zinc-900 dark:text-white sm:text-xl">
              200 Unit Protected Consumer Calculator
            </h2>

            <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              Explore electricity consumption around the 200-unit threshold
              and understand factors that may affect protected consumer
              eligibility. Check the applicable rules before relying on an
              estimate.
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#1b4d3e] transition group-hover:gap-3 dark:text-[#a3e635]">
              Open Calculator →
            </div>
          </Link>

          <Link
            href="/bill-tax-decoder"
            className="group cursor-pointer rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-6 md:p-7"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 text-xl text-white transition-transform group-hover:scale-105 dark:bg-zinc-800">
              🧾
            </div>

            <h2 className="mt-5 text-lg font-bold text-zinc-900 dark:text-white sm:text-xl">
              Electricity Bill Tax Decoder
            </h2>

            <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              Understand common electricity bill items, including taxes,
              fuel price adjustments, quarterly adjustments, and other
              applicable charges. Actual amounts depend on your bill and
              the current rules.
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#1b4d3e] transition group-hover:gap-3 dark:text-[#a3e635]">
              Decode Now →
            </div>
          </Link>

          <Link
            href="/solar-net-billing-calculator"
            className="group cursor-pointer rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-6 md:p-7"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#a3e635] text-xl text-[#1b4d3e] transition-transform group-hover:scale-105">
                ☀️
              </div>
              <span className="rounded-full bg-[#1b4d3e] px-2.5 py-1.5 text-xs font-bold text-white sm:text-sm">
                Solar Tool
              </span>
            </div>

            <h2 className="mt-5 text-lg font-bold text-zinc-900 dark:text-white sm:text-xl">
              Solar Net Billing Calculator
            </h2>

            <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              Explore how grid electricity imports, surplus solar exports,
              applicable rates, and household usage can affect your solar
              calculations. Verify the current rules for your connection.
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#1b4d3e] transition group-hover:gap-3 dark:text-[#a3e635]">
              Calculate Solar →
            </div>
          </Link>

          <Link
            href="/rozana-budget-planner"
            className="group cursor-pointer rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-6 md:p-7"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 text-xl text-white transition-transform group-hover:scale-105 dark:bg-zinc-800">
              📊
            </div>

            <h2 className="mt-5 text-lg font-bold text-zinc-900 dark:text-white sm:text-xl">
              Daily Electricity Budget Planner
            </h2>

            <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              Record meter readings, estimate average daily consumption,
              and monitor your electricity usage to help plan your
              household budget.
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#1b4d3e] transition group-hover:gap-3 dark:text-[#a3e635]">
              Open Planner →
            </div>
          </Link>
        </div>

        {/* SEO EDUCATIONAL CONTENT - OUTSIDE THE CARD GRID */}
        <section className="space-y-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8 md:p-10">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800 dark:bg-green-950 dark:text-green-300">
              ELECTRICITY BILL GUIDE
            </span>

            <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Understanding Electricity Bills in Pakistan
            </h2>

            <p className="leading-7 text-zinc-600 dark:text-zinc-300">
              Electricity bills in Pakistan can include energy charges,
              taxes, adjustments, and other applicable fees. Understanding
              your consumer category and electricity usage can help you
              read your bill and plan your household budget. BijliBill.pk
              provides online tools to help you explore these topics and
              estimate electricity costs.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-700">
              <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white">
                What Is a Protected Electricity Consumer?
              </h3>

              <p className="leading-7 text-zinc-600 dark:text-zinc-300">
                A protected electricity consumer is a residential
                consumer who meets the eligibility criteria under the
                applicable electricity tariff rules. These criteria can
                include consumption limits and requirements relating to
                previous billing periods. Protected status may affect
                the tariff applied to a bill.
              </p>

              <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">
                Eligibility should be checked against current rules and
                your electricity provider's billing information. Using
                fewer units does not necessarily guarantee protected status.
              </p>

              <Link
                href="/protected-200-unit-calculator"
                className="mt-4 inline-flex items-center gap-2 font-bold text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
              >
                Explore the 200-Unit Calculator
                <span aria-hidden="true">→</span>
              </Link>
            </article>

            <article className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-700">
              <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white">
                What Is a Non-Protected Electricity Consumer?
              </h3>

              <p className="leading-7 text-zinc-600 dark:text-zinc-300">
                A non-protected residential consumer is one who does not
                qualify for protected status under the applicable tariff
                rules. The applicable per-unit rate and total bill can
                differ between consumer categories, depending on the
                current tariff structure.
              </p>

              <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">
                Your final bill may also depend on total units consumed,
                fixed charges, taxes, adjustments, and other applicable
                fees. Check your bill and current tariff schedule to
                understand the charges for your connection.
              </p>

              <Link
                href="/protected-200-unit-calculator"
                className="mt-4 inline-flex items-center gap-2 font-bold text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
              >
                Check the 200-Unit Calculator
                <span aria-hidden="true">→</span>
              </Link>
            </article>

            <article className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-700">
              <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white">
                What Is Solar Net Billing in Pakistan?
              </h3>

              <p className="leading-7 text-zinc-600 dark:text-zinc-300">
                Solar net billing concerns electricity imported from
                the grid and surplus electricity exported by a solar
                system. Under an applicable billing arrangement, imported
                and exported electricity may be valued at different rates.
              </p>

              <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">
                The financial benefit of solar depends on household
                consumption, solar generation, system size, applicable
                import and export rates, and agreement terms. Review
                the rules that apply to your connection before making
                an investment decision.
              </p>

              <Link
                href="/solar-net-billing-calculator"
                className="mt-4 inline-flex items-center gap-2 font-bold text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
              >
                Explore the Solar Calculator
                <span aria-hidden="true">→</span>
              </Link>
            </article>

            <article className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-700">
              <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white">
                Understanding Electricity Bill Taxes and Charges
              </h3>

              <p className="leading-7 text-zinc-600 dark:text-zinc-300">
                An electricity bill may contain more than energy
                charges. Depending on the applicable rules and your
                connection, it can include government taxes, surcharges,
                fixed charges, fuel adjustments, and other billing items.
              </p>

              <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">
                The amount and type of each charge can vary. Reviewing
                the individual line items on your bill is a useful
                starting point for understanding the total payable amount.
              </p>

              <Link
                href="/bill-tax-decoder"
                className="mt-4 inline-flex items-center gap-2 font-bold text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
              >
                Explore the Bill Tax Decoder
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          </div>

          <div className="space-y-3 border-t border-zinc-200 pt-7 dark:border-zinc-700">
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              How Is an Electricity Bill Calculated in Pakistan?
            </h2>

            <p className="leading-7 text-zinc-600 dark:text-zinc-300">
              Electricity billing generally starts with the units
              recorded during the billing period and the applicable
              tariff. Other items may be included according to your
              consumer category, connection type, current tariff rules,
              taxes, and adjustments. Multiplying your units by a single
              per-unit rate may not give you the exact final bill amount.
            </p>

            <p className="leading-7 text-zinc-600 dark:text-zinc-300">
              Review the billing period, units consumed, tariff category,
              individual charges, taxes, and adjustments shown by your
              electricity provider. Use online estimates as a guide and
              compare them with your actual bill.
            </p>
          </div>

          <div className="rounded-2xl bg-green-50 p-5 dark:bg-green-950/30 sm:p-6">
            <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white">
              How Can You Track Daily Electricity Usage?
            </h2>

            <p className="mt-3 leading-7 text-zinc-700 dark:text-zinc-300">
              Tracking daily electricity usage can help you understand
              household consumption. Recording meter readings and
              estimating appliance usage can make it easier to plan
              your electricity budget and compare usage over time.
            </p>

            <Link
              href="/rozana-budget-planner"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-bold text-white transition hover:bg-green-800"
            >
              Try the Daily Budget Planner
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="space-y-5 border-t border-zinc-200 pt-7 dark:border-zinc-700">
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              Frequently Asked Questions
            </h2>

            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white">
                  What is the difference between protected and non-protected consumers?
                </h3>
                <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-300">
                  The distinction depends on the eligibility criteria in
                  the applicable electricity tariff rules. The categories
                  can have different applicable rates, so check the current
                  rules and your bill for your specific connection.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white">
                  Does using fewer than 200 units guarantee protected status?
                </h3>
                <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-300">
                  Not necessarily. Eligibility may depend on additional
                  criteria and previous billing periods. Confirm your
                  status using the current applicable rules and your
                  electricity provider's records.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white">
                  Why is my electricity bill higher than my unit calculation?
                </h3>
                <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-300">
                  Your final bill may include taxes, fixed charges,
                  surcharges, adjustments, and other applicable billing
                  items in addition to energy charges.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white">
                  Can solar panels eliminate my electricity bill?
                </h3>
                <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-300">
                  Not always. The result depends on solar generation,
                  when you use electricity, grid imports and exports,
                  applicable rates, and other charges that may remain payable.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white">
                  Are BijliBill.pk calculations official electricity bills?
                </h3>
                <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-300">
                  No. BijliBill.pk provides informational tools and
                  estimates. Your electricity distribution company
                  issues your official bill, and actual charges depend
                  on the applicable tariff and your billing details.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-200 pt-7 dark:border-zinc-700">
            <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white">
              About BijliBill.pk
            </h2>

            <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">
              BijliBill.pk was created to make electricity bills easier
              to understand through straightforward explanations and
              practical online tools. Learn more about the website,
              its creator, and the approach behind its content.
            </p>

            <div className="mt-4 flex flex-wrap gap-4">
              <Link
                href="/about-us"
                className="font-bold text-green-700 hover:underline dark:text-green-400"
              >
                About Us →
              </Link>

              <Link
                href="/author"
                className="font-bold text-green-700 hover:underline dark:text-green-400"
              >
                Meet the Author →
              </Link>

              <Link
                href="/disclaimer"
                className="font-bold text-green-700 hover:underline dark:text-green-400"
              >
                Read Our Disclaimer →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
