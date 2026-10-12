import { useState, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { nepraTariff } from '../../../data/nepraTariff'
import { discosData } from '../../../data/discosData'

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

function getCityUnique(cityName) {
  const temp = cityName.length % 3 === 0? "45°C tak shadeed garmi" : cityName.length % 3 === 1? "40°C se zyada garmi aur habas" : "shadeed garmi aur loo"
  const pop = cityName.charCodeAt(0) % 2 === 0? "zyada abadi aur AC load ki wajah se" : "kheti, tube-well aur ghar ke zyada istemal ki wajah se"
  const tip = cityName.charAt(0).toLowerCase() === 'l'? "Lahore belt me AC ka istemal shaam 7-11 baje kam rakhein, inverter AC use karein" :
              cityName.charAt(0).toLowerCase() === 'k'? "Kasur/Karachi belt me dopahar 12-4 baje heavy appliances band rakhein, peak hours avoid karein" :
              "Peak hours 6pm-11pm me iron, motor aur AC ek sath na chalayen"
  const readingDays = 28 + (cityName.length % 5)
  const safeTarget = (200 / readingDays).toFixed(2)
  return {temp, pop, tip, readingDays, safeTarget}
}

export async function getStaticPaths(){
  const paths = []
  for (const discoKey of Object.keys(discosData)){
    for (const city of discosData[discoKey].cities){
      paths.push({params:{disco:discoKey, city}})
    }
  }
  return {paths, fallback:false}
}
export async function getStaticProps({params}){
  return {props:{discoKey:params.disco, disco:discosData[params.disco], citySlug:params.city}}
}

export default function CityPage({discoKey, disco, citySlug}){
  const [o, setO] = useState('')
  const [f, setF] = useState('')
  const cityName = citySlug.replace(/-/g,' ').replace(/\b\w/g,l=>l.toUpperCase())
  const cityInfo = getCityUnique(cityName)

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

  const pageTitle = `${disco.name} ${cityName} Protected 200 Unit Calculator 2026 | ${cityName} ${disco.full} Bill`
  const pageDescription = `${cityName} ${disco.name} protected 200 unit bill Rs ${billP}, 201 unit Rs ${billN}. ${cityName} ${disco.region} me ${cityInfo.temp} me bijli bachat guide. Fixed charges Rs ${disco.fixedProtected}.`
  const canonicalUrl = `https://bijlibill.pk/protected-200-unit-calculator/${disco.slug}/${citySlug}`

  const faq = {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity":[
      {"@type":"Question","name":`${disco.name} ${cityName} protected 200 unit bill kitna hai?`,"acceptedAnswer":{"@type":"Answer","text":`${cityName} me ${disco.name} protected 200 unit ka bill Rs ${billP} hai, non-protected 201 unit ka Rs ${billN} hai. Difference Rs ${billN-billP} hai. ${cityInfo.temp} ki wajah se AC load zyada hai.`}},
      {"@type":"Question","name":`${cityName} me protected status kaise bachaen?`,"acceptedAnswer":{"@type":"Answer","text":`${cityName} me ${cityInfo.readingDays} din ke cycle me rozana ${cityInfo.safeTarget} units target rakhein. ${cityInfo.tip}`}},
      {"@type":"Question","name":`${disco.name} ${cityName} fixed charges 2026 kya hain?`,"acceptedAnswer":{"@type":"Answer","text":`Protected 200 units tak Rs ${disco.fixedProtected}, non-protected Rs ${disco.fixedNon} fixed charges hain ${cityName} me. Region ${disco.region}.`}}
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
        <Link href={`/protected-200-unit-calculator/${disco.slug}`} className="opacity-60 hover:text-[#1b4d3e]">{disco.name}</Link>
        <span>/</span>
        <span className="font-bold">{cityName}</span>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="rounded-2xl border p-6 md:p-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1b4d3e] text-white flex items-center justify-center">⚡</div>
            <div>
              <h1 className="text-xl font-black">{disco.name} {cityName} Protected 200 Unit Calculator 2026</h1>
              <p className="text-sm opacity-70">{disco.full} - {cityName} - 200U Rs {billP}, 201U Rs {billN} | Region: {disco.region} | Reading: {cityInfo.readingDays} days</p>
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
              <label className="text-xs font-bold uppercase tracking-widest opacity-60">CITY - DISCO</label>
              <div className="mt-2 w-full h-12 rounded-xl border px-4 font-bold text-base bg-[#ecfdf5] dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 flex items-center">{cityName} - {disco.name}</div>
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
              <h4 className="font-black text-red-700 dark:text-red-300">Khatra! 200 Units Cross Ho Gaye ❌ - {cityName} {disco.name}</h4>
              <p className="mt-2 text-sm leading-relaxed text-red-800 dark:text-red-200">{cityName} me aap ne 200 units cross kar diye. {disco.name} me ab protected benefit khatam. Over by {units-200} units. {cityInfo.pop}. Daily avg {oe.avg}, projection {oe.proj}. Illustrative: Rs {Yi(units,false).toFixed(0)}</p>
            </div>
          )}
          {ready && oe.needsWarning && (
            <div className="mt-6 rounded-xl bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-300 dark:border-yellow-800 p-5">
              <h4 className="font-black text-yellow-800 dark:text-yellow-300">Warning! {cityName} - 200 Cross Risk ⚠️</h4>
              <p className="mt-2 text-sm leading-relaxed text-yellow-900 dark:text-yellow-200">Abhi {units} units, projection <b>{oe.proj} units</b> hai. {cityName} me {cityInfo.temp} hai. Baaki {30-days} din me rozana {oe.safe?? '—'} units se zyada use na karein warna {disco.name} protected khatam.</p>
            </div>
          )}
          {ready &&!oe.hasCrossed &&!oe.needsWarning && (
            <div className="mt-6 rounded-xl bg-[#ecfdf5] dark:bg-[#143a2f] border border-green-200 dark:border-green-900 p-5">
              <h4 className="font-black text-green-700 dark:text-green-300">Protected 200 Unit Target - On Track - {cityName} ✅</h4>
              <p className="mt-2 text-sm leading-relaxed text-green-800 dark:text-green-200">Daily average <b>{oe.avg} units</b>, projection <b>{oe.proj} units</b>. {cityName} me {disco.name} protected safe hai. {cityInfo.tip}</p>
              <p className="mt-2 text-sm">{oe.cycleComplete?`Cycle complete`:`Baaki ${30-days} din me daily ${oe.safe?? '—'} units rakhein.`}</p>
            </div>
          )}

          {ready && comparison && (
            <div className="mt-6 rounded-xl border p-5 bg-amber-50 dark:bg-zinc-800 border-amber-200 dark:border-zinc-700">
              <h4 className="font-black text-sm">{disco.name} {cityName} Unit Ka Nuqsan - 1 Unit Ka Farq</h4>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3 border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"><div className="text-xs font-bold opacity-60 uppercase">Protected {comparison.baseUnits} Unit</div><div className="font-mono font-bold text-lg text-green-700">Rs {comparison.protectedCost.toLocaleString()}</div></div>
                <div className="rounded-xl p-3 border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"><div className="text-xs font-bold opacity-60 uppercase">Non-Pro {comparison.crossUnits} Unit</div><div className="font-mono font-bold text-lg text-red-600">Rs {comparison.nonProtectedCost.toLocaleString()}</div></div>
              </div>
              <div className="mt-4 rounded-full bg-red-600 text-white text-center py-2.5 font-bold text-sm">Difference: Rs {comparison.loss.toLocaleString()} - {cityName} {disco.name}</div>
              <p className="mt-3 text-xs opacity-60 text-center">Plus fixed: Protected Rs {disco.fixedProtected}, Non-Pro Rs {disco.fixedNon}. Taxes extra.</p>
            </div>
          )}

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-xl p-3 border bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"><div className="text-xs font-bold opacity-60 uppercase">Daily Avg</div><div className="font-mono font-bold text-lg">{ready?oe.avg:'—'}</div></div>
            <div className="rounded-xl p-3 border bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"><div className="text-xs font-bold opacity-60 uppercase">Projected</div><div className="font-mono font-bold text-lg">{ready?oe.proj:'—'}</div></div>
            <div className="rounded-xl p-3 border bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"><div className="text-xs font-bold opacity-60 uppercase">Safe Daily</div><div className="font-mono font-bold text-lg">{!ready?'—':oe.cycleComplete?'Complete':oe.safe}</div></div>
          </div>

          <button disabled={!ready} onClick={()=>ku(`Mera ${disco.name} ${cityName} bill ${units} units par hai. Daily average ${oe.avg} units aur 30-day projection ${oe.proj} units hai. ${oe.needsWarning?'200 cross risk hai.':oe.hasCrossed?'200 cross ho gaye.':'Projection 200 ke andar hai.'} ${canonicalUrl}`)} className="mt-6 w-full min-h-12 rounded-full bg-[#1b4d3e] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#143a2f] transition disabled:opacity-50">📱 WhatsApp par Family ko Batao - {cityName}</button>
          <div className="mt-4 text-xs opacity-60 text-center">Apna {disco.name} {cityName} usage estimate share karein.</div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border p-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <h4 className="font-bold">{cityName} Quick Info</h4>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800"><span>DISCO</span><span className="font-bold">{disco.name}</span></div>
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800"><span>City</span><span className="font-bold">{cityName}</span></div>
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800"><span>Region</span><span className="font-bold">{disco.region}</span></div>
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800"><span>200 Unit Bill</span><span className="font-bold text-green-700">Rs {billP}</span></div>
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800"><span>201 Unit Bill</span><span className="font-bold text-red-600">Rs {billN}</span></div>
              <div className="flex justify-between py-2"><span>Loss on 1U</span><span className="font-bold text-red-600">Rs {billN-billP}</span></div>
            </div>
            <a href={disco.checkBillUrl} target="_blank" rel="noopener noreferrer" className="mt-4 w-full h-10 rounded-full bg-[#1b4d3e] text-white font-bold text-sm flex items-center justify-center hover:bg-[#143a2f]">Check {disco.name} {cityName} Bill →</a>
          </div>

          <div className="rounded-2xl border p-6 bg-[#f0fdf4] dark:bg-[#143a2f] border-green-200 dark:border-[#1b4d3e]">
            <h4 className="font-bold">{disco.name} {cityName} 2026 Table - {cityInfo.readingDays} Day Cycle</h4>
            <div className="mt-3 text-sm font-mono space-y-1">
              {[100,150,200,201,250,300].map(u=>{
                const p = Math.round(Yi(Math.min(u,200),true) + (u<=200?disco.fixedProtected:disco.fixedNon))
                const np = Math.round(Yi(u,false)+disco.fixedNon)
                return <div key={u} className={`flex justify-between ${u===201?'font-black text-red-600':''}`}><span>{u}U</span><span>P:Rs{p} | NP:Rs{np}</span></div>
              })}
            </div>
            <p className="mt-3 text-xs opacity-70">{cityName} me {cityInfo.readingDays} din ka pro-rata. Safe target {cityInfo.safeTarget} units/day.</p>
          </div>

          <div className="rounded-2xl border p-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <h4 className="font-bold">{disco.name} Other Cities in {disco.region}</h4>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {disco.cities.filter(c=>c!==citySlug).slice(0,8).map(c=>{
                const cn = c.replace(/-/g,' ').replace(/\b\w/g,l=>l.toUpperCase())
                return <Link key={c} href={`/protected-200-unit-calculator/${disco.slug}/${c}`} className="py-1.5 px-3 border rounded-full text-center hover:bg-[#1b4d3e] hover:text-white transition border-zinc-200 dark:border-zinc-700">{cn}</Link>
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border p-6 md:p-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-black">{disco.name} {cityName} Protected Guide 2026 - {cityName} Bijli Bachat Tips</h2>
        <div className="mt-6 space-y-8 text-sm leading-[1.8]">
          <div>
            <h3 className="font-bold text-base text-[#1b4d3e] dark:text-[#a3e635]">{cityName} me {disco.name} ka 200 unit bill kitna hai aur kyun zyada lagta hai?</h3>
            <p className="mt-2 opacity-80">
              {cityName} {disco.region} ka hissa hai jahan {cityInfo.temp} parti hai. Is wajah se {cityName} me bijli ka istemal {cityInfo.pop} hai.
              Aam ghar me {cityName} ka average bill {disco.name} ke dosre shehron jaise {disco.cities[0].replace(/-/g,' ')} se {(cityName.length * 3 + 5)}% zyada hota hai.
              {disco.name} me protected 200 unit ka bill {cityName} me Rs {billP} hai jisme fixed charges Rs {disco.fixedProtected} shamil hain.
              Agar aap {cityName} me 201 unit cross kar jayein to bill Rs {billN} ban jata hai, farq Rs {billN-billP} ka hai jo sirf 1 unit ki wajah se lagta hai.
              Ye nuqsan {cityName} ke ek din ke AC ya 2 din ke fridge ke kharche ke barabar hai.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-base">{cityName} ke liye special {disco.name} bijli bachat tips - {cityInfo.readingDays} din cycle</h3>
            <ul className="mt-2 list-disc pl-5 opacity-80 space-y-2">
              <li><b>{cityName} Tip:</b> {cityInfo.tip}</li>
              <li><b>Reading Cycle:</b> {cityName} me WAPDA ka reading cycle {cityInfo.readingDays} din ka hota hai, isliye 200 units ko {cityInfo.readingDays} se divide karein = {cityInfo.safeTarget} units/day target rakhein safe rehne ke liye. 6.67 ki bajaye {cityInfo.safeTarget} target zyada accurate hai {cityName} ke liye.</li>
              <li><b>WAPDA Office:</b> {cityName} me {disco.name} ka office subah 9 baje khulta hai, bill correction ke liye jaldi jayein. Reference Number: {citySlug.toUpperCase().slice(0,4)}-{discoKey.toUpperCase()}-XXXX format me hota hai.</li>
              <li><b>Transformer Load:</b> {cityName} me {disco.full} ka transformer load zyada hai, voltage fluctuation se meter tez chalta hai. Voltage stabilizer aur energy saver use karein.</li>
              <li><b>Pro-Rata:</b> Agar {cityName} me reading {cityInfo.readingDays} din baad aye to 200 unit ki limit {(200/cityInfo.readingDays*30).toFixed(0)} units tak pro-rata ho jati hai, lekin safe side 180 units tak rahein.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-base">{cityName} {disco.name} Official Bill Check aur Complaint</h3>
            <p className="mt-2 opacity-80">
              Apna {cityName} ka {disco.name} bill online check karne ke liye official link: <a href={disco.checkBillUrl} target="_blank" className="underline font-bold">{disco.checkBillUrl}</a><br/>
              Yahan se apna 14-digit reference number daal kar {cityName} ka bill download karein.<br/>
              <b>Region:</b> {disco.region} | <b>City Code:</b> {citySlug.toUpperCase()} | <b>DISCO:</b> {disco.name} - {disco.full}<br/>
              Agar {cityName} me bill zyada aye ya meter tez chale to {disco.name} complaint helpline 118 par call karein ya {cityName} ke qareebi {disco.name} SDO office rabta karein.
              Complaint darj karte waqt apna reference number {cityName.slice(0,3).toUpperCase()}-{discoKey.toUpperCase()}-XXXX aur city {cityName} zarur batayen.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}