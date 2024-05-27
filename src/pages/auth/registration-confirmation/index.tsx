import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

import { ResendEmailRequestBody } from '@/feature/auth/api/auth.types'
import {
  useResendEmailMutation,
  useVerifyConfirmationCodeMutation,
} from '@/feature/auth/api/authApi'
import LinkConfirmFail from '@/shared/assets/img/LinkConfirmFail'
import LinkConfrimOK from '@/shared/assets/img/LinkConfrimOK'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { authHandleError } from '@/shared/utils/authHandleError'
import { Button, Typography } from '@commonaccount2024/inctagram-ui-kit'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './registration-confirmation.module.scss'

export default function RegistrationConfirmation() {
  const [verifyConfirmationCode, { error: verifyCodeError, isSuccess }] =
    useVerifyConfirmationCodeMutation()
  const [resendEmail, { isLoading: isResending }] = useResendEmailMutation()
  const errorAuthHandle = authHandleError()

  const router = useRouter()
  const { code, email } = router.query
  const verificationCode = Array.isArray(code) ? code[0] : code
  const mailForResend = Array.isArray(email) ? email[0] : email

  useEffect(() => {
    if (!verificationCode) {
      return
    }
    verifyConfirmationCode({ confirmationCode: verificationCode })
      .unwrap()
      .catch(error => {
        const errorData = errorAuthHandle(error)

        toast.error(errorData.errorMessage)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verificationCode])

  const onResendCode = async () => {
    try {
      if (!mailForResend) {
        toast.error('email info missing')

        return
      }

      const requestBody: ResendEmailRequestBody = {
        baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        email: mailForResend,
      }

      await resendEmail(requestBody).unwrap()
      toast.success(`Please check your email`)
    } catch (err) {
      const errorData = errorAuthHandle(err)

      toast.error(errorData.errorMessage)
    }
  }

  return (
    <>
      <HeadMeta title={'registration-confirmation'} />
      {verifyCodeError && (
        <>
          <Typography className={s.titleExpired} variant={'h1'}>
            Email verification link expired
          </Typography>
          <Typography className={s.textExpired} variant={'regular-text-16'}>
            Looks like the verification link has expired. Not to worry, we can send the link again
          </Typography>
          <Button
            className={s.buttonResend}
            onClick={onResendCode}
            type={'button'}
            variant={'primary'}
          >
            {isResending ? 'sending...' : 'Resend verification link'}
          </Button>
          <LinkConfirmFail />
        </>
      )}
      {isSuccess && (
        <>
          <Typography className={s.title} variant={'h1'}>
            Congratulations!
          </Typography>
          <Typography className={s.text} variant={'regular-text-16'}>
            Your email has been confirmed
          </Typography>
          <Link href={'/signIn'}>
            <Button className={s.button} type={'button'} variant={'primary'}>
              Sign In
            </Button>
          </Link>
          <LinkConfrimOK />
        </>
      )}
    </>
  )
}
