//@ts-check
import { html } from "hono/html";
import { Header } from "./header.js";

/**
 *
 * @param {ReturnType<import("hono/html").html>} content the content to be rendered
 */
const Base = (content) => {
  //prettier-ignore
  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Library</title>
        <link rel="stylesheet" href="/public/style.css" />
      </head>
      <body class="stack">
        ${Header()}
        <main class="stack">
          <div class="stack horizontal-center">
            ${content}
          </div>
        </main>
      </body>
    </html>`;
};

export { Base };
