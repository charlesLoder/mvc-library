// @ts-check
import { eq } from "drizzle-orm";
import { authors } from "../schemas/index.js";
import { BaseModel } from "./base.model.js";

/**
 * @typedef {import("../schemas/index.js").authors} Authors
 */

/**
 * Model for authors
 *
 * @class AuthorsModel
 * @extends BaseModel<Authors>
 */
class AuthorsModel extends BaseModel {
  constructor() {
    super(authors);
    // reassigning gives better intellisense
    this.schema = authors;
  }

  /**
   * Get an author by its ID and the books they have written
   *
   * @param {number} id the id of the author
   */
  async getByIdWithBooks(id) {
    return await this.db.query.authors.findFirst({
      where: eq(authors.id, id),
      with: {
        book_authors: {
          with: {
            book: true,
          },
        },
      },
    });
  }
}

export { AuthorsModel };
