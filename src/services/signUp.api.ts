import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const signUpApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_INCTAGRAM_API_URL}` }),
  endpoints: builder => ({
    resendVerificationCode: builder.mutation<any, ResendEmailRequestBody>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/auth/registration-email-resending',
      }),
    }),
    sendEmail: builder.mutation<any, SendEmailRequestBody>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/auth/registration',
      }),
    }),
    sendVerificationCode: builder.mutation<any, SendVerificationCode>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/auth/registration-confirmation',
      }),
    }),
  }),
  reducerPath: 'signUpApi',
})

export const {
  useResendVerificationCodeMutation,
  useSendEmailMutation,
  useSendVerificationCodeMutation,
} = signUpApi

export type SendEmailRequestBody = {
  baseUrl: string
  email: string
  password: string
  userName: string
}

export type ResendEmailRequestBody = Pick<SendEmailRequestBody, 'baseUrl' | 'email'>

export type SendVerificationCode = {
  confirmationCode: string
}
