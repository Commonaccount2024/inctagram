import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from 'react-query'

import { Layout } from '@/shared/components/layout/Layout'

import '@/styles/globals.css'
import '@commonaccount2024/inctagram-ui-kit/dist/style.css'
import '@fontsource/roboto'
import '@fontsource-variable/inter'
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  )
}
