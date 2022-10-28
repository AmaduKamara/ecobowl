import { createSlice } from '@reduxjs/toolkit';

interface Supply {
  data: Array<any>
  message: string,
  success: boolean,
  items: Array<any>
}

const initialState:Supply = {
  data: [],
  message: "",
  success: false,
  items: []
}

export const slice = createSlice({
  name: 'supply_items',
  initialState,
  reducers: {
    resetItems: (state) => {
      state.items = []
    },
    addItem: (state, {payload}) => {
      state.items.push(payload)
    },
    editItem: (state, {payload}) => {
      const itemIndex = state.items.findIndex(e => e.id === payload.id);
      state.items[itemIndex] = payload;
    },
    deleteItem: (state, {payload}) => {
      const items = state.items.filter(e => e.id !== payload.id)
      state.items = items;
    }
  },
})

export const { addItem, editItem, deleteItem, resetItems } = slice.actions

export default slice.reducer