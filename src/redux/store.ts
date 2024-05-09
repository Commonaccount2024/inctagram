import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { signUpApi } from './signUp.api'

export const store = configureStore({
  middleware: getDefaultMiddlware => getDefaultMiddlware().concat(signUpApi.middleware),
  reducer: {
    [signUpApi.reducerPath]: signUpApi.reducer,
  },
})

setupListeners(store.dispatch)
