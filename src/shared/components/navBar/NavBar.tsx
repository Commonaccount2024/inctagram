import Link from 'next/link'

import s from '@/shared/components/navBar/navBar.module.scss'

export const NavBar = () => {
  return (
    <div className={s.navBar}>
      <Link href={'/'}>Main</Link>
      <Link href={'/singUp'}>Sing up</Link>
      <Link href={'/singIn'}>Sing in</Link>
      <Link href={'/passwordRecovery'}>Password recovery</Link>
      <Link href={'/forgotPassword'}>Forgot password</Link>
      <Link href={'/createNewPassword'}>Create new password</Link>
    </div>
  )
}
