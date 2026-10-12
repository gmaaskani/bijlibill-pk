const fs = require('fs');
const path = require('path');

// Load discosData
const discosDataPath = path.join(__dirname, 'data', 'discosData.js');
let fileContent = fs.readFileSync(discosDataPath, 'utf8');

// Extract cities using regex - works for your file structure
const discosMatch = fileContent.match(/cities:\s*\[([^\]]+)\]/g);
const discoKeys = [...fileContent.matchAll(/["']?([a-z-]+)["']?\s*:\s*\{[^}]*cities/g)].map(m=>m[1]);

// Simpler: require the file if it uses module.exports, try import
let discosData;
try {
  // Try to eval commonjs
  const mod = require('./data/discosData.js');
  discosData = mod.discosData || mod.default || mod;
} catch(e){
  console.log("Trying alternative parse...");
  // fallback - manual list from your project (LESCO etc - 10 discos)
  discosData = null;
}

if (!discosData) {
  // FALLBACK: If require fails, we parse file manually
  // This will read your discosData.js as text and extract
  const regex = /(\w+):\s*\{\s*[^}]*slug:\s*["']([^"']+)["'][^}]*cities:\s*\[([^\]]+)\]/gs;
  let m;
  discosData = {};
  while ((m = regex.exec(fileContent))!== null) {
    const key = m[1];
    const slug = m[2];
    const citiesRaw = m[3];
    const cities = [...citiesRaw.matchAll(/["']([^"']+)["']/g)].map(x=>x[1]);
    discosData[key] = { slug, cities };
  }
}

console.log("Found discos:", Object.keys(discosData));

let urls = [
  { loc: 'https://bijlibill.pk/', freq: 'weekly', pri: '1.0' },
  { loc: 'https://bijlibill.pk/solar-net-billing-calculator', freq: 'monthly', pri: '0.8' },
  { loc: 'https://bijlibill.pk/rozana-budget-planner', freq: 'monthly', pri: '0.8' },
  { loc: 'https://bijlibill.pk/protected-200-unit-calculator', freq: 'monthly', pri: '0.9' },
  { loc: 'https://bijlibill.pk/bill-tax-decoder', freq: 'monthly', pri: '0.8' },
];

// 10 DISCO pages
Object.keys(discosData).forEach(key => {
  const d = discosData[key];
  urls.push({ loc: `https://bijlibill.pk/protected-200-unit-calculator/${d.slug}`, freq: 'monthly', pri: '0.9' });
});

// 50 CITY pages - THIS IS NEW
Object.keys(discosData).forEach(key => {
  const d = discosData[key];
  if (d.cities) {
    d.cities.forEach(city => {
      urls.push({ loc: `https://bijlibill.pk/protected-200-unit-calculator/${d.slug}/${city}`, freq: 'monthly', pri: '0.8' });
    });
  }
});

// Static other pages
[
  'https://bijlibill.pk/privacy-policy',
  'https://bijlibill.pk/disclaimer',
  'https://bijlibill.pk/contact-us',
  'https://bijlibill.pk/about-us',
  'https://bijlibill.pk/author'
].forEach(u => {
  urls.push({ loc: u, freq: u.includes('privacy')||u.includes('disclaimer')?'yearly':'monthly', pri: u.includes('privacy')?'0.3':'0.5' });
});

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n`;
urls.forEach(u => {
  xml += ` <url>\n <loc>${u.loc}</loc>\n <changefreq>${u.freq}</changefreq>\n <priority>${u.pri}</priority>\n </url>\n`;
});
xml += `\n</urlset>`;

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), xml, 'utf8');
console.log(`✅ Sitemap updated! Total URLs: ${urls.length}`);
console.log(`10 DISCO + ${urls.length - 20} CITY pages added`);