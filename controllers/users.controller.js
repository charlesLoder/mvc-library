// @ts-check
/// <reference path="../types.js" />

import { RolesModel } from "../models/roles.model.js";
import { SessionsModel } from "../models/sessions.model.js";
import { UsersModel } from "../models/users.model.js";
import { UsersView } from "../views/users.view.js";
import { BaseController } from "./base.controller.js";

/**
 * Controller for users
 *
 * @class UsersController
 */
class UsersController extends BaseController {
  constructor() {
    const usersModel = new UsersModel();
    const usersView = new UsersView();
    super(usersModel, usersView);
    this.model = usersModel;
    this.view = usersView;
  }

  /**
   * Get a book by its ID.
   *
   * @param {Context} context
   */
  async getById(context) {
    const resp = await this.model.getById(Number(context.req.param("id")));
    const { role, ...user } = resp[0];
    return context.html(this.view.show(context, user, role));
  }

  /**
   * Returns a form to edit a user
   *
   * @param {Context} context
   */
  async edit(context) {
    const userReq = this.model.getById(Number(context.req.param("id")));
    const rolesReq = new RolesModel().getAll();

    const resp = await Promise.all([userReq, rolesReq]);

    const [user, roles] = resp;
    return context.html(
      this.view.edit(context, {
        user: user[0],
        roles,
      })
    );
  }

  /**
   * Update a user
   *
   * @param {Context} context
   */
  async update(context) {
    const id = context.req.param("id");
    const form = await context.req.formData();

    const username = form.get("username")?.toString() || "";
    const roleId = form.get("role")?.toString() || "";
    const password = form.get("password")?.toString() || "";

    const user = (await this.model.getById(Number(id)))[0];

    const newPassword = !password ? user.password : password;

    const resp = await this.model.update(Number(id), {
      id: Number(id),
      username,
      password: newPassword,
      role_id: Number(roleId),
    });

    return context.redirect(`/users/${resp[0].id}`);
  }

  /**
   * Create a user
   *
   * @param {Context} context
   */
  async create(context) {
    const body = await context.req.parseBody();
    const username = body.username.toString().toLowerCase();

    if (await this.model.getByUsername(username)) {
      return context.html(this.view.new(context, "Username already exists"));
    }

    const resp = await this.model.create({
      username,
      password: body.password,
      role_id: Number(body.role),
    });

    return context.redirect(`/users/${resp[0].id}`);
  }

  /**
   * Delete a user by their ID.
   *
   * @param {Context} context
   */
  async delete(context) {
    const user_id = Number(context.req.param("id"));
    const sessionModel = new SessionsModel();
    await sessionModel.deleteAllSessionsByUserId(user_id);
    await this.model.delete(user_id);
    return context.redirect(`/users`);
  }
}

export const usersController = new UsersController();
