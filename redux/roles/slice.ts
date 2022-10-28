import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  data: [],
  message: "",
  success: false
}

export const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setRoles: (_, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.roles,
    };
    }
  }
})

export const { setRoles } = rolesSlice.actions

export default rolesSlice.reducer