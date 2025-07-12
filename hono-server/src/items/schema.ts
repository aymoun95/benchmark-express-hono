import { z } from "@hono/zod-openapi";

export const ParamsSchema = z
  .object({
    id: z.string().openapi({
      type: "string",
      param: {
        name: "id",
        in: "path",
      },
      example: "1",
      description: "The item ID",
    }),
  })
  .openapi("Param ID");

export const ItemSchema = z
  .object({
    id: z.number().openapi({
      type: "number",
      example: 1,
      description: "Item ID",
    }),
    name: z.string().openapi({
      type: "string",
      example: "item 1",
      description: "Item name",
    }),
  })
  .openapi("Item");

export type Item = z.infer<typeof ItemSchema>;
