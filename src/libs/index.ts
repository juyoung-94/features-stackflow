import {
  makeStore,
  useAppDispatch,
  useAppSelector,
  useAppStore,
  AppDispatch,
  AppStore,
  RootState,
} from "./store";
import appSlice, { AppResponse, AuthProvider } from "./slices/appSlice";
import userSlice, { UserInitialState } from "./slices/userSlice";
import modalSlice, { ModalinitialState } from "./slices/modalSlice";
import { Stack } from "./stackflow";
import navigationBarSlice from "./slices/navigationBarSlice";
import headerSlice from "./slices/headerSlice";

export {
  makeStore,
  useAppDispatch,
  useAppSelector,
  useAppStore,
  appSlice,
  userSlice,
  modalSlice,
  headerSlice,
  navigationBarSlice,
  Stack,
};
export type {
  AppDispatch,
  AppStore,
  RootState,
  AppResponse,
  UserInitialState,
  ModalinitialState,
  AuthProvider,
};
