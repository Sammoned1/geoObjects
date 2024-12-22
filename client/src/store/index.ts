
import { configureStore } from "@reduxjs/toolkit";
import { pointReducer } from "./reducers/pointReducer";
import { mapReducer } from "./reducers/mapReducer";

export const appStore = configureStore({reducer: {
  points: pointReducer,
  map: mapReducer
}})

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch