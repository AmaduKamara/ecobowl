import { createSelector } from "@reduxjs/toolkit";

const solutionSelector = (state) => state.solution;

export const solutionStore = createSelector(solutionSelector, (solution) => solution)