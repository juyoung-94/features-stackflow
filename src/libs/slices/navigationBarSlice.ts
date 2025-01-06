import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NavigationBarInitialState = {
  isNavigationBar: boolean;
  size: number;
};

export const NavigationBarInitialState: NavigationBarInitialState = {
  isNavigationBar: true,
  size: 66,
};

const navigationBarSlice = createSlice({
  name: "navigationBar",
  initialState: NavigationBarInitialState,
  reducers: {
    setIsNavigationBar(
      state,
      action: PayloadAction<NavigationBarInitialState["isNavigationBar"]>
    ) {
      state.isNavigationBar = action.payload;
    },
  },
});

export default navigationBarSlice;
