import { createSelector } from "@reduxjs/toolkit";

const recordSelector = (state) => state.institute.data;

export const instituteStore = createSelector(recordSelector, (data) => data);