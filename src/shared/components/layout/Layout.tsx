import { PropsWithChildren, ReactElement } from 'react'

import LangSelect from '@/shared/components/LangSelect/LangSelect'
import { NavBar } from '@/shared/components/navBar/NavBar'
import { NextPage } from 'next'

import 'react-toastify/dist/ReactToastify.css'

import s from '@/shared/components/layout/layout.module.scss'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div className={s.layout}>
      <LangSelect />
      <NavBar />
      {children}
    </div>
  )
}

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
