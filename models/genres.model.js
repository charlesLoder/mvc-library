// @ts-check
/// <reference path="../types.js" />

import { genres } from "../schemas/index.js";
import { BaseModel } from "./base.model.js";

/**
 * Model for genres
 *
 * @class GenresModel
 * @extends BaseModel<GenresSchema>
 */
class GenresModel extends BaseModel {
  constructor() {
    super(genres);
    // reassigning gives better intellisense
    this.schema = genres;
  }
}

export { GenresModel };
