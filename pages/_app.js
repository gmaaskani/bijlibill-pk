
import '../styles/globals.css'
import Layout from '../components/Layout'
import { Analytics } from '@vercel/analytics/next'

export default function MyApp({ Component, pageProps }){
  return (
    <>
      <Layout><Component {...pageProps} /></Layout>
      <Analytics />
    </>
  )
}
