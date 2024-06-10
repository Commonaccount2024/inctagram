import { useState } from 'react'
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useRecoverPasswordMutation } from '@/feature/auth/api/authApi'
import { ForgotPasswordModal } from '@/shared/components/ForgotPassword/ForgotPasswordModal/ForgotPasswordModal'
import {
  ForgotPasswordSchemaParams,
  forgotPasswordSchema,
} from '@/shared/components/ForgotPassword/forgotPasswordSchema'
import { ControlledTextField } from '@/shared/components/controlled/controlledTextField/controlledTextField'
import { Button, Card, Typography } from '@commonaccount2024/inctagram-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import s from './ForgotPasswordForm.module.scss'

export default function ForgotPasswordForm() {
  const [recoverPassword, { isLoading }] = useRecoverPasswordMutation()
  const [isOpen, setIsOpen] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm<ForgotPasswordSchemaParams>({
    defaultValues: {
      email: '',
      recaptcha: undefined,
    },
    mode: 'onChange',
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit: SubmitHandler<ForgotPasswordSchemaParams> = async data => {
    setSubmittedEmail(data.email)
    setIsOpen(true)
    try {
      await recoverPassword(data).unwrap()
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

  const handleModal = () => {
    setIsOpen(false)
  }

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        Forgot Password
      </Typography>
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
        <Typography className={s.instruction} variant={'regular-text-14'}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button
          className={s.submitButton}
          disabled={isLoading || !isValid}
          fullWidth
          type={'submit'}
        >
          Send Link
        </Button>
        <Button className={s.backToSignIn} type={'button'} variant={'text-button'}>
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/signIn`}>
            <Typography variant={'h3'}>Back to Sign In</Typography>
          </Link>
        </Button>

        <ReCAPTCHA
          aria-required
          className={s.recaptcha}
          onChange={onChange}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
          size={'normal'}
          theme={'dark'}
        />
        {errors.recaptcha && (
          <Typography className={s.error} variant={'regular-text-14'}>
            {errors.recaptcha.message}
          </Typography>
        )}
      </form>
      <ForgotPasswordModal
        email={submittedEmail}
        handleModal={handleModal}
        isOpen={isOpen}
        title={'Email sent'}
      />
    </Card>
  )
}
