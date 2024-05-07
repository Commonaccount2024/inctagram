import { PropsWithChildren, ReactElement } from 'react'
import { ToastContainer } from 'react-toastify'

import LangSelect from '@/shared/components/LangSelect/LangSelect'
import { NavBar } from '@/shared/components/navBar/NavBar'
import { NextPage } from 'next'

import 'react-toastify/dist/ReactToastify.css'

import s from '@/shared/components/layout/layout.module.scss'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ToastContainer
        // autoClose={3000}
        closeOnClick
        draggable={false}
        hideProgressBar
        limit={3}
        newestOnTop
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        position={'top-center'}
        rtl={false}
        // theme={'colored'}
      />
      <main className={s.main}>
        <LangSelect />
        <NavBar />
        {children}
      </main>
    </>
  )
}

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
