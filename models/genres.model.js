//@ts-check
import { genres } from "../schemas/index.js";
import { BaseModel } from "./base.model.js";

/**
 * @typedef {import("../schemas/index.js").genres} Genres
 */

/**
 * Model for genres
 *
 * @class GenresModel
 * @extends BaseModel<Genres>
 */
class GenresModel extends BaseModel {
  constructor() {
    super(genres);
    // reassigning gives better intellisense
    this.schema = genres;
  }
}

export { GenresModel };
