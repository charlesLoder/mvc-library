// @ts-check
import { html } from "hono/html";
import { Base } from "./layout/base.js";

const NotFound = () => {
  // prettier-ignore
  return Base(html`
    <div slot="content">
      <h2>Sorry! That page doesn't exist</h2>
    </div>
  `);
};

export { NotFound };
