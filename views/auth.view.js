// @ts-check
/// <reference path="../types.js" />

import { html } from "hono/html";
import { Base } from "./layout/base.js";
import { EditButton } from "./templates/partials/buttons.js";
import { ErrorCallout } from "./templates/partials/callouts.js";
import { DeleteForm } from "./templates/partials/forms.js";

class AuthView {
  constructor() {}
  /**
   * The signin page
   *
   * @param {Context} context
   * @param {string} error_message
   */
  signin(context, error_message = "") {
    const query = context.req.query("redirect");
    const redirect = `?redirect=${encodeURIComponent(query || "/")}`;
    return Base(
      context,
      html`
        ${error_message ? ErrorCallout(error_message) : ""}
        <form action="/signin${redirect}" method="post" class="stack">
          <h1>Sign in</h1>
          <div class="field">
            <label class="label" for="username">Username</label>
            <div>
              <input class="input" id="username" name="username" type="text" />
            </div>
          </div>
          <div class="field">
            <label class="label" for="password">Password</label>
            <div>
              <input class="input" id="password" name="password" type="password" />
            </div>
          </div>
          <div class="field">
            <button class="button" type="submit">Sign in</button>
          </div>
        </form>
        <div>Don't have an account? <a href="/signup">Sign up</a></div>
      `
    );
  }

  /**
   * The signup page
   *
   * @param {Context} context
   * @param {string} error_message
   */
  signup(context, error_message = "") {
    return Base(
      context,
      html`
        ${error_message ? ErrorCallout(error_message) : ""}
        <form action="/signup" method="post" class="stack">
          <h1>Sign up</h1>
          <fieldset class="stack">
            <label class="label" for="username">Username</label>
            <div>
              <input class="input" id="username" name="username" type="text" />
            </div>
          </fieldset>
          <fieldset class="stack">
            <label class="label" for="password">Password</label>
            <div>
              <input class="input" id="password" name="password" type="password" />
            </div>
          </fieldset>
          <div class="field">
            <button class="button" type="submit">Sign up</button>
          </div>
        </form>
        <div>Already have an account? <a href="/signin">Sign in</a></div>
      `
    );
  }

  /**
   * The profile page
   *
   * @param {Context} context
   * @param {string} error_message
   */
  profile(context, error_message = "") {
    const session = context.get("session");

    if (!session) {
      return Base(
        context,
        ErrorCallout(
          html`Please <a href=/signin?redirect=${context.req.path}> sign in</a> to view your profile`
        )
      );
    }

    return Base(
      context,
      html`
        <h1>Profile</h1>
        ${error_message ? ErrorCallout(error_message) : ""}
        <div class="stack">
          <h2>Username</h2>
          <p>${session.user.username}</p>
          <h2>Role</h2>
          <p>${session.user.role?.name}</p>
        </div>
        <div>${EditButton(`/profile/edit`)}</div>
        ${DeleteForm({ text: "Sign out", href: "/signout" })}
      `
    );
  }

  /**
   * Render a view for a form to edit a user
   *
   * @param {Context} context
   * @param {Object} data
   * @param {User} data.user
   * @param {string=} error_message
   */
  edit(context, { user }, error_message = "") {
    console.log(user);

    return Base(
      context,
      //prettier-ignore
      html`
        <h1>Edit profile</h1>
        ${error_message ? ErrorCallout(error_message) : ""}
        <form action="/profile" method="post" class="stack">
          <fieldset class="stack">
            <label for="username">Username</label>
            <input type="text" name="username" value="${user.username}" required />
          </fieldset>
          <fieldset class="stack">
            <label for="password">Password</label>
            <input type="password" name="password" placeholder="Leave blank to keep current password" />
          </fieldset>
          <div>
            <input type="submit" class="button button-edit" value="Save" />
          </div>
        </form>
      `
    );
  }
}

export { AuthView };
