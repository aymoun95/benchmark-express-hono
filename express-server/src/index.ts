import express from "express";
import "./db";
import itemsRoutes from "./routes/items.routes";
import trapRoutes from "./routes/trap.routes";

const app = express();
app.use(express.json());

app.use("/", trapRoutes);
app.use("/api", itemsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
