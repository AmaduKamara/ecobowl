import { createSelector } from "@reduxjs/toolkit";

const recordSelector = (state) => state.event.data;

export const eventStore = createSelector(recordSelector, (sales) => sales)