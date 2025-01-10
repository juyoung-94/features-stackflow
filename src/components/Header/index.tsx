import React, { useMemo } from "react";

import { Frame } from "@/atoms";
import { colors, UseBorderStyleProps } from "@/styles";
import { useAppSelector } from "@/libs";
import useHeader from "./useHeader";
import { routes, Routes } from "@/routes";
import { useActivity } from "@stackflow/react";

const Header: React.FC = () => {
  const { size } = useAppSelector((state) => state.header);
  const safeArea = useAppSelector((state) => state.app.response.safeArea);
  const { title, icon } = useHeader();
  // const activityName = useAppSelector((state) => state.app.activityName);
  const activity = useActivity();

  const headerPropsMap: Partial<
    Record<
      Routes,
      {
        left?: React.ReactNode | React.ReactNode[];
        center?: React.ReactNode | React.ReactNode[];
        right?: React.ReactNode | React.ReactNode[];
        stroke?: UseBorderStyleProps["stroke"];
      }
    >
  > = useMemo(() => {
    return {
      "/": {
        left: "Main",
        stroke: {
          perSide: ["bottom"],
          size: 1,
          color: "#F0F0F0",
        },
      },
      "/navbarA/": {
        left: title.navbarATitle(),
        stroke: {
          perSide: ["bottom"],
          size: 1,
          color: "#F0F0F0",
        },
      },
      "/navbarB/": {
        left: title.navbarBTitle(),
        stroke: {
          perSide: ["bottom"],
          size: 1,
          color: "#F0F0F0",
        },
      },
      "/navbarC/": {
        left: title.navbarCTitle(),
        stroke: {
          perSide: ["bottom"],
          size: 1,
          color: "#F0F0F0",
        },
      },
      "/login/": {
        left: icon.backButton(),
      },
      "/detailA/": {
        left: [
          { ...icon.backButton(), key: "0" },
          { ...title.detailATitle(), key: "1" },
        ],
        stroke: {
          perSide: ["bottom"],
          size: 1,
          color: "#F0F0F0",
        },
      },
      "/detailA/:id/": {
        left: [
          { ...icon.backButton(), key: "0" },
          { ...title.detailADetailTitle(), key: "1" },
        ],
        stroke: {
          perSide: ["bottom"],
          size: 1,
          color: "#F0F0F0",
        },
      },
      "/detailB/": {
        left: [
          { ...icon.backButton(), key: "0" },
          { ...title.detailBTitle(), key: "1" },
        ],
        stroke: {
          perSide: ["bottom"],
          size: 1,
          color: "#F0F0F0",
        },
      },
    };
  }, [icon, title]);

  const headerProps = useMemo(
    () => headerPropsMap[routes[activity.name as keyof typeof routes]],
    [activity, headerPropsMap]
  );
  return (
    <>
      {headerProps && (
        <>
          <Frame w={"100%"} bg={safeArea.color.top} minH={size} h={size} />
          <Frame
            row
            bg={colors.white}
            position="fixed"
            top={0}
            left={0}
            w={"100%"}
            px={20}
            zIndex={99}
            gap={"auto"}
            alignment="center"
            pt={safeArea.size.top}
            h={size + safeArea.size.top}
            minH={size + safeArea.size.top}
            stroke={headerProps?.stroke as UseBorderStyleProps["stroke"]}
          >
            <Frame row h={"100%"} alignment="center" gap={16} zIndex={100}>
              {headerProps?.left}
            </Frame>
            <Frame
              w={"100%"}
              h={"100%"}
              pt={safeArea.size.top}
              alignment="center"
              position={"absolute"}
              inset={0}
              zIndex={99}
            >
              {headerProps?.center}
            </Frame>
            <Frame row h={"100%"} alignment="center" gap={10} zIndex={100}>
              {headerProps?.right}
            </Frame>
          </Frame>
        </>
      )}
    </>
  );
};

export default Header;
