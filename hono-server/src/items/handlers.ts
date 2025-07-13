import db from "../lib/db";
import type { AppRouteHandler } from "../lib/types";
import type {
  DeleteItemRoute,
  GetItemRoute,
  PostItemRoute,
  PutItemRoute,
} from "./routes";
import type { Item } from "./schema";

export const postItemHandler: AppRouteHandler<PostItemRoute> = (c) => {
  const { name } = c.req.valid("json");

  const info = db.prepare("INSERT INTO items (name) VALUES (?)").run(name);
  const newItem = db
    .prepare("SELECT id, name FROM items WHERE id = ?")
    .get(info.lastInsertRowid);
  return c.json(newItem as Item, 201);
};

export const getItemHandler: AppRouteHandler<GetItemRoute> = (c) => {
  const { id } = c.req.valid("param");

  const row = db.prepare("SELECT id, name FROM items WHERE id = ?").get(id);
  if (row) {
    return c.json(row as Item, 200);
  }

  return c.json({ error: "Item not found" }, 404);
};

export const putItemHandler: AppRouteHandler<PutItemRoute> = (c) => {
  const { id } = c.req.valid("param");
  const { name } = c.req.valid("json");

  const info = db
    .prepare("UPDATE items SET name = ? WHERE id = ?")
    .run(name, id);

  if (info.changes === 0) {
    return c.json({ error: "Item not found" }, 404);
  }
  const updatedItem = db
    .prepare("SELECT id, name FROM items WHERE id = ?")
    .get(id);
  return c.json(updatedItem as Item, 200);
};

export const deleteItemHandler: AppRouteHandler<DeleteItemRoute> = (c) => {
  const { id } = c.req.valid("param");

  const info = db.prepare("DELETE FROM items WHERE id = ?").run(id);
  if (info.changes === 0) {
    return c.json({ error: "Item not found" }, 404);
  }
  return c.body(null, 204);
};
