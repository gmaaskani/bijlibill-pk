
import { Yi, calcBill, DISCO_FC, DISCO_INFO, DISCOS } from '../../utils/calc'

export async function getServerSideProps({params}){
  const { disco, units } = params
  const discoUpper = disco.toUpperCase()
  const discoKey = discoUpper === 'KE' ? 'K-Electric' : discoUpper
  const unitsNum = Number(units)
  const isProtected = unitsNum <= 200
  // Validate
  if(isNaN(unitsNum) || unitsNum <0 || unitsNum>1000){
    return { notFound: true }
  }
  return { props: { disco: discoKey, rawDisco: disco, units: unitsNum, isProtected } }
}

export default function DiscoUnitPage({ disco, rawDisco, units, isProtected }){
  const fc = DISCO_FC[disco] || DISCO_FC[disco.toUpperCase()] || 3.23
  const info = DISCO_INFO[disco] || DISCO_INFO[disco.toUpperCase()] || "Bijli bachao."
  const bill = calcBill(units, isProtected, fc)
  const daily = (units/30).toFixed(2)
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-[12px]"><span className="opacity-60">Home</span><span>/</span><span className="opacity-60">{rawDisco}</span><span>/</span><span className="font-bold">{units} units</span></div>
      <div className={`rounded-[24px] border p-6 md:p-8 ${isProtected?'bg-[#ecfdf5] dark:bg-[#143a2f] border-green-200':'bg-red-50 dark:bg-red-950/20 border-red-200'}`}>
        {isProtected ? (
          <>
            <h1 className="font-black text-[24px] md:text-[32px] text-green-700 dark:text-green-300">Mubarak ho! {disco} mein aap {units} units par Protected hain. 🎉</h1>
            <p className="mt-3 text-[14px] leading-relaxed text-green-800 dark:text-green-200">{info} mein aap ko Rs 10.54/13.01 ka faida mil raha hai. Daily {daily} units ka khayal rakhein. {disco} ka fixed Rs {fc}. 200 se neeche raho to 6 mahine tak Protected. Bill ~Rs {bill.total.toFixed(0)}.</p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-[12px] font-mono">
              <div className="p-3 rounded-[10px] bg-white/60 dark:bg-black/20">Energy: Rs {bill.energy.toFixed(0)}</div>
              <div className="p-3 rounded-[10px] bg-white/60 dark:bg-black/20">FPA: Rs {bill.FPA.toFixed(0)}</div>
              <div className="p-3 rounded-[10px] bg-[#1b4d3e] text-white">Total: Rs {bill.total.toFixed(0)}</div>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-black text-[24px] md:text-[32px] text-red-700 dark:text-red-300">{disco} Alert! {units} units - Non-Protected ⚠️</h1>
            <p className="mt-3 text-[14px] leading-relaxed text-red-800 dark:text-red-200">Aap Non-Protected ho gaye, fixed Rs {fc}, 0-100 Rs 22.44, 101-200 Rs 32.10, FPA Rs 3.5/unit extra, 6 months tak double bill. {info} mein bijli bachao! Bill ~Rs {bill.total.toFixed(0)} expected. Yi({units},{isProtected.toString()}) = {Yi(units,isProtected).toFixed(0)} + taxes.</p>
            <div className="mt-4 p-4 rounded-[12px] bg-white dark:bg-zinc-900 border">
              <h4 className="font-bold text-[12px] uppercase tracking-widest opacity-60">DISCO-specific Tax Penalty Breakdown - {disco}</h4>
              <div className="mt-3 text-[12px] font-mono grid grid-cols-2 gap-2">
                <span>Energy (Non-Prot): Rs {bill.energy.toFixed(0)}</span><span>FPA 3.5: Rs {bill.FPA.toFixed(0)}</span>
                <span>QTA 1.5: Rs {bill.QTA.toFixed(0)}</span><span>FC: Rs {bill.FC.toFixed(0)}</span>
                <span>Duty 1.5%: Rs {bill.duty.toFixed(0)}</span><span>GST 18%: Rs {bill.gst.toFixed(0)}</span>
              </div>
            </div>
          </>
        )}
        <p className="mt-6 text-[11px] opacity-60">Canonical: https://bijlibill.pk/{rawDisco}/{units} • {isProtected ? 'Protected' : 'Non-Protected'} • NEPRA 2026 • SRO 251(I)/2026 for solar • This page is auto-generated for SEO - 5000 pages total (10 DISCOs x 500 units)</p>
      </div>
    </div>
  )
}
