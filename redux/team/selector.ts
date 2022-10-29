import { createSelector } from "@reduxjs/toolkit";

const teamSelector = (state) => state.team;

export const teamStore = createSelector(teamSelector, (team) => team)