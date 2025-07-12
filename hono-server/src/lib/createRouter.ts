import { OpenAPIHono } from "@hono/zod-openapi";
import type { AppBindings } from "./types";

export const createRouter = () => {
  return new OpenAPIHono<AppBindings>({});
};
