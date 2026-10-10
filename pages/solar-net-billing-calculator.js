
import Head from 'next/head'
import { useState, useMemo } from 'react'
import SOLAR_NET_BILLING_RATES from '../data/solar-net-billing-rates'

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

export default function SolarNetBilling() {
  const [s, setS] = useState(450)
  const [g, setG] = useState(300)
  const [z, setZ] = useState(80)
  const [T, setT] = useState('LESCO')

  const rates = SOLAR_NET_BILLING_RATES

  const de = useMemo(() => {
    const peakCost = z * rates.peakUnitRate
    const offPeakCost = g * rates.offPeakUnitRate

    const totalImportBill =
      peakCost +
      offPeakCost +
      rates.fixedCharges

    const solarCredit =
      s * rates.solarBuybackRate

    const finalBalance =
      totalImportBill - solarCredit

    // Apply taxes only when the balance is positive.
    const electricityDuty =
      finalBalance > 0
        ? finalBalance * rates.electricityDutyRate
        : 0

    const gst =
      finalBalance > 0
        ? (finalBalance + electricityDuty) * rates.gstRate
        : 0

    const finalAmount =
      finalBalance > 0
        ? finalBalance + electricityDuty + gst
        : Math.abs(finalBalance)

    return {
      peakCost,
      offPeakCost,
      totalImportBill,
      solarCredit,
      finalBalance,
      electricityDuty,
      gst,
      finalAmount,
      isCredit: finalBalance < 0,
      isZero: finalBalance === 0,
    }
  }, [s, g, z, rates])

  const money = (amount) =>
    amount.toLocaleString('en-PK', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  const updateUnits = (setter, value, max) => {
    if (value === '') {
      setter(0)
      return
    }

    const number = Number(value)

    if (Number.isFinite(number)) {
      setter(Math.max(0, Math.min(max, number)))
    }
  }

  const ku = (message) => {
    if (typeof window !== 'undefined') {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(message)}`,
        '_blank',
        'noopener,noreferrer'
      )
    }
  }

  const shareCalculation = () => {
    const result = de.isCredit
      ? `Solar Credit Balance: Rs ${money(de.finalAmount)} CR`
      : de.isZero
        ? 'Estimated Bill: Rs 0.00'
        : `Estimated Bill: Rs ${money(de.finalAmount)}`

    ku(
      `Solar Net Billing Calculation\n\n` +
      `Electricity Company: ${T}\n` +
      `Solar Units Sent: ${s}\n` +
      `Off-Peak Units Taken: ${g}\n` +
      `Peak Units Taken: ${z}\n\n` +
      `WAPDA Import Bill: Rs ${money(de.totalImportBill)}\n` +
      `Solar Credit: Rs ${money(de.solarCredit)}\n` +
      `Electricity Duty: Rs ${money(de.electricityDuty)}\n` +
      `GST: Rs ${money(de.gst)}\n\n` +
      `${result}\n\n` +
      `Calculate your solar bill at:\n` +
      `https://bijlibill.pk/solar-net-billing-calculator`
    )
  }

  return (
    <>
      <Head>
        <title>
          Solar Net Billing Calculator Pakistan 2026 | BijliBill.pk
        </title>

        <meta
          name="description"
          content="Calculate your estimated solar electricity bill or credit in Pakistan. Enter solar export, peak and off-peak units to see your estimated bill, electricity duty, GST and solar credit."
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large"
        />

        <meta
          property="og:site_name"
          content="BijliBill.pk"
        />

        <meta
          name="twitter:card"
          content="summary"
        />

        <meta
          name="twitter:title"
          content="Solar Net Billing Calculator Pakistan 2026 | BijliBill.pk"
        />

        <meta
          name="twitter:description"
          content="Estimate your solar electricity bill or credit in Pakistan using exported solar units and peak and off-peak usage."
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Solar Net Billing Calculator Pakistan",
              url: "https://bijlibill.pk/solar-net-billing-calculator",
              description:
                "Estimate your solar electricity bill or credit in Pakistan using exported solar units and peak and off-peak electricity usage.",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "PKR",
              },
            }),
          }}
        />

        <meta
          property="og:title"
          content="Solar Net Billing Calculator Pakistan | BijliBill.pk"
        />

        <meta
          property="og:description"
          content="Enter your solar units and WAPDA units to calculate your estimated electricity bill or solar credit."
        />

        <meta
          property="og:url"
          content="https://bijlibill.pk/solar-net-billing-calculator"
        />

        <meta property="og:type" content="website" />
      </Head>

      <div className="space-y-6">
        <div className="flex items-center gap-2 text-[12px]">
          <span className="opacity-60">Home</span>
          <span>/</span>
          <span className="font-bold">
            Solar Net Billing 2026
          </span>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="rounded-[24px] border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#a3e635] text-[#1b4d3e] flex items-center justify-center">
                ☀️
              </div>

              <div>
                <h1 className="text-[22px] font-black">
                  Solar Net Billing Calculator 2026
                </h1>
                <p className="text-[12px] opacity-70">
                  Apne solar units enter karein aur bill ya credit check karein.
                </p>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest opacity-60">
                  Solar Units Sent to WAPDA
                </label>

                <input
                  type="number"
                  min="0"
                  max="2000"
                  value={s}
                  onChange={(e) =>
                    updateUnits(setS, e.target.value, 2000)
                  }
                  className="mt-2 w-full h-[48px] rounded-[12px] border px-4 font-mono font-bold text-[18px] bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                />

                <p className="mt-1 text-[10px] opacity-60">
                  WAPDA ko kitne units diye?
                </p>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest opacity-60">
                  Off-Peak Units Taken
                </label>

                <input
                  type="number"
                  min="0"
                  max="2000"
                  value={g}
                  onChange={(e) =>
                    updateUnits(setG, e.target.value, 2000)
                  }
                  className="mt-2 w-full h-[48px] rounded-[12px] border px-4 font-mono font-bold text-[18px] bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                />

                <p className="mt-1 text-[10px] opacity-60">
                  Saste waqt mein kitne units liye?
                </p>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest opacity-60">
                  Peak Units Taken
                </label>

                <input
                  type="number"
                  min="0"
                  max="2000"
                  value={z}
                  onChange={(e) =>
                    updateUnits(setZ, e.target.value, 2000)
                  }
                  className="mt-2 w-full h-[48px] rounded-[12px] border px-4 font-mono font-bold text-[18px] bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                />

                <p className="mt-1 text-[10px] opacity-60">
                  Shaam 6 se raat 10 baje tak ke units.
                  Apne bill ki timings bhi check karein.
                </p>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest opacity-60">
                  Select DISCO
                </label>

                <select
                  value={T}
                  onChange={(e) => setT(e.target.value)}
                  className="mt-2 w-full h-[48px] rounded-[12px] border px-4 font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                >
                  {yu.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 p-5 rounded-[16px] bg-[#1b4d3e] text-white">
              <div className="text-[11px] font-bold tracking-widest opacity-70">
                AAP KA RESULT
              </div>

              {de.isCredit ? (
                <>
                  <div className="mt-2 text-[12px] opacity-80">
                    Aap ka Solar Credit Balance
                  </div>

                  <div className="mt-1 font-mono font-black text-[28px] text-[#a3e635]">
                    Rs {money(de.finalAmount)} CR
                  </div>

                  <p className="mt-3 text-[12px] leading-relaxed opacity-80">
                    Aap ke solar credit ki calculated value aap ke
                    import bill se zyada hai. Applicable billing rules
                    ke mutabiq credit ka treatment different ho sakta hai.
                  </p>
                </>
              ) : de.isZero ? (
                <>
                  <div className="mt-2 text-[12px] opacity-80">
                    Aap ka Estimated Bill
                  </div>

                  <div className="mt-1 font-mono font-black text-[28px] text-[#a3e635]">
                    Rs 0.00
                  </div>

                  <p className="mt-3 text-[12px] leading-relaxed opacity-80">
                    Is calculation mein import bill aur solar credit barabar hain.
                    Doosre charges alag ho sakte hain.
                  </p>
                </>
              ) : (
                <>
                  <div className="mt-2 text-[12px] opacity-80">
                    Aap ka Estimated Bill
                  </div>

                  <div className="mt-1 font-mono font-black text-[28px] text-[#a3e635]">
                    Rs {money(de.finalAmount)}
                  </div>

                  <p className="mt-3 text-[12px] leading-relaxed opacity-80">
                    Is estimate mein electricity duty aur GST bhi shamil hain.
                    Doosre bill charges alag ho sakte hain.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="p-4 rounded-[12px] border bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                <div className="text-[10px] font-bold opacity-60">
                  WAPDA Import Bill
                </div>

                <div className="font-mono font-bold text-[16px]">
                  Rs {money(de.totalImportBill)}
                </div>

                <div className="text-[10px] opacity-60">
                  Units ka bill + fixed charges
                </div>
              </div>

              <div className="p-4 rounded-[12px] border bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                <div className="text-[10px] font-bold opacity-60">
                  Solar Credit
                </div>

                <div className="font-mono font-bold text-[16px] text-green-600">
                  Rs {money(de.solarCredit)}
                </div>

                <div className="text-[10px] opacity-60">
                  Exported units ki value
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-[12px] border bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
              <h2 className="font-black text-[14px]">
                Bill Ki Tafseel
              </h2>

              <div className="mt-3 space-y-3 text-[13px]">
                <div className="flex justify-between gap-3">
                  <span>Peak units ka bill</span>
                  <span className="font-mono font-bold">
                    Rs {money(de.peakCost)}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span>Off-peak units ka bill</span>
                  <span className="font-mono font-bold">
                    Rs {money(de.offPeakCost)}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span>Fixed charges</span>
                  <span className="font-mono font-bold">
                    Rs {money(rates.fixedCharges)}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span>Solar credit minus</span>
                  <span className="font-mono font-bold text-green-600">
                    − Rs {money(de.solarCredit)}
                  </span>
                </div>

                {de.finalBalance > 0 && (
                  <>
                    <div className="flex justify-between gap-3">
                      <span>Electricity duty (1.5%)</span>
                      <span className="font-mono font-bold">
                        Rs {money(de.electricityDuty)}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span>GST (18%)</span>
                      <span className="font-mono font-bold">
                        Rs {money(de.gst)}
                      </span>
                    </div>
                  </>
                )}

                <div className="border-t border-zinc-200 dark:border-zinc-700 pt-3 flex justify-between gap-3">
                  <span className="font-bold">
                    {de.isCredit
                      ? 'Solar Credit Balance'
                      : 'Final Estimated Amount'}
                  </span>

                  <span className="font-mono font-black">
                    Rs {money(de.finalAmount)}
                    {de.isCredit ? ' CR' : ''}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={shareCalculation}
              className="mt-6 w-full h-[52px] rounded-full bg-[#a3e635] text-[#1b4d3e] font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-[#84cc16] transition"
            >
              📱 WhatsApp Solar Calculation
            </button>
          </div>

          <div className="rounded-[24px] border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <h2 className="font-black text-[16px]">
              Solar Net Billing Kaise Calculate Hota Hai?
            </h2>

            <div className="mt-4 space-y-4 text-[13px] leading-[1.7]">
              <p className="opacity-80">
                <b>Step 1:</b> WAPDA se liye gaye peak aur off-peak
                units ka bill calculate hota hai. Fixed charges bhi
                shamil kiye jate hain.
              </p>

              <p className="opacity-80">
                <b>Step 2:</b> Solar ke grid ko bheje gaye units ki
                value calculate hoti hai.
              </p>

              <p className="opacity-80">
                <b>Step 3:</b> Solar credit ko import bill se minus
                kiya jata hai. Agar amount positive ho to is calculator
                mein duty aur GST add hote hain. Agar negative ho to
                estimated credit balance dikhaya jata hai.
              </p>

              <div className="p-4 rounded-[12px] bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                <h3 className="font-bold text-[12px]">
                  Solar Bill Bachane Ke Tips
                </h3>

                <ul className="mt-2 list-disc ml-4 space-y-1 text-[11px] opacity-80">
                  <li>
                    Din mein solar electricity zyada use karne ki koshish karein.
                  </li>
                  <li>
                    Apne electricity bill par peak aur off-peak timings check karein.
                  </li>
                  <li>
                    Solar units aur credit ko apne actual bill se compare karein.
                  </li>
                </ul>
              </div>

              <h3 className="font-black text-[14px]">
                Frequently Asked Questions
              </h3>

              <div>
                <h4 className="font-bold">
                  Solar credit kaise calculate hota hai?
                </h4>

                <p className="mt-1 opacity-80">
                  Solar units sent to the grid ko data file mein set
                  kiye gaye buyback rate se multiply kiya jata hai.
                </p>
              </div>

              <div>
                <h4 className="font-bold">
                  Kya yeh mera exact WAPDA bill hoga?
                </h4>

                <p className="mt-1 opacity-80">
                  Yeh estimated calculation hai. Aap ke actual bill
                  mein doosre taxes, adjustments ya charges bhi ho sakte hain.
                </p>
              </div>

              <div>
                <h4 className="font-bold">
                  Kya credit agle mahine add hoga?
                </h4>

                <p className="mt-1 opacity-80">
                  Credit ka actual carry-forward ya settlement aap ke
                  applicable agreement aur billing rules par depend karta hai.
                  Calculator ka result guaranteed utility credit nahi hai.
                </p>
              </div>

              <p className="text-[11px] opacity-60">
                Applicable rules ke liye official{' '}
                <a
                  href="https://nepra.org.pk/Legal.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-bold"
                >
                  NEPRA regulations
                </a>{' '}
                check karein.
              </p>
            </div>
          </div>
        </div>

        <p className="text-[11px] leading-relaxed opacity-60">
          Disclaimer: Yeh calculator estimated bill aur credit dikhata hai,
          official electricity bill nahi. Actual charges aur credit settlement
          applicable tariff, agreement, taxes aur billing rules ke mutabiq
          different ho sakte hain.
        </p>
      </div>
    </>
  )
}
