import { createSelector } from "@reduxjs/toolkit";

const rewardSelector = (state) => state.reward.data;

export const rewardStore = createSelector(rewardSelector, (data) => data)