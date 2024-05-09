import { configureStore } from '@reduxjs/toolkit'
import { signUpApi } from './shared/components/SignUpForm/signUp.api'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [signUpApi.reducerPath]: signUpApi.reducer,
  },
  middleware: getDefaultMiddlware => getDefaultMiddlware().concat(signUpApi.middleware),
})

setupListeners(store.dispatch)
