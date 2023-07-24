import "@/common/styles/global.scss"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Layout from "@/components/layout"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="HTML5">
      <body className={inter.className}>
        <Layout>
          { children }
        </Layout>
      </body>
    </html>
  )
}
