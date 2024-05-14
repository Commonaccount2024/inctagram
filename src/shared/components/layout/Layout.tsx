import { PropsWithChildren, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import StoreProvider from '@/services/StoreProvider'
import { store } from '@/services/store'
import LangSelect from '@/shared/components/LangSelect/LangSelect'
import { NavBar } from '@/shared/components/navBar/NavBar'
import { NextPage } from 'next'

import 'react-toastify/dist/ReactToastify.css'

import s from '@/shared/components/layout/layout.module.scss'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <StoreProvider>
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
      <main className={s.main}>
        <LangSelect />
        <NavBar />
        {children}
      </main>
    </StoreProvider>
  )
}

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
