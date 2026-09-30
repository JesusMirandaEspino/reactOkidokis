import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserStore {
    email: string;
    id: number;
    tasks: [];
    username: string;
}

const initialState: UserStore = {
    email: "",
    id: 0,
    tasks: [],
    username: "",
};

const userState = createSlice({
  name: "user",
  initialState,
  reducers: {
    start: (state, action: PayloadAction<UserStore>) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.tasks = action.payload.tasks;
      state.username = action.payload.usernamek;
    },
    end: (state) => {
        state.email = "";
        state.id = 0;
        state.tasks =  [];
        state.username =  "";
    },
  },
});

export const { start, end } = userState.actions;
export default userState.reducer;
