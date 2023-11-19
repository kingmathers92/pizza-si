import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { userSlice } from "./user/userSlice.js";
import { cartSlice } from "./cart/cartSlice.js";

const userPersistConfig = {
  key: "user",
  version: 1,
  storage,
  whitelist: ["user"],
};

const cartPersistConfig = {
  key: "cart",
  version: 1,
  storage,
  whitelist: ["cart"],
};

const persistedReducer = combineReducers({
  user: persistReducer(userPersistConfig, userSlice.reducer),
  cart: persistReducer(cartPersistConfig, cartSlice.reducer),
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
