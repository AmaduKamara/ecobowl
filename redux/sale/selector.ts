import { createSelector } from "@reduxjs/toolkit";

const itemsSelector = (state) => state.sale.items;

export const itemsStore = createSelector(itemsSelector, (product) => product);