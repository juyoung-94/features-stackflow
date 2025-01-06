import React, { useEffect, useMemo, useState } from "react";

import { Frame } from "@/atoms";
import { colors, UseBorderStyleProps } from "@/styles";
import { headerSlice, useAppDispatch, useAppSelector } from "@/libs";
import useHeader from "./useHeader";
import { routes, Routes } from "@/routes";

const Header: React.FC = () => {
  const { isHeader, size } = useAppSelector((state) => state.header);
  const dispatch = useAppDispatch();
  const pathname = location.pathname;
  const safeArea = useAppSelector((state) => state.app.response.safeArea);
  const [path, setPath] = useState<Routes>(routes.Main);
  const { title, icon } = useHeader();
  const activityName = useAppSelector((state) => state.app.activityName);

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

  useEffect(() => {
    const visibilityChangeHandler = () => {
      try {
        if (typeof window !== "undefined") {
          if (
            Object.keys(headerPropsMap).some(
              (key) => key === routes[activityName]
            )
          ) {
            dispatch(
              headerSlice.actions.setIsHeader(
                headerPropsMap[routes[activityName]] ? true : false
              )
            );
            setPath(routes[activityName]);
          } else {
            dispatch(headerSlice.actions.setIsHeader(false));
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    visibilityChangeHandler();
  }, [pathname, headerPropsMap, activityName, dispatch]);
  return (
    <>
      {isHeader && (
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
            zIndex={9999}
            gap={"auto"}
            alignment="center"
            pt={safeArea.size.top}
            h={size + safeArea.size.top}
            minH={size + safeArea.size.top}
            stroke={
              headerPropsMap[path]?.stroke as UseBorderStyleProps["stroke"]
            }
          >
            <Frame row h={"100%"} alignment="center" gap={16} zIndex={100}>
              {headerPropsMap[path]?.left}
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
              {headerPropsMap[path]?.center}
            </Frame>
            <Frame row h={"100%"} alignment="center" gap={10} zIndex={100}>
              {headerPropsMap[path]?.right}
            </Frame>
          </Frame>
        </>
      )}
    </>
  );
};

export default Header;
