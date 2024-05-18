import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { SendEmailRequestBody } from '@/feature/auth/api/auth.types'
import { useSendEmailMutation } from '@/feature/auth/api/authApi'
import { useAuthHandleError } from '@/shared/hooks/useAuthHandleError'
import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import styles from './SignUpForm.module.scss'

import { FormFields, signUpSchema } from './signUpSchema'

const notify = {
  errorRegistrationEmail: function (err: unknown) {
    toast.error(`Unexpected error during registration: ${err}`)
  },
  successSendEmail: function (userEmail: string) {
    toast.success(`We have sent a link to confirm your email to ${userEmail}`)
  },
}

export function RegistrationForm() {
  const routerLocale = useRouterLocaleDefination()
  const handleError = useAuthHandleError()
  const [ifExists, setIfExists] = useState('')

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<FormFields>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
      username: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(signUpSchema),
  })
  const [sendMail, { isLoading }] = useSendEmailMutation()
  const agreeToTerms = watch('agreeToTerms')

  const onSubmit: SubmitHandler<FormFields> = async data => {
    setIfExists('')
    try {
      const requestBody: SendEmailRequestBody = {
        baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        email: data.email,
        password: data.password,
        userName: data.username,
      }

      await sendMail(requestBody).unwrap()
      reset()
      notify.successSendEmail(data.email)
    } catch (err) {
      const errorData = handleError(err)

      if (errorData.statusCode === 400) {
        notify.errorRegistrationEmail(errorData.errorMessage)
        setIfExists(errorData.field)
      }

      if (errorData.statusCode === 429) {
        notify.errorRegistrationEmail('More than 5 attempts from one IP-address during 10 seconds')
      }
    }
  }

  return (
    <>
      <h1 className={styles.title}>{routerLocale.signUpPage.title}</h1>
      <Link href={'https://www.google.com'} rel={'noopener noreferrer'} target={'_blank'}>
        Google
      </Link>
      <Link href={'https://www.github.com'} rel={'noopener noreferrer'} target={'_blank'}>
        GitHub
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={'username'}>UserName</label>
        <input
          id={'username'}
          {...register('username')}
          onInput={() => setIfExists('')}
          type={'text'}
        />
        {errors.username && <span className={styles.error}>{errors.username.message}</span>}
        {ifExists === 'userName' && !errors.username && (
          <span className={styles.error}>User with this username is already registered</span>
        )}
        <br />
        <label htmlFor={'email'}>Email</label>
        <input id={'email'} {...register('email')} onInput={() => setIfExists('')} type={'text'} />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        {ifExists === 'email' && !errors.email && (
          <span className={styles.error}>User with this email is already registered</span>
        )}
        <br />
        <label htmlFor={'password'}>Password</label>
        <input id={'password'} {...register('password')} type={'password'} />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        <br />
        <label htmlFor={'confirmPassword'}>Password confirmation</label>
        <input id={'passwordConfirmation'} {...register('confirmPassword')} type={'password'} />
        {errors.confirmPassword && (
          <span className={styles.error}>{errors.confirmPassword.message}</span>
        )}
        <br />
        <input id={'agreeToTerms'} type={'checkbox'} {...register('agreeToTerms')} />
        <label htmlFor={'agreeToTerms'}>I agree to the </label>
        <Link className={styles.policy} href={'/termsOfService'}>
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link className={styles.policy} href={'/privacyPolicy'}>
          Privacy Policy
        </Link>
        {errors.agreeToTerms && <span className={styles.error}>{errors.agreeToTerms.message}</span>}
        <br />
        <button disabled={!isValid || !agreeToTerms} type={'submit'}>
          Sign Up
        </button>
        {isLoading && <p>Sending data...</p>}
      </form>
      <p>Do you have an account?</p>
      <Link href={'/signIn'}>Sign In</Link>
    </>
  )
}
