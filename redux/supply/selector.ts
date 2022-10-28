import { createSelector } from "@reduxjs/toolkit";

const supplySelector = (state) => state.supply.data;
const itemsSelector = (state) => state.supply_items.items;

export const supplyStore = createSelector(supplySelector, (supply) => supply);
export const supplyItems = createSelector(itemsSelector, (items) => items);