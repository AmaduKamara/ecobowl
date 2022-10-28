import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import menuReducer from './menu/slice';
import instituteReducer from './institutions/slice';
import supplyReducer from './supply/slice';
import supplyItemsReducer from './supply/supply.slice';
import rewardReducer from './reward/slice';
import offerReducer from './offer/slice';
import eventReducer from './event/slice';
import customerReducer from './customer/slice';
import userReducer from './user/slice';
import usersReducer from './users/slice';
import saleReducer from './sale/slice';
import rolesReducer from './roles/slice';
import serviceReducer from './service/slice';
import appReducer from './app/slice';

const makeStore = () => configureStore({
  reducer: {
    menu: menuReducer,
    institute: instituteReducer,
    supply: supplyReducer,
    supply_items: supplyItemsReducer,
    event: eventReducer,
    sale: saleReducer,
    reward: rewardReducer,
    offer: offerReducer,
    app: appReducer,
    customer: customerReducer,
    user: userReducer,
    users: usersReducer,
    roles: rolesReducer,
    service: serviceReducer
  }
});

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export const wrapper = createWrapper<AppStore>(makeStore)