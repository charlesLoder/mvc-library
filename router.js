// @ts-check
/// <reference path="types.js" />

import { authController } from "./controllers/auth.controller.js";
import { authorsController } from "./controllers/authors.controller.js";
import { booksController } from "./controllers/books.controller.js";
import { genresController } from "./controllers/genres.controller.js";
import { usersController } from "./controllers/users.controller.js";

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

  // auth
  app.route("/signin").get(authController.renderSigninForm.bind(authController));
  app.route("/signin").post(authController.processSignin.bind(authController));
  app.route("/signup").get(authController.renderSignupForm.bind(authController));
  app.route("/signup").post(authController.processSignup.bind(authController));
  app.route("/profile").get(authController.renderProfile.bind(authController));
  app.route("/profile").post(authController.update.bind(authController));
  app.route("/profile/edit").get(authController.edit.bind(authController));
  app.route("/signout").post(authController.processSignout.bind(authController));

  // users
  // protect users routes from everyone except for admin
  app.use("/users/*", authenticateAdmin);
  app.route("/users").get(usersController.index.bind(usersController));
  app.route("/users").post(usersController.create.bind(usersController));
  app.route("/users/new").get(usersController.new.bind(usersController));
  app.route("/users/:id").get(usersController.getById.bind(usersController));
  app.route("/users/:id").post(usersController.update.bind(usersController));
  app.route("/users/:id/edit").get(usersController.edit.bind(usersController));
  app.route("/users/:id/delete").post(usersController.delete.bind(usersController));
};
