import { configureStore } from "@reduxjs/toolkit";
import sessionState from "./session/sessionStore.ts";
import userState from "./user/userStore.ts"

export const store = configureStore({
  reducer: {
    session: sessionState,
    user: userState,
  },
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
