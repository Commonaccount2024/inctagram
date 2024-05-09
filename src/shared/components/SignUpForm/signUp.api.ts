import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

export const signUpApi = createApi({
  reducerPath: 'signUpApi',
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.NEXT_PUBLIC_INCTAGRAM_API_URL}`}),
    endpoints: (builder) => ({
      sendEmail: builder.mutation<string, string>({
        query: (body) => ({
          url: '/auth/registration',
          method: 'POST',
          body,
        }),
      })
    })
});

export const {useSendEmailMutation} = signUpApi;
