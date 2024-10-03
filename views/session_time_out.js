// @ts-check
/// <reference path="../types.js" />

import { html } from "hono/html";
import { Base } from "./layout/base.js";

/**
 * @param {Context} context
 */
const SessionTimeOut = (context) => {
  const query = context.req.query("redirect");
  const redirect = query ? `?redirect=${encodeURIComponent(query)}` : "";
  return Base(
    context,
    //prettier-ignore
    html`
      <div class="callout">
        <h2>Session timed out</h2>
        <p>It looks like your session has timed out. <a href="/signin${redirect}">Signin</a> again or <a href="${(query || "/")}">continue browsing</a></p>
      </div>
    `
  );
};

export { SessionTimeOut };
