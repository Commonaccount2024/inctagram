import { PropsWithChildren, ReactElement } from 'react'

import LangSelect from '@/shared/components/LangSelect/LangSelect'
import { NavBar } from '@/shared/components/navBar/NavBar'
import { NextPage } from 'next'

import s from '@/shared/components/layout/layout.module.scss'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <main className={s.main}>
      <LangSelect />
      <NavBar />
      {children}
    </main>
  )
}

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
