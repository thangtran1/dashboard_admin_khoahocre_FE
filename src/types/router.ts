import type { ReactNode } from "react";
import type { Params, RouteObject } from "react-router";

export interface RouteMeta {
  key: string;
  label: string;
  icon?: ReactNode;
  info?: ReactNode;
  hideMenu?: boolean;
  hideTab?: boolean;
  disabled?: boolean;
  outlet?: ReactNode;
  timeStamp?: string;
  frameSrc?: URL;
  params?: Params<string>;
}
export type AppRouteObject = {
  order?: number;
  meta?: RouteMeta;
  children?: AppRouteObject[];
} & Omit<RouteObject, "children">;
