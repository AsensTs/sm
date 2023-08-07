import "@/common/styles/global.scss"
import type { AppProps } from 'next/app'
import { useRouter } from "next/router"
import config from "@/config"
import Layout from "@/components/layout/layout"
 
export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    Layout(router.pathname, config.hideLayoutPath, <Component {...pageProps} />)
  )
}


