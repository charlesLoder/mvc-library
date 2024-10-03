// @ts-check
/// <reference path="../../types.js" />

import { html } from "hono/html";
import { BaseButton } from "../templates/partials/buttons.js";

/**
 * Header template
 *
 * @param {Context} context
 */
const Header = (context) => {
  //prettier-ignore
  return html
    `<header>
      <div class="container horizontal-center">
        <div class="row">
        <div class="title"><a href="/">MVC Library</a></div>
        ${BaseButton({ 
            href: context.get("session") ? "/profile" :`/signin?redirect=${encodeURIComponent(context.req.routePath)}`,
            text: context.get("session") ? "Profile" : "Sign in" 
          })}
        </div>
      </div>
    </header>`;
};

export { Header };
