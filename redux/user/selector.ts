import { createSelector } from "@reduxjs/toolkit";

const userSelector = (state) => state.user;

export const userStore = createSelector(userSelector, (users) => users)