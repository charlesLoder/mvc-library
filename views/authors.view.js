// @ts-check
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
 * @typedef {import("drizzle-orm").InferSelectModel<typeof import("../schemas/index.js").authors>} Author
 * @typedef {import("drizzle-orm").InferSelectModel<typeof import("../schemas/index.js").books>} Book
 * @typedef {import("hono").Context} Context
 */

class AuthorsView extends BaseView {
  constructor() {
    super(authors);
    // reassigning improves intelisense
    this.schema = authors;
  }

  /**
   * Displays a list of authors
   *
   * @param {Context} context
   * @param {Author[]} authors
   */
  index(context, authors) {
    return IndexTemplate(context, {
      title: "Authors",
      records: authors.map((author) => {
        return {
          text: `${author.first_name} ${author.last_name}`,
          id: author.id,
        };
      }),
      basePath: "authors",
    });
  }

  /**
   * Render a view for a single author
   *
   * @param {Context} context
   * @param {Author} author
   * @param {Book[]} books
   */
  show(context, author, books) {
    const content = html`
      <p>${author.bio}</p>
      <div>${EditButton(`/authors/${author.id}/edit`)}</div>
      ${ListTemplate(
        `Books by ${author.first_name} ${author.last_name}`,
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
          href: `/authors/${author.id}/delete`,
          text: `Delete ${author.first_name} ${author.last_name}`,
        })}
      </div>
    `;
    return ShowTemplate(context, {
      title: String(author.first_name + " " + author.last_name),
      content,
    });
  }

  /**
   * Render a view for a form to edit an author
   *
   * @param {Context} context
   * @param {Author} author
   */
  edit(context, author) {
    return Base(
      context,
      //prettier-ignore
      html`
      <h1>Edit ${author.first_name} ${author.last_name}</h1>
      <form action="/authors/${author.id}" method="post" class="stack">
        <input type="hidden" name="_method" value="PUT" />
        <fieldset class="stack">
          <div class="stack">
            <label for="first_name">First Name</label>
            <input type="text" name="first_name" value="${author.first_name}" />
          </div>
          <div class="stack">
            <label for="last_name">Last Name</label>
            <input type="text" name="last_name" value="${author.last_name}" />
          </div>
        </fieldset>
        <fieldset class="stack">
          <label for="bio">Bio</label>
          <textarea name="bio">${author.bio}</textarea>
        </fieldset>
        <div>
          <input type="submit" class="button button-edit" value="Save" />
        </div>
      </form>
    `
    );
  }

  /**
   * Render a view for a form to create a new author
   *
   * @param {Context} context
   */
  new(context) {
    return Base(
      context,
      //prettier-ignore
      html`
      <h1>New Author</h1>
      <form action="/authors" method="post" class="stack">
        <fieldset class="stack">
          <div class="stack">
            <label for="first_name">First Name</label>
            <input type="text" name="first_name" />
          </div>
          <div class="stack">
            <label for="last_name">Last Name</label>
            <input type="text" name="last_name" />
          </div>
        </fieldset>
        <fieldset class="stack">
          <label for="bio">Bio</label>
          <textarea name="bio"></textarea>
        </fieldset>
        <div>
          <input type="submit" class="button button-edit" value="Save" />
        </div>
      </form>
    `
    );
  }
}

export { AuthorsView };
