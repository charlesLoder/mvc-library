//@ts-check
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { Hono } from "hono";

/**
 * @typedef {import("../models/base.model.js").BaseModel} BaseModel
 * @typedef {import("../views/base.view.js").BaseView} BaseView
 * @typedef {import("hono").Context} Context
 */

/**
 * Base controller class
 *
 * @class BaseController
 */
class BaseController {
  /**
   * Create a new controller
   *
   * @param {BaseModel} model
   * @param {BaseView} view
   * @param {string[]} allowedQueryParams - list of allowed query parameters
   */
  constructor(model, view, allowedQueryParams = []) {
    this.db = drizzle(new Database(process.env.DB_PATH));
    this.app = new Hono();
    this.model = model;
    this.view = view;
    this.allowedQueryParams = allowedQueryParams;
    this.app.get("/", this.index.bind(this));
  }

  /**
   * Parse and validate query parameters
   *
   * @param {Context} context
   * @returns {{[key: string]: string[]}}
   */
  parseQueryParams(context) {
    return this.allowedQueryParams.reduce((acc, param) => {
      const value = context.req.queries(param);
      if (value !== undefined) {
        acc[param] = value;
      }
      return acc;
    }, {});
  }

  /**
   * Get all records from the database and render a view
   *
   * @param {Context} context
   */
  async index(context) {
    const all = await this.model.getAll();
    const view = this.view.index(all);
    return context.html(view);
  }

  /**
   * Show a single record
   *
   * @param {Context} context
   */
  show(context) {
    return context.html(this.view.show());
  }

  /**
   * Edit a record
   *
   * @param {Context} context
   */
  edit(context) {
    return context.html(this.view.edit());
  }

  /**
   * Render a view for a form to create a new record
   *
   * @param {Context} context
   */
  new(context) {
    return context.html(this.view.new());
  }
}

export { BaseController };
