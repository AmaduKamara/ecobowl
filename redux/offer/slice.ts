import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  data: [],
  message: "",
  success: false
}

export const slice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    setOffer: (_, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.offer,
    };
    }
  }
})

export const { setOffer } = slice.actions;

export default slice.reducer;