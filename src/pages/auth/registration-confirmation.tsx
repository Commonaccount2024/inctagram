import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { ResendEmailRequestBody } from '@/feature/auth/api/auth.types'
import { useResendEmailMutation, useSendVerificationCodeMutation } from '@/feature/auth/api/authApi'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function RegistrationConfirmation() {
  const [sendCode, { error: sendCodeError, isLoading: verifyingCode }] =
    useSendVerificationCodeMutation()
  const [resendEmail, { error: resendError, isError: resendEmailError, isLoading: isResending }] =
    useResendEmailMutation()

  const router = useRouter()
  const { code, email } = router.query
  const verificationCode = Array.isArray(code) ? code[0] : code
  const mailForResend = Array.isArray(email) ? email[0] : email

  useEffect(() => {
    if (!verificationCode) {
      return
    }
    sendCode({ confirmationCode: verificationCode })
  }, [verificationCode])

  const onResendCode = async () => {
    if (!mailForResend) {
      toast.error('email info missing')

      return
    }

    try {
      const requestBody: ResendEmailRequestBody = {
        baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}`,
        email: mailForResend,
      }

      await resendEmail(requestBody)

      !resendEmailError && toast.success(`Please check your email`)
    } catch (err) {
      toast.error(JSON.stringify(err))
    }
  }

  return (
    <>
      {sendCodeError && (
        <>
          <HeadMeta title={'registration-confirmation'} />
          <p style={{ color: 'red' }}>
            {
              //todo check the actual type
              // @ts-ignore
              sendCodeError?.data?.messages?.length > 0 && sendCodeError.data.messages[0].message
            }
          </p>
          <br />
          <button onClick={onResendCode} type={'button'}>
            Resend verification link
          </button>
          {isResending && <p>sending data...</p>}
        </>
      )}
      {!sendCodeError && !verifyingCode && (
        <>
          <h1>Congratulations!</h1>
          <br />
          <p>Your email has been confirmed</p>
          <br />
          <Link href={'/signIn'}>Sign In</Link>
        </>
      )}
    </>
  )
}
