import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface User {
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
}

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    clearUser(state) {
      state.user = null
      state.isAuthenticated = false
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
      state.isAuthenticated = true
    },
  },
})

export const { clearUser, setUser } = authSlice.actions
export default authSlice.reducer
export const selectUserEmail = (state: { auth: AuthState }) => state.auth.user?.email
