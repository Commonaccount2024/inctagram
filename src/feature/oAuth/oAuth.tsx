import gitHubIcon from '@/shared/assets/icons/gitHubIcon.svg'
import googleIcon from '@/shared/assets/icons/googleIcon.svg'
import { paths } from '@/shared/constans/paths'
import Image from 'next/image'

import s from './oAuth.module.scss'

export const OAuth = () => {
  const registerWithGoogle = (): void => {
    const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID_GOOGLE
    const REDIRECT_URL = 'http://localhost:3000'
    const scope = 'email profile' //data which we need in request
    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&response_type=code&redirect_uri=${REDIRECT_URL}&client_id=${CLIENT_ID}`

    window.location.assign(url)
  }

  const registerGitHubLogin = () => {
    window.location.assign(paths.urlGitHubLogin)
  }

  return (
    <div className={s.container}>
      <Image alt={'Google icon'} onClick={registerWithGoogle} src={googleIcon} />
      <Image alt={'GitHub icon'} onClick={registerGitHubLogin} src={gitHubIcon} />
    </div>
  )
}
