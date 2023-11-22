import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { userSlice } from "./user/userSlice.js";

const userPersistConfig = {
  key: "user",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userSlice.reducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
