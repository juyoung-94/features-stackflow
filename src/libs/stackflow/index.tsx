import { stackflow } from "@stackflow/react";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import {
  DetailA,
  DetailB,
  Login,
  Main,
  NavbarA,
  NavbarB,
  NavbarC,
} from "@/activities";
import DetailADetail from "@/activities/DetailA/Detail";
import { routes } from "@/routes";

export const { Stack, useFlow, activities } = stackflow({
  transitionDuration: 350,
  activities: {
    Main,
    Login,
    NavbarA,
    NavbarB,
    NavbarC,
    DetailA,
    DetailB,
    DetailADetail,
  },
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: "cupertino",
    }),
    historySyncPlugin({
      routes: routes,
      fallbackActivity: () => "Main",
    }),
  ],
  initialActivity: () => "Main",
});
