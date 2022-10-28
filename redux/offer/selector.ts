import { createSelector } from "@reduxjs/toolkit";

const offerSelector = (state) => state.offer.data;

export const offerStore = createSelector(offerSelector, (data) => data)