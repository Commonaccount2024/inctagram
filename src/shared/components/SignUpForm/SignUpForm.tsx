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
import { SignUpModal } from './SignUpModal/SignUpModal'
import { SignUpFormFields, signUpSchema } from './signUpSchema'

const notify = {
  errorRegistrationEmail: function (err: unknown) {
    toast.error(`Unexpected error during registration: ${err}`)
  },
}

export function RegistrationForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ifExists, setIfExists] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const routerLocale = useRouterLocaleDefination()
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

  const clearInput = () => {
    setIfExists('')
    setUserEmail('')
  }

  const onModalClose = () => setIsModalOpen(prev => !prev)

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
      setIsModalOpen(true)
      setUserEmail(data.email)
      reset()
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
    <>
      {!isModalOpen && (
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

          <Typography className={s.text} variant={'regular-text-16'}>
            Do you have an account?
          </Typography>
          <Link className={s.signInLink} href={'/signIn'}>
            <Typography className={s.signIn} variant={'regular-text-16'}>
              Sign In
            </Typography>
          </Link>
        </Card>
      )}

      {isModalOpen && (
        <SignUpModal email={userEmail ?? ''} isOpen={isModalOpen} onClose={onModalClose} />
      )}
    </>
  )
}
