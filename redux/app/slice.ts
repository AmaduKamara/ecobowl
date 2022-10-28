import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setApp: (_, { payload }) => {
            return payload;
        },
    },
})

export const { setApp } = appSlice.actions

export default appSlice.reducer