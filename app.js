// @ts-check
/// <reference path="types.js" />

import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import router from "./router.js";
import { NotFound } from "./views/404.js";
import { AccessDenied } from "./views/access_denied.js";
import { Index } from "./views/index.js";
import { SessionTimeOut } from "./views/session_time_out.js";

/**
 * @type {App}
 */
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

// views for high level pages (i.e. not resources controlled by a controller)
app.get("/", (c) => c.html(Index(c)));
app.get("/access-denied", (c) => c.html(AccessDenied(c)));
app.get("/timeout", (c) => c.html(SessionTimeOut(c)));
app.notFound((c) => c.html(NotFound(c)));

// routes
router(app);

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
