//@ts-check

import { html } from "hono/html";
import { Base } from "./layout/base.js";

/**
 * @typedef {import("../controllers/base.controller.js").BaseController} Controller
 * @typedef {import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<ReturnType<import("drizzle-orm/sqlite-core").SQLiteSelectBase>>} Schema
 */

/**
 * Base view class
 *
 * @class BaseView
 */
class BaseView {
  /**
   * @param {Schema} schema
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * List all records
   *
   * @param {any} _args
   */
  index(..._args) {
    return Base(html`<h1>Need to implement a view</h1>`);
  }

  /**
   * Show a single record
   *
   * @param {any} _args
   */
  show(..._args) {
    return Base(html`<h1>Need to implement a view</h1>`);
  }

  /**
   * Edit a single record
   *
   * @param {any} _args
   */
  edit(..._args) {
    return Base(html`<h1>Need to implement a view</h1>`);
  }

  /**
   * Create a new record
   *
   * @param {any} _args
   */
  new(..._args) {
    return Base(html`<h1>Need to implement a view</h1>`);
  }
}

export { BaseView };
