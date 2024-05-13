import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const signUpApi = createApi({
  reducerPath: 'signUpApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_INCTAGRAM_API_URL}` }),
  endpoints: builder => ({
    sendEmail: builder.mutation<any, SendEmailRequestBody>({
      query: body => ({
        method: 'POST',
        url: 'v1/auth/registration',
        body,
      }),
    }),
    sendVerificationCode: builder.mutation<any, SendVerificationCode>({
      query: body => ({
        method: 'POST',
        url: 'v1/auth/registration-confirmation',
        body,
      }),
    }),
    resendVerificationCode: builder.mutation<any, ResendEmailRequestBody>({
      query: body => ({
        method: 'POST',
        url: 'v1/auth/registration-email-resending',
        body,
      }),
    }),
  }),
})

export const {
  useSendEmailMutation,
  useSendVerificationCodeMutation,
  useResendVerificationCodeMutation,
} = signUpApi

export type SendEmailRequestBody = {
  userName: string
  email: string
  password: string
  baseUrl: string
}

export type ResendEmailRequestBody = Pick<SendEmailRequestBody, 'email' | 'baseUrl'>

export type SendVerificationCode = {
  confirmationCode: string
}
