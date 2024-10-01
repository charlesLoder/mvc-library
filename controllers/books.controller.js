// @ts-check
import { AuthorsModel } from "../models/authors.model.js";
import { BooksModel } from "../models/books.model.js";
import { GenresModel } from "../models/genres.model.js";
import { BooksView } from "../views/books.view.js";
import { BaseController } from "./base.controller.js";

/**
 * @typedef {import("hono").Context} Context
 * @typedef {import("../schemas/index.js").genres} GenresSchema
 *
 */

/**
 * Controller for books
 *
 * @class BooksController
 */
class BooksController extends BaseController {
  constructor() {
    const booksModel = new BooksModel();
    const booksView = new BooksView();
    super(booksModel, booksView, ["authors", "genres"]);
    this.model = booksModel;
    this.view = booksView;
  }

  /**
   * Get a book by its ID.
   *
   * @param {Context} context
   */
  async getById(context) {
    const resp = await this.model.getById(Number(context.req.param("id")));
    const { id, title, pubdate, description, genre_id, genre, book_authors } = resp[0];
    return context.html(
      this.view.show(
        context,
        { id, title, pubdate, description, genre_id },
        book_authors.map((r) => r.author),
        genre
      )
    );
  }

  /**
   * Returns a form to edit a book
   *
   * @param {Context} context
   */
  async edit(context) {
    const [resp, genres, authors] = await Promise.all([
      await this.model.getById(Number(context.req.param("id"))),
      await new GenresModel().getAll(),
      await new AuthorsModel().getAll(),
    ]);
    const { id, title, pubdate, description, genre_id, genre, book_authors } = resp[0];
    return context.html(
      this.view.edit(context, {
        book: { id, title, pubdate, description, genre_id },
        currentGenre: genre,
        genres,
        authors,
        currentAuthors: book_authors.map((r) => r.author),
      })
    );
  }

  /**
   * Update a book by its ID.
   *
   * @param {Context} context
   */
  async update(context) {
    const id = context.req.param("id");
    const form = await context.req.formData();
    const genre_id_string = form.get("genre_id")?.toString() ?? "";
    const author_ids = Array.from(form.getAll("author_id")).map((a) => Number(a.toString()));
    const resp = await this.model.update(Number(id), {
      title: form.get("title")?.toString() ?? "",
      pubdate: form.get("pubdate")?.toString() ?? "",
      genre_id: genre_id_string ? Number(genre_id_string) : null,
      author_ids,
    });
    return context.redirect(`/books/${resp[0].id}`);
  }

  /**
   * Create a new book
   *
   * @param {Context} context
   */
  async create(context) {
    const body = await context.req.parseBody();
    const resp = await this.model.create({
      title: String(body.title),
      pubdate: String(body.pubdate),
      genre_id: Number(body.genre_id),
    });
    return context.redirect(`/books/${resp[0].id}`);
  }

  /**
   * Delete a book by its ID.
   *
   * @param {Context} context
   */
  async delete(context) {
    await this.model.delete(Number(context.req.param("id")));
    return context.redirect(`/books`);
  }
}

export const booksController = new BooksController();
