import { createSelector } from "@reduxjs/toolkit";

const staffSelector = (state) => state.staff.data;

export const staffStore = createSelector(staffSelector, (data) => data)