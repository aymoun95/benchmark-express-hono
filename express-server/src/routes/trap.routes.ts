import { Router } from "express";

const trapRoutes = Router();

// trap routes
for (let i = 0; i < 100; i++) {
  trapRoutes.get(`/trap${i}`, (_, res) => {
    res.send("Hello World");
  });
}

export default trapRoutes;
