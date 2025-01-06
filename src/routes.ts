export const routes = {
  Main: "/",
  NavbarA: "/navbarA/",
  NavbarB: "/navbarB/",
  NavbarC: "/navbarC/",
  Login: "/login/",
  DetailA: "/detailA/",
  DetailADetail: "/detailA/:id/",
  DetailB: "/detailB/",
} as const;

export type Routes = (typeof routes)[keyof typeof routes];

export type RootStackParamList = {
  Main: {};
  NavbarA: {};
  NavbarB: {};
  NavbarC: {};
  Login: {};
  DetailA: {};
  DetailADetail: { id: number };
  DetailB: {};
};

export const routeMap = Object.entries(routes).reduce((acc, [key, value]) => {
  // @ts-ignore
  acc.set(value, key);
  return acc;
}, new Map<Routes, keyof typeof routes>());
