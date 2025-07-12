import { createRouter } from "../lib/createRouter";
import { trapHandler } from "./handlers";
import { trapRoutesArray } from "./routes";

export const trapsRoute = createRouter();

trapRoutesArray.forEach((route, index) => {
  return trapsRoute.openapi(route, trapHandler);
});
