import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const signUpApi = createApi({
  reducerPath: 'signUpApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_INCTAGRAM_API_URL}` }),
  endpoints: builder => ({
    sendEmail: builder.mutation<any, SendEmailRequestBody>({
      query: body => ({
        method: 'POST',
        url: '/auth/registration',
        body
      }),
    }),
    sendVerificationCode: builder.mutation<any, SendVerificationCode> ({
      query: body => ({
        method: 'POST',
        url: '/auth/registration-confirmation',
        body, 
      })
    })
  }),
})

export const { useSendEmailMutation, useSendVerificationCodeMutation } = signUpApi

export type SendEmailRequestBody = {
  userName: string;
  email: string;
  password: string;
  baseUrl: string;
};

export type SendVerificationCode = {
  confirmationCode: string;
}