import s from '@/shared/components/layout/layout.module.scss'
import { NavBar } from '@/shared/components/navBar/NavBar'
import { NextPage } from 'next'
import { PropsWithChildren, ReactElement } from 'react'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <main className={s.main}>
      <NavBar />
      {children}
    </main>
  )
}

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
