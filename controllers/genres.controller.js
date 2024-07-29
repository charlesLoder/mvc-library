//@ts-check
import { BooksModel } from "../models/books.model.js";
import { GenresModel } from "../models/genres.model.js";
import { GenresView } from "../views/genres.view.js";
import { BaseController } from "./base.controller.js";

/**
 * @typedef {import("hono").Context} Context
 * @typedef {import("../schemas/index.js").genres} GenresSchema
 *
 */

class GenresController extends BaseController {
  constructor() {
    const genresModel = new GenresModel();
    const genresView = new GenresView();
    super(genresModel, genresView);
    this.model = genresModel;
    this.view = genresView;
  }

  /**
   * Get a genre by its ID.
   *
   * @param {Context} context
   */
  async getById(context) {
    const id = context.req.param("id");
    const [genres, books] = await Promise.all([
      this.model.getById(Number(id)),
      new BooksModel().getBooksByGenreId(Number(id)),
    ]);
    return context.html(this.view.show(genres[0], books));
  }

  /**
   * Edit a genre by its ID.
   *
   * @param {Context} context
   */
  async edit(context) {
    const id = context.req.param("id");
    const genre = await this.model.getById(Number(id));
    return context.html(this.view.edit(genre[0]));
  }

  /**
   * Create a new genre
   *
   * @param {Context} context
   */
  async create(context) {
    const body = await context.req.parseBody();
    const resp = this.model.create({
      name: String(body.name),
      description: String(body.description),
    });
    return context.redirect(`/genres/${resp[0].id}`);
  }

  /**
   * Update a genre by its ID.
   *
   * @param {Context} context
   */
  async update(context) {
    const id = context.req.param("id");
    const body = await context.req.parseBody();
    const resp = await this.model.update(Number(id), {
      name: String(body.name),
      description: String(body.description),
    });
    return context.redirect(`/genres/${resp[0].id}`);
  }

  /**
   * Delete a genre by its ID.
   *
   * @param {Context} context
   */
  async delete(context) {
    const id = Number(context.req.param("id"));
    await this.model.delete(id);
    return context.redirect(`/genres`);
  }
}

export const genresController = new GenresController();
