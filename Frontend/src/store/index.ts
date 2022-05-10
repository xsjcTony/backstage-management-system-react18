import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './authentication/authenticationSlice'
import layoutReducer from './layout/layoutSlice'


const store = configureStore({
  reducer: {
    layout: layoutReducer,
    authentication: authenticationReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
