import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const loginApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://inctagram.work/api/v1' }),
  endpoints: builder => ({
    login: builder.mutation({
      query: loginData => ({
        body: loginData,
        method: 'POST',
        url: '/auth/login',
      }),
    }),
  }),
  reducerPath: 'loginApi',
})

export const { useLoginMutation } = loginApi
