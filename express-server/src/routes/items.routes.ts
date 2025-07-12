import { Router } from "express";
import db from "../db";
import { idParamSchema, nameBodySchema } from "../schema";

const itemsRoutes = Router();

itemsRoutes.post("/items", (req, res) => {
  const bodyParse = nameBodySchema.safeParse(req.body);
  if (!bodyParse.success) {
    return res.status(400).json({ error: "Invalid body: name is required" });
  }
  const info = db
    .prepare("INSERT INTO items (name) VALUES (?)")
    .run(bodyParse.data.name);
  const newItem = db
    .prepare("SELECT id, name FROM items WHERE id = ?")
    .get(info.lastInsertRowid);
  res.status(201).json(newItem);
});

itemsRoutes.get("/items/:id", (req, res) => {
  const paramsParse = idParamSchema.safeParse(req.params);
  if (!paramsParse.success) {
    return res.status(400).json({ error: "Invalid id parameter" });
  }

  const { id } = paramsParse.data;
  const row = db.prepare("SELECT id, name FROM items WHERE id = ?").get(id);
  if (row) res.json(row);
  else res.status(404).json({ error: "Item not found" });
});

itemsRoutes.put("/items/:id", (req, res) => {
  const paramsParse = idParamSchema.safeParse(req.params);
  if (!paramsParse.success) {
    return res.status(400).json({ error: "Invalid id parameter" });
  }

  const bodyParse = nameBodySchema.safeParse(req.body);
  if (!bodyParse.success) {
    return res.status(400).json({ error: "Invalid body: name is required" });
  }

  const { id } = paramsParse.data;
  const { name } = bodyParse.data;

  const info = db
    .prepare("UPDATE items SET name = ? WHERE id = ?")
    .run(name, id);

  if (info.changes === 0) {
    return res.status(404).json({ error: "Item not found" });
  }
  const updatedItem = db
    .prepare("SELECT id, name FROM items WHERE id = ?")
    .get(req.params.id);

  res.json(updatedItem);
});

itemsRoutes.delete("/items/:id", (req, res) => {
  const paramsParse = idParamSchema.safeParse(req.params);
  if (!paramsParse.success) {
    return res.status(400).json({ error: "Invalid id parameter" });
  }
  const { id } = paramsParse.data;
  const info = db.prepare("DELETE FROM items WHERE id = ?").run(id);
  if (info.changes === 0)
    return res.status(404).json({ error: "Item not found" });
  res.status(204).send();
});

export default itemsRoutes;
