import { useAppSelector } from "@/libs";
import { useFlow } from "@/libs/stackflow";
import { RootStackParamList, routeMap, routes, Routes } from "@/routes";

const useAppRouter = () => {
  const { fromApp } = useAppSelector((state) => state.app.response);
  const router = useFlow();

  async function push<Name extends keyof typeof routes>(
    name: Routes,
    params: RootStackParamList[Name]
  ) {
    const route = routeMap.get(name);
    if (fromApp) {
      router.push(route, params, { animate: true });
    } else {
      router.push(route, params, { animate: false });
    }
  }
  const pop = () => {
    if (fromApp) {
      router.pop();
    } else {
      router.pop({ animate: false });
    }
  };
  function replace<Name extends keyof typeof routes>(
    name: Routes,
    params: RootStackParamList[Name],
    isNavigationBar: boolean = false
  ) {
    const route = routeMap.get(name);
    if (fromApp) {
      if (isNavigationBar) {
        router.replace(route, params, { animate: false });
      } else {
        router.replace(route, params, { animate: true });
      }
    } else {
      router.replace(route, params, { animate: false });
    }
  }
  return {
    push,
    pop,
    replace,
  };
};

export default useAppRouter;
