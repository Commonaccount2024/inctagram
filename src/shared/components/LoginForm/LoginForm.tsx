import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useLoginMutation } from '@/feature/auth/api/authApi'
import { useRouter } from 'next/router'

interface FormData {
  email: string
  password: string
}

const LoginForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    trigger,
  } = useForm<FormData>()
  const router = useRouter()

  const [loginUser, { isError: loginError }] = useLoginMutation()
  const [error, setError] = useState<null | string>(null)
  const onSubmit = async (data: FormData) => {
    try {
      await loginUser(data).unwrap()

      router.push('/create-account')
    } catch (error) {
      setError('Произошла ошибка. Пожалуйста попробуйте еще раз')
    }
  }

  const handleBlur = (fieldName: keyof FormData) => {
    trigger(fieldName)
  }

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input {...register('email', { required: true })} onBlur={() => handleBlur('email')} />
          {errors.email && <span>Email is required</span>}
        </div>
        <div>
          <label>Password</label>
          <input
            {...register('password', { required: true })}
            onBlur={() => handleBlur('password')}
            type={'password'}
          />
          {errors.password && <span>Password is required</span>}
        </div>
        <button type={'submit'}>Sign In</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  )
}

export default LoginForm
