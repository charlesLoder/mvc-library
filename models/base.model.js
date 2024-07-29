// @ts-check
import Database from "better-sqlite3";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as dbSchema from "../schemas/index.js";

/**
 * @typedef {import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{name: string, schema: any, columns: any, dialect: "sqlite"}>} Schema
 */

/**
 * Base model class
 *
 * @class BaseModel
 * @template {Schema} T
 *
 * @remarks
 * This is a base class for all models, providing basic CRUD operations.
 * The generic is used so that a schema can be passed to the constructor and intellisense can be improved.
 */
class BaseModel {
  /**
   * @param {T} schema
   */
  constructor(schema) {
    /** @type {T} */
    this.schema = schema;

    // passing in the schema allows Drizzle's query builder to be used to the fullest extent
    // https://orm.drizzle.team/docs/rqb
    this.db = drizzle(new Database(process.env.DB_PATH), { schema: dbSchema });
  }

  /**
   * Get all records from the database
   */
  async getAll() {
    return await this.db.select().from(this.schema);
  }

  /**
   * Get a record by its ID.
   *
   * @param {number} id the id of the record
   */
  async getById(id) {
    return await this.db.select().from(this.schema).where(eq(this.schema.id, id));
  }

  /**
   * Create a new record in the database
   *
   * @param {import("drizzle-orm").InferInsertModel<T>} data
   * @returns {Promise<import("drizzle-orm").InferSelectModel<T>>}
   */
  async create(data) {
    return await this.db.insert(this.schema).values(data).returning();
  }

  /**
   * Update a record in the database
   *
   * @param {number} id
   * @param {import("drizzle-orm").InferInsertModel<T>} data
   */
  async update(id, data) {
    return await this.db.update(this.schema).set(data).where(eq(this.schema.id, id)).returning();
  }

  /**
   * Delete a record from the database
   *
   * @param {number} id
   */
  async delete(id) {
    return await this.db
      .delete(this.schema)
      .where(eq(this.schema.id, id))
      .returning({ id: this.schema.id });
  }
}

export { BaseModel };
