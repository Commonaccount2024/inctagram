
import { SendVerificationCode, useSendVerificationCodeMutation } from '@/services/signUp.api';
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function RegistrationConfirmation() {
  const [sendCode] = useSendVerificationCodeMutation();
  const router = useRouter();
  const {code} = router.query;
  const verificationCode = Array.isArray(code) ? code[0] : code;

  useEffect(() => {
    if(verificationCode) {
      const requestBody: SendVerificationCode = {
        confirmationCode: verificationCode
      }
      sendCode(requestBody);
    }
  }, [verificationCode])


  return (
    <>
      <h1>Congratulations!</h1> 
      <br />
      <p>Your email has been confirmed</p>
      <br />
      <button type='button'><Link href='/signIn'>Sign In</Link></button>
    </>
  )
}
