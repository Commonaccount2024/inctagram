import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { ControlledCheckbox } from '@/shared/components/controlled/controlledCheckbox/ControlledCheckbox'
import { ControlledTextField } from '@/shared/components/controlled/controlledTextField/controlledTextField'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { paths } from '@/shared/constans/paths'
import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'
import { Button } from '@commonaccount2024/inctagram-ui-kit'
import axios from 'axios'
import { useRouter } from 'next/router'

import s from './Home.module.scss'

export default function Home() {
  const routerLocale = useRouterLocaleDefination()

  const router = useRouter()
  const googlePath = paths.urlGoogleLogin
  const { code } = router.query

  useEffect(() => {
    if (code) {
      axios
        .post(googlePath, {
          code,
        })
        .then(data => {
          if (data.data.accessToken && data.data.email) {
            localStorage.setItem('accessToken', data.data.accessToken as string)

            console.log('accessToken saved')
            router.push(`/`)

            return
          } else {
            router.push(`/singIn`)
          }
        })
        .catch(e => {
          console.log('error', e)
        })
    }
  }, [code])

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  return (
    <>
      <HeadMeta title={routerLocale.title} />
      <h1 style={{ marginBottom: 30 }}>{routerLocale.test}</h1>

      <form className={s.form} onSubmit={handleSubmit(() => {})}>
        <ControlledTextField
          className={s.inputEmail}
          control={control}
          error={errors.email?.message}
          label={'Email'}
          name={'email'}
          placeholder={'Email'}
        />
        <ControlledTextField
          className={s.inputPassword}
          control={control}
          error={errors.password?.message}
          label={'Password'}
          name={'password'}
          placeholder={'Password'}
          type={'password'}
        />
        <ControlledCheckbox
          className={s.checkbox}
          control={control}
          label={'Remember me'}
          name={'rememberMe'}
          position={'left'}
        />
        <Button fullWidth type={'submit'}>
          Sign In
        </Button>
      </form>
    </>
  )
}
