import { createRoute } from "@hono/zod-openapi";
import { ItemSchema, ParamsSchema } from "./schema";

export const postItemRoute = createRoute({
  method: "post",
  tags: ["items"],
  path: "/items",
  request: {
    body: {
      content: {
        "application/json": {
          schema: ItemSchema.omit({ id: true }),
        },
      },
      description: "Create a new item",
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: ItemSchema,
        },
      },
      description: "Add the item by id",
    },
  },
});

export type PostItemRoute = typeof postItemRoute;

export const getItemRoute = createRoute({
  method: "get",
  tags: ["items"],
  path: "/items/{id}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ItemSchema,
        },
      },
      description: "Retrieve the item by id",
    },
  },
});

export type GetItemRoute = typeof getItemRoute;

export const putItemRoute = createRoute({
  method: "put",
  tags: ["items"],
  path: "/items/{id}",
  request: {
    params: ParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: ItemSchema.omit({ id: true }),
        },
      },
      description: "Update a new item",
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ItemSchema,
        },
      },
      description: "Update the item by id",
    },
  },
});

export type PutItemRoute = typeof putItemRoute;

export const deleteItemRoute = createRoute({
  method: "delete",
  tags: ["items"],
  path: "/items/{id}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    204: {
      description: "Delete the item by id",
    },
  },
});

export type DeleteItemRoute = typeof deleteItemRoute;
