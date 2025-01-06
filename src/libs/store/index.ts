import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import appSlice from "../slices/appSlice";
import userSlice from "../slices/userSlice";
import modalSlice from "../slices/modalSlice";
import headerSlice from "../slices/headerSlice";
import navigationBarSlice from "../slices/navigationBarSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appSlice.reducer,
      user: userSlice.reducer,
      modal: modalSlice.reducer,
      header: headerSlice.reducer,
      navigationBar: navigationBarSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
