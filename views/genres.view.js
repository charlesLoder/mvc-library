//@ts-check
import { html } from "hono/html";
import { authors } from "../schemas/index.js";
import { BaseView } from "./base.view.js";
import { Base } from "./layout/base.js";
import { IndexTemplate } from "./templates/index.js";
import { EditButton } from "./templates/partials/buttons.js";
import { DeleteForm } from "./templates/partials/forms.js";
import { ListTemplate } from "./templates/partials/list.js";
import { ShowTemplate } from "./templates/show.js";

/**
 * @typedef {import("drizzle-orm").InferSelectModel<typeof import("../schemas/index.js").genres>} Genre
 * @typedef {import("drizzle-orm").InferSelectModel<typeof import("../schemas/index.js").books>} Book
 */

class GenresView extends BaseView {
  constructor() {
    super(authors);
    // reassigning improves intelisense
    this.schema = authors;
  }

  /**
   * Displays a list of genres
   *
   * @param {Genre[]} genres
   */
  index(genres) {
    return IndexTemplate({
      title: "Genres",
      records: genres.map((genre) => {
        return {
          text: genre.name,
          id: genre.id,
        };
      }),
      basePath: "genres",
    });
  }

  /**
   * Displays a single genre and it's books
   *
   * @param {Genre} genre
   * @param {Book[]} books
   */
  show(genre, books) {
    const content = html`
      <p>${genre.description}</p>
      <div>${EditButton(`/genres/${genre.id}/edit`)}</div>
      ${ListTemplate(
        `Books in ${genre.name}`,
        books.map((book) => {
          return {
            title: `${book.title}`,
            edit_button_href: `/books/${book.id}/edit`,
            show_button_href: `/books/${book.id}`,
          };
        }),
        "No books in this genre"
      )}
      <div>
        ${DeleteForm({
          href: `/genres/${genre.id}/delete`,
          text: `Delete ${genre.name}`,
        })}
      </div>
    `;
    return ShowTemplate({
      title: String(genre.name),
      content,
    });
  }

  /**
   * @param {Genre} genre
   */
  edit(genre) {
    return Base(
      //prettier-ignore
      html`
      <h1>Edit ${genre.name}</h1>
      <form action="/genres/${genre.id}" method="post" class="stack">
        <fieldset>
          <div class="field">
            <label for="name">Name</label>
            <input type="text" name="name" value="${genre.name}" />
          </div>
        </fieldset>
        <fieldset>
          <label for="description">Description</label>
          <textarea name="description">${genre.description}</textarea>
        </fieldset>
        <div>
          <input type="submit" class="button button-edit" value="Save" />
        </div>
      </form>
    `
    );
  }

  new() {
    return Base(
      //prettier-ignore
      html`
      <h1>New Genre</h1>
      <form action="/genres" method="post">
        <div class="field">
          <label for="name">Name</label>
          <input type="text" name="name" />
        </div>
        <div class="field">
          <label for="description">Description</label>
          <textarea name="description"></textarea>
        </div>
        <div>
          <input type="submit" class="button button-edit" value="Save" />
        </div>
      </form>
      `
    );
  }
}

export { GenresView };
