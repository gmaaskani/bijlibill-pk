
import Head from "next/head";
import Link from "next/link";

export default function Disclaimer() {
  const lastUpdated = "October 2026";

  return (
    <>
      <Head>
        <title>Disclaimer | BijliBill.pk</title>
        <meta
          name="description"
          content="Read the BijliBill.pk disclaimer covering electricity bill estimates, tariffs, taxes, solar calculations, and general informational use."
        />
        <link
          rel="canonical"
          href="https://bijlibill.pk/disclaimer"
        />
        <meta property="og:title" content="Disclaimer | BijliBill.pk" />
        <meta
          property="og:description"
          content="Important information about using BijliBill.pk calculators and electricity billing guides."
        />
        <meta property="og:url" content="https://bijlibill.pk/disclaimer" />
        <meta property="og:type" content="website" />
      </Head>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Hero */}
        <section className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 px-4 py-14 text-white sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium">
              <span aria-hidden="true">ℹ️</span>
              Important Information
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Disclaimer
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-green-50 sm:text-lg">
              Please read this disclaimer before using BijliBill.pk.
              It explains the limitations of our calculators, estimates,
              and informational content.
            </p>

            <p className="mt-4 text-sm text-green-100">
              Last updated: {lastUpdated}
            </p>
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:py-14 lg:grid-cols-3">
          {/* Main content */}
          <article className="space-y-6 lg:col-span-2">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                1. General Information
              </h2>
              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                BijliBill.pk provides online tools, calculators, and
                educational information intended to help users better
                understand electricity bills and related calculations in
                Pakistan. The content is provided for general informational
                purposes only and should not be treated as an official
                electricity bill, government notice, or professional advice.
              </p>
              <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
                BijliBill.pk is an independent website and is not affiliated
                with, endorsed by, or operated by any electricity distribution
                company, government department, regulator, or utility provider
                unless explicitly stated otherwise.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                2. Electricity Bill Estimates
              </h2>
              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                The results produced by our electricity bill calculators are
                estimates based on the inputs you provide and the calculation
                rules, rates, and assumptions implemented in each tool.
                Your actual bill may differ from the estimate.
              </p>
              <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
                Actual charges may depend on your electricity distribution
                company, tariff category, billing period, applicable taxes,
                adjustments, subsidies, fixed charges, meter readings,
                and other billing rules.
              </p>
              <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
                Always check your official electricity bill and the relevant
                utility or government sources for the charges that apply to
                your connection.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                3. Tariffs, Taxes, and Government Policies
              </h2>
              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                Electricity tariffs, taxes, duties, surcharges, subsidies,
                and billing policies may change over time. Although we aim
                to make our content useful and keep relevant information
                updated, we cannot guarantee that every rate, rule, or
                explanation is complete or current at all times.
              </p>
              <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
                The inclusion of a rate or policy in a calculator or article
                does not mean it has been officially confirmed for every
                consumer or billing period. Verify important information
                with your distribution company and the relevant official
                authorities before relying on it.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                4. Solar and Net-Billing Calculations
              </h2>
              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                Any solar, net-billing, export-credit, or related calculations
                on this website are illustrative estimates. Actual results
                may depend on your system capacity, electricity consumption,
                imported and exported units, applicable utility arrangements,
                equipment performance, and the rules in effect for your
                connection.
              </p>
              <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
                Our calculations are not a guarantee of savings, payback
                periods, export compensation, or future electricity costs.
                Confirm the applicable terms with your electricity provider
                and a qualified solar professional before making a financial
                or installation decision.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                5. Budget Planner and User Inputs
              </h2>
              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                Budget planning tools are intended to help you organize
                estimates and track the figures you enter. Their output
                depends on the accuracy and completeness of your inputs.
                They are not financial, accounting, or investment advice.
              </p>
              <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
                You are responsible for checking your entries and deciding
                how to use the results. Do not rely on a calculator alone
                when making important financial decisions.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                6. No Professional or Official Advice
              </h2>
              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                Information on BijliBill.pk is not a substitute for official
                billing guidance, legal advice, professional financial advice,
                or technical advice from a qualified professional.
                For disputes, corrections, payment deadlines, or account-specific
                questions, contact your electricity provider directly.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                7. External Links and Third-Party Services
              </h2>
              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                Our website may link to third-party websites, tools, or
                services for additional information or functionality. We
                do not control third-party websites and are not responsible
                for their content, availability, policies, or practices.
              </p>
              <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
                When you use an external service, review its terms and
                privacy policy before sharing information or relying on
                its content.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                8. Advertising and Cookies
              </h2>
              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                BijliBill.pk may display advertisements or use third-party
                services, depending on the features enabled on the website.
                Advertising providers, including Google where applicable,
                may use cookies or similar technologies subject to their
                policies, your settings, and applicable consent requirements.
              </p>
              <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
                For details about information handling, cookies, and
                third-party services, please read our{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-green-700 underline underline-offset-4 hover:text-green-800 dark:text-green-400"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                9. Limitation of Liability
              </h2>
              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                To the extent permitted by applicable law, BijliBill.pk
                and its operator are not liable for losses or damages
                arising from reliance on calculator estimates, outdated
                or incomplete information, calculation differences,
                temporary website interruptions, or third-party services.
              </p>
              <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
                Nothing in this disclaimer excludes or limits liability
                where doing so would be unlawful under applicable law.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                10. Changes to This Disclaimer
              </h2>
              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                We may revise this disclaimer when our tools, website
                features, or applicable requirements change. Any updated
                version will be published on this page. Please review it
                periodically.
              </p>
            </section>

            <section className="rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-950/30 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                11. Contact Us
              </h2>
              <p className="mt-4 leading-7 text-gray-700 dark:text-gray-300">
                If you have questions about this disclaimer or the tools
                available on BijliBill.pk, please contact us through our
                contact page.
              </p>
              <Link
                href="/contact-us"
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
              >
                Contact BijliBill.pk
                <span className="ml-2" aria-hidden="true">→</span>
              </Link>
            </section>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                At a Glance
              </h2>
              <ul className="mt-5 space-y-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                <li className="flex gap-3">
                  <span className="text-green-600" aria-hidden="true">✓</span>
                  Calculator results are estimates.
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600" aria-hidden="true">✓</span>
                  Official bills and applicable rules take precedence.
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600" aria-hidden="true">✓</span>
                  Solar results do not guarantee savings.
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600" aria-hidden="true">✓</span>
                  Third-party services have their own policies.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-green-700 to-emerald-500 p-6 text-white shadow-sm">
              <h2 className="text-lg font-bold">
                Need Help Understanding Your Bill?
              </h2>
              <p className="mt-3 text-sm leading-6 text-green-50">
                Explore our tools to estimate charges and better understand
                your electricity bill.
              </p>
              <Link
                href="/"
                className="mt-5 inline-flex items-center rounded-xl bg-white px-4 py-3 text-sm font-bold text-green-800 transition hover:bg-green-50"
              >
                Explore Tools
                <span className="ml-2" aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Useful Links
              </h2>
              <nav className="mt-4 space-y-3 text-sm">
                <Link
                  href="/about-us"
                  className="block text-green-700 hover:underline dark:text-green-400"
                >
                  About Us →
                </Link>
                <Link
                  href="/author"
                  className="block text-green-700 hover:underline dark:text-green-400"
                >
                  About the Author →
                </Link>
                <Link
                  href="/privacy-policy"
                  className="block text-green-700 hover:underline dark:text-green-400"
                >
                  Privacy Policy →
                </Link>
                <Link
                  href="/contact-us"
                  className="block text-green-700 hover:underline dark:text-green-400"
                >
                  Contact Us →
                </Link>
              </nav>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
