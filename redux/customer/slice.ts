import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  message: "",
  success: false
}

export const slice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomer: (_, action) => {
      return action.payload;
    },
  }
})

export const { setCustomer } = slice.actions;

export default slice.reducer;