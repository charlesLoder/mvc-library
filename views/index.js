// @ts-check
/// <reference path="../types.js" />

import { html } from "hono/html";
import { Base } from "./layout/base.js";
import { ListTemplate } from "./templates/partials/list.js";

/**
 * @param {Context} context
 */
const Index = (context) => {
  const isAdmin = context.get("is_admin");
  const resources = [
    { title: "Books", show_button_href: "/books" },
    { title: "Authors", show_button_href: "/authors" },
    { title: "Genres", show_button_href: "/genres" },
  ];

  if (isAdmin) {
    resources.push({ title: "Users", show_button_href: "/users" });
  }
  return Base(
    context,
    //prettier-ignore
    html
    `${ListTemplate(context, "Wecome to the MVC Library", resources, "No records")}
    `
  );
};

export { Index };
