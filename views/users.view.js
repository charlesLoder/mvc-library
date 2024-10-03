// @ts-check
/// <reference path="../types.js" />

import { html } from "hono/html";
import { randomBytes } from "node:crypto";
import { RolesModel } from "../models/roles.model.js";
import { users } from "../schemas/index.js";
import { BaseView } from "./base.view.js";
import { Base } from "./layout/base.js";
import { IndexTemplate } from "./templates/index.js";
import { EditButton } from "./templates/partials/buttons.js";
import { ErrorCallout } from "./templates/partials/callouts.js";
import { DeleteForm } from "./templates/partials/forms.js";
import { ShowTemplate } from "./templates/show.js";

class UsersView extends BaseView {
  constructor() {
    super(users);
    // reassigning improves intelisense
    this.schema = users;
  }

  /**
   * Displays a list of users
   *
   * @param {Context} context
   * @param {User[]} users
   */
  index(context, users) {
    return IndexTemplate(context, {
      title: "Users",
      records: users.map((user) => {
        return {
          text: user.username,
          id: user.id,
        };
      }),
      basePath: "users",
    });
  }

  /**
   * Render a view for a single user
   *
   * @param {Context} context
   * @param {User} user
   * @param {Role | null} role
   */
  show(context, user, role) {
    const content = html`
      <div class="stack">
        <h2>Role</h2>
        <p>${role?.name}</p>
      </div>
      <div>${EditButton(`/users/${user.id}/edit`)}</div>
      ${DeleteForm({ text: `Delete ${user.username}`, href: `/users/${user.id}/delete` })}
      <div class="stack">
        <p><a href="/users">See all users</a></p>
      </div>
    `;
    return ShowTemplate(context, {
      title: `${user.username} (${user.id})`,
      content,
    });
  }

  /**
   * Render a view for a form to edit a user
   *
   * @param {Context} context
   * @param {Object} data
   * @param {User} data.user
   * @param {Role[]} data.roles
   * @param {string=} error_message
   */
  edit(context, { user, roles }, error_message = "") {
    return Base(
      context,
      //prettier-ignore
      html`
        <h1>Edit ${user.username}</h1>
        ${error_message ? ErrorCallout(error_message) : ""}
        <form action="/users/${user.id}" method="post" class="stack">
          <fieldset class="stack">
            <label for="username">Username</label>
            <input type="text" name="username" value="${user.username}" required />
          </fieldset>
          <fieldset class="stack">
            <label for="password">Password</label>
            <input type="password" name="password" placeholder="Leave blank to keep current password" />
          </fieldset>
          <fieldset class="stack">
            <label for="role">Role</label>
            <select name="role" required>
              ${roles.map((role) => {
                return html`
                  <option value="${role.id}" ${role.id === user.role_id ? "selected" : ""}>
                    ${role.name}
                  </option>
                `;
              })}
            </select>
          </fieldset>
          <div>
            <input type="submit" class="button button-edit" value="Save" />
          </div>
        </form>
      `
    );
  }

  /**
   * Render a view for a form to create a new user
   *
   * @param {Context} context
   * @param {string=} error_message
   */
  async new(context, error_message = "") {
    const roles = await new RolesModel().getAll();
    return Base(
      context,
      //prettier-ignore
      html`
      <h1>New User</h1>
      ${error_message ? ErrorCallout(error_message) : ""}
      <form action="/users" method="post" class="stack">
        <fieldset class="stack">
          <div class="stack">
            <label for="username">Username</label>
            <input required type="text" name="username" />
          </div>
          <div class="stack">
            <label for="password">Password</label>
            <input type="text" required name="password" value="${randomBytes(8).toString("hex")}" />
          </div>
        </fieldset>
        <fieldset class="stack">
          <label for="role">Role</label>
          <select name="role" required>
            ${roles.map((role) => {
              return html`<option value="${role.id}">${role.name}</option>`;
            })}
          </select>
        </fieldset>
        <div>
          <input type="submit" class="button button-edit" value="Save" />
        </div>
      </form>
    `
    );
  }
}

export { UsersView };
