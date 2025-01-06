import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type HeaderinitialState = {
  isHeader: boolean;
  size: number;
};

export const headerinitialState: HeaderinitialState = {
  isHeader: true,
  size: 44,
};

const headerSlice = createSlice({
  name: "header",
  initialState: headerinitialState,
  reducers: {
    setIsHeader(state, action: PayloadAction<HeaderinitialState["isHeader"]>) {
      state.isHeader = action.payload;
    },
  },
});

export default headerSlice;
