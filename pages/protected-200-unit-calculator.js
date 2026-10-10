
import { useState, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { nepraTariff } from '../data/nepraTariff'

function Yi(units, isProtected = false) {
  const usage = Math.max(0, Number(units) || 0)

  const slabs = isProtected
    ? nepraTariff.protected
    : nepraTariff.nonProtected

  let remaining = isProtected ? Math.min(usage, 200) : usage
  let total = 0
  let previousLimit = 0

  for (const slab of slabs) {
    if (remaining <= 0) break

    const slabCapacity = Number.isFinite(slab.limit)
      ? slab.limit - previousLimit
      : remaining

    const slabUnits = Math.min(remaining, slabCapacity)

    total += slabUnits * slab.rate
    remaining -= slabUnits

    if (Number.isFinite(slab.limit)) {
      previousLimit = slab.limit
    }
  }

  return total
}

const Su = {
  LESCO: 1000,
  MEPCO: 800,
  FESCO: 800,
  IESCO: 1000,
  'K-Electric': 1200,
  GEPCO: 800,
  PESCO: 600,
  HESCO: 800,
  SEPCO: 800,
  QESCO: 600,
}

const gu = {
  LESCO: 'Lahore',
  MEPCO: 'Multan',
  IESCO: 'Islamabad',
  FESCO: 'Faisalabad',
  'K-Electric': 'Karachi',
  GEPCO: 'Gujranwala',
  PESCO: 'Peshawar',
  HESCO: 'Hyderabad',
  SEPCO: 'Sukkur',
  QESCO: 'Quetta',
}

const yu = [
  'LESCO',
  'MEPCO',
  'IESCO',
  'FESCO',
  'K-Electric',
  'GEPCO',
  'PESCO',
  'HESCO',
  'SEPCO',
  'QESCO',
]

export default function Protected200() {
  const [o, setO] = useState('')
  const [f, setF] = useState('')
  const [v, setV] = useState('LESCO')

  const validUnits =
    o.trim() !== '' &&
    Number.isFinite(Number(o)) &&
    Number(o) >= 0 &&
    Number(o) <= 500

  const validDays =
    f.trim() !== '' &&
    Number.isFinite(Number(f)) &&
    Number(f) >= 1 &&
    Number(f) <= 30

  const ready = validUnits && validDays
  const units = validUnits ? Number(o) : 0
  const days = validDays ? Number(f) : 1

  const oe = useMemo(() => {
    const avg = units / days
    const projection = avg * 30
    const remaining = 200 - units
    const daysLeft = 30 - days

    const safeDaily =
      daysLeft > 0
        ? Math.max(0, remaining / daysLeft)
        : null

    return {
      avg: avg.toFixed(2),
      proj: Math.round(projection),
      exactProjection: projection,
      remaining,
      safe: safeDaily === null ? null : safeDaily.toFixed(2),
      hasCrossed: units > 200,
      isProjectedSafe: projection <= 200,
      needsWarning: units <= 200 && projection > 200,
      cycleComplete: days === 30,
    }
  }, [units, days])

  const comparison = useMemo(() => {
    if (!ready) return null

    const comparisonUnits = Math.min(units, 200)
    const protectedCost = Yi(comparisonUnits, true)
    const nonProtectedCost = Yi(comparisonUnits, false)

    return {
      baseUnits: comparisonUnits,
      crossUnits: comparisonUnits,
      protectedCost: Math.round(protectedCost),
      nonProtectedCost: Math.round(nonProtectedCost),
      loss: Math.round(nonProtectedCost - protectedCost),
    }
  }, [units, ready])

  const ku = (message) => {
    if (typeof window !== 'undefined') {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(message)}`,
        '_blank',
        'noopener,noreferrer'
      )
    }
  }

  const progressColor = !ready
    ? 'bg-[#a3e635]'
    : oe.hasCrossed
    ? 'bg-red-500'
    : oe.needsWarning
    ? 'bg-yellow-400'
    : 'bg-[#a3e635]'

  const progressWidth = ready
    ? Math.min(100, (units / 200) * 100)
    : 0

  const pageTitle =
    'Protected 200 Unit Calculator Pakistan | BijliBill.pk'

  const pageDescription =
    'Calculate electricity usage in Pakistan, project monthly units, track the 200-unit target, and get an early warning before your estimated usage crosses 200 units.'

  const canonicalUrl =
    'https://bijlibill.pk/protected-200-unit-calculator'

  return (
    <div className="space-y-6">
      <Head>
        <title>{pageTitle}</title>

        <meta
          name="description"
          content={pageDescription}
        />

        <link
          rel="canonical"
          href={canonicalUrl}
        />

        <meta
          name="robots"
          content="index,follow"
        />

        <meta
          property="og:title"
          content={pageTitle}
        />

        <meta
          property="og:description"
          content={pageDescription}
        />

        <meta
          property="og:url"
          content={canonicalUrl}
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:site_name"
          content="BijliBill.pk"
        />

        <meta
          property="og:locale"
          content="en_PK"
        />

        <meta
          name="twitter:card"
          content="summary"
        />

        <meta
          name="twitter:title"
          content={pageTitle}
        />

        <meta
          name="twitter:description"
          content={pageDescription}
        />
      </Head>

      <div className="flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="opacity-60 hover:text-[#1b4d3e]"
        >
          Home
        </Link>
        <span>/</span>
        <span className="font-bold">
          Protected 200 Unit Calculator
        </span>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="rounded-2xl border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1b4d3e] text-white flex items-center justify-center">
              ⚡
            </div>

            <div>
              <h1 className="text-xl font-black">
                Protected 200 Unit Electricity Bill Calculator Pakistan
              </h1>

              <p className="text-sm opacity-70">
                protected bill status kaise check karein | 200 unit slab benefit
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest opacity-60">
                Total Units Used
              </label>

              <input
                type="number"
                min="0"
                max="500"
                value={o}
                onChange={(event) => setO(event.target.value)}
                className="mt-2 w-full h-12 rounded-xl border px-4 font-mono font-bold text-base bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
              />

              {o.trim() !== '' && !validUnits && (
                <p className="mt-1 text-sm text-red-600">
                  Units 0 se 500 ke darmiyan enter karein.
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest opacity-60">
                Days Passed (1-30)
              </label>

              <input
                type="number"
                min="1"
                max="30"
                value={f}
                onChange={(event) => setF(event.target.value)}
                className="mt-2 w-full h-12 rounded-xl border px-4 font-mono font-bold text-base bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
              />

              {f.trim() !== '' && !validDays && (
                <p className="mt-1 text-sm text-red-600">
                  Days 1 se 30 ke darmiyan enter karein.
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest opacity-60">
                DISCO
              </label>

              <select
                value={v}
                onChange={(event) => setV(event.target.value)}
                className="mt-2 w-full h-12 rounded-xl border px-4 font-bold text-base bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
              >
                {yu.map((disco) => (
                  <option key={disco} value={disco}>
                    {disco}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span>0</span>
              <span className="text-[#a3e635]">200 SAFE</span>
              <span>200</span>
            </div>

            <div className="h-3 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden flex">
              <div
                className={`h-full ${progressColor} transition-all`}
                style={{ width: `${progressWidth}%` }}
              />
              <div
                className="h-full bg-red-500 transition-all"
                style={{ width: '0%' }}
              />
            </div>

            <div className="mt-2 flex justify-between text-sm font-mono">
              <span>Current: {ready ? units : '—'} units</span>

              <span
                className={
                  !ready
                    ? 'text-zinc-500'
                    : oe.hasCrossed
                    ? 'text-red-600'
                    : oe.needsWarning
                    ? 'text-yellow-600'
                    : 'text-green-600'
                }
              >
                {!ready
                  ? 'Enter valid values'
                  : oe.hasCrossed
                  ? `${units - 200} over`
                  : `${200 - units} remaining`}
              </span>
            </div>
          </div>

          {ready && oe.hasCrossed && (
            <div className="mt-6 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 p-5">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 text-red-600 mt-0.5">
                  ⚠
                </div>

                <div>
                  <h4 className="font-black text-red-700 dark:text-red-300">
                    Khatra! 200 Units Cross Ho Gaye ❌
                  </h4>

                  <p className="mt-2 text-sm leading-relaxed text-red-800 dark:text-red-200">
                    Aap ne 200 units cross kar diye. Current usage{' '}
                    {units} units hai. Yeh calculator usage estimate
                    karta hai; actual protected status aur future
                    tariff ka faisla official billing rules/record
                    par depend karta hai.
                  </p>

                  <p className="mt-2 text-sm">
                    Over by {units - 200} units. Daily avg {oe.avg},
                    projection {oe.proj}. Illustrative energy-charge
                    estimate: Rs {Yi(units, false).toFixed(0)}
                    {' '}(taxes, fixed charges aur adjustments ke baghair).
                  </p>
                </div>
              </div>
            </div>
          )}

          {ready && oe.needsWarning && (
            <div className="mt-6 rounded-xl bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-300 dark:border-yellow-800 p-5">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 text-yellow-600 mt-0.5">
                  ⚠
                </div>

                <div>
                  <h4 className="font-black text-yellow-800 dark:text-yellow-300">
                    Warning! 200 Units Cross Ho Sakte Hain
                  </h4>

                  <p className="mt-2 text-sm leading-relaxed text-yellow-900 dark:text-yellow-200">
                    Aap abhi {units} units use kar chuke hain. Isi
                    daily speed par 30-day projection{' '}
                    <b>{oe.proj} units</b> hai, jo 200-unit target
                    se zyada hai. Remaining {30 - days} din mein
                    target ke andar rehne ke liye rozana taqreeban{' '}
                    <b>{oe.safe ?? '—'} units</b> se zyada use na karein.
                  </p>

                  <p className="mt-2 text-sm text-yellow-900 dark:text-yellow-200">
                    Yeh advance usage warning hai — actual protected
                    eligibility ka official decision nahi.
                  </p>
                </div>
              </div>
            </div>
          )}

          {ready && !oe.hasCrossed && !oe.needsWarning && (
            <div className="mt-6 rounded-xl bg-[#ecfdf5] dark:bg-[#143a2f] border border-green-200 dark:border-green-900 p-5">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 text-green-600 mt-0.5">
                  ✅
                </div>

                <div>
                  <h4 className="font-black text-green-700 dark:text-green-300">
                    Protected 200 Unit Target - On Track
                  </h4>

                  <p className="mt-2 text-sm leading-relaxed text-green-800 dark:text-green-200">
                    Rozana average <b>{oe.avg} units</b> hai aur
                    isi speed par mahine ke end tak{' '}
                    <b>{oe.proj} units</b> projection hai. Projection
                    abhi 200 units ke andar hai.
                  </p>

                  <p className="mt-2 text-sm opacity-80">
                    DISCO: {v} ({gu[v]}) — sirf informational
                    selection; yeh tariff logic ko change nahi karta.
                  </p>

                  <p className="mt-2 text-sm">
                    {oe.cycleComplete
                      ? 'Billing cycle ke 30 din complete ho chuke hain.'
                      : `Baaki ${30 - days} din mein 200-unit target maintain karne ke liye daily ${oe.safe ?? '—'} units ka average rakhein.`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {ready && comparison && (
            <div className="mt-6 rounded-xl border p-5 bg-amber-50 dark:bg-zinc-800 border-amber-200 dark:border-zinc-700">
              <h4 className="font-black text-sm">
                Unit Ka Nuqsan Comparison
              </h4>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3 border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700">
                  <div className="text-xs font-bold opacity-60 uppercase">
                    Protected {comparison.baseUnits} Unit
                  </div>

                  <div className="font-mono font-bold text-lg text-green-700">
                    Rs {comparison.protectedCost.toLocaleString()}
                  </div>
                </div>

                <div className="rounded-xl p-3 border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700">
                  <div className="text-xs font-bold opacity-60 uppercase">
                    Non-Pro {comparison.crossUnits} Unit
                  </div>

                  <div className="font-mono font-bold text-lg text-red-600">
                    Rs {comparison.nonProtectedCost.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-full bg-red-600 text-white text-center py-2.5 font-bold text-sm">
                Difference: Rs {comparison.loss.toLocaleString()}
              </div>

              <p className="mt-3 text-xs opacity-60 text-center">
                Same-unit illustrative energy-charge comparison only.
                Actual bills may include taxes, fixed charges and adjustments.
                Protected eligibility depends on official billing rules.
              </p>
            </div>
          )}

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-xl p-3 border bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
              <div className="text-xs font-bold opacity-60 uppercase">
                Daily Avg
              </div>

              <div className="font-mono font-bold text-lg">
                {ready ? oe.avg : '—'}
              </div>
            </div>

            <div className="rounded-xl p-3 border bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
              <div className="text-xs font-bold opacity-60 uppercase">
                Projected
              </div>

              <div className="font-mono font-bold text-lg">
                {ready ? oe.proj : '—'}
              </div>
            </div>

            <div className="rounded-xl p-3 border bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
              <div className="text-xs font-bold opacity-60 uppercase">
                Safe Daily
              </div>

              <div className="font-mono font-bold text-lg">
                {!ready
                  ? '—'
                  : oe.cycleComplete
                  ? 'Complete'
                  : oe.safe}
              </div>
            </div>
          </div>

          <button
            disabled={!ready}
            onClick={() =>
              ku(
                `Mera bill ${units} units par hai. Daily average ${oe.avg} units aur 30-day projection ${oe.proj} units hai. ${
                  oe.needsWarning
                    ? '200 units cross hone ka risk hai.'
                    : oe.hasCrossed
                    ? '200 units cross ho gaye hain.'
                    : 'Projection abhi 200 units ke andar hai.'
                } Calculator: ${canonicalUrl}`
              )
            }
            className="mt-6 w-full min-h-12 rounded-full bg-[#1b4d3e] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#143a2f] transition disabled:opacity-50"
          >
            📱 WhatsApp par Family ko Batao
          </button>

          <div className="mt-4 text-xs opacity-60 text-center">
            Apna usage estimate WhatsApp par share karein.
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border p-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <h4 className="font-bold">Quick Links</h4>

            <div className="mt-3 space-y-2 text-sm">
              <Link
                href="/bill-tax-decoder"
                className="w-full text-left py-2 border-b border-zinc-100 dark:border-zinc-800 flex justify-between hover:text-[#1b4d3e]"
              >
                <span>Tax Decoder</span>
                <span>→</span>
              </Link>

              <Link
                href="/rozana-budget-planner"
                className="w-full text-left py-2 border-b border-zinc-100 dark:border-zinc-800 flex justify-between hover:text-[#1b4d3e]"
              >
                <span>Rozana Planner</span>
                <span>→</span>
              </Link>

              <Link
                href="/solar-net-billing-calculator"
                className="w-full text-left py-2 flex justify-between hover:text-[#1b4d3e]"
              >
                <span>Solar 2026</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border p-6 bg-[#f0fdf4] dark:bg-[#143a2f] border-green-200 dark:border-[#1b4d3e]">
            <h4 className="font-bold">NEPRA Slabs Reference</h4>

            <div className="mt-3 text-sm font-mono space-y-1">
              {nepraTariff.protected.map((slab, index) => (
                <div key={`protected-${slab.limit}`} className="flex justify-between">
                  <span>
                    Protected {index === 0 ? '1' : `${nepraTariff.protected[index - 1].limit + 1}`}-
                    {slab.limit}
                  </span>
                  <span>Rs {slab.rate.toFixed(2)}</span>
                </div>
              ))}

              {nepraTariff.nonProtected.map((slab, index) => (
                <div
                  key={`non-protected-${slab.limit}`}
                  className="flex justify-between text-red-600"
                >
                  <span>
                    Non-Pro {index === 0 ? '1' : `${nepraTariff.nonProtected[index - 1].limit + 1}`}-
                    {Number.isFinite(slab.limit) ? slab.limit : 'Above'}
                  </span>
                  <span>Rs {slab.rate.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <p className="mt-3 text-xs opacity-70">
              Energy rates only. Verify the applicable rates against
              the official notification before relying on estimates.
            </p>

            <a
              href="https://nepra.org.pk/tariff/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block underline font-bold text-sm"
            >
              NEPRA official tariff reference →
            </a>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border p-6 md:p-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-black">
          Protected Status Kya Hai? Guide
        </h2>

        <div className="mt-6 space-y-8 text-sm leading-[1.8]">
          <div>
            <h3 className="font-bold text-base text-[#1b4d3e] dark:text-[#a3e635]">
              What is Protected Status?
            </h3>

            <p className="mt-2 opacity-80">
              Yeh calculator aap ke current units aur guzaray huay
              dinon se 30-day usage projection banata hai. Protected
              category ka actual status sirf is projection se
              confirm nahi hota; official billing rules aur
              consumer record check karein.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-base">
              How to Use This Calculator?
            </h3>

            <p className="mt-2 opacity-80">
              Current billing cycle mein ab tak use huay units
              aur guzaray huay din enter karein. Calculator daily
              average aur month-end projection dikhata hai. Agar
              projection 200 se zyada ho to yellow warning actual
              200 cross honay se pehle alert karti hai.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-base">
              DISCO Information
            </h3>

            <p className="mt-2 opacity-80">
              Dropdown sirf distribution company aur shehar ki
              information dikhata hai. Is selection se protected
              status ya tariff calculation change nahi hoti.
              Fixed charges bhi apne current bill aur official
              notification se verify karein.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-base">
              Daily Budgeting Strategy
            </h3>

            <p className="mt-2 opacity-80">
              200 units ko 30 din par divide karein to average
              taqreeban 6.67 units per day banta hai. Apne
              remaining days aur current usage ke hisaab se Safe
              Daily figure dekhein. Yeh planning estimate hai,
              eligibility guarantee nahi.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
