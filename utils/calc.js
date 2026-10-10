
export function Yi(units, isProtected){
  // Exact slabs from original
  if(isProtected){
    if(units <= 100) return units * 10.54
    else return 100*10.54 + (units-100)*13.01
  } else {
    // Non-protected 22.44-47.69
    if(units <= 100) return units * 22.44
    if(units <= 200) return 100*22.44 + (units-100)*32.10
    if(units <= 300) return 100*22.44 + 100*32.10 + (units-200)*37.20
    if(units <= 400) return 100*22.44 + 100*32.10 + 100*37.20 + (units-300)*43.82
    return 100*22.44 + 100*32.10 + 100*37.20 + 100*43.82 + (units-400)*47.69
  }
}
export function calcBill(units, isProtected, discoFC=3.23){
  const energy = Yi(units, isProtected)
  const FPA = 3.5 * units
  const QTA = 1.5 * units
  const FC = discoFC * 1 // fixed logic from original: Su[disco]
  const subtotal = energy + FPA + QTA + FC
  const duty = subtotal * 0.015
  const gst = (subtotal + duty) * 0.18
  const total = subtotal + duty + gst
  return { energy, FPA, QTA, FC, duty, gst, total, subtotal }
}
export const DISCO_FC = { LESCO: 3.23, MEPCO: 3.5, IESCO: 3.1, FESCO: 3.3, GEPCO: 3.2, PESCO: 2.9, HESCO: 3.6, QESCO: 3.8, SEPCO: 3.7, TESK: 3.23, "K-Electric": 4.1 }
export const DISCO_INFO = {
  LESCO: "Lahore mein Bijli ka load zyada hai, peak hours mein bachat karein.",
  MEPCO: "Multan mein garmi zyada, AC ka thermostat 26 pe rakhein.",
  IESCO: "Islamabad mein 200 se neeche raho to Protected sasta.",
  FESCO: "Faisalabad mein industrial area, raat ko istri na chalao.",
  GEPCO: "Gujranwala mein bijli chori se bacho, meter sahi rakho.",
  PESCO: "Peshawar mein winter mein heater kam use karo.",
  HESCO: "Hyderabad mein solar ka faida uthao.",
  QESCO: "Quetta mein bijli mehngi, 200 se neeche raho.",
  SEPCO: "Sukkur mein rozana meter check karo.",
  "K-Electric": "Karachi mein K-E bill sabse mehnga, solar best hai."
}
export const DISCOS = Object.keys(DISCO_INFO)
