// @ts-check
import { hash } from "bcrypt";
import { eq } from "drizzle-orm";
import { users } from "../schemas/index.js";
import { BaseModel } from "./base.model.js";

/**
 * @typedef {import("../schemas/index.js").users} Users
 */

/**
 * Model for users
 *
 * @class UsersModel
 * @extends BaseModel<Users>
 */
class UsersModel extends BaseModel {
  constructor() {
    super(users);
    // reassigning gives better intellisense
    this.schema = users;
  }

  /**
   * Get a user by its ID.
   *
   * @param {number} id the id of the book
   */
  async getById(id) {
    return await this.db.query.users.findMany({
      where: eq(users.id, id),
      with: {
        role: true,
      },
    });
  }

  /**
   * Gets a user by their username
   *
   * @param {string} username
   */
  async getByUsername(username) {
    const user = await this.db.select().from(users).where(eq(users.username, username));
    return user[0];
  }

  async create(data) {
    const { username, password } = data;
    const hashed = await hash(password, 10);
    return await super.create({
      username,
      password: hashed,
    });
  }
}

export { UsersModel };
