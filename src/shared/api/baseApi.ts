import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://inctagram.work/api/v1' }),
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['Me'],
})
