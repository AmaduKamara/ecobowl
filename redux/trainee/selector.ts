import { createSelector } from "@reduxjs/toolkit";

const traineeSelector = (state) => state.trainee;

export const traineeStore = createSelector(traineeSelector, (trainee) => trainee)