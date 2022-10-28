import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState: any = {
  data: [],
  message: "",
  success: false
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (_, { payload }) => {
      return payload;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.product,
      };
    }
  }
})

// Action creators are generated for each case reducer function
export const { setProducts } = productSlice.actions

export default productSlice.reducer