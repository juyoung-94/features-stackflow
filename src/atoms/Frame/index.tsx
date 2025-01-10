import { forwardRef, HTMLAttributes, ReactNode } from "react";

import useFrame, { UseFrameProps } from "./useFrame";
import { colors } from "@/styles";
import { useAppSelector } from "@/libs";
import Header from "@/components/Header";
import { NavigationBar } from "@/components";

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
    const { safeArea } = useAppSelector((state) => state.app.response);
    const { getStyle } = useFrame({
      w: w ?? "100%",
      h: h ?? "100%",
      overflow: overflow || "y-scroll",
      col: row ? false : col,
      row: row,
      flex: 1,
      bg: bg || colors.white,
      position: "relative",
      pt: safeArea.size.top,
      pb: safeArea.size.bottom,
      ...props,
    });

    return (
      <div onClick={onClick} ref={ref} style={getStyle}>
        {/* <Frame
          w={"100%"}
          h={safeArea.size.top}
          minH={safeArea.size.top}
          bg={safeArea.color.top}
          zIndex={999}
        /> */}
        <Header />

        <Frame w={"100%"} flex={1}>
          {children}
        </Frame>

        <NavigationBar />
        {/* <Frame
          w={"100%"}
          h={safeArea.size.bottom}
          minH={safeArea.size.bottom}
          bg={safeArea.color.bottom}
          zIndex={999}
        /> */}
      </div>
    );
  }
);
FrameScreen.displayName = "Hingoray.FrameScreen";
Frame.displayName = "Hingoray.Frame";

export default Frame;
