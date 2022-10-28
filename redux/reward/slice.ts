import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  data: [],
  message: "",
  success: false
}

export const slice = createSlice({
  name: 'reward',
  initialState,
  reducers: {
    setReward: (_, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.reward,
      };
    }
  }
})

export const { setReward } = slice.actions;

export default slice.reducer;