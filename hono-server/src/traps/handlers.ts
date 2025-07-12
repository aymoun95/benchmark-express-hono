import type { AppRouteHandler } from "../lib/types";
import type { TrapRoute } from "./routes";

export const trapHandler: AppRouteHandler<TrapRoute> = (c) =>
  c.text("Hello World");
