import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    activeUser: (_, action) => {
      return action.payload;
    },
  },
})

export const { activeUser } = userSlice.actions

export default userSlice.reducer