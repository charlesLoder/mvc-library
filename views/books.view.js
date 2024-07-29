//@ts-check
import { html } from "hono/html";
import { books } from "../schemas/index.js";
import { BaseView } from "./base.view.js";
import { Base } from "./layout/base.js";
import { IndexTemplate } from "./templates/index.js";
import { EditButton } from "./templates/partials/buttons.js";
import { DeleteForm } from "./templates/partials/forms.js";
import { ListTemplate } from "./templates/partials/list.js";
import { ShowTemplate } from "./templates/show.js";

/**
 * @typedef {import("drizzle-orm").InferSelectModel<typeof import("../schemas/index.js").books>} Book
 * @typedef {import("drizzle-orm").InferSelectModel<typeof import("../schemas/index.js").authors>} Author
 * @typedef {import("drizzle-orm").InferSelectModel<typeof import("../schemas/index.js").genres>} Genre
 * @typedef {import("drizzle-orm").InferSelectModel<typeof import("../schemas/index.js").book_authors>} BookAuthor
 */

class BooksView extends BaseView {
  constructor() {
    super(books);
    // reassigning improves intellisense
    this.schema = books;
  }

  /**
   * Displays a list of books
   *
   * @param {Book[]} books
   * @param {string=} message
   */
  index(books, message = "") {
    return IndexTemplate({
      title: "Books",
      message,
      records: books.map((book) => {
        return {
          text: book.title,
          id: book.id,
        };
      }),
      basePath: "books",
    });
  }

  /**
   * Displays a single book
   *
   * @param {Book} book
   * @param {Author[]} authors
   * @param {Genre | null} genre
   */
  show(book, authors, genre = null) {
    //prettier-ignore
    const content = html`
      <div class="details summary">
        <h3>Summary</h3>
        <p>${book.description}</p>
      </div>
      <div class="details genre">
        <h3>Genre</h3>
        ${genre
          ? html`<p>${genre.name} <a href="/genres/${genre.id}">(See more ${genre.name.toLowerCase()} books)</a></p>`
          : html`<p>No genre assigned</p>`
        }
      </div>
      <div class="details pubdate">
        <h3>Pubdate</h3>
        <p>${book.pubdate}</p>
      </div>
      <div>
        ${EditButton(`/books/${book.id}/edit`)}
      </div>
      ${ListTemplate(`Authors`, authors?.map(author => {
        return {
          title: `${author.first_name} ${author.last_name}`,
          show_button_href: `/authors/${author.id}`,
          edit_button_href: `/authors/${author.id}/edit`,
        }
      }), "No authors assigned")}
      <div>
       ${DeleteForm({ href: `/books/${book.id}/delete`, text: `Delete ${book.title}` })}
      </div>
    `;
    return ShowTemplate({
      title: String(book.title),
      content,
    });
  }

  /**
   * Render a view for a form to edit a book
   *
   * @param {Object} data
   * @param {Book} data.book
   * @param {Genre[]} data.genres
   * @param {Genre | null} data.currentGenre
   * @param {Author[]} data.authors
   * @param {Author[]} data.currentAuthors
   */
  edit({ book, genres, currentGenre, authors, currentAuthors }) {
    const currentAuthorIds = currentAuthors.map((author) => author.id);
    return Base(
      //prettier-ignore
      html`
      <h1>Edit ${book.title}</h1>
      <form action="/books/${book.id}" method="post">
        <div class="field">
          <label for="title">Title</label>
          <input type="text" name="title" value="${book.title}" />
        </div>
        <div class="field">
          <label for="pubdate">Pubdate</label>
          <input type="text" name="pubdate" value="${book.pubdate}" />
        </div>
        <div class="field">
          <label for="genre_id">Genre</label>
          <select name="genre_id">
            <option value="" ${!currentGenre ? "selected" : ""} disabled>Choose a genre</option>
            ${genres.map(
              (genre) => html`
                <option value="${genre.id}" ${currentGenre && genre.id === currentGenre.id ? "selected" : ""}>
                  ${genre.name}
                </option>
              `
            )}
          </select>
        </div>
        <div class="field">
          <label for="author_id">Author(s)</label>
          <select name="author_id" multiple>
            ${authors.map(
              (author) => html`
                <option value="${author.id}" ${ currentAuthorIds.includes(author.id) ? "selected" : ""}>
                  ${author.first_name} ${author.last_name}
                </option>
              `
            )}
          </select>
        </div>
        <div>
          <input type="submit" class="button button-edit" value="Save" />
        </div>
      </form>
      `
    );
  }

  /**
   * Render a view for a form to create a new book
   */
  new() {
    return Base(
      //prettier-ignore
      html`
      <h1>New Book</h1>
      <form action="/books" method="post">
        <div class="field">
          <label for="title">Title</label>
          <input type="text" name="title" />
        </div>
        <div class="field">
          <label for="pubdate">Pubdate</label>
          <input type="text" name="pubdate" />
        </div>
        <div>
          <input type="submit" class="button button-edit" value="Save" />
        </div>
      </form>
      `
    );
  }
}

export { BooksView };
