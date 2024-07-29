//@ts-check
import { html } from "hono/html";
import { Base } from "./layout/base.js";
import { ListTemplate } from "./templates/partials/list.js";

const Index = () => {
  return Base(
    //prettier-ignore
    html
    `<div slot="content">
      ${ListTemplate("Wecome to the MVC Library", [
        { title: "Books", show_button_href: "/books" },
        { title: "Authors", show_button_href: "/authors" },
        { title: "Genres", show_button_href: "/genres" },
      ], "No records")}
    </div>`
  );
};

export { Index };
