// @ts-check
/// <reference path="../types.js" />

import { html } from "hono/html";
import { Base } from "./layout/base.js";

/**
 * Not found page
 *
 * @param {Context} context
 */
const NotFound = (context) => {
  // prettier-ignore
  return Base(context,html`
    <div slot="content">
      <h2>Sorry! That page doesn't exist</h2>
    </div>
  `);
};

export { NotFound };
