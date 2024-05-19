import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { SendEmailRequestBody } from '@/feature/auth/api/auth.types'
import { useSendEmailMutation } from '@/feature/auth/api/authApi'
import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'
import { isFormError } from '@/shared/utils/form-fields-error-adapter'
import { Button } from '@commonaccount2024/inctagram-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import styles from './SignUpForm.module.scss'

import { SignUpFormFields, signUpSchema } from './signUpSchema'

const notify = {
  successSendEmail: function (userEmail: string) {
    toast.success(`We have sent a link to confirm your email to ${userEmail}`)
  },
}

export function RegistrationForm() {
  const routerLocale = useRouterLocaleDefination()

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    setError,
    watch,
  } = useForm<SignUpFormFields>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
      userName: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(signUpSchema),
  })
  const [sendMail, { isLoading }] = useSendEmailMutation()
  const agreeToTerms = watch('agreeToTerms')

  const onSubmit: SubmitHandler<SignUpFormFields> = async data => {
    try {
      const requestBody: SendEmailRequestBody = {
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000',
        email: data.email,
        password: data.password,
        userName: data.userName,
      }

      await sendMail(requestBody).unwrap()
      reset()
      notify.successSendEmail(data.email)
    } catch (err) {
      if (isFormError(err)) {
        for (const property in err) {
          setError(property as keyof SignUpFormFields, {
            message: err[property as keyof typeof err],
            type: 'custom',
          })
        }
      } else {
        toast.error(JSON.stringify(err))
      }
    }
  }

  return (
    <>
      <h1 className={styles.title}>{routerLocale.signUpPage.title}</h1>
      <div className={styles.row}>
        <Link href={'https://www.google.com'} rel={'noopener noreferrer'} target={'_blank'}>
          Google
        </Link>
        <Link href={'https://www.github.com'} rel={'noopener noreferrer'} target={'_blank'}>
          GitHub
        </Link>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={'username'}>UserName</label>
        <input id={'username'} {...register('userName')} type={'text'} />
        {errors.userName && <span className={styles.error}>{errors.userName.message}</span>}
        <label htmlFor={'email'}>Email</label>
        <input id={'email'} {...register('email')} type={'text'} />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        <label htmlFor={'password'}>Password</label>
        <input id={'password'} {...register('password')} type={'password'} />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        <label htmlFor={'confirmPassword'}>Password confirmation</label>
        <input id={'passwordConfirmation'} {...register('confirmPassword')} type={'password'} />
        {errors.confirmPassword && (
          <span className={styles.error}>{errors.confirmPassword.message}</span>
        )}
        <div className={styles.row}>
          <input id={'agreeToTerms'} type={'checkbox'} {...register('agreeToTerms')} />
          <label htmlFor={'agreeToTerms'}>I agree to the </label>
          <Link className={styles.policy} href={'/termsOfService'}>
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link className={styles.policy} href={'/privacyPolicy'}>
            Privacy Policy
          </Link>
        </div>

        {errors.agreeToTerms && <span className={styles.error}>{errors.agreeToTerms.message}</span>}
        <Button disabled={!isValid || !agreeToTerms} type={'submit'}>
          Sign Up
        </Button>
        {isLoading && <p>Sending data...</p>}
      </form>
      <div className={styles.row}>
        <p>Do you have an account?</p>
        <Link href={'/signIn'}>Sign In</Link>
      </div>
    </>
  )
}
