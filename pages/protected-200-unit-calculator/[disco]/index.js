import { useState, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { nepraTariff } from '../../data/nepraTariff'
import { discosData } from '../../data/discosData'

function Yi(units, isProtected = false) {
  const usage = Math.max(0, Number(units) || 0)
  const slabs = isProtected? nepraTariff.protected : nepraTariff.nonProtected
  let remaining = isProtected? Math.min(usage, 200) : usage
  let total = 0
  let previousLimit = 0
  for (const slab of slabs) {
    if (remaining <= 0) break
    const slabCapacity = Number.isFinite(slab.limit)? slab.limit - previousLimit : remaining
    const slabUnits = Math.min(remaining, slabCapacity)
    total += slabUnits * slab.rate
    remaining -= slabUnits
    if (Number.isFinite(slab.limit)) previousLimit = slab.limit
  }
  return total
}

export async function getStaticPaths(){
  const paths = Object.keys(discosData).map(d=>({params:{disco:d}}))
  return {paths, fallback:false}
}
export async function getStaticProps({params}){
  return {props:{discoKey: params.disco, disco: discosData[params.disco]}}
}

export default function DiscoPage({discoKey, disco}){
  const [o, setO] = useState('')
  const [f, setF] = useState('')
  const v = discoKey.toUpperCase()

  const validUnits = o.trim()!== '' && Number.isFinite(Number(o)) && Number(o) >= 0 && Number(o) <= 500
  const validDays = f.trim()!== '' && Number.isFinite(Number(f)) && Number(f) >= 1 && Number(f) <= 30
  const ready = validUnits && validDays
  const units = validUnits? Number(o) : 0
  const days = validDays? Number(f) : 1

  const oe = useMemo(() => {
    const avg = units / days
    const projection = avg * 30
    const remaining = 200 - units
    const daysLeft = 30 - days
    const safeDaily = daysLeft > 0? Math.max(0, remaining / daysLeft) : null
    return {
      avg: avg.toFixed(2),
      proj: Math.round(projection),
      remaining,
      safe: safeDaily === null? null : safeDaily.toFixed(2),
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

  const billP = Math.round(Yi(200,true)+disco.fixedProtected)
  const billN = Math.round(Yi(201,false)+disco.fixedNon)

  const ku = (message) => {
    if (typeof window!== 'undefined') {
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer')
    }
  }

  const progressColor =!ready? 'bg-[#a3e635]' : oe.hasCrossed? 'bg-red-500' : oe.needsWarning? 'bg-yellow-400' : 'bg-[#a3e635]'
  const progressWidth = ready? Math.min(100, (units / 200) * 100) : 0

  const pageTitle = `${disco.name} Protected 200 Unit Calculator ${disco.city} ${disco.cityUrdu} 2026 | ${disco.full}`
  const pageDescription = `${disco.name} protected 200 unit bill ${disco.city} - 200 unit bill Rs ${billP}, 201 unit bill Rs ${billN}. Calculate ${disco.name} protected status, fixed charges Rs ${disco.fixedProtected}. Serving ${disco.region}.`
  const canonicalUrl = `https://bijlibill.pk/protected-200-unit-calculator/${disco.slug}`

  const faq = {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity":[
      {"@type":"Question","name":`${disco.name} protected 200 unit bill kitna hai?`,"acceptedAnswer":{"@type":"Answer","text":`${disco.name} me protected 200 unit ka bill Rs ${billP} hai, non-protected 201 unit ka Rs ${billN} hai. Difference Rs ${billN-billP} hai.`}},
      {"@type":"Question","name":`${disco.name} me protected status wapas kaise ayega?`,"acceptedAnswer":{"@type":"Answer","text":`6 mahine lagatar 200 ya kam units use karein, ${disco.name} protected status wapas aa jayega.`}},
      {"@type":"Question","name":`${disco.name} fixed charges 2026 kya hain?`,"acceptedAnswer":{"@type":"Answer","text":`Protected 200 units tak Rs ${disco.fixedProtected}, non-protected Rs ${disco.fixedNon} fixed charges hain.`}}
    ]
  }

  return (
    <div className="space-y-6">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faq)}}/>
      </Head>

      <div className="flex items-center gap-2 text-sm">
        <Link href="/" className="opacity-60 hover:text-[#1b4d3e]">Home</Link>
        <span>/</span>
        <Link href="/protected-200-unit-calculator" className="opacity-60 hover:text-[#1b4d3e]">Protected Calculator</Link>
        <span>/</span>
        <span className="font-bold">{disco.name} {disco.city}</span>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="rounded-2xl border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1b4d3e] text-white flex items-center justify-center">⚡</div>
            <div>
              <h1 className="text-xl font-black">{disco.name} Protected 200 Unit Calculator - {disco.city} {disco.cityUrdu} 2026</h1>
              <p className="text-sm opacity-70">{disco.full} - 200 unit Rs {billP}, 201 unit Rs {billN} | Serving: {disco.region}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest opacity-60">Total Units Used</label>
              <input type="number" min="0" max="500" value={o} onChange={(e)=>setO(e.target.value)} className="mt-2 w-full h-12 rounded-xl border px-4 font-mono font-bold text-base bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700" />
              {o.trim()!== '' &&!validUnits && <p className="mt-1 text-sm text-red-600">Units 0 se 500 ke darmiyan enter karein.</p>}
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest opacity-60">Days Passed (1-30)</label>
              <input type="number" min="1" max="30" value={f} onChange={(e)=>setF(e.target.value)} className="mt-2 w-full h-12 rounded-xl border px-4 font-mono font-bold text-base bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700" />
              {f.trim()!== '' &&!validDays && <p className="mt-1 text-sm text-red-600">Days 1 se 30 ke darmiyan enter karein.</p>}
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest opacity-60">DISCO</label>
              <div className="mt-2 w-full h-12 rounded-xl border px-4 font-bold text-base bg-[#ecfdf5] dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 flex items-center">{disco.name} - {disco.city}</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm font-bold mb-2"><span>0</span><span className="text-[#a3e635]">200 SAFE</span><span>200</span></div>
            <div className="h-3 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden flex">
              <div className={`h-full ${progressColor} transition-all`} style={{width:`${progressWidth}%`}} />
            </div>
            <div className="mt-2 flex justify-between text-sm font-mono">
              <span>Current: {ready? units : '—'} units</span>
              <span className={!ready?'text-zinc-500':oe.hasCrossed?'text-red-600':oe.needsWarning?'text-yellow-600':'text-green-600'}>{!ready?'Enter valid values':oe.hasCrossed?`${units-200} over`:`${200-units} remaining`}</span>
            </div>
          </div>

          {ready && oe.hasCrossed && (
            <div className="mt-6 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 p-5">
              <h4 className="font-black text-red-700 dark:text-red-300">Khatra! 200 Units Cross Ho Gaye ❌ - {disco.name}</h4>
              <p className="mt-2 text-sm leading-relaxed text-red-800 dark:text-red-200">Aap ne 200 units cross kar diye. {disco.name} me ab protected benefit khatam. Over by {units-200} units. Daily avg {oe.avg}, projection {oe.proj}. Illustrative: Rs {Yi(units,false).toFixed(0)}</p>
            </div>
          )}
          {ready && oe.needsWarning && (
            <div className="mt-6 rounded-xl bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-300 dark:border-yellow-800 p-5">
              <h4 className="font-black text-yellow-800 dark:text-yellow-300">Warning! {disco.city} - 200 Cross Risk</h4>
              <p className="mt-2 text-sm leading-relaxed text-yellow-900 dark:text-yellow-200">Abhi {units} units, projection <b>{oe.proj} units</b> hai. Baaki {30-days} din me rozana {oe.safe?? '—'} units se zyada use na karein warna {disco.name} protected khatam.</p>
            </div>
          )}
          {ready &&!oe.hasCrossed &&!oe.needsWarning && (
            <div className="mt-6 rounded-xl bg-[#ecfdf5] dark:bg-[#143a2f] border border-green-200 dark:border-green-900 p-5">
              <h4 className="font-black text-green-700 dark:text-green-300">Protected 200 Unit Target - On Track - {disco.city}</h4>
              <p className="mt-2 text-sm leading-relaxed text-green-800 dark:text-green-200">Daily average <b>{oe.avg} units</b>, projection <b>{oe.proj} units</b>. {disco.name} protected safe hai.</p>
              <p className="mt-2 text-sm">{oe.cycleComplete?`Cycle complete`:`Baaki ${30-days} din me daily ${oe.safe?? '—'} units rakhein.`}</p>
            </div>
          )}

          {ready && comparison && (
            <div className="mt-6 rounded-xl border p-5 bg-amber-50 dark:bg-zinc-800 border-amber-200 dark:border-zinc-700">
              <h4 className="font-black text-sm">{disco.name} Unit Ka Nuqsan - {disco.city}</h4>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3 border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"><div className="text-xs font-bold opacity-60 uppercase">Protected {comparison.baseUnits} Unit</div><div className="font-mono font-bold text-lg text-green-700">Rs {comparison.protectedCost.toLocaleString()}</div></div>
                <div className="rounded-xl p-3 border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"><div className="text-xs font-bold opacity-60 uppercase">Non-Pro {comparison.crossUnits} Unit</div><div className="font-mono font-bold text-lg text-red-600">Rs {comparison.nonProtectedCost.toLocaleString()}</div></div>
              </div>
              <div className="mt-4 rounded-full bg-red-600 text-white text-center py-2.5 font-bold text-sm">Difference: Rs {comparison.loss.toLocaleString()} - {disco.name}</div>
              <p className="mt-3 text-xs opacity-60 text-center">Plus fixed: Protected Rs {disco.fixedProtected}, Non-Pro Rs {disco.fixedNon}. Taxes extra.</p>
            </div>
          )}

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-xl p-3 border bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"><div className="text-xs font-bold opacity-60 uppercase">Daily Avg</div><div className="font-mono font-bold text-lg">{ready?oe.avg:'—'}</div></div>
            <div className="rounded-xl p-3 border bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"><div className="text-xs font-bold opacity-60 uppercase">Projected</div><div className="font-mono font-bold text-lg">{ready?oe.proj:'—'}</div></div>
            <div className="rounded-xl p-3 border bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"><div className="text-xs font-bold opacity-60 uppercase">Safe Daily</div><div className="font-mono font-bold text-lg">{!ready?'—':oe.cycleComplete?'Complete':oe.safe}</div></div>
          </div>

          <button disabled={!ready} onClick={()=>ku(`Mera ${disco.name} bill ${units} units par hai. Daily average ${oe.avg} units aur 30-day projection ${oe.proj} units hai. ${oe.needsWarning?'200 cross risk hai.':oe.hasCrossed?'200 cross ho gaye.':'Projection 200 ke andar hai.'} ${canonicalUrl}`)} className="mt-6 w-full min-h-12 rounded-full bg-[#1b4d3e] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#143a2f] transition disabled:opacity-50">📱 WhatsApp par Family ko Batao - {disco.city}</button>
          <div className="mt-4 text-xs opacity-60 text-center">Apna {disco.name} usage estimate share karein.</div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border p-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <h4 className="font-bold">{disco.city} Quick Info</h4>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800"><span>DISCO</span><span className="font-bold">{disco.name}</span></div>
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800"><span>City</span><span className="font-bold">{disco.city}</span></div>
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800"><span>200 Unit Bill</span><span className="font-bold text-green-700">Rs {billP}</span></div>
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800"><span>201 Unit Bill</span><span className="font-bold text-red-600">Rs {billN}</span></div>
              <div className="flex justify-between py-2"><span>Loss</span><span className="font-bold text-red-600">Rs {billN-billP}</span></div>
            </div>
            <a href={disco.checkBillUrl} target="_blank" rel="noopener noreferrer" className="mt-4 w-full h-10 rounded-full bg-[#1b4d3e] text-white font-bold text-sm flex items-center justify-center hover:bg-[#143a2f]">Check {disco.name} Bill Online →</a>
          </div>

          <div className="rounded-2xl border p-6 bg-[#f0fdf4] dark:bg-[#143a2f] border-green-200 dark:border-[#1b4d3e]">
            <h4 className="font-bold">{disco.name} 2026 Bill Table</h4>
            <div className="mt-3 text-sm font-mono space-y-1">
              {[100,150,200,201,250,300].map(u=>{
                const p = Math.round(Yi(Math.min(u,200),true) + (u<=200?disco.fixedProtected:disco.fixedNon))
                const np = Math.round(Yi(u,false)+disco.fixedNon)
                return <div key={u} className={`flex justify-between ${u===201?'font-black text-red-600':''}`}><span>{u}U</span><span>P:Rs{p} | NP:Rs{np}</span></div>
              })}
            </div>
            <p className="mt-3 text-xs opacity-70">Fixed charges included as per {disco.name} 2026.</p>
          </div>

          <div className="rounded-2xl border p-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <h4 className="font-bold">Other DISCOs</h4>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {Object.keys(discosData).filter(k=>k!==discoKey).map(k=>(
                <Link key={k} href={`/protected-200-unit-calculator/${k}`} className="py-1.5 px-3 border rounded-full text-center hover:bg-[#1b4d3e] hover:text-white transition border-zinc-200 dark:border-zinc-700">{discosData[k].name}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border p-6 md:p-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-black">{disco.name} {disco.city} Protected Guide 2026</h2>
        <div className="mt-6 space-y-8 text-sm leading-[1.8]">
          <div>
            <h3 className="font-bold text-base text-[#1b4d3e] dark:text-[#a3e635]">{disco.name} me 200 unit bill kitna hai?</h3>
            <p className="mt-2 opacity-80">{disco.name} me protected 200 unit ka bill Rs {billP} hai jisme fixed charges Rs {disco.fixedProtected} shamil hain. Agar 201 unit ho jaye to bill Rs {billN} ban jata hai. Farq Rs {billN-billP} ka hai jo sirf 1 unit ki wajah se lagta hai. {disco.city} me garmi zyada hai isliye AC ka khayal rakhein.</p>
          </div>
          <div>
            <h3 className="font-bold text-base">{disco.city} me protected kaise bachaen?</h3>
            <p className="mt-2 opacity-80">{disco.city} {disco.cityUrdu} me summer me units tezi se barhte hain. 200 units ko 30 din par taqseem karein to rozana 6.67 units bante hain. {disco.name} ka pro-rata system hai, agar reading cycle 32 din ki ho to 200 ka limit {Math.round(200/30*32)} units pro-rata ho jata hai, isliye 180 units target rakhein safe rehne ke liye.</p>
          </div>
          <div>
            <h3 className="font-bold text-base">{disco.name} Official Bill Check</h3>
            <p className="mt-2 opacity-80">Apna bill check karne ke liye official link: <a href={disco.checkBillUrl} target="_blank" className="underline font-bold">{disco.checkBillUrl}</a>. Yahan se reference number daal kar bill download karein. Region: {disco.region}</p>
          </div>
        </div>
      </div>
    </div>
  )
}