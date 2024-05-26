import { useState } from 'react'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { SendEmailRequestBody } from '@/feature/auth/api/auth.types'
import { useSendEmailMutation } from '@/feature/auth/api/authApi'
import { OAuth } from '@/feature/oAuth/oAuth'
import { useRouterLocaleDefination } from '@/shared/hooks/useRouterLocaleDefination'
import { authHandleError } from '@/shared/utils/authHandleError'
import { Button, Card, Checkbox, Typography } from '@commonaccount2024/inctagram-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import s from './SignUpForm.module.scss'

import { ControlledTextField } from '../controlled/controlledTextField/controlledTextField'
import { SignUpFormFields, signUpSchema } from './signUpSchema'

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
  const [ifExists, setIfExists] = useState('')
  const handleError = authHandleError()

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
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

  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue: false,
    name: 'agreeToTerms',
  })

  const [sendMail, { isLoading }] = useSendEmailMutation()
  const agreeToTerms = watch('agreeToTerms')

  const clearInput = () => setIfExists('')

  const onSubmit: SubmitHandler<SignUpFormFields> = async data => {
    clearInput()

    try {
      const requestBody: SendEmailRequestBody = {
        baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        email: data.email,
        password: data.password,
        userName: data.userName,
      }

      await sendMail(requestBody).unwrap()
      reset()
      notify.successSendEmail(data.email)
    } catch (err) {
      const errorData = handleError(err)

      if (errorData.statusCode === 400) {
        setIfExists(errorData.field)
      }

      if (errorData.statusCode === 429) {
        notify.errorRegistrationEmail('More than 5 attempts from one IP-address during 10 seconds')
      }
    }
  }

  return (
    <Card className={s.div}>
      <Typography className={s.title} variant={'h1'}>
        {routerLocale.signUpPage.title}
      </Typography>
      <OAuth />

      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          className={s.form_input}
          control={control}
          error={errors.userName?.message}
          label={'Username'}
          name={'userName'}
          onInput={clearInput}
          placeholder={'Username'}
        />
        {ifExists === 'userName' && !errors.userName && (
          <span className={s.error}>User with this username is already registered</span>
        )}
        <ControlledTextField
          className={s.form_input}
          control={control}
          error={errors.email?.message}
          label={'Email'}
          name={'email'}
          onInput={clearInput}
          placeholder={'Email'}
        />
        {ifExists === 'email' && !errors.email && (
          <span className={s.error}>User with this email is already registered</span>
        )}
        <ControlledTextField
          className={s.form_input}
          control={control}
          error={errors.password?.message}
          label={'Password'}
          name={'password'}
          placeholder={'Password'}
          type={'password'}
        />
        <ControlledTextField
          className={`${s.form_input} ${s.confirm}`}
          control={control}
          error={errors.confirmPassword?.message}
          label={'Password confirmation'}
          name={'confirmPassword'}
          placeholder={'Password confirmation'}
          type={'password'}
        />
        <div className={s.checkboxContainer}>
          <Checkbox
            checked={value}
            id={'agreeToTerms'}
            label={'I agree to the'}
            name={'agreeToTerms'}
            onCheckedChange={onChange}
            position={'left'}
          />
          <Link className={s.policy} href={'/termsOfService'}>
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link className={s.policy} href={'/privacyPolicy'}>
            Privacy Policy
          </Link>
        </div>
        <Button
          className={s.confirm}
          disabled={!isValid || !agreeToTerms}
          fullWidth
          type={'submit'}
        >
          {isLoading ? 'Sending data...' : 'Sign Up'}
        </Button>
      </form>

      {/* <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={'username'}>UserName</label>
        <input id={'username'} {...register('userName')} onInput={clearInput} type={'text'} />
        {errors.userName && <span className={s.error}>{errors.userName.message}</span>}
        {ifExists === 'userName' && !errors.userName && (
          <span className={s.error}>User with this username is already registered</span>
        )}
        <label htmlFor={'email'}>Email</label>
        <input id={'email'} {...register('email')} onInput={clearInput} type={'text'} />
        {errors.email && <span className={s.error}>{errors.email.message}</span>}
        {ifExists === 'email' && !errors.email && (
          <span className={s.error}>User with this email is already registered</span>
        )}
        <label htmlFor={'password'}>Password</label>
        <input id={'password'} {...register('password')} type={'password'} />
        {errors.password && <span className={s.error}>{errors.password.message}</span>}
        <label htmlFor={'confirmPassword'}>Password confirmation</label>
        <input id={'passwordConfirmation'} {...register('confirmPassword')} type={'password'} />
        {errors.confirmPassword && (
          <span className={s.error}>{errors.confirmPassword.message}</span>
        )}
        <div className={s.row}>
          <input id={'agreeToTerms'} type={'checkbox'} {...register('agreeToTerms')} />
          <label htmlFor={'agreeToTerms'}>I agree to the </label>
          <Link className={s.policy} href={'/termsOfService'}>
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link className={s.policy} href={'/privacyPolicy'}>
            Privacy Policy
          </Link>
        </div>

        {errors.agreeToTerms && <span className={s.error}>{errors.agreeToTerms.message}</span>}
        <Button disabled={!isValid || !agreeToTerms} type={'submit'}>
          Sign Up
        </Button>
        {isLoading && <p>Sending data...</p>}
      </form> */}

      <Typography className={s.text} variant={'regular-text-16'}>
        Do you have an account?
      </Typography>
      <Link className={s.signInLink} href={'/signIn'}>
        <Typography className={s.signIn} variant={'regular-text-16'}>
          Sign In
        </Typography>
      </Link>
    </Card>
  )
}
