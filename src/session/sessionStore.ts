import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SessionStore {
  bearer: string;
  active: boolean;
  roles: string[];
}

const initialState: SessionStore = {
  bearer: "",
  active: false,
  roles: [],
};



const sessionState = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<SessionStore>) => {
      state.bearer = action.payload.bearer;
      state.active = true;
      state.roles = action.payload.roles;
    },
    logout: (state) => {
      state.bearer = "";
      state.active = false;
      state.roles = [];
    },
  },
});

export const { login, logout } = sessionState.actions;
export default sessionState.reducer;
