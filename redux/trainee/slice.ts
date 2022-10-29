import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  message: "",
  success: false
}

export const userSlice = createSlice({
  name: 'trainee',
  initialState,
  reducers: {
    setTrainee: (_, action) => {
      return action.payload;
    },
  },
})

export const { setTrainee } = userSlice.actions

export default userSlice.reducer