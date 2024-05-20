import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

import { ResendEmailRequestBody } from '@/feature/auth/api/auth.types'
import {
  useResendEmailMutation,
  useVerifyConfirmationCodeMutation,
} from '@/feature/auth/api/authApi'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { authHandleError } from '@/shared/utils/authHandleError'
import { Button } from '@commonaccount2024/inctagram-ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function RegistrationConfirmation() {
  const [verifyConfirmationCode, { error: verifyCodeError, isSuccess }] =
    useVerifyConfirmationCodeMutation()
  const [resendEmail, { isError: resendEmailError, isLoading: isResending }] =
    useResendEmailMutation()
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
      {verifyCodeError && (
        <>
          <HeadMeta title={'registration-confirmation'} />
          <p>
            Looks like the verification link has expired. Not to worry, we can send the link again
          </p>
          <br />
          <Button onClick={onResendCode} type={'button'}>
            Resend verification link
          </Button>
          {isResending && <p>sending data...</p>}
        </>
      )}
      {isSuccess && (
        <>
          <h1>Congratulations!</h1>
          <br />
          <p>Your email has been confirmed</p>
          <br />
          <Link href={'/signIn'}>
            <Button>Sign In</Button>
          </Link>
        </>
      )}
    </>
  )
}
