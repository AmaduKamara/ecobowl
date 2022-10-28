import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  data: [],
  message: "",
  success: false
}

export const slice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    setStaff: (_, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.staff,
    };
    }
  }
})

export const { setStaff } = slice.actions

export default slice.reducer