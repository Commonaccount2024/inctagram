import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { object, string, z } from 'zod'

import styles from './SignUpForm.module.scss'
import { SendEmailRequestBody, useSendEmailMutation } from '../../../services/signUp.api'

const signUpSchema = object({
  agreeToTerms: z.boolean({
    required_error: 'You must agreed with terms and policy',
  }),
  confirmPassword: string(),
  email: string().email('The email must match the format example@example.com'),
  password: string()
    .min(6, 'Minimum number of characters 6')
    .max(20, 'Maximum number of characters 20')
    .regex(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[0-9A-Za-z!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/,
      `Password must contain 0-9, a-z, A-Z, ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _\` { | } ~`
    ),
  username: string()
    .min(6, 'Minimum number of characters 6')
    .max(30, 'Maximum number of characters 30'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
})

export function RegistrationForm() {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<FormFields>({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  })
  const [sendMail, { isError, isLoading }] = useSendEmailMutation()

  const agreeToTerms = watch('agreeToTerms')
  const notify = {
    successSendEmail: function (userEmail: string) {
      toast.success(`We have sent a link to confirm your email to ${userEmail}`)
    },
    errorRegistrationEmail: function() {
      toast.error('Error sending registration email')
    }
  }

  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      const requestBody: SendEmailRequestBody = {
        userName: data.username,
        email: data.email,
        password: data.password,
        baseUrl: 'http://localhost:3000'
      }

      const result = await sendMail(requestBody).unwrap();
      notify.successSendEmail(data.email)
      if (result) {
        console.log(result)
      } else {
        console.error('Error sending registration email:', result)
      }
    } catch (error) {
      console.error('Unexpected error during registration:', error)
    }
    reset();
  }

  return (
    <>
      <h1 className={styles.title}>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={'username'}>UserName</label>
        <input id={'username'} {...register('username')} type={'text'} />
        {errors.username && <span className={styles.error}>{errors.username.message}</span>}
        <br />
        <label htmlFor={'email'}>Email</label>
        <input id={'email'} {...register('email')} type={'text'} />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
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

export type FormFields = z.infer<typeof signUpSchema>
