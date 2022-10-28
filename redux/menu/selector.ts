import { createSelector } from "@reduxjs/toolkit";

const menuSelector = (state: any) => state.menu;

export const menuStore = createSelector(menuSelector, (menu) => menu)