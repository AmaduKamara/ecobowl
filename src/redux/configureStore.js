import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { userReducer } from "./user/user";

const reducer = combineReducers({
  userReducer,
});

const store = configureStore({ reducer }, applyMiddleware(logger, thunk));

export default store;
