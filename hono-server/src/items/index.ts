import { createRouter } from "../lib/createRouter";
import * as handlers from "./handlers";
import * as routes from "./routes";

export const itemsRoute = createRouter();

itemsRoute.openapi(routes.getItemRoute, handlers.getItemHandler);
itemsRoute.openapi(routes.postItemRoute, handlers.postItemHandler);
itemsRoute.openapi(routes.putItemRoute, handlers.putItemHandler);
itemsRoute.openapi(routes.deleteItemRoute, handlers.deleteItemHandler);
