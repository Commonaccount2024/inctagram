import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { store } from '@/application/store'
import { Layout } from '@/shared/components/layout/Layout'
import { Inter } from 'next/font/google'

import '@/styles/_colors.scss'
import '@/styles/_typography.scss'
import '@/styles/globals.scss'
import '@commonaccount2024/inctagram-ui-kit/dist/style.css'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Provider store={store}>
        <ToastContainer
          closeOnClick
          draggable={false}
          hideProgressBar
          limit={3}
          newestOnTop
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          position={'top-center'}
          rtl={false}
          // autoClose={3000}
          // theme={'colored'}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </main>
  )
}
