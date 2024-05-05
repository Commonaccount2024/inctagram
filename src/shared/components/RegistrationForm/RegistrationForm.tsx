import { useForm, SubmitHandler } from 'react-hook-form'
import { z, object, string } from 'zod'
import styles from './RegistrationForm.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = object({
  username: string().min(6).max(30),
  email: string().email(),
  password: string().min(6).max(20),
  confirmPassword: string(),
  agreeToTerms: z.boolean(),
})

export function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormFields> = data => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">UserName</label>
      <input id="username" {...register('username', { required: true })} type="text" />
      {errors.username && <span className={styles.error}>This field is required</span>}
      <br />
      <label htmlFor="email">Email</label>
      <input id="email" {...register('email', { required: true })} type="text" />
      {errors.email && <span className={styles.error}>This field is required</span>}
      <br />
      <label htmlFor="password">Password</label>
      <input id="password" {...register('password', { required: true })} type="password" />
      {errors.password && <span className={styles.error}>This field is required</span>}
      <br />
      <label htmlFor="confirmPassword">Password confirmation</label>
      <input
        id="passwordConfirmation"
        {...register('confirmPassword', { required: true })}
        type="password"
      />
      {errors.confirmPassword && <span className={styles.error}>This field is required</span>}
      <br />
      <input type="checkbox" id="agreeToTerms" {...register('agreeToTerms', { required: true })} />
      <label htmlFor="agreeToTerms">I agree to the Terms of Service and Privacy Policy</label>
      {errors.agreeToTerms && <span className={styles.error}>{errors.agreeToTerms.message}</span>}
      <br />
      <button type="submit">Sign Up</button>
    </form>
  )
}

type FormFields = z.infer<typeof schema>;
