import { createSlice } from '@reduxjs/toolkit'
import type { User } from '../../types'
import type { PayloadAction } from '@reduxjs/toolkit'


/**
 * Types
 */
interface AuthenticationState {
  authenticated: boolean
  loggedIn: boolean
  currentUser: User | null
}


/**
 * Slice
 */
const initialState: AuthenticationState = {
  authenticated: false,
  loggedIn: false,
  currentUser: null
}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    }
  }
})

export const { setAuthenticated, setLoggedIn, setCurrentUser } = authenticationSlice.actions

export default authenticationSlice.reducer
