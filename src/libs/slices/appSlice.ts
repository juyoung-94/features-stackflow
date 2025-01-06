import { routes } from "@/routes";
import { colors } from "@/styles";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const AuthProvider = {
  apple: "apple",
  google: "google",
  facebook: "facebook",
  kakao: "kakao",
  naver: "naver",
  email: "email",
} as const;

export type AuthProvider = (typeof AuthProvider)[keyof typeof AuthProvider];

type SafeAreaProps = {
  size: {
    top: number;
    bottom: number;
  };
  color: {
    top: string;
    bottom: string;
  };
};
type AppTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AppResponse = {
  appName: string;
  safeArea: SafeAreaProps;
  splashScreen: boolean;
  fromApp: boolean;
  tokens: AppTokens;
  files: string[];
};

type AppInitialState = {
  response: AppResponse;
  activityName: keyof typeof routes;
};

export const appInitialState: AppInitialState = {
  response: {
    appName: "MYAPP", //TODO: env set
    fromApp: false,
    safeArea: {
      size: {
        top: 0,
        bottom: 0,
      },
      color: {
        top: colors.white,
        bottom: colors.white,
      },
    },
    splashScreen: true,
    tokens: {
      refreshToken: "",
      accessToken: "",
    },
    files: [],
  },
  activityName: "Main",
};

const appSlice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    onFromApp(state) {
      state.response.fromApp = true;
    },
    setSplashScreen(
      state,
      action: PayloadAction<AppInitialState["response"]["splashScreen"]>
    ) {
      state.response.splashScreen = action.payload;
    },
    onInvisiableSplashScreen(state) {
      state.response.splashScreen = false;
      // @ts-ignore
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          splashScreen: false,
        })
      );
    },
    setSafeAreaSize(state, action: PayloadAction<SafeAreaProps["size"]>) {
      state.response.safeArea.size = action.payload;
    },
    setSafeAreaColor(state, action: PayloadAction<SafeAreaProps["color"]>) {
      state.response.safeArea.color = action.payload;
    },
    setAuthTokens(state, action: PayloadAction<AppResponse["tokens"]>) {
      state.response.tokens = action.payload;
    },
    setFiles(state, action: PayloadAction<AppResponse["files"]>) {
      state.response.files = action.payload;
    },
    setActivityName(
      state,
      action: PayloadAction<AppInitialState["activityName"]>
    ) {
      state.activityName = action.payload;
    },
  },
});

export default appSlice;
