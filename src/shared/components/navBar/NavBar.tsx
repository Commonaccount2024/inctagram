import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'
import Link from 'next/link'

import s from '@/shared/components/navBar/navBar.module.scss'

export const NavBar = () => {
  const routerLocale = useRouterLocaleDefination()

  return (
    <div className={s.navBar}>
      <Link href={'/'}>{routerLocale.test}</Link>
      <Link href={'/signUp'}>{routerLocale.signUpPage.title}</Link>
      <Link href={'/signIn'}>{routerLocale.signInPage.title}</Link>
      <Link href={'/password-recovery'}>{routerLocale.passwordRecoveryPage.title}</Link>
      <Link href={'/forgotPassword'}>{routerLocale.forgotPasswordPage.title}</Link>
      <Link href={'/createNewPassword'}>{routerLocale.createNewPasswordPage.title}</Link>
    </div>
  )
}
