import { createRoute, z } from "@hono/zod-openapi";

export const trapRoutesArray = Array.from({ length: 100 }, (_, i) =>
  createRoute({
    method: "get",
    tags: ["traps"],

    path: `/trap${i}`,
    responses: {
      200: {
        content: {
          "text/plain": {
            schema: z.string(),
          },
        },
        description: `Trap route ${i}`,
      },
    },
  })
);

export type TrapRoute = (typeof trapRoutesArray)[0];
