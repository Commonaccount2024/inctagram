import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { LoginParams } from '@/feature/auth/api/auth.types'
import { useLoginMutation } from '@/feature/auth/api/authApi'
import { useRouter } from 'next/router'

const LoginForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    trigger,
  } = useForm<LoginParams>()
  const router = useRouter()

  const [loginUser, { isError: loginError }] = useLoginMutation()
  const [error, setError] = useState<null | string>(null)
  const onSubmit = async (data: LoginParams) => {
    try {
      await loginUser(data).unwrap()

      router.push('/create-account')
    } catch (error) {
      setError('Произошла ошибка. Пожалуйста попробуйте еще раз')
    }
  }

  const handleBlur = (fieldName: keyof LoginParams) => {
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
