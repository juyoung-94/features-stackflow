import { ReactElement, useEffect, useMemo, useState } from "react";

import { Frame } from "@/atoms";

import { colors } from "@/styles";
import { useAppSelector } from "@/libs";
import Icon from "../Icon";
import { useAppRouter } from "@/hooks";
import { routes, Routes } from "@/routes";
import { useActivity } from "@stackflow/react";
import Button from "../Button";

const navigationBarList: {
  name: string;
  path: Routes;
  icon: ReactElement<typeof Icon>;
}[] = [
  {
    name: "Home",
    path: "/",
    icon: <Icon type="solid" name={"square"} />,
  },
  {
    name: "navbarA",
    path: "/navbarA/",
    icon: <Icon type="solid" name={"square"} />,
  },
  {
    name: "navbarB",
    path: "/navbarB/",
    icon: <Icon type="solid" name={"square"} />,
  },
  {
    name: "navbarC",
    path: "/navbarC/",
    icon: <Icon type="solid" name={"square"} />,
  },
];

export default function NavigationBar() {
  const safeArea = useAppSelector((state) => state.app.response.safeArea);
  const { size } = useAppSelector((state) => state.navigationBar);
  const [isNavigationBar, setIsNavigationBar] = useState(true);
  const activity = useActivity();
  const router = useAppRouter();

  useEffect(() => {
    if (
      navigationBarList.some(
        (v) => v.path === routes[activity.name as keyof typeof routes]
      )
    ) {
      setIsNavigationBar(true);
    } else {
      setIsNavigationBar(false);
    }
  }, [activity]);

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
                      item.path !== routes[activity.name as keyof typeof routes]
                        ? colors.neutral[200]
                        : colors.black,
                  }}
                  onClick={() => {
                    if (
                      item.path !== routes[activity.name as keyof typeof routes]
                    ) {
                      router.push(item.path, {});
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
