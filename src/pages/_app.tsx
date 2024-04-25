import '@/styles/globals.css'
import '@fontsource-variable/inter'
import '@fontsource/roboto'
import { Layout } from '@/shared/components/layout/Layout'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
