import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


/**
 * Types
 */
interface LayoutState {
  locale: string
}


/**
 * Slice
 */
const initialState: LayoutState = {
  locale: localStorage.getItem('locale') ?? 'en-US'
}

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<string>) => {
      localStorage.setItem('locale', action.payload)
      state.locale = action.payload
    }
  }
})

export const { setLocale } = layoutSlice.actions

export default layoutSlice.reducer
