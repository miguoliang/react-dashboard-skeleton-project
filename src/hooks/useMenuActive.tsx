import { useMemo } from "react";
import { NavigationTree } from "configs/navigation.config/apps.navigation.config";

function getRouteInfo(navTree: NavigationTree | NavigationTree[], key: string) {
  const isArray = Array.isArray(navTree);
  if (!isArray && navTree.key === key) {
    return navTree;
  } else if (!isArray && navTree.subMenu.length > 0) {
    const activeRoute = getRouteInfo(navTree.subMenu, key);
    if (activeRoute) {
      activeRoute.parentKey = navTree.key;
    }
  } else if (isArray) {
    let activeRoute: NavigationTree | undefined;
    for (const nav of navTree) {
      if (nav.key === key) {
        activeRoute = nav;
        break;
      } else {
        if (nav.subMenu.length > 0) {
          activeRoute = getRouteInfo(nav.subMenu, key);
          if (activeRoute) {
            if (!activeRoute.parentKey) {
              activeRoute.parentKey = nav.key;
            }
            break;
          }
        }
      }
    }
    return activeRoute;
  }
}

const findNestedRoute = (navTree: NavigationTree[], key: string): boolean => {
  const found = navTree.find((node) => {
    return node.key === key;
  });
  if (found) {
    return true;
  }
  return navTree.some((c) => findNestedRoute(c.subMenu, key));
};

const getTopRouteKey = (navTree: NavigationTree[], key: string) => {
  let foundNav: NavigationTree | undefined;
  navTree.forEach((nav) => {
    if (findNestedRoute([nav], key)) {
      foundNav = nav;
    }
  });
  return foundNav;
};

function useMenuActive(
  navTree: NavigationTree | NavigationTree[],
  key: string,
) {
  console.log("key", key);
  const activeRoute = useMemo(() => {
    if (key === "") {
      return;
    }
    return getRouteInfo(navTree, key);
  }, [navTree, key]);

  const includedRouteTree = useMemo(() => {
    return getTopRouteKey(Array.isArray(navTree) ? navTree : [navTree], key);
  }, [navTree, key]);

  return { activeRoute, includedRouteTree };
}

export default useMenuActive;
