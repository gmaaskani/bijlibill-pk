
import { useState } from 'react'
import { DISCOS, DISCO_FC, DISCO_INFO } from '../utils/calc'
import { Yi } from '../utils/calc'
import Link from 'next/link'

export default function Programmatic(){
  const [disco, setDisco] = useState('LESCO')
  const [units, setUnits] = useState(195)
  const isProtected = units <= 200
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-[12px]"><span className="opacity-60">Home</span><span>/</span><span className="font-bold">[disco]/[units] Programmatic SEO Template</span></div>
      <div className="rounded-[24px] border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 mb-4"><div className="w-8 h-8 rounded-full bg-[#1b4d3e] text-white flex items-center justify-center text-[12px] font-bold">SEO</div><h1 className="font-black text-[20px]">Dynamic Page: /[disco]/[units].js</h1></div>
        <p className="text-[13px] opacity-70">This template reads URL params and switches text to avoid duplicate content. In preview, simulate with inputs. Generates 10 DISCOs x 500 units = 5000 pages</p>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div><label className="text-[11px] font-bold uppercase tracking-widest opacity-60">DISCO Param</label><select value={disco} onChange={e=> setDisco(e.target.value)} className="mt-2 w-full h-[48px] rounded-[12px] border px-4 font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">{DISCOS.map(w=><option key={w}>{w}</option>)}</select></div>
          <div><label className="text-[11px] font-bold uppercase tracking-widest opacity-60">Units Param</label><input type="number" value={units} onChange={e=> setUnits(Math.max(0,Math.min(1000,Number(e.target.value))))} className="mt-2 w-full h-[48px] rounded-[12px] border px-4 font-mono font-bold text-[18px] bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700" /></div>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className={`p-5 rounded-[16px] border ${units<=200?'bg-[#ecfdf5] dark:bg-[#143a2f] border-green-200':'bg-red-50 dark:bg-red-950/20 border-red-200'}`}>
            {units<=200 ? (
              <><h4 className="font-black text-green-700 dark:text-green-300">Mubarak ho! {disco} mein aap {units} units par Protected hain. 🎉</h4><p className="mt-2 text-[13px] leading-relaxed text-green-800 dark:text-green-200">{DISCO_INFO[disco]} mein aap ko Rs 10.54/13.01 ka faida mil raha hai. Daily {(units/30).toFixed(2)} units ka khayal rakhein. {disco} ka fixed Rs {DISCO_FC[disco]}. 200 se neeche raho to 6 mahine tak Protected.</p></>
            ) : (
              <><h4 className="font-black text-red-700 dark:text-red-300">{disco} Alert! {units} units - Non-Protected ⚠️</h4><p className="mt-2 text-[13px] leading-relaxed text-red-800 dark:text-red-200">Aap Non-Protected ho gaye, fixed Rs {DISCO_FC[disco]}, 0-100 Rs 22.44, 101-200 Rs 32.10, FPA Rs 3.5/unit extra, 6 months tak double bill. {DISCO_INFO[disco]} mein bijli bachao! Bill ~Rs {(Yi(units,false)*1.25).toFixed(0)} expected.</p></>
            )}
          </div>
          <div className="p-5 rounded-[16px] border bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
            <h4 className="font-bold text-[13px]">Programmatic SEO Logic</h4>
            <pre className="mt-3 text-[11px] font-mono overflow-auto">{`// pages/[disco]/[units].js
export async function getServerSideProps({params}) {
  const {disco, units} = params
  const isProtected = Number(units) <= 200
  return { props: { disco, units, isProtected } }
}
// Text switching:
// if units <200 => celebratory Urdu advisory
// else => DISCO-specific tax penalty breakdown
// Prevents duplicate content flags
// Generates 10 DISCOs x 500 units = 5000 pages`}</pre>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="font-bold text-[12px] uppercase tracking-widest opacity-60">Example URLs (Internal Linking for SEO Authority)</h4>
          <div className="mt-3 flex flex-wrap gap-2">{["/lesco/195","/mepco/210","/ke/250","/iesco/180","/fesco/199","/gepco/205","/pesco/175","/hesco/220"].map(w=><Link key={w} href={w} className="px-3 py-1.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-[11px] font-mono">{w}</Link>)}</div>
        </div>
      </div>
    </div>
  )
}
