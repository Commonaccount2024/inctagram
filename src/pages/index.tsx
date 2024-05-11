import { useForm } from 'react-hook-form'

import { ControlledCheckbox } from '@/shared/components/controlled/controlledCheckbox/ControlledCheckbox'
import { ControlledTextField } from '@/shared/components/controlled/controlledTextField/controlledTextField'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'
import { Button } from '@commonaccount2024/inctagram-ui-kit'

import s from './Home.module.scss'

export default function Home() {
  const routerLocale = useRouterLocaleDefination()

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
