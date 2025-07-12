import { swaggerUI } from "@hono/swagger-ui";

import { pinoLogger } from "hono-pino";
import pino from "pino";
import { itemsRoute } from "./items";
import { createRouter } from "./lib/createRouter";
import "./lib/db";
import { trapsRoute } from "./traps";

const app = createRouter();

app.use(
  pinoLogger({
    pino: pino({
      base: null,
      level: "info",
      transport: {
        target: "hono-pino/debug-log",
      },
      timestamp: pino.stdTimeFunctions.unixTime, // hh:mm:ss
    }),
  })
);
app.route("/", trapsRoute);
app.route("/api", itemsRoute);

app.onError((err, c) => {
  console.error(err);
  return c.json("Internal Server Error", 500);
});
// The OpenAPI documentation will be available at /doc
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

app.get("/ui", swaggerUI({ url: "/doc" }));

export default app;
