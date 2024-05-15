import { baseApi } from '@/shared/api/baseApi'

import { LoginParams, LoginResponse } from './auth.types'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createPassword: builder.mutation<any, any>({
      query: ({ newPassword, recoveryCode }) => {
        return {
          body: {
            newPassword,
            recoveryCode,
          },
          method: 'POST',
          url: 'auth/new-password',
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
    recoverPassword: builder.mutation<any, any>({
      query: ({ email, recaptcha }) => {
        return {
          body: {
            email,
            recaptcha,
          },
          method: 'POST',
          url: '/v1/auth/password-recovery',
        }
      },
    }),
  }),
})
export const { useCreatePasswordMutation, useLoginMutation, useRecoverPasswordMutation } = authApi
