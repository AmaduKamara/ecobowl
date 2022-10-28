import { createSelector } from "@reduxjs/toolkit";

const salesSelector = (state) => state.sales.data;
const sales5Selector = (state) => state.sales.data;

export const salesStore = createSelector(salesSelector, (sales) => sales)
export const sales5Store = createSelector(sales5Selector, (sales) => sales)