import Database from "better-sqlite3";

const db = new Database("data.db");

// Drop and recreate the 'items' table
db.exec(`
  DROP TABLE IF EXISTS items;
  CREATE TABLE items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );
`);

// Generate 100 random items
const insert = db.prepare("INSERT INTO items (name) VALUES (?)");
const getRandomName = () =>
  `Item_${Math.random().toString(36).substring(2, 10)}`;

const insertMany = db.transaction(() => {
  for (let i = 0; i < 100; i++) {
    insert.run(getRandomName());
  }
});

insertMany();

export default db;
