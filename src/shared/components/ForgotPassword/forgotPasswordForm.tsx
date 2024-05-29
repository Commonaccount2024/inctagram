// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitHandler, useForm, useFormState } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useRecoverPasswordMutation } from '@/feature/auth/api/authApi'
import {
  ForgotPasswordSchemaParams,
  forgotPasswordSchema,
} from '@/shared/components/ForgotPassword/forgotPasswordSchema'
import { ControlledTextField } from '@/shared/components/controlled/controlledTextField/controlledTextField'
import { Button, Card } from '@commonaccount2024/inctagram-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import s from './forgotPasswordForm.module.scss'

export default function ForgotPasswordForm() {
  const [recoverPassword, { isLoading }] = useRecoverPasswordMutation()

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<ForgotPasswordSchemaParams>({
    defaultValues: {
      email: '',
      recaptcha: undefined,
    },
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit: SubmitHandler<ForgotPasswordSchemaParams> = async data => {
    try {
      await recoverPassword(data).unwrap()
      toast.success('The message was sent to the email')
      reset()
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message)
      } else {
        toast.error('An unexpected error occurred')
      }
    }
  }

  const onChange = (recaptchaValue: null | string) => {
    setValue('recaptcha', recaptchaValue || '', { shouldValidate: true })
  }

  return (
    <Card className={s.card}>
      <h2 className={s.title}>Forgot Password</h2>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          className={s.textField}
          control={control}
          id={'email'}
          label={'Email'}
          name={'email'}
          placeholder={'Epam@epam.com'}
          required
        />
        <p className={s.instruction}>
          Enter your email address and we will send you further instructions
        </p>
        <Button className={s.submitButton} disabled={isLoading} fullWidth type={'submit'}>
          Send Link
        </Button>

        <Link className={s.backToSignIn} href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>
          {'Back to Sign In'}
        </Link>

        <ReCAPTCHA
          aria-required
          className={s.recaptcha}
          onChange={onChange}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
          size={'normal'}
          theme={'dark'}
        />
        {errors.recaptcha && <p className={s.error}>{errors.recaptcha.message}</p>}
      </form>
    </Card>
  )
}
