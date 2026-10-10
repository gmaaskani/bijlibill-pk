
import Link from 'next/link'
import Head from 'next/head'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | BijliBill.pk</title>
        <meta
          name="description"
          content="Read the BijliBill.pk Privacy Policy to understand how calculator inputs, browser storage, contact form submissions, cookies, and advertising technologies may be handled."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="space-y-6">
        {/* Hero */}
        <div className="rounded-[24px] bg-[#1b4d3e] p-6 md:p-8 text-white">
          <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold tracking-widest">
            PRIVACY INFORMATION
          </div>

          <h1 className="mt-4 text-[28px] md:text-[36px] font-black">
            BijliBill.pk Privacy Policy
          </h1>

          <p className="mt-3 max-w-3xl text-[13px] md:text-[14px] leading-relaxed text-white/80">
            This page explains how information may be handled when you use
            BijliBill.pk, including our electricity calculators, budget planner,
            contact form, cookies, and advertising services.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="space-y-4">
            <div className="rounded-[24px] border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <h2 className="text-[18px] font-black">
                1. Information You Enter
              </h2>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                When you use our calculators, you may enter information such
                as electricity units, tariff options, or budgeting amounts.
                These tools are designed to perform calculations in your
                browser. Do not enter sensitive personal information unless
                a feature specifically requires it.
              </p>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                We do not ask you to provide your CNIC number, electricity
                account reference number, consumer ID, or a copy of your
                personal electricity bill to use our basic calculators.
                However, the website and its third-party services may
                process technical information as described below.
              </p>
            </div>

            <div className="rounded-[24px] border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <h2 className="text-[18px] font-black">
                2. Browser Storage
              </h2>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                Some features may save preferences or information locally
                in your browser. For example, the dark-mode preference may
                be saved using localStorage, and the budget planner may use
                browser storage to retain budgeting entries between visits.
              </p>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                Browser-stored information may remain on your device until
                you clear your browser storage or the website removes it.
                Anyone with access to your browser profile or device may
                potentially be able to access information stored there.
              </p>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                Local browser storage is different from information sent
                to a website server or a third-party service.
              </p>
            </div>

            <div className="rounded-[24px] border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <h2 className="text-[18px] font-black">
                3. Contact Form and FormSubmit
              </h2>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                If you contact us through our contact form, the information
                you submit, such as your name, email address, and message,
                is sent through FormSubmit to our contact email. FormSubmit
                is a third-party service and may process information as
                necessary to provide its service.
              </p>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                Your submission is delivered to our email account so we can
                review and respond to your request. Email providers and
                service providers may retain information according to their
                own policies. We cannot promise that submitted information
                is never stored by a third party.
              </p>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                Please do not include your CNIC, electricity account
                reference number, consumer ID, meter number, passwords,
                or other sensitive information in your message.
              </p>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                You can contact us at{' '}
                <a
                  href="mailto:info@bijlibill.pk"
                  className="font-bold underline"
                >
                  info@bijlibill.pk
                </a>
                .
              </p>
            </div>

            <div className="rounded-[24px] border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <h2 className="text-[18px] font-black">
                4. Cookies, Advertising, and Google AdSense
              </h2>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                BijliBill.pk may display advertisements through Google
                AdSense if advertising is enabled on the website. Google
                and its advertising partners may use cookies or similar
                technologies to deliver advertisements, limit repeated
                ads, measure advertising performance, and help detect
                invalid activity.
              </p>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                The information used and the advertising features available
                may depend on your location, your consent choices, your
                browser settings, and the advertising services in use.
                Personalized advertising may be subject to additional
                consent requirements in certain regions.
              </p>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                You can manage available advertising personalization
                settings through Google's ad settings. You can also
                manage or delete cookies through your browser settings.
                Blocking cookies may affect some website or advertising
                features.
              </p>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                For more information, please review Google's policies:
              </p>

              <ul className="mt-3 space-y-2 text-[13px] leading-relaxed">
                <li>
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-bold"
                  >
                    Google Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-bold"
                  >
                    How Google uses information for advertising
                  </a>
                </li>
                <li>
                  <a
                    href="https://adssettings.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-bold"
                  >
                    Google Ad Settings
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-[24px] border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <h2 className="text-[18px] font-black">
                5. Cookies and Consent Choices
              </h2>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                Where required, we will provide an appropriate consent
                message or mechanism for relevant cookies and advertising
                technologies. Your available choices may depend on your
                location and the services operating on the website.
              </p>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                A cookie notice does not itself prevent automated traffic
                or guarantee that all bots are blocked. Security, abuse
                prevention, and advertising invalid-traffic detection
                depend on the relevant technical services and their
                configurations.
              </p>
            </div>

            <div className="rounded-[24px] border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <h2 className="text-[18px] font-black">
                6. Technical Information and Analytics
              </h2>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                Our hosting provider, website infrastructure, or third-party
                services may process technical information such as IP
                address, browser type, device information, pages requested,
                and basic usage or error information. Whether analytics
                tools collect additional information depends on which tools
                are installed and enabled on the live website.
              </p>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                This policy should be updated if analytics, security,
                advertising, or other third-party services are added or
                their data practices change.
              </p>
            </div>

            <div className="rounded-[24px] border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <h2 className="text-[18px] font-black">
                7. Calculations and Information Sources
              </h2>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                BijliBill.pk provides independent informational tools
                intended to help users understand electricity costs and
                budgeting. Calculator results are estimates and may not
                match an official electricity bill. Actual amounts can
                depend on applicable tariffs, taxes, adjustments, and
                billing rules.
              </p>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                Do not rely on a calculator result as an official bill,
                tariff notification, or guarantee of savings or solar
                credit. Check relevant information with your electricity
                provider or official sources.
              </p>
            </div>

            <div className="rounded-[24px] border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <h2 className="text-[18px] font-black">
                8. Third-Party Links and Services
              </h2>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                Our website may link to third-party websites or services,
                including FormSubmit, Google, and official electricity
                information sources. Those services have their own privacy
                policies and practices. We do not control the privacy
                practices of external websites.
              </p>
            </div>

            <div className="rounded-[24px] border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <h2 className="text-[18px] font-black">
                9. Changes to This Policy
              </h2>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                We may revise this Privacy Policy when our website,
                features, or third-party services change. The current
                version will be published on this page. Please review
                it periodically.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-[24px] border p-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <h2 className="font-bold text-[14px]">
                Privacy at a Glance
              </h2>

              <div className="mt-4 space-y-3 text-[13px]">
                <div className="p-3 rounded-[12px] bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <p className="font-bold text-[12px]">
                    Calculator Inputs
                  </p>
                  <p className="mt-1 text-[11px] opacity-70 leading-relaxed">
                    Designed to be processed in your browser.
                  </p>
                </div>

                <div className="p-3 rounded-[12px] bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <p className="font-bold text-[12px]">
                    Browser Storage
                  </p>
                  <p className="mt-1 text-[11px] opacity-70 leading-relaxed">
                    Some preferences and planner information may be saved
                    locally on your device.
                  </p>
                </div>

                <div className="p-3 rounded-[12px] bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <p className="font-bold text-[12px]">
                    Contact Form
                  </p>
                  <p className="mt-1 text-[11px] opacity-70 leading-relaxed">
                    Submitted through FormSubmit to our contact email.
                  </p>
                </div>

                <div className="p-3 rounded-[12px] bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <p className="font-bold text-[12px]">
                    Advertising
                  </p>
                  <p className="mt-1 text-[11px] opacity-70 leading-relaxed">
                    Google AdSense or its partners may use cookies or
                    similar technologies if ads are enabled.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border p-6 bg-[#0f2e25] text-white border-white/10">
              <h2 className="font-bold text-[12px] uppercase tracking-widest opacity-60">
                Contact Us
              </h2>

              <p className="mt-3 text-[13px] leading-relaxed opacity-80">
                If you have a question about this Privacy Policy or how
                information is handled on BijliBill.pk, contact us by email.
              </p>

              <div className="mt-4 space-y-3 text-[13px]">
                <a
                  href="mailto:info@bijlibill.pk"
                  className="block underline font-bold text-[#a3e635]"
                >
                  info@bijlibill.pk
                </a>

                <a
                  href="mailto:contact@bijlibill.pk"
                  className="block underline font-bold text-[#a3e635]"
                >
                  contact@bijlibill.pk
                </a>
              </div>

              <div className="mt-6 space-y-3 text-[13px]">
                <Link
                  href="/about-us"
                  className="block transition hover:text-[#a3e635]"
                >
                  About Us →
                </Link>

                <Link
                  href="/contact-us"
                  className="block transition hover:text-[#a3e635]"
                >
                  Contact Us →
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
                  Back to Home →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[11px] leading-relaxed opacity-60">
          BijliBill.pk is an independent informational website and is not
          affiliated with any government body or electricity provider.
        </p>
      </div>
    </>
  )
}
