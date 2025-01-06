import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserInitialState = {
  info: {
    id: number;
    profile: {} | null;
  };
  pending: {
    login: boolean;
    getInfo: boolean;
  };
};

export const userInitialState: UserInitialState = {
  info: {
    id: 0,
    profile: null,
  },
  pending: {
    login: false,
    getInfo: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setInfo(state, action: PayloadAction<UserInitialState["info"]>) {
      state.info = action.payload;
    },
  },
});

export default userSlice;
