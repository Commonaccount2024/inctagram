import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

import { ResendEmailRequestBody } from '@/feature/auth/api/auth.types'
import {
  useResendEmailMutation,
  useVerifyConfirmationCodeMutation,
} from '@/feature/auth/api/authApi'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { isFormError } from '@/shared/utils/form-fields-error-adapter'
import { Button } from '@commonaccount2024/inctagram-ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function RegistrationConfirmation() {
  const [verifyConfirmationCode, { error: verifyCodeError, isLoading: verifyingCode }] =
    useVerifyConfirmationCodeMutation()
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
    verifyConfirmationCode({ confirmationCode: verificationCode })
    // the code doesn't change. A New code will be on a new page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onResendCode = async () => {
    if (!mailForResend) {
      toast.error('email info missing')

      return
    }

    const requestBody: ResendEmailRequestBody = {
      baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}`,
      email: mailForResend,
    }

    await resendEmail(requestBody)

    !resendEmailError && toast.success(`Please check your email`)
  }

  const getVerifyCodeErrorMessage = () => {
    if (isFormError(verifyCodeError)) {
      return verifyCodeError.code
    }
  }

  return (
    <>
      {verifyCodeError && (
        <>
          <HeadMeta title={'registration-confirmation'} />
          <p style={{ color: 'red' }}>{getVerifyCodeErrorMessage()}</p>
          <br />
          <Button onClick={onResendCode} type={'button'}>
            Resend verification link
          </Button>
          {isResending && <p>sending data...</p>}
        </>
      )}
      {!verifyCodeError && !verifyingCode && (
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
