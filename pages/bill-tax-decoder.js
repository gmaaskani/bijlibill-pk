
import Head from 'next/head'
import { useState, useMemo } from 'react'

// Billing assumptions supplied for this calculator.
// Verify official notifications and eligibility before publishing
// these values as universally applicable rates.
const BILLING_RATES = {
  protected: 13.01,
  unprotected: 34.42,
  protectedFC: 0.43,
  unprotectedFC: 3.23,
  fixedCharge1kW: 300,
  qta: 0.52,
  fpa: 1.11,
  gst: 0.18,
  electricityDuty: {
    LESCO: 0.015,
    MEPCO: 0.015,
    FESCO: 0.015,
    GEPCO: 0.015,
    IESCO: 0.015,
    'K-Electric': 0.015,
    HESCO: 0.015,
    SEPCO: 0.015,
    PESCO: 0.01,
    TESCO: 0.01,
    QESCO: 0,
  },
}

// Historical FPA figures are not shown until verified.
const N1 = []

const yu = [
  'LESCO',
  'MEPCO',
  'IESCO',
  'FESCO',
  'K-Electric',
  'GEPCO',
  'PESCO',
  'TESCO',
  'HESCO',
  'SEPCO',
  'QESCO',
]

function formatRs(value) {
  if (value == null || !Number.isFinite(value)) {
    return 'Not included'
  }

  return `Rs ${value.toLocaleString('en-PK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function calculateBill(units, isProtected, disco) {
  const safeUnits = Math.max(
    0,
    Math.min(1000, Number(units) || 0)
  )

  // Simplified scenario rule, not a definitive eligibility check.
  const protectedTariff = isProtected && safeUnits <= 200

  const energyRate = protectedTariff
    ? BILLING_RATES.protected
    : BILLING_RATES.unprotected

  const fcRate = protectedTariff
    ? BILLING_RATES.protectedFC
    : BILLING_RATES.unprotectedFC

  const dutyRate =
    BILLING_RATES.electricityDuty[disco] ?? 0.015

  // Core charges based on configured assumptions.
  const energy = safeUnits * energyRate
  const fc = safeUnits * fcRate
  const fixed = BILLING_RATES.fixedCharge1kW
  const qta = safeUnits * BILLING_RATES.qta

  const coreSubtotal = energy + fc + fixed + qta

  const duty = coreSubtotal * dutyRate
  const gst = (coreSubtotal + duty) * BILLING_RATES.gst

  const billBeforeFpa = coreSubtotal + duty + gst

  // FPA and associated taxes, based on configured assumptions.
  const fpa = safeUnits * BILLING_RATES.fpa
  const fpaDuty = fpa * dutyRate
  const fpaGst =
    (fpa + fpaDuty) * BILLING_RATES.gst

  const totalFpa = fpa + fpaDuty + fpaGst
  const total = billBeforeFpa + totalFpa

  return {
    units: safeUnits,
    protectedTariff,
    energyRate,
    energy,
    fcRate,
    fc,
    fixed,
    qta,
    coreSubtotal,
    dutyRate,
    duty,
    gst,
    billBeforeFpa,
    fpa,
    fpaDuty,
    fpaGst,
    totalFpa,
    total,
  }
}

export default function BillTaxDecoder() {
  const [m, setM] = useState('200')
  const [E, setE] = useState('LESCO')
  const [D, setD] = useState(true)
  const [showCode, setShowCode] = useState(false)

  const units = Math.max(
    0,
    Math.min(1000, Number(m) || 0)
  )

  const ne = useMemo(
    () => calculateBill(units, D, E),
    [units, D, E]
  )

  const breakdown = [
    {
      label: 'Base Electricity Charges',
      value: ne.energy,
      note: `${formatRs(ne.energyRate)} per unit`,
    },
    {
      label: 'FC Surcharge',
      value: ne.fc,
      note: `${formatRs(ne.fcRate)} per unit`,
    },
    {
      label: 'Fixed Charges (1 kW)',
      value: ne.fixed,
      note: 'Assumes sanctioned load of 1 kW',
    },
    {
      label: 'Quarterly Tariff Adjustment (QTA)',
      value: ne.qta,
      note: `${formatRs(BILLING_RATES.qta)} per unit`,
    },
    {
      label: 'Subtotal (Cost of Electricity)',
      value: ne.coreSubtotal,
      note: 'Energy + FC + fixed charges + QTA',
    },
    {
      label: `Electricity Duty (${(
        ne.dutyRate * 100
      ).toFixed(1)}%)`,
      value: ne.duty,
      note: 'Calculated on the core subtotal',
    },
    {
      label: 'GST (18%)',
      value: ne.gst,
      note: 'Calculated on subtotal plus electricity duty',
    },
    {
      label: 'Bill Before FPA',
      value: ne.billBeforeFpa,
      note: 'Subtotal + electricity duty + GST',
    },
    {
      label: 'Fuel Price Adjustment (FPA)',
      value: ne.fpa,
      note: `${formatRs(BILLING_RATES.fpa)} per unit`,
    },
    {
      label: 'Electricity Duty on FPA',
      value: ne.fpaDuty,
      note: 'Uses the selected DISCO duty rate',
    },
    {
      label: 'GST on FPA',
      value: ne.fpaGst,
      note: 'Calculated on FPA plus its duty',
    },
    {
      label: 'Total FPA Including Taxes',
      value: ne.totalFpa,
      note: 'FPA + its electricity duty + its GST',
    },
  ]

  const ku = (message) => {
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const shareBreakdown = () => {
    const message = [
      `Estimated electricity bill for ${ne.units} units`,
      `DISCO: ${E}`,
      `Tariff scenario: ${
        ne.protectedTariff ? 'Protected' : 'Unprotected'
      }`,
      `Base electricity: ${formatRs(ne.energy)}`,
      `FC surcharge: ${formatRs(ne.fc)}`,
      `Fixed charges (1 kW): ${formatRs(ne.fixed)}`,
      `QTA: ${formatRs(ne.qta)}`,
      `Electricity duty: ${formatRs(ne.duty)}`,
      `Core GST: ${formatRs(ne.gst)}`,
      `Bill before FPA: ${formatRs(ne.billBeforeFpa)}`,
      `FPA: ${formatRs(ne.fpa)}`,
      `Duty on FPA: ${formatRs(ne.fpaDuty)}`,
      `GST on FPA: ${formatRs(ne.fpaGst)}`,
      `Estimated total: ${formatRs(ne.total)}`,
      '',
      'Estimate based on configured assumptions. Actual charges,',
      'taxes, exemptions and eligibility may differ.',
      'https://bijlibill.pk/bill-tax-decoder',
    ].join('\n')

    ku(message)
  }

  return (
    <div className="space-y-6">
      <Head>
        <title>
          Electricity Bill Tax Calculator Pakistan | BijliBill.pk
        </title>
        <meta
          name="description"
          content="Estimate electricity bill taxes in Pakistan. Calculate energy charges, FC surcharge, QTA, electricity duty, GST and FPA with a detailed bill breakdown."
        />
        <meta
          property="og:title"
          content="Electricity Bill Tax Calculator Pakistan | BijliBill.pk"
        />
        <meta
          property="og:description"
          content="Explore an estimated electricity bill breakdown, including configured taxes, surcharges and adjustments for your selected DISCO."
        />
        <meta
          property="og:url"
          content="https://bijlibill.pk/bill-tax-decoder"
        />
        <meta property="og:type" content="website" />
      </Head>

      <div className="flex items-center gap-2 text-[12px]">
        <span className="opacity-60">Home</span>
        <span>/</span>
        <span className="font-bold">Bill Tax Decoder</span>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="rounded-[24px] border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-900 dark:bg-zinc-700 text-white flex items-center justify-center">
              🧾
            </div>
            <div>
              <h1 className="text-[22px] font-black">
                Bill Tax Decoder
              </h1>
              <p className="text-[12px] opacity-70">
                Estimate electricity bill taxes, including GST,
                electricity duty, FPA and QTA, with a detailed breakdown.
              </p>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-widest opacity-60">
                DISCO
              </label>
              <select
                value={E}
                onChange={(w) => setE(w.target.value)}
                className="mt-2 w-full h-[48px] rounded-[12px] border px-4 font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
              >
                {yu.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-widest opacity-60">
                Units (0-1000)
              </label>
              <input
                type="number"
                min="0"
                max="1000"
                value={m}
                onChange={(w) => {
                  const value = w.target.value

                  if (value === '') {
                    setM('')
                    return
                  }

                  setM(
                    String(
                      Math.max(
                        0,
                        Math.min(1000, Number(value) || 0)
                      )
                    )
                  )
                }}
                onBlur={() => {
                  if (m === '') setM('0')
                }}
                className="mt-2 w-full h-[48px] rounded-[12px] border px-4 font-mono font-bold text-[18px] bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
              />
            </div>

            <div className="flex items-end">
              <label className="w-full h-[48px] rounded-[12px] border flex items-center gap-2 px-4 cursor-pointer bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                <input
                  type="checkbox"
                  checked={D}
                  onChange={(w) => setD(w.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-[13px] font-bold">
                  Protected?
                </span>
              </label>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {breakdown.map((w, index) => (
              <div
                key={w.label}
                className={`flex justify-between items-center p-3 rounded-[12px] border ${
                  index === 0
                    ? 'bg-[#f0fdf4] dark:bg-[#143a2f] border-green-200'
                    : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <div>
                  <div className="text-[12px] font-bold">
                    {w.label}
                  </div>
                  <div className="text-[10px] opacity-60">
                    {w.note}
                  </div>
                </div>
                <div className="font-mono font-bold">
                  {formatRs(w.value)}
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center p-4 rounded-[12px] bg-[#1b4d3e] text-white">
              <div className="font-black text-[14px]">
                Estimated Total*
              </div>
              <div className="font-mono font-black text-[20px]">
                {formatRs(ne.total)}
              </div>
            </div>

            <p className="mt-2 text-[10px] opacity-60">
              *Estimate based on configured rates, 1 kW fixed
              charges and the selected duty rate. Actual bills may
              differ due to eligibility, exemptions, tariff rules
              and other bill-specific charges. This simplified
              estimate is not an official bill or a guarantee of
              the amount payable.
            </p>
          </div>

          <button
            onClick={shareBreakdown}
            className="mt-6 w-full h-[52px] rounded-full bg-[#1b4d3e] text-white font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-[#143a2f] transition"
          >
            📱 WhatsApp Tax Breakdown Share
          </button>
        </div>

        <div className="space-y-4">
          <div className="rounded-[24px] border overflow-hidden bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <div className="p-4 bg-[#1b4d3e] text-white font-bold text-[13px] flex items-center gap-2">
              📊 FPA Monthly Surcharge Tracker
            </div>
          {false&&(
            <div className="overflow-auto">
              <table className="w-full text-[11px]">
                <thead className="bg-zinc-50 dark:bg-zinc-800 font-bold">
                  <tr>
                    <th className="p-2 text-left">Month</th>
                    <th className="p-2">LESCO</th>
                    <th className="p-2">MEPCO</th>
                    <th className="p-2">IESCO</th>
                    <th className="p-2">KE</th>
                    <th className="p-2">FESCO</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {N1.length > 0 ? (
                    N1.map((w) => (
                      <tr
                        key={w.month}
                        className="border-t border-zinc-100 dark:border-zinc-800"
                      >
                        <td className="p-2 font-bold">
                          {w.month}
                        </td>
                        <td className="p-2 text-center">{w.LESCO}</td>
                        <td className="p-2 text-center">{w.MEPCO}</td>
                        <td className="p-2 text-center">{w.IESCO}</td>
                        <td className="p-2 text-center">{w.KE}</td>
                        <td className="p-2 text-center">{w.FESCO}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-4 text-center opacity-70"
                      >
                        No verified historical FPA figures are
                        currently available. Figures will be added
                        only after checking the relevant official
                        monthly notifications.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>)}

            <div className="p-3 text-[10px] opacity-60">
              Historical figures are not displayed until verified.
              The calculator uses the configured FPA assumption above;
              that assumption may not match the rate on your current bill.
            </div>
          </div> 

          <div className="rounded-[24px] border p-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <h4 className="font-bold">
              Why Your Final Bill Can Differ
            </h4>
            <p className="mt-3 text-[12px] leading-relaxed opacity-70">
              This calculator provides an estimate based on configured
              rates and a 1 kW fixed-charge assumption. Your final bill
              can differ because of tariff category, sanctioned load,
              consumer eligibility, notified adjustments, exemptions,
              taxes and other applicable charges. Check the current
              official tariff and your electricity bill for the final
              payable amount.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[24px] border p-6 md:p-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
        <h2 className="text-[20px] font-black">
          Electricity Bill Tax Guide for Pakistan
        </h2>

        <div className="mt-4 grid md:grid-cols-2 gap-8 text-[13px] leading-[1.7]">
          <div>
            <h4 className="font-bold">
              FPA Kya Hai? Fuel Price Adjustment
            </h4>
            <p className="opacity-80 mt-2">
              Fuel Price Adjustment (FPA) reflects changes in fuel
              costs used in electricity generation. Its applicable
              rate can change with official notifications and billing
              periods. This calculator uses a configured estimate,
              which should be checked against the relevant notification
              and consumer eligibility rules.
            </p>

            <h4 className="font-bold mt-4">
              QTA - Quarterly Tariff Adjustment
            </h4>
            <p className="opacity-80 mt-2">
              Quarterly Tariff Adjustment (QTA) accounts for certain
              power-sector cost adjustments. The applicable amount
              and exemptions can depend on the relevant notification
              and billing period.
            </p>
          </div>

          <div>
            <h4 className="font-bold">
              GST 18% Kaise Calculate Hota Hai?
            </h4>
            <p className="opacity-80 mt-2">
              This estimate applies the configured GST percentage to
              the subtotal plus the calculated electricity duty.
              Actual taxable amounts and treatment of individual
              charges may differ under applicable billing rules.
              Check the applicable rules before relying on this as an
              exact calculation of your bill.
            </p>

            <h4 className="font-bold mt-4">
              Fixed Charges Har DISCO Mein
            </h4>
            <p className="opacity-80 mt-2">
              Fixed charges can depend on tariff category and
              sanctioned load. This calculator currently assumes
              1 kW and Rs 300 in fixed charges. Consumers with
              different sanctioned loads may have different bills.
            </p>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-8 text-[13px] leading-[1.7]">
          <div>
            <h4 className="font-bold">
              Why Is My Electricity Bill Higher Than Expected?
            </h4>
            <p className="opacity-80 mt-2">
              Your payable amount can include charges or adjustments
              that are not represented in this simplified estimate.
              Compare the units, tariff category, sanctioned load,
              taxes, adjustments and any arrears shown on your actual
              bill before comparing totals.
            </p>
          </div>

          <div>
            <h4 className="font-bold">
              Is This an Official Bill Calculator?
            </h4>
            <p className="opacity-80 mt-2">
              No. This is an independent estimate using configured
              assumptions. It does not replace your electricity
              distributor's bill or the current official tariff.
              Rates and tax treatment should be checked against
              applicable notifications and your consumer category.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowCode(!showCode)}
          className="mt-6 text-[12px] font-bold underline"
        >
          {showCode ? 'Hide Calculation Notes' : 'View Calculation Notes'}
        </button>

        {showCode && (
          <pre className="mt-3 p-4 rounded-[12px] overflow-auto text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800">
            {`Energy rate: ${ne.energyRate.toFixed(2)} Rs/unit
FC surcharge: ${ne.fcRate.toFixed(2)} Rs/unit
QTA: ${BILLING_RATES.qta.toFixed(2)} Rs/unit
FPA: ${BILLING_RATES.fpa.toFixed(2)} Rs/unit
Fixed charges: Rs ${BILLING_RATES.fixedCharge1kW} (1 kW assumption)
Duty rate: ${(ne.dutyRate * 100).toFixed(1)}%
GST rate: ${(BILLING_RATES.gst * 100).toFixed(0)}%
Selected DISCO: ${E}

These are configured assumptions, not a guarantee
that every consumer's bill will use these exact rates.`}
          </pre>
        )}
      </div>
    </div>
  )
}
