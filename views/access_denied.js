// @ts-check
/// <reference path="../types.js" />

import { html } from "hono/html";
import { Base } from "./layout/base.js";

/**
 * @param {Context} context
 */
const AccessDenied = (context) => {
  return Base(
    context,
    //prettier-ignore
    html`
      <div class="callout">
        <h2>Access denied</h2>
        <p>You don't have access to this page, please contact an administrator</p>
        <p><a href="/">Home</a></p>
      </div>
    `
  );
};

export { AccessDenied };
