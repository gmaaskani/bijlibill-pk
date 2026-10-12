import { discosData } from '../../data/discosData'
import { nepraTariff } from '../../data/nepraTariff'
import Head from 'next/head'
import Link from 'next/link'
import { useState, useMemo } from 'react'

function calcBill(units, isProtected){
  const slabs = isProtected? nepraTariff.protected : nepraTariff.nonProtected
  let remaining = isProtected? Math.min(units,200) : units
  let total=0, prev=0
  for(const s of slabs){
    if(remaining<=0) break
    const cap = Number.isFinite(s.limit)? s.limit-prev : remaining
    const u = Math.min(remaining, cap)
    total+= u*s.rate
    remaining-=u
    if(Number.isFinite(s.limit)) prev=s.limit
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
  const [units,setUnits]=useState(180)
  const [days,setDays]=useState(20)
  const billP = Math.round(calcBill(200,true)+disco.fixedProtected)
  const billN = Math.round(calcBill(201,false)+disco.fixedNon)

  const title = `${disco.name} Protected 200 Unit Calculator ${disco.city} 2026`
  const desc = `${disco.name} protected 200 unit bill ${disco.city} - 200 unit bill Rs ${billP}, 201 unit bill Rs ${billN}. Check ${disco.full} protected status rules.`
  const canonical = `https://bijlibill.pk/protected-200-unit-calculator/${disco.slug}`

  const faq = {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity":[
      {"@type":"Question","name":`${disco.name} protected 200 unit bill kitna hai?`,"acceptedAnswer":{"@type":"Answer","text":`${disco.name} me protected 200 unit ka bill Rs ${billP} hai, non-protected 201 unit ka Rs ${billN} hai. Difference Rs ${billN-billP} hai.`}},
      {"@type":"Question","name":`${disco.name} me protected status wapas kaise ayega?`,"acceptedAnswer":{"@type":"Answer","text":`6 mahine lagatar 200 ya kam units use karein, ${disco.name} protected status wapas aa jayega.`}},
      {"@type":"Question","name":`${disco.name} fixed charges 2026 kya hain?`,"acceptedAnswer":{"@type":"Answer","text":`Protected 200 units tak Rs ${disco.fixedProtected}, non-protected Rs ${disco.fixedNon} fixed charges hain.`}}
    ]
  }

  const proj = days>0? Math.round((units/days)*30) : 0

  return(
    <div className="space-y-6 p-4">
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc}/>
        <link rel="canonical" href={canonical}/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faq)}}/>
      </Head>

      <div className="text-sm opacity-60"><Link href="/">Home</Link> / <Link href="/protected-200-unit-calculator">Protected Calculator</Link> / {disco.name}</div>

      <h1 className="text-2xl md:text-3xl font-black">{disco.name} Protected 200 Unit Calculator - {disco.city} {disco.cityUrdu} 2026</h1>
      <p className="text-sm opacity-80">{desc} Serving area: {disco.region}. Official bill check: {disco.checkBillUrl}</p>

      <div className="grid md:grid-cols-3 gap-4 p-6 border rounded-2xl bg-white dark:bg-zinc-900">
        <div><label className="text-xs font-bold">Units Used</label><input type="number" value={units} onChange={e=>setUnits(Number(e.target.value))} className="w-full h-12 border rounded-xl px-4 mt-2"/></div>
        <div><label className="text-xs font-bold">Days Passed</label><input type="number" value={days} onChange={e=>setDays(Number(e.target.value))} className="w-full h-12 border rounded-xl px-4 mt-2"/></div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl"><div className="text-xs">30-day Projection</div><div className="font-bold text-xl">{proj} units</div><div className={proj>200?'text-red-600 font-bold':'text-green-600'}>{proj>200?'❌ Will Lose Protected':'✅ Protected Safe'}</div></div>
      </div>

      <div className="p-6 border rounded-2xl bg-white dark:bg-zinc-900">
        <h2 className="font-bold text-lg">{disco.name} 2026 Bill Table - Protected vs Non-Protected</h2>
        <table className="w-full mt-4 text-sm border">
          <thead><tr className="bg-zinc-100 dark:bg-zinc-800"><th className="p-2 border">Units</th><th className="p-2 border">Protected Rs</th><th className="p-2 border">Non-Protected Rs</th></tr></thead>
          <tbody>
            {[100,150,200,201,250,300].map(u=>{
              const p = Math.round(calcBill(Math.min(u,200),true) + (u<=200?disco.fixedProtected:disco.fixedNon))
              const np = Math.round(calcBill(u,false)+disco.fixedNon)
              return <tr key={u} className={u===201?'bg-red-50 dark:bg-red-900/20 font-bold':''}><td className="p-2 border">{u}</td><td className="p-2 border">Rs {p.toLocaleString()}</td><td className="p-2 border">Rs {np.toLocaleString()}</td></tr>
            })}
          </tbody>
        </table>
        <p className="text-xs mt-3 opacity-60">Rates: Protected 1-100 Rs 10.54, 101-200 Rs 13.01. Non-protected 1-100 Rs 22.44, 101-200 Rs 28.91, 201-300 Rs 33.10. Fixed charges extra as per NEPRA 2026.</p>
      </div>

      <div className="p-6 border rounded-2xl bg-amber-50 dark:bg-zinc-800">
        <h3 className="font-bold">{disco.city} Tip: How to stay under 200?</h3>
        <p className="mt-2 text-sm leading-relaxed">In {disco.city}, summer heat pushes units fast. Target 6.6 units/day. {disco.name} has pro-rata billing - if your reading cycle is 32 days, 200 units becomes {Math.round(200/30*32)} units pro-rata, so stay under 180 to be safe. Use fans not AC 1pm-5pm.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.keys(discosData).filter(k=>k!==discoKey).map(k=><Link key={k} href={`/protected-200-unit-calculator/${k}`} className="px-3 py-1 border rounded-full text-sm hover:bg-black hover:text-white">{discosData[k].name} {discosData[k].city}</Link>)}
      </div>
    </div>
  )
}