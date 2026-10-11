import Head from 'next/head'
import { useState, useEffect, useMemo } from 'react'

export default function Rozana(){
  const [entries, setEntries] = useState([])
  const [date, setDate] = useState(()=> new Date().toISOString().slice(0,10))
  const [reading, setReading] = useState(0)
  const STORAGE_KEY = 'bijli-rozana-v1'

  useEffect(()=>{
    const saved = localStorage.getItem(STORAGE_KEY)
    if(saved){ try{ setEntries(JSON.parse(saved)) }catch{} }
  },[])
  useEffect(()=>{ localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)) },[entries])

  const computed = useMemo(()=>{
    if(entries.length===0) return { rows: [], totalUnits:0, latest:null }
    const sorted = [...entries].sort((a,b)=> new Date(a.date)-new Date(b.date))
    let rows=[]
    let total=0
    for(let i=0;i<sorted.length;i++){
      const curr = sorted[i]
      const prev = i>0? sorted[i-1]: null
      const daily = prev? curr.reading - prev.reading : 0
      if(i>0) total += daily
      const daysPassed = i
      const proj = daysPassed>0? (total/daysPassed)*30 : 0
      const remaining = 200 - total
      const status = total>200? 'danger' : proj>200? 'warning' : 'safe'
      rows.push({ id: curr.id, date: curr.date, reading: curr.reading, daily, total, proj, remaining, status })
    }
    const latest = rows[rows.length-1]
    return { rows, totalUnits: total, latest }
  },[entries])

  const addEntry = () => {
    if(!reading) return
    setEntries([...entries, { id: Date.now().toString(), date, reading }])
    setReading(0)
  }

  const exportCSV = () => {
    const header='date,reading,daily,total,proj\n'
    const rows=computed.rows.map(b=>`${b.date},${b.reading},${b.daily},${b.total},${b.proj.toFixed(0)}`).join('\n')
    const blob=new Blob([header+rows],{type:'text/csv'})
    const url=URL.createObjectURL(blob)
    const a=document.createElement('a'); a.href=url; a.download='bijli-ledger.csv'; a.click()
  }

  return (
    <>
      <Head>
        <title>Daily Electricity Usage Tracker Pakistan | BijliBill.pk</title>
        <meta
          name="description"
          content="Track daily electricity meter readings in Pakistan, calculate daily unit consumption, monitor your 200-unit target, and estimate monthly usage with BijliBill.pk."
        />
      </Head>

      <div className="space-y-6">
        <div className="rounded-[24px] bg-[#1b4d3e] p-6 md:p-12 text-white">
          <h1 className="font-black text-[28px]">Rozana Budget Planner - 6.66 Units/Day Target</h1>
          <p className="mt-2 text-[13px] opacity-70">Rozana sham ko meter dekho, reading likho. localStorage key bijli-rozana-v1, ledger logic se projected bill.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_0.8fr] gap-4">
          <div className="rounded-[24px] border p-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 w-full max-w-full overflow-hidden">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">Meter Ledger (bijli-rozana-v1)</h3>
              <div className="flex gap-2">
                <button onClick={exportCSV} className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">⬇️</button>
                <button onClick={()=>{ if(confirm('Clear all?')) setEntries([])}} className="w-9 h-9 rounded-full bg-red-50 text-red-600 flex items-center justify-center">🗑️</button>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-[1fr_1fr_auto] gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest opacity-60">Date</label>
                <input type="date" value={date} onChange={e=> setDate(e.target.value)} className="mt-2 w-full h-[44px] rounded-[12px] border px-3 text-[14px] bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700" />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest opacity-60">Meter Reading</label>
                <input type="number" value={reading||''} onChange={e=> setReading(Number(e.target.value))} placeholder="e.g. 10420" className="mt-2 w-full h-[44px] rounded-[12px] border px-3 font-mono font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700" />
              </div>
              <div className="flex items-end">
                <button onClick={addEntry} className="h-[44px] px-5 rounded-[12px] bg-[#1b4d3e] text-white font-bold text-[13px] flex items-center gap-2">+ Add</button>
              </div>
            </div>

            {computed.latest && (
              <div className="mt-6">
                <div className="h-[10px] rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <div className={`h-full transition-all ${computed.latest.total>200?'bg-red-500': computed.latest.proj>200?'bg-amber-500':'bg-[#a3e635]'}`} style={{width: Math.min(100, computed.latest.total/200*100)+'%'}} />
                </div>
                <div className="mt-2 flex justify-between text-[11px] font-mono">
                  <span>Total: {computed.latest.total} / 200</span>
                  <span>Proj: {computed.latest.proj.toFixed(0)} | Rem: {computed.latest.remaining.toFixed(0)}</span>
                </div>
              </div>
            )}

            <div className="mt-6 w-full rounded-[12px] border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              {/* Mobile Cards - Phone Only */}
              <div className="md:hidden divide-y divide-zinc-100 dark:divide-zinc-800">
                {computed.rows.map(w=>
                  <div key={w.id} className="p-3 flex justify-between items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-[12px]">{w.date} <span className="opacity-50 font-mono">• {w.reading}</span></div>
                      <div className="text-[11px] opacity-60 font-mono mt-1">Daily: {w.daily} | Total: {w.total} | Proj: {w.proj.toFixed(0)}</div>
                      <div className="mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${w.status==='danger'?'bg-red-100 text-red-600': w.status==='warning'?'bg-amber-100 text-amber-600':'bg-green-100 text-green-700'}`}>{w.status}</span>
                      </div>
                    </div>
                    <button onClick={()=> setEntries(entries.filter(f=> f.id!==w.id))} className="text-red-500 px-2 text-[18px]">x</button>
                  </div>
                )}
                {computed.rows.length===0 && <div className="p-4 text-[12px] opacity-60 text-center">No entries yet</div>}
              </div>

              {/* Desktop Table - Laptop Only */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-[12px]">
                  <thead className="bg-zinc-50 dark:bg-zinc-800 text-[11px] font-bold uppercase tracking-widest">
                    <tr>
                      <th className="p-2.5 text-left">Date</th>
                      <th className="p-2.5">Reading</th>
                      <th className="p-2.5">Daily</th>
                      <th className="p-2.5">Total</th>
                      <th className="p-2.5">Proj</th>
                      <th className="p-2.5">Status</th>
                      <th className="p-2.5"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {computed.rows.map(w=>
                      <tr key={w.id} className="border-t border-zinc-100 dark:border-zinc-800 font-mono">
                        <td className="p-2.5">{w.date}</td>
                        <td className="p-2.5 text-center">{w.reading}</td>
                        <td className="p-2.5 text-center">{w.daily}</td>
                        <td className="p-2.5 text-center">{w.total}</td>
                        <td className="p-2.5 text-center">{w.proj.toFixed(0)}</td>
                        <td className="p-2.5 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${w.status==='danger'?'bg-red-100 text-red-600': w.status==='warning'?'bg-amber-100 text-amber-600':'bg-green-100 text-green-700'}`}>{w.status}</span>
                        </td>
                        <td className="p-2.5">
                          <button onClick={()=> setEntries(entries.filter(f=> f.id!==w.id))} className="text-red-500">x</button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-[12px] bg-[#f0fdf4] dark:bg-[#143a2f] border border-green-200">
              <p className="text-[12px] font-bold">Lower-middle-class Tip (Roman Urdu):</p>
              <p className="text-[11px] mt-1 leading-relaxed opacity-80">Rozana sham ko meter dekho, reading likho. Agar 15 din mein 100+ ho gaye, to AC kam karo, istri din mein, fridge medium. 6.66 units rozana se zyada nahi. Bijli bachao, paisa bachao.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border p-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <h4 className="font-bold flex items-center gap-2">📖 Meter Kaise Parhein? (Roman Urdu)</h4>
              <div className="mt-4 space-y-3 text-[12px] leading-relaxed">
                <p className="opacity-80">Digital meter par 3 display panels: 1) Current reading kWh, 2) Date/Time, 3) Load. Aapko sirf kWh wali reading leni hai. Har 24 ghante baad note karo, farq = daily units.</p>
                <div className="p-3 rounded-[10px] border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800">
                  <div className="font-bold text-[11px]">Paper Bill Wireframe - Reference Number Kahan Hai?</div>
                  <div className="mt-2 space-y-2 font-mono text-[10px]">
                    <div className="p-2 bg-[#a3e635]/20 rounded border border-[#a3e635]">
                      <span className="font-bold">Top-Left:</span> 14-digit Reference No: <span className="bg-yellow-200 px-1">24 12345 1234567 U</span> (highlighted)
                    </div>
                    <div className="p-2 bg-zinc-100 dark:bg-zinc-700 rounded">Consumer ID: 123456789 (neeche)</div>
                    <div className="p-2 bg-zinc-100 dark:bg-zinc-700 rounded">Meter No: 12345</div>
                  </div>
                </div>
                <p className="mt-2 text-[10px] opacity-60">Steps: Bill ke upar dekho, 14 hinsay wala number, usko note karo. BijliBill.pk ye number collect nahi karta, sirf guide ke liye.</p>
              </div>
            </div>

            <div className="rounded-[24px] border p-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <h4 className="font-bold text-[13px]">Quick Stats</h4>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
                <div className="p-3 rounded-[10px] bg-zinc-50 dark:bg-zinc-800">
                  <div className="opacity-60 text-[10px]">AVG DAILY</div>
                  <div className="font-mono font-bold">{computed.rows.length>1? (computed.totalUnits/(computed.rows.length-1)).toFixed(2):'0'}</div>
                </div>
                <div className="p-3 rounded-[10px] bg-zinc-50 dark:bg-zinc-800">
                  <div className="opacity-60 text-[10px]">REMAINING</div>
                  <div className="font-mono font-bold">{computed.latest? computed.latest.remaining.toFixed(0):'200'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}