import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  message: "",
  success: false
}

export const slice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeam: (_, action) => {
      return action.payload;
    },
  },
})

export const { setTeam } = slice.actions;

export default slice.reducer;