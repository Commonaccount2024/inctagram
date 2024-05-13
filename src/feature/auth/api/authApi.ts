import { baseApi } from '@/shared/api/baseApi'

import { LoginParams, LoginResponse } from './auth.types'

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
  }),
})
export const { useLoginMutation } = authApi
