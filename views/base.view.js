// @ts-check

import { html } from "hono/html";
import { Base } from "./layout/base.js";

/**
 * @typedef {import("../controllers/base.controller.js").BaseController} Controller
 * @typedef {import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<ReturnType<import("drizzle-orm/sqlite-core").SQLiteSelectBase>>} Schema
 * @typedef {import("hono").Context} Context
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
   * @param {Context} context
   * @param {any} _args
   */
  index(context, ..._args) {
    return Base(context, html`<h1>Need to implement a view</h1>`);
  }

  /**
   * Show a single record
   *
   * @param {Context} context
   * @param {any} _args
   */
  show(context, ..._args) {
    return Base(context, html`<h1>Need to implement a view</h1>`);
  }

  /**
   * Edit a single record
   *@param {Context} context
   * @param {any} _args
   */
  edit(context, ..._args) {
    return Base(context, html`<h1>Need to implement a view</h1>`);
  }

  /**
   * Create a new record
   *@param {Context} context
   * @param {any} _args
   */
  new(context, ..._args) {
    return Base(context, html`<h1>Need to implement a view</h1>`);
  }
}

export { BaseView };
