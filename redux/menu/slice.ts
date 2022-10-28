import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  state: true,
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<boolean>) => {
      state.state = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggle } = menuSlice.actions

export default menuSlice.reducer