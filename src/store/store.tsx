"use client";

import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import musicReducer from "../utils/musicSlice";
import playlistReducer from "../utils/playlistSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  music: musicReducer,
  playlists: playlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
