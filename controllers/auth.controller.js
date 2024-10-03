// @ts-check
/// <reference path="../types.js" />

import { compare } from "bcrypt";
import { deleteCookie, setCookie } from "hono/cookie";
import { randomBytes } from "node:crypto";
import { SessionsModel } from "../models/sessions.model.js";
import { UsersModel } from "../models/users.model.js";
import { AuthView } from "../views/auth.view.js";

class AuthController {
  constructor() {
    this.view = new AuthView();
    this.session = new SessionsModel();
    this.users = new UsersModel();
  }

  #generateExpiryDate() {
    const expiryDate =
      process.env.NODE_ENV === "production"
        ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        : new Date(Date.now() + 1000 * 60 * 10);
    return expiryDate.toISOString();
  }

  #generateToken() {
    return randomBytes(32).toString("hex");
  }

  get #sessionTokenKey() {
    return process.env.SESSION_TOKEN_KEY ?? "session_token";
  }

  #setSessionCookie(context, token) {
    setCookie(context, this.#sessionTokenKey, token);
  }

  /**
   * Edit a profile page
   *
   * @param {Context} context
   */
  async edit(context) {
    const session = context.get("session");

    if (!session) {
      return context.html(this.view.profile(context));
    }

    return context.html(this.view.edit(context, { user: session.user }));
  }

  /**
   * Sign in a user
   *
   * @param {Context} context
   */
  async processSignin(context) {
    const { username, password } = await context.req.parseBody();

    try {
      const user = await this.users.getByUsername(username.toString());

      if (!user) {
        return context.html(
          this.view.signin(context, "Username or password is invalid, please try again")
        );
      }

      const valid = await compare(password.toString(), user.password);
      if (!valid) {
        return context.html(
          this.view.signin(context, "Username or password is invalid, please try again")
        );
      }

      // Create a session
      const session = await this.session.create({
        user_id: user.id,
        token: this.#generateToken(),
        expires_at: this.#generateExpiryDate(),
      });

      this.#setSessionCookie(context, session[0].token);

      return context.redirect(context.req.query("redirect") ?? "/");
    } catch (error) {
      console.error("Signin error:", error);
      return context.html(this.view.signin(context, error?.message ?? "An error occurred"));
    }
  }

  /**
   * Sign out a user
   *
   * @param {Context} context
   */
  async processSignout(context) {
    deleteCookie(context, this.#sessionTokenKey);
    const session = context.get("session");
    if (session) {
      await this.session.deleteAllSessionsByUserId(session.user_id);
    }
    return context.redirect("/");
  }

  /**
   * Sign up a user
   *
   * @param {Context} context
   */
  async processSignup(context) {
    const { username, password } = await context.req.parseBody();

    try {
      const prevUser = await this.users.getByUsername(username.toString());

      if (prevUser) {
        return context.html(this.view.signup(context, `Please select another username`));
      }

      const newUser = await this.users.create({ username, password });

      const session = await this.session.create({
        user_id: newUser[0].id,
        token: this.#generateToken(),
        expires_at: this.#generateExpiryDate(),
      });

      this.#setSessionCookie(context, session[0].token);

      return context.redirect("/profile");
    } catch (error) {
      console.error("Singup error:", error);
      return context.html(this.view.signup(context, error?.message ?? "An error occurred"));
    }
  }

  /**
   * Render a user's profile page
   *
   * @param {Context} context
   */
  async renderProfile(context) {
    return context.html(this.view.profile(context));
  }

  /**
   * Render signin form page
   *
   * @param {Context} context
   */
  async renderSigninForm(context) {
    return context.html(this.view.signin(context));
  }

  /**
   * Render a signup form page
   *
   * @param {Context} context
   */
  async renderSignupForm(context) {
    return context.html(this.view.signup(context));
  }

  /**
   * Update a user
   *
   * @param {Context} context
   */
  async update(context) {
    try {
      const sesiion = context.get("session");

      if (!sesiion) {
        return context.redirect("/signin");
      }

      const userId = sesiion.user.id;
      const form = await context.req.formData();

      const username = form.get("username")?.toString() ?? "";
      const password = form.get("password")?.toString() ?? "";

      const user = await this.users.getById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      const newPassword = !password ? user[0].password : password;
      await this.users.update(userId, { username, password: newPassword });
      return context.redirect("/profile");
    } catch (error) {
      console.error("Update error:", error);
      return context.redirect("/profile/edit");
    }
  }
}

export const authController = new AuthController();
