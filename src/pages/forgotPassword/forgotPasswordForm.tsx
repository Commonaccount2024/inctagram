import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'

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
      const response = await recoverPassword(data).unwrap()

      console.log('response:', response)
      alert('Email sent')
    } catch (error) {
      console.error('Failed to recover password:', error)
      alert('Failed to send email')
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
