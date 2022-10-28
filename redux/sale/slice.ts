import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
  items: [],
}

export const productSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    resetItems: (state) => {
      state.items = []
    },
    addItem: (state, { payload }) => {
      const item: any = payload;
      state.items.push(item)
    },
    editSales: (state, { payload }) => {
      const items = state.items;
      const store = items.map(item => ({...item, sales: payload}));
      state.items = store;
    },
    blockItem: (state, { payload }) => {
      const store = state.items;
      const items: any = payload;

      items.forEach(item => {
        store.push(item)
      })

      state.items = store;
    },
    editItem: (state, { payload }) => {
      const itemIndex = state.items.findIndex((e: any) => (e.id === payload.id))
      state.items[itemIndex] = payload;
    },
    deleteItem: (state, { payload }) => {
      const sales = state.items.filter((e: any) => e.id !== payload.id)
      state.items = sales;
    },
  }
})

// Action creators are generated for each case reducer function
export const { addItem, editItem, deleteItem, resetItems, blockItem, editSales } = productSlice.actions

export default productSlice.reducer