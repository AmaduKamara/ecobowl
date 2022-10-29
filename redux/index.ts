import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import menuReducer from './menu/slice';
import instituteReducer from './institutions/slice';
import rewardReducer from './reward/slice';
import teamReducer from './team/slice';
import traineeReducer from './trainee/slice';
import solutionReducer from './solution/slice';
import eventReducer from './event/slice';
import userReducer from './user/slice';
import usersReducer from './users/slice';
import appReducer from './app/slice';

const makeStore = () => configureStore({
  reducer: {
    menu: menuReducer,
    institute: instituteReducer,
    event: eventReducer,
    reward: rewardReducer,
    team: teamReducer,
    trainee: traineeReducer,
    solution: solutionReducer,
    app: appReducer,
    user: userReducer,
    users: usersReducer
  }
});

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export const wrapper = createWrapper<AppStore>(makeStore)