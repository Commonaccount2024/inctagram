import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface UserProfile {
  email: string
  password: string
}
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://inctagram.work/api' }),
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['Me'],
})
