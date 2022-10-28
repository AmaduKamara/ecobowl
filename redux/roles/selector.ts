import { createSelector } from "@reduxjs/toolkit";

const roleSelector = (state) => state.roles.data;

export const roleStore = createSelector(roleSelector, (roles) => roles)