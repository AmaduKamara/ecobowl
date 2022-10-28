import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  data: [],
  message: "",
  success: false
}

export const salesSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvent: (_, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.event,
    };
    }
  }
})

export const { setEvent } = salesSlice.actions

export default salesSlice.reducer