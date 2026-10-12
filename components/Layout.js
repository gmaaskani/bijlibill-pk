
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Layout({ children }) {
  const [dark, setDark] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)

    const saved = localStorage.getItem('bijli-dark')
    if (saved === 'true') setDark(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    localStorage.setItem('bijli-dark', dark)

    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark, mounted])

  useEffect(() => {
    setMobileOpen(false)
  }, [router.asPath])

  const navLink = (href, label) => {
    const active = router.pathname === href

    return (
      <Link
        href={href}
        className={`px-3 py-1.5 rounded-full font-bold transition-all ${
          active
            ? 'bg-[#a3e635] text-[#1b4d3e]'
            : 'text-white/80 hover:text-white hover:bg-white/10'
        }`}
      >
        {label}
      </Link>
    )
  }

  return (
    <div
      className={
        dark
          ? 'dark bg-zinc-950 text-white min-h-screen'
          : 'bg-[#fafaf9] text-zinc-900 min-h-screen'
      }
    >
      <Head>
        <link
          rel="canonical"
          href={`https://bijlibill.pk${
            router.pathname === '/' ? '' : router.pathname
          }`}
        />
        <meta name="author" content="Ghulam Muhammad" />
        <meta name="robots" content="index, follow" />
{/* PWA - Add these 3 lines */}
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#1b4d3e" />
  <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>

      <header className="sticky top-0 z-50 bg-[#1b4d3e] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#a3e635] flex items-center justify-center text-[#1b4d3e] font-black">
              B
            </div>

            <span className="font-black text-white tracking-tight">
              BijliBill.pk
            </span>

            <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-white ml-1">
              2026 Edition
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLink('/', 'Home')}
            {navLink('/protected-200-unit-calculator', 'Protected 200')}
            {navLink('/bill-tax-decoder', 'Tax Decoder')}
            {navLink('/solar-net-billing-calculator', 'Solar 2026')}
            {navLink('/rozana-budget-planner', 'Rozana Planner')}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark(!dark)}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white"
            >
              {dark ? '☀' : '🌙'}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="lg:hidden w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white"
            >
              ☰
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-[#0f2e25] border-t border-white/10 px-4 py-4 space-y-2">
            <Link href="/" className="block py-2 text-white font-bold">
              Home
            </Link>

            <Link
              href="/protected-200-unit-calculator"
              className="block py-2 text-white/80"
            >
              Protected 200 Calculator
            </Link>

            <Link
              href="/bill-tax-decoder"
              className="block py-2 text-white/80"
            >
              Bill Tax Decoder
            </Link>

            <Link
              href="/solar-net-billing-calculator"
              className="block py-2 text-white/80"
            >
              Solar Net Billing 2026
            </Link>

            <Link
              href="/rozana-budget-planner"
              className="block py-2 text-white/80"
            >
              Rozana Budget Planner
            </Link>

            <Link
              href="/about-us"
              className="block py-2 text-white/80"
            >
              About Us
            </Link>

            <Link
              href="/author"
              className="block py-2 text-[#a3e635] font-bold"
            >
              Author - Ghulam Muhammad
            </Link>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        {children}
      </main>

      <footer className="mt-10 bg-[#0f2e25] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <div className="grid md:grid-cols-[1.5fr_1fr_1fr] gap-8">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#a3e635] flex items-center justify-center text-[#1b4d3e] font-black">
                  B
                </div>

                <span className="font-bold">BijliBill.pk</span>

                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">
                  2026 Edition
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed opacity-70">
                BijliBill.pk is a privately owned informational and utility
                platform, and is NOT affiliated, authorized, endorsed by, or
                in any way officially connected with the Government of
                Pakistan, NEPRA, LESCO, MEPCO, IESCO, K-Electric, or any other
                official power distribution companies (DISCOs). All
                calculations are for informational purposes and are based on
                publicly available tariff information. For official bills,
                refer to bill.pitc.com.pk or your DISCO&apos;s official
                website. We do not collect reference numbers or personal
                data. Emails: info@bijlibill.pk / contact@bijlibill.pk
              </p>

              <p className="mt-3 text-xs opacity-50">
                Independently developed • No personal data stored •
                Informational calculations • Built and reviewed by Ghulam
                Muhammad
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base">Core Tools</h4>

              <div className="mt-3 space-y-2 text-sm opacity-70">
                <Link
                  href="/protected-200-unit-calculator"
                  className="block hover:text-[#a3e635]"
                >
                  Protected 200 Calculator
                </Link>

                <Link
                  href="/bill-tax-decoder"
                  className="block hover:text-[#a3e635]"
                >
                  Bill Tax Decoder
                </Link>

                <Link
                  href="/solar-net-billing-calculator"
                  className="block hover:text-[#a3e635]"
                >
                  Solar Net Billing 2026
                </Link>

                <Link
                  href="/rozana-budget-planner"
                  className="block hover:text-[#a3e635]"
                >
                  Rozana Budget Planner
                </Link>

                <Link
                  href="/author"
                  className="block hover:text-[#a3e635] text-[#a3e635] font-bold"
                >
                  Author Profile
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-base">Trust &amp; Legal</h4>

              <div className="mt-3 space-y-2 text-sm opacity-70">
                <Link
                  href="/about-us"
                  className="block hover:text-[#a3e635] font-bold"
                >
                  About Us
                </Link>

                <Link
                  href="/contact-us"
                  className="block hover:text-[#a3e635] font-bold"
                >
                  Contact Us
                </Link>

                <Link
                  href="/privacy-policy"
                  className="block hover:text-[#a3e635] font-bold"
                >
                  Privacy Policy
                </Link>

                <Link
                  href="/disclaimer"
                  className="block hover:text-[#a3e635]"
                >
                  Disclaimer
                </Link>

                <p className="pt-2 text-xs opacity-60 leading-relaxed">
                  Data Sources: NEPRA tariff notifications and PITC, where
                  applicable. Last Updated: Oct 9, 2026. © 2026 BijliBill.pk -
                  Independent Utility Platform.
                </p>

                <p className="text-xs opacity-50">
                  Made to help Pakistani households understand electricity
                  bills • No reference number stored
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs opacity-50">
            <span>
              Data Sources: NEPRA tariff notifications and PITC, where applicable.
              © 2026 BijliBill.pk - Independent Utility Platform.
            </span>

            <span>
              Dark mode • Mobile-friendly • Independent platform • Not
              affiliated with the government
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
