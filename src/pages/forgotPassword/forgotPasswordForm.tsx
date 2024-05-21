// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { ForgotPasswordParams } from '@/feature/auth/api/auth.types'
import { useRecoverPasswordMutation } from '@/feature/auth/api/authApi'
import { ControlledTextField } from '@/shared/components/controlled/controlledTextField/controlledTextField'
import { Button } from '@commonaccount2024/inctagram-ui-kit'
import Link from 'next/link'

import s from './forgotPasswordForm.module.scss'

export default function ForgotPasswordForm() {
  const [recoverPassword, { isLoading }] = useRecoverPasswordMutation()

  const { control, handleSubmit, setValue } = useForm<ForgotPasswordParams>({
    defaultValues: {
      email: '',
      recaptcha: null,
    },
  })

  const onSubmit: SubmitHandler<ForgotPasswordParams> = async data => {
    try {
      await recoverPassword(data).unwrap()
      toast.success('Сообщение отправлено на email')
    } catch (e: any) {
      toast.error(e.data.error)
    }
  }

  const onChange = (recaptchaValue: null | string) => {
    setValue('recaptcha', recaptchaValue || '')
  }

  return (
    <div className={s.container}>
      <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          control={control}
          id={'email'}
          label={'Email'}
          name={'email'}
          placeholder={'Epam@epam.com'}
          required
        />
        <p>Enter your email address and we will send you further instructions </p>
        <Button disabled={isLoading} fullWidth type={'submit'}>
          Send Link
        </Button>

        <Link className={s.linkButton} href={'http://localhost:3000/signIn'}>
          {'BackToSignIn'}
        </Link>

        <ReCAPTCHA
          aria-required
          onChange={onChange}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
          size={'normal'}
          theme={'dark'}
        />
      </form>
    </div>
  )
}
