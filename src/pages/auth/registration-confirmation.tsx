import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { ResendEmailRequestBody, SendVerificationCode } from '@/feature/auth/api/auth.types'
import {
  useResendVerificationCodeMutation,
  useSendVerificationCodeMutation,
} from '@/feature/auth/api/authApi'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { useAuthHandleError } from '@/shared/hooks/useAuthHandleError'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function RegistrationConfirmation() {
  const [verificationError, setVerificationError] = useState(true)
  const errorAuthHandle = useAuthHandleError()
  const [sendCode, { isError: isSendError }] = useSendVerificationCodeMutation()
  const [resendCode, { isLoading: isResending }] = useResendVerificationCodeMutation()
  const router = useRouter()
  const { code, email } = router.query
  const verificationCode = Array.isArray(code) ? code[0] : code
  const mailForResend = Array.isArray(email) ? email[0] : email

  useEffect(() => {
    if (verificationCode) {
      const requestBody: SendVerificationCode = {
        confirmationCode: verificationCode,
      }

      sendCode(requestBody)
        .unwrap()
        .then(() => setVerificationError(true))
        .catch(error => {
          const errorData = errorAuthHandle(error)

          toast.error(errorData.errorMessage)
        })
        .finally(() => {
          setVerificationError(false)
        })
    }
  }, [verificationCode])

  const onResendCode = async () => {
    try {
      if (mailForResend) {
        const requestBody: ResendEmailRequestBody = {
          baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
          email: mailForResend,
        }

        await resendCode(requestBody).unwrap()
        toast.success(`Please check your email`)
      }
    } catch (err) {
      const errorData = errorAuthHandle(err)

      toast.error(errorData.errorMessage)
    }
  }

  return (
    <>
      {verificationError || isSendError ? (
        <>
          <HeadMeta title={'registration-confirmation'} />
          <p>
            Looks like the verification link has expired. Not to worry, we can send the link again
          </p>
          <br />
          <button onClick={onResendCode} type={'button'}>
            Resend verification link
          </button>
          {isResending && <p>sending data...</p>}
        </>
      ) : (
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
