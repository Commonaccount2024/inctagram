import type { AppProps } from 'next/app'

import { Layout } from '@/shared/components/layout/Layout'
import { Inter } from 'next/font/google'

import '@/styles/globals.css'
import '@commonaccount2024/inctagram-ui-kit/dist/style.css'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  )
}
