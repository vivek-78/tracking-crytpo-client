import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import WatchListSlice from "./WatchListSlice";
import authTokenSlice from "./authTokenSlice";

const reducers = combineReducers({
  WatchList: WatchListSlice,
  AuthToken: authTokenSlice
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
    reducer: persistedReducer,
  })

export const persistor = persistStore(store)