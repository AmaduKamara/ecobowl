import { createSelector } from "@reduxjs/toolkit";

const usersSelector = (state) => state.users.data;

export const usersStore = createSelector(usersSelector, (users) => users)