// @ts-check
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import router from "./router.js";
import { NotFound } from "./views/404.js";
import { Index } from "./views/index.js";

const app = new Hono();

app.use("*", async (c, next) => {
  console.log(`[${c.req.method}]\t${c.req.path}`);
  await next();
});

app.use(
  "/public/*",
  serveStatic({
    root: ".",
  })
);
app.get("/", (c) => c.html(Index()));

app.notFound((c) => c.html(NotFound()));

router(app);

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
