# bijlibill.pk

Live: https://bijlibill.pk

I built this because electricity bills in Pakistan are impossible to understand. So many hidden taxes - FPA, QTA, FC, Duty, GST. I wanted a tool that actually explains the bill in simple language.

### What I built

**Protected Bill Calculator**
Checks if you are in protected category (up to 200 units) or not. Protected slab is Rs 10.54, non-protected is Rs 22.44 to 47.69. Shows warning when you are about to lose protection.

**Bill Tax Decoder**
You enter units and it breaks down your full bill - Fuel Price Adjustment, Quarterly Adjustment, Fixed Charges, Electricity Duty, GST. Shows exactly where your money is going.

**Solar Net Billing 2026**
For the new SRO 251(I)/2026 rule. New ratio is 4.7:1 where import is Rs 52 and export is Rs 11. I made this because no other calculator had updated logic.

**Rozana Budget Planner**
A simple daily tracker that saves in your browser, no account needed. You can add daily usage and export to CSV.

Also made programmatic pages for every DISCO - LESCO, K-Electric, MEPCO etc with different unit counts. Each page has its own calculation.

### Tech I used

- **Next.js 14.2.5 Pages Router** - Used getServerSideProps for dynamic DISCO pages
- **Tailwind CSS** - Custom theme with #1b4d3e and #a3e635, 32px hero, 24px cards
- **PWA** - Installable on phone and desktop, custom install button, offline support, service worker
- **LocalStorage** - For dark mode and budget planner, no database needed
- **FormSubmit** - For contact form without backend
- **Cloudflare + Vercel** - Domain, email routing for info@bijlibill.pk, hosting

All calculation logic is in pure JavaScript, runs on client side. No data is sent anywhere.

This is an independent project, not affiliated with any DISCO or NEPRA.

Built by Ghulam Muhammad - Karachi
info@bijlibill.pk