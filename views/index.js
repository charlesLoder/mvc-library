//@ts-check
import { html } from "hono/html";
import { Base } from "./layout/base.js";
import { ListTemplate } from "./templates/partials/list.js";

/**
 * @typedef {import("hono").Context} context
 */

/**
 * @param {context} context
 */
const Index = (context) => {
  return Base(
    context,
    //prettier-ignore
    html
    `${ListTemplate("Wecome to the MVC Library", [
        { title: "Books", show_button_href: "/books" },
        { title: "Authors", show_button_href: "/authors" },
        { title: "Genres", show_button_href: "/genres" },
      ], "No records")}
    `
  );
};

export { Index };
