import { createSelector } from "@reduxjs/toolkit";

const customerSelector = (state) => state.customer.data;

export const customerStore = createSelector(customerSelector, (customer) => customer)