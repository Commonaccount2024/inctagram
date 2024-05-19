import { baseApi } from '@/shared/api/baseApi'
import { formFieldsErrorAdapter } from '@/shared/utils/form-fields-error-adapter'

import {
  ConfirmEmailRequestBody,
  LoginParams,
  LoginResponse,
  ResendEmailRequestBody,
  SendEmailRequestBody,
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
        return formFieldsErrorAdapter(response)
      },
    }),
    verifyConfirmationCode: builder.mutation<void, ConfirmEmailRequestBody>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/auth/registration-confirmation',
      }),
      transformErrorResponse: (response, _meta, _arg) => {
        return formFieldsErrorAdapter(response)
      },
    }),
  }),
})
export const {
  useLoginMutation,
  useResendEmailMutation,
  useSendEmailMutation,
  useVerifyConfirmationCodeMutation,
} = authApi
