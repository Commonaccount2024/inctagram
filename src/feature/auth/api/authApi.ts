import { baseApi } from '@/shared/api/baseApi'
import { apiErrorsAdapter } from '@/shared/utils/api-errors-adapter'

import {
  LoginParams,
  LoginResponse,
  ResendEmailRequestBody,
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
    resendEmail: builder.mutation<void, ResendEmailRequestBody>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/auth/registration-email-resending',
      }),
    }),
    sendEmail: builder.mutation<void, SendEmailRequestBody>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/auth/registration',
      }),
      transformErrorResponse: (response, _meta, _arg) => {
        return apiErrorsAdapter(response)
      },
    }),
    sendVerificationCode: builder.mutation<void, SendVerificationCode>({
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
  useResendEmailMutation,
  useSendEmailMutation,
  useSendVerificationCodeMutation,
} = authApi
