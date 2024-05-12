import { baseApi } from '@/shared/api/baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      invalidatesTags: ['Me'],
      query: body => ({
        body,
        method: 'POST',
        url: '/auth/login',
      }),
    }),
  }),
})
export const { useLoginMutation } = authApi
