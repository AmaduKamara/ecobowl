import { createSelector } from "@reduxjs/toolkit";

const serviceSelector = (state) => state.service.data;

export const serviceStore = createSelector(serviceSelector, (data) => data);