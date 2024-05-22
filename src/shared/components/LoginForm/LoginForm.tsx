import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { LoginParams } from '@/feature/auth/api/auth.types'
import { useLoginMutation } from '@/feature/auth/api/authApi'
import { setUser } from '@/feature/auth/api/authSlice'
import { OAuth } from '@/feature/oAuth/oAuth'
import { Button, Card } from '@commonaccount2024/inctagram-ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './LoginForm.module.scss'

import { ControlledTextField } from '../controlled/controlledTextField/controlledTextField'

const LoginForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginParams>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  })
  const router = useRouter()
  const dispatch = useDispatch()
  const [loginUser] = useLoginMutation()
  const [error, setError] = useState<null | string>(null)
  const onSubmit = async (data: LoginParams) => {
    try {
      const response = await loginUser(data).unwrap()

      localStorage.setItem('accessToken', response.accessToken)
      dispatch(setUser({ email: data.email }))
      router.push('/myProfile')
    } catch (error) {
      setError('The email or password are incorrect. Try again please')
    }
  }

  return (
    <Card className={s.div}>
      <h1 className={s.title}>Sign in</h1>
      <OAuth />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          className={s.inputEmail}
          control={control}
          error={errors.email?.message}
          label={'Email'}
          name={'email'}
          placeholder={'Email'}
          rules={{ required: 'Email is required' }}
        />

        <ControlledTextField
          className={s.inputPassword}
          control={control}
          error={errors.password?.message}
          label={'Password'}
          name={'password'}
          placeholder={'Password'}
          rules={{ required: 'Password is required' }}
          type={'password'}
        />
        {error && <p className={s.error}>{error}</p>}
        <Link href={'/forgotPassword'}>
          <p className={s.forgotPassword}>Forgot Password</p>
        </Link>
        <Button fullWidth type={'submit'}>
          Sign In
        </Button>
      </form>
      <p className={s.text}>Don&apos;t have an account?</p>
      <Link className={s.signInLink} href={'/signUp'}>
        <p className={s.signUp}>Sign Up</p>
      </Link>
    </Card>
  )
}

export default LoginForm
