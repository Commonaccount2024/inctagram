import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { loginApi } from './shared/components/LoginForm/login.api'

export const store = configureStore({
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(loginApi.middleware)
  },
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
  },
})
setupListeners(store.dispatch)
