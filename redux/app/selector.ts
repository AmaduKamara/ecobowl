import { createSelector } from "@reduxjs/toolkit";

const appSelector = (state) => state.app;

export const appStore = createSelector(appSelector, (data) => data);