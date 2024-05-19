import { baseApi } from '@/shared/api/baseApi'

import {
  LoginParams,
  LoginResponse,
  ResendEmailRequestBody,
  ResponseSuccessCase,
  SendEmailRequestBody,
  SendVerificationCode,
} from './auth.types'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginParams>({
      invalidatesTags: ['Me'],
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/login',
      }),
    }),
    resendVerificationCode: builder.mutation<ResponseSuccessCase, ResendEmailRequestBody>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/auth/registration-email-resending',
      }),
    }),
    sendEmail: builder.mutation<ResponseSuccessCase, SendEmailRequestBody>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/auth/registration',
      }),
    }),
    sendVerificationCode: builder.mutation<ResponseSuccessCase, SendVerificationCode>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/auth/registration-confirmation',
      }),
    }),
  }),
})
export const {
  useLoginMutation,
  useResendVerificationCodeMutation,
  useSendEmailMutation,
  useSendVerificationCodeMutation,
} = authApi
