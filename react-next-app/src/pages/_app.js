import "@/assets/styles/reset.css"
import "@/assets/styles/simple/antd.scss"
import Layout from "@/components/layout/simple"

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}