import { NavBar } from '@/shared/components/navBar/NavBar'
import styles from '@/styles/Home.module.css'
import { NextPage } from 'next'
import { PropsWithChildren, ReactElement } from 'react'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <main className={styles.main}>
      <NavBar />
      {children}
    </main>
  )
}

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
