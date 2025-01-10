import { Suspense, useEffect } from "react";
import { appSlice, Stack, useAppDispatch, useAppSelector } from "./libs";
import RenderModal from "./RenderModal";

function App() {
  const dispatch = useAppDispatch();
  const { appName, tokens, fromApp, splashScreen } = useAppSelector(
    (state) => state.app.response
  );
  useEffect(() => {
    if (typeof window !== "undefined") {
      const appHandler = async (e: Event) => {
        try {
          // @ts-ignore
          const data: AppResponse = JSON.parse(e.data);
          if (data.appName === appName) {
            // alert(JSON.stringify(data, null, 2));
            dispatch(appSlice.actions.onFromApp());
            dispatch(appSlice.actions.setSafeAreaSize(data.safeArea.size));
            dispatch(appSlice.actions.setSplashScreen(data.splashScreen));
            dispatch(appSlice.actions.setAuthTokens(data.tokens));
          }
          if (data.files) {
            dispatch(appSlice.actions.setFiles(data.files));
          }
        } catch (error) {
          console.log("error===", JSON.stringify(error, null, 2));
        }
      };

      // ios
      window.addEventListener("message", (e) => appHandler(e));
      // android
      window.document.addEventListener("message", (e) => appHandler(e));

      return () => {
        //clear
        window.removeEventListener("message", (e) => appHandler(e));
        window.document.removeEventListener("message", (e) => appHandler(e));
      };
    }
  }, []);

  useEffect(() => {
    if (tokens.refreshToken) {
      // getUserHandler();
    }
  }, [tokens]);

  useEffect(() => {
    if (fromApp && splashScreen) {
      dispatch(appSlice.actions.onInvisiableSplashScreen());
    }
  }, [splashScreen, fromApp, dispatch]);

  useEffect(() => {
    if (fromApp && !splashScreen) {
      // @ts-ignore
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          loading: false,
        })
      );
    }
  }, [splashScreen, fromApp]);

  return (
    <Suspense>
      <Stack />
      <RenderModal />
    </Suspense>
  );
}

export default App;
