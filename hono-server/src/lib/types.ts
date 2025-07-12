import type { RouteConfig, RouteHandler } from "@hono/zod-openapi";

export interface AppBindings {
  Variables: {};
}

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
