import { useForm, SubmitHandler } from 'react-hook-form'
import { z, object, string } from 'zod'
import styles from './RegistrationForm.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

const signUpSchema = object({
  username: string()
    .min(6, 'Username must be at least 6 characters')
    .max(30, 'Username must be less than 30 characters'),
  email: string().email(),
  password: string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be less than 20 characters'),
  confirmPassword: string(),
  agreeToTerms: z.boolean({
    required_error: 'You must agreed with terms and policy'
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
})

export function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit: SubmitHandler<FormFields> = data => console.log(data)

  return (
    <>
      <h1 className={styles.title}>Sign Up</h1>
      <div>
        <a href="">
          <img src="" alt="ico_1" />
        </a>
        <a href="">
          <img src="" alt="ico_2" />
        </a>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">UserName</label>
        <input id="username" {...register('username')} type="text" />
        {errors.username && <span className={styles.error}>{errors.username.message}</span>}
        <br />
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email')} type="text" />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        <br />
        <label htmlFor="password">Password</label>
        <input id="password" {...register('password')} type="password" />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        <br />
        <label htmlFor="confirmPassword">Password confirmation</label>
        <input id="passwordConfirmation" {...register('confirmPassword')} type="password" />
        {errors.confirmPassword && (
          <span className={styles.error}>{errors.confirmPassword.message}</span>
        )}
        <br />
        <input type="checkbox" id="agreeToTerms" {...register('agreeToTerms')} />
        <label htmlFor="agreeToTerms">I agree to the </label>
        <a className={styles.policy}>Terms of Service</a> and{' '}
        <a className={styles.policy}>Privacy Policy</a>
        {errors.agreeToTerms && <span className={styles.error}>{errors.agreeToTerms.message}</span>}
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <p>Do you have an account?</p>
      <Link href='/singIn'>Sign In</Link>
    </>
  )
}

type FormFields = z.infer<typeof signUpSchema>
