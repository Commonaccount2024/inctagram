import type { AppProps } from 'next/app'

import { Layout } from '@/shared/components/layout/Layout'

import '@/styles/globals.css'
import '@fontsource/roboto'
import '@fontsource-variable/inter'
import '@commonaccount2024/inctagram-ui-kit/dist/style.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
