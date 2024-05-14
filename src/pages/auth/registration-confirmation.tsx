import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

import {
  ResendEmailRequestBody,
  SendVerificationCode,
  useResendVerificationCodeMutation,
  useSendVerificationCodeMutation,
} from '@/services/signUp.api'
import { useAuthHandleError } from '@/shared/hooks/useAuthHandleError'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function RegistrationConfirmation() {
  const errorAuthHandle = useAuthHandleError()
  const [sendCode, { isError }] = useSendVerificationCodeMutation()
  const [resendCode, { isLoading }] = useResendVerificationCodeMutation()
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
        .catch(error => {
          const errorData = errorAuthHandle(error)

          toast.error(errorData.errorMessage)
        })
    }
  }, [verificationCode])

  const handleClick = async () => {
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
      {isError ? (
        <>
          <p>
            Looks like the verification link has expired. Not to worry, we can send the link again
          </p>
          <br />
          <button onClick={handleClick} type={'button'}>
            Resend verification link
          </button>
          {isLoading && <p>sending data...</p>}
        </>
      ) : (
        <>
          <h1>Congratulations!</h1>
          <br />
          <p>Your email has been confirmed</p>
          <br />
          <button type={'button'}>
            <Link href={'/signIn'}>Sign In</Link>
          </button>
        </>
      )}
    </>
  )
}
