import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  data: [],
  message: "",
  success: false
}

export const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setSales: (_, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.sales,
    };
    }
  }
})

export const { setSales } = salesSlice.actions

export default salesSlice.reducer