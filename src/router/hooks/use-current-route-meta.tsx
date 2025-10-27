import { isEmpty } from "ramda";
import { useEffect, useState } from "react";
import { type Params, useMatches, useOutlet } from "react-router";

import { useFlattenedRoutes } from "./use-flattened-routes";
import { useRouter } from "./use-router";

import type { RouteMeta } from "#/router";

const { VITE_APP_ADMIN: HOMEPAGE } = import.meta.env;

export function useCurrentRouteMeta() {
  const { push } = useRouter();

  const children = useOutlet();

  const matchs = useMatches();

  const flattenedRoutes = useFlattenedRoutes();

  const [currentRouteMeta, setCurrentRouteMeta] = useState<RouteMeta>();

  useEffect(() => {
    const lastRoute = matchs.at(-1);
    if (!lastRoute) return;

    const { pathname, params } = lastRoute;
    const matchedRouteMeta = flattenedRoutes.find((item) => {
      const replacedKey = replaceDynamicParams(item.key, params);
      return replacedKey === pathname || `${replacedKey}/` === pathname;
    });

    if (matchedRouteMeta) {
      matchedRouteMeta.outlet = children;
      if (!isEmpty(params)) {
        matchedRouteMeta.params = params;
      }
      setCurrentRouteMeta({ ...matchedRouteMeta });
    } else {
      push(HOMEPAGE);
    }
  }, [matchs]);

  return currentRouteMeta;
}

export const replaceDynamicParams = (
  menuKey: string,
  params: Params<string>
) => {
  let replacedPathName = menuKey;
  const paramNames = menuKey.match(/:\w+/g);

  if (paramNames) {
    for (const paramName of paramNames) {
      const paramKey = paramName.slice(1);
      if (!params[paramKey]) continue;

      replacedPathName = replacedPathName.replace(paramName, params[paramKey]);
    }
  }

  return replacedPathName;
};
