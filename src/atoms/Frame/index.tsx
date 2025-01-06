import { forwardRef, HTMLAttributes, ReactNode, useEffect } from "react";

import useFrame, { UseFrameProps } from "./useFrame";
import { colors } from "@/styles";
import { appSlice, useAppDispatch, useAppSelector } from "@/libs";
import { useActivity } from "@stackflow/react";
import { routes } from "@/routes";

export interface FrameProps
  extends UseFrameProps,
    Pick<HTMLAttributes<HTMLDivElement>, "onClick"> {
  children?: ReactNode;
}

const Frame = forwardRef<HTMLDivElement, FrameProps>(
  ({ children, row, col = true, onClick, ...props }, ref) => {
    const { getStyle } = useFrame({
      w: "fit-content",
      h: "fit-content",
      col: row ? false : col,
      row: row,
      position: "relative",
      ...props,
    });
    return (
      <div onClick={onClick} ref={ref} style={getStyle}>
        {children}
      </div>
    );
  }
);

export const FrameScreen = forwardRef<HTMLDivElement, FrameProps>(
  (
    { children, row, w, h, overflow, bg, col = true, onClick, ...props },
    ref
  ) => {
    const { isNavigationBar, size: navigationBarSize } = useAppSelector(
      (state) => state.navigationBar
    );
    const { isHeader, size: headerSize } = useAppSelector(
      (state) => state.header
    );
    const dispatch = useAppDispatch();
    const activity = useActivity();

    const { safeArea } = useAppSelector((state) => state.app.response);
    const { getStyle } = useFrame({
      w: w ?? "100%",
      h: h ?? "100%",
      overflow: overflow || "y-scroll",
      col: row ? false : col,
      row: row,
      bg: bg || colors.white,
      position: "relative",
      ...props,
    });

    useEffect(() => {
      dispatch(
        appSlice.actions.setActivityName(activity.name as keyof typeof routes)
      );
    }, [activity, dispatch]);
    return (
      <div onClick={onClick} ref={ref} style={getStyle}>
        <Frame
          w={"100%"}
          h={safeArea.size.top}
          minH={safeArea.size.top}
          bg={safeArea.color.top}
          zIndex={999}
        />
        {isHeader && (
          <Frame
            w={"100%"}
            bg={safeArea.color.top}
            minH={headerSize}
            h={headerSize}
          />
        )}
        <Frame w={"100%"} flex={1}>
          {children}
        </Frame>
        {isNavigationBar && (
          <Frame
            w={"100%"}
            bg={safeArea.color.bottom}
            minH={navigationBarSize}
            h={navigationBarSize}
          />
        )}
        <Frame
          w={"100%"}
          h={safeArea.size.bottom}
          minH={safeArea.size.bottom}
          bg={safeArea.color.bottom}
          zIndex={999}
        />
      </div>
    );
  }
);
FrameScreen.displayName = "Hingoray.FrameScreen";
Frame.displayName = "Hingoray.Frame";

export default Frame;
