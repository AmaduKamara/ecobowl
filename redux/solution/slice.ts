import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  message: "",
  success: false
}

export const slice = createSlice({
  name: 'solution',
  initialState,
  reducers: {
    setSolution: (_, action) => {
      return action.payload;
    },
  },
})

export const { setSolution } = slice.actions;

export default slice.reducer;