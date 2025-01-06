import { ReactElement, useEffect, useState } from "react";

import { Frame } from "@/atoms";

import Button from "../Button";
import { colors } from "@/styles";
import { navigationBarSlice, useAppDispatch, useAppSelector } from "@/libs";
import Icon from "../Icon";
import { useAppRouter } from "@/hooks";
import { Routes, routes } from "@/routes";

const navigationBarList: {
  name: string;
  path: Routes;
  icon: ReactElement<typeof Icon>;
}[] = [
  {
    name: "Home",
    path: routes.Main,
    icon: <Icon type="solid" name={"square"} />,
  },
  {
    name: "navbarA",
    path: routes.NavbarA,
    icon: <Icon type="solid" name={"square"} />,
  },
  {
    name: "navbarB",
    path: routes.NavbarB,
    icon: <Icon type="solid" name={"square"} />,
  },
  {
    name: "navbarC",
    path: routes.NavbarC,
    icon: <Icon type="solid" name={"square"} />,
  },
];

export default function NavigationBar() {
  const pathname = location.pathname;
  const safeArea = useAppSelector((state) => state.app.response.safeArea);
  const router = useAppRouter();
  const dispatch = useAppDispatch();
  const { isNavigationBar, size } = useAppSelector(
    (state) => state.navigationBar
  );
  const [path, setPath] = useState("");
  const activityName = useAppSelector((state) => state.app.activityName);
  useEffect(() => {
    const visibilityChangeHandler = () => {
      if (typeof window !== "undefined") {
        if (
          navigationBarList.some((item) => item.path === routes[activityName])
        ) {
          dispatch(navigationBarSlice.actions.setIsNavigationBar(true));
          setPath(routes[activityName]);
        } else {
          dispatch(navigationBarSlice.actions.setIsNavigationBar(false));
        }
      }
    };
    visibilityChangeHandler();
  }, [pathname, dispatch, activityName]);

  return (
    <>
      {isNavigationBar && (
        <>
          <Frame w={"100%"} bg={safeArea.color.bottom} minH={size} h={size} />
          <Frame
            zIndex={9999}
            w={"100%"}
            m="auto"
            row
            position="fixed"
            left={0}
            h={size + safeArea.size.bottom}
            minH={size + safeArea.size.bottom}
            bottom={0}
          >
            <Frame
              row
              w={"100%"}
              h={size + safeArea.size.bottom}
              minH={size + safeArea.size.bottom}
              pb={safeArea.size.bottom}
              bg={colors.white}
              pt={1}
              stroke={{
                size: 1,
                perSide: ["top"],
                color: colors.neutral["200"],
              }}
            >
              {navigationBarList.map((item, index) => (
                <Button
                  key={index}
                  fontSize={"12px"}
                  fontWeight={"400"}
                  lineHeight={"22px"}
                  col
                  flex={1}
                  gap={4}
                  h={"100%"}
                  prefix={item.icon}
                  iconStyle={{
                    size: 28,
                    fill:
                      item.path !== path ? colors.neutral[200] : colors.black,
                  }}
                  onClick={() => {
                    if (item.path !== path) {
                      router.replace(item.path, {}, true);
                    }
                  }}
                  fontColor={colors.black}
                  activeStyle={{
                    opacity: 0.3,
                  }}
                  bg={colors.white}
                >
                  {`${item.name}`}
                </Button>
              ))}
            </Frame>
          </Frame>
        </>
      )}
    </>
  );
}
