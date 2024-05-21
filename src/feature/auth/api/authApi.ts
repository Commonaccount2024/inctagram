import { baseApi } from '@/shared/api/baseApi'

import {
  ConfirmEmailRequestBody,
  ForgotPasswordParams,
  LoginParams,
  LoginResponse,
  NewPasswordParams,
  ResendEmailRequestBody,
  SendEmailRequestBody,
} from './auth.types'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createPassword: builder.mutation<void, NewPasswordParams>({
      query: ({ newPassword, passwordConfirmation }) => {
        return {
          body: {
            newPassword,
            passwordConfirmation,
          },
          method: 'POST',
          url: '/v1/auth/new-password',
        }
      },
    }),
    login: builder.mutation<LoginResponse, LoginParams>({
      invalidatesTags: ['Me'],
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/login',
      }),
    }),
    recoverPassword: builder.mutation<void, ForgotPasswordParams>({
      query: ({ email, recaptcha }) => {
        return {
          body: {
            email,
            recaptcha,
          },
          method: 'POST',
          url: 'v1/auth/password-recovery',
        }
      },
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
    }),
    verifyConfirmationCode: builder.mutation<void, ConfirmEmailRequestBody>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/auth/registration-confirmation',
      }),
    }),
  }),
})
export const {
  useCreatePasswordMutation,
  useLoginMutation,
  useRecoverPasswordMutation,
  useResendEmailMutation,
  useSendEmailMutation,
  useVerifyConfirmationCodeMutation,
} = authApi
