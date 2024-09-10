import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authUserInfo from "./slices/auth.slice";
import { stateQueryApi } from "./slices/fetch-all-queries.slice";

const rootReducer = combineReducers({
  [stateQueryApi.reducerPath]: stateQueryApi.reducer,
  auth: authUserInfo,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stateQueryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
