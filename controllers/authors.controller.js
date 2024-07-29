//@ts-check
import { AuthorsModel } from "../models/authors.model.js";
import { AuthorsView } from "../views/authors.view.js";
import { BaseController } from "./base.controller.js";

/**
 * @typedef {import("hono").Context} Context
 */

class AuthorsController extends BaseController {
  constructor() {
    const authorsModel = new AuthorsModel();
    const authorsView = new AuthorsView();
    super(authorsModel, authorsView);
    this.model = authorsModel;
    this.view = authorsView;
  }

  /**
   * Get a author by its ID.
   *
   * @param {Context} context
   */
  async getById(context) {
    const resp = await this.model.getByIdWithBooks(Number(context.req.param("id")));
    if (!resp) {
      return context.html(`<h1>Author not found</h1>`);
    }
    const { id, first_name, last_name, bio, book_authors } = resp;
    return context.html(
      this.view.show(
        { id, first_name, last_name, bio },
        book_authors.map((r) => r.book)
      )
    );
  }

  /**
   * Edit a author by its ID.
   *
   * @param {Context} context
   */
  async edit(context) {
    const id = context.req.param("id");
    const author = await this.model.getById(Number(id));
    return context.html(this.view.edit(author[0]));
  }

  /**
   * Update a author by its ID.
   *
   * @param {Context} context
   */
  async update(context) {
    const id = context.req.param("id");
    const body = await context.req.parseBody();
    await this.model.update(Number(id), {
      first_name: String(body.first_name),
      last_name: String(body.last_name),
      bio: String(body.bio),
    });
    return context.redirect(`/authors/${id}`);
  }

  /**
   * Delete a author by its ID.
   *
   * @param {Context} context
   */
  async delete(context) {
    const id = Number(context.req.param("id"));
    await this.model.delete(id);
    return context.redirect(`/authors`);
  }
}

export const authorsController = new AuthorsController();
