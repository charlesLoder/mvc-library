// @ts-check
/// <reference path="types.js" />

import { authorsController } from "./controllers/authors.controller.js";
import { booksController } from "./controllers/books.controller.js";
import { genresController } from "./controllers/genres.controller.js";

/**
 *
 * @param {Context} context
 * @param {import("hono").Next} next
 */
async function authenticateAdmin(context, next) {
  if (!context.get("is_admin")) {
    return context.redirect("/access-denied");
  }
  await next();
}

/**
 * @param {App} app
 */
export default (app) => {
  // protect editing and deleting routes, except for profile
  app.use("/*(?!profile)/*/edit", authenticateAdmin);
  app.use("/*/*/delete", authenticateAdmin);

  // books
  app.route("/books").get(booksController.index.bind(booksController)); // display all books
  app.route("/books").post(booksController.create.bind(booksController)); // creates a new book in database
  app.route("/books/new").get(booksController.new.bind(booksController)); // displays a form to create a new book
  app.route("/books/:id").get(booksController.getById.bind(booksController)); // display a single book
  app.route("/books/:id").post(booksController.update.bind(booksController)); // update a book in the database
  app.route("/books/:id/edit").get(booksController.edit.bind(booksController)); // display a form to edit a book
  app.route("/books/:id/delete").post(booksController.delete.bind(booksController)); // delete a book

  // authors
  app.route("/authors").get(authorsController.index.bind(authorsController));
  app.route("/authors/new").get(authorsController.new.bind(authorsController));
  app.route("/authors/:id").get(authorsController.getById.bind(authorsController));
  app.route("/authors/:id").post(authorsController.update.bind(authorsController));
  app.route("/authors/:id/edit").get(authorsController.edit.bind(authorsController));
  app.route("/authors/:id/delete").post(authorsController.delete.bind(authorsController));

  //genres
  app.route("/genres").get(genresController.index.bind(genresController));
  app.route("/genres").post(genresController.create.bind(genresController));
  app.route("/genres/new").get(genresController.new.bind(genresController));
  app.route("/genres/:id").get(genresController.getById.bind(genresController));
  app.route("/genres/:id").post(genresController.update.bind(genresController));
  app.route("/genres/:id/edit").get(genresController.edit.bind(genresController));
  app.route("/genres/:id/delete").post(genresController.delete.bind(genresController));
};
