import { createSlice } from '@reduxjs/toolkit';

interface Supply {
  data: Array<any>
  message: string,
  success: boolean
}

const initialState:Supply = {
  data: [],
  message: "",
  success: false
}

export const slice = createSlice({
  name: 'supply',
  initialState,
  reducers: {
    setSuppy: (_, action) => {
      return action.payload;
    }
  }
})

export const { setSuppy } = slice.actions;

export default slice.reducer;