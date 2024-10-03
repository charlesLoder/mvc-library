// @ts-check
import { eq } from "drizzle-orm";
import { sessions } from "../schemas/index.js";
import { BaseModel } from "./base.model.js";

/**
 * @typedef {import("../schemas/index.js").sessions} Sessions
 */

/**
 * Model for sessions
 *
 * @class SessionsModel
 * @extends BaseModel<Sessions>
 */
class SessionsModel extends BaseModel {
  constructor() {
    super(sessions);
    // reassigning gives better intellisense
    this.schema = sessions;
  }

  /**
   * Gets a user and their role and session by their session token
   *
   * @param {string} token
   */
  async getUserBySessionToken(token) {
    return await this.db.query.sessions.findFirst({
      where: eq(this.schema.token, token),
      with: {
        user: {
          with: {
            role: true,
          },
        },
      },
    });
  }

  /**
   * Delete all sessions for a user
   *
   * @param {number} user_id
   */
  async deleteAllSessionsByUserId(user_id) {
    return await this.db.delete(this.schema).where(eq(this.schema.user_id, user_id));
  }
}

export { SessionsModel };
