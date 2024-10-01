//@ts-check
import { html } from "hono/html";
import { DefaultButton } from "../templates/partials/buttons.js";

/**
 * @typedef {import("hono").Context} context
 */

/**
 * @param {context} context
 */
const Header = (context) => {
  //prettier-ignore
  return html
    `<header>
      <div class="container horizontal-center">
        <div class="row">
        <div class="title"><a href="/">MVC Library</a></div>
        ${DefaultButton({ href: "/signin", text: context.get("session") ? "Profile" : "Sign in" })}
        </div>
      </div>
    </header>`;
};

export { Header };
