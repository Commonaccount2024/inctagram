import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { LoginParams } from '@/feature/auth/api/auth.types'
import { useLoginMutation } from '@/feature/auth/api/authApi'
import { setUser } from '@/feature/auth/api/authSlice'
import { OAuth } from '@/feature/oAuth/oAuth'
import { Button, Card, Typography } from '@commonaccount2024/inctagram-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { isValid } from 'zod'

import s from './LoginForm.module.scss'

import { ControlledTextField } from '../controlled/controlledTextField/controlledTextField'
import { loginSchema } from './loginValidationSchema'

const LoginForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    trigger,
  } = useForm<LoginParams>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(loginSchema),
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
  const handleClickOutside = useCallback(
    async (event: MouseEvent) => {
      const form = document.querySelector(`.${s.form}`)

      if (form && !form.contains(event.target as Node)) {
        await trigger()
      }
    },
    [trigger]
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  return (
    <Card className={s.div}>
      <Typography className={s.title} variant={'h1'}>
        Sign in
      </Typography>
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
        {error && (
          <Typography className={s.error} variant={'regular-text-14'}>
            {error}
          </Typography>
        )}
        <Link href={'/forgotPassword'}>
          <Typography className={s.forgotPassword} variant={'regular-text-14'}>
            Forgot Password
          </Typography>
        </Link>
        <Button disabled={!isValid} fullWidth type={'submit'}>
          Sign In
        </Button>
      </form>
      <Typography className={s.text} variant={'regular-text-16'}>
        Don&apos;t have an account?
      </Typography>
      <Link className={s.signInLink} href={'/signUp'}>
        <Typography className={s.signUp} variant={'regular-text-16'}>
          Sign Up
        </Typography>
      </Link>
    </Card>
  )
}

export default LoginForm
