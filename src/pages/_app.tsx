import type { AppProps } from 'next/app'

import { useEffect } from 'react'

import { Layout } from '@/shared/components/layout/Layout'
import { paths } from '@/shared/constans/paths'
import axios from 'axios'
import * as dotenv from 'dotenv'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
dotenv.config()
import '@/styles/globals.css'
import '@commonaccount2024/inctagram-ui-kit/dist/style.css'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const googlePath = paths.urlGoogleLogin
  const { code } = router.query

  useEffect(() => {
    if (code) {
      axios
        .post(googlePath, {
          code,
        })
        .then(data => {
          if (data.data.accessToken && data.data.email) {
            localStorage.setItem('accessToken', data.data.accessToken as string)

            console.log('accessToken saved')
            router.push(`/`)

            return
          }
        })
        .catch(e => {
          console.log('error', e)
        })
    }
  }, [code])

  return (
    <main className={inter.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  )
}
