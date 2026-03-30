import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./slices/habitsSlice";

export const store = configureStore({
  reducer: {
    habits: habitsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;