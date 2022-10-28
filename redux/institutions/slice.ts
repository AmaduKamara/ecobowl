import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

interface Institute {
  data: Array<any>
  message: string,
  success: boolean
}

const initialState: Institute = {
  data: [],
  message: "",
  success: false
}

export const slice = createSlice({
  name: 'institute',
  initialState,
  reducers: {
    setInstitute: (_, action) => {
      return action.payload;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.institute,
      };
    }
  }
})

export const { setInstitute } = slice.actions

export default slice.reducer