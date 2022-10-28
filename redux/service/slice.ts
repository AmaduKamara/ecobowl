import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

interface Enquiry {
  data: Array<any>
  message: string,
  success: boolean
}

const initialState: Enquiry = {
  data: [],
  message: "",
  success: false
}

export const slice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setService: (_, action) => {
      return action.payload;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.service,
      };
    }
  }
})

export const { setService } = slice.actions

export default slice.reducer