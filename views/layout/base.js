// @ts-check
/// <reference path="../../types.js" />

import { html } from "hono/html";
import { Header } from "./header.js";

/**
 * Base template
 *
 * @param {Context} context
 * @param {ReturnType<import("hono/html").html>} content the content to be rendered
 */
const Base = (context, content) => {
  //prettier-ignore
  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Library</title>
        <link rel="stylesheet" href="/public/style.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charset="UTF-8" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>">
      </head>
      <body class="stack">
        ${Header(context)}
        <main class="stack">
          <div class="stack horizontal-center">
            ${content}
          </div>
        </main>
      </body>
    </html>`;
};

export { Base };
