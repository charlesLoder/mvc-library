// @ts-check
/// <reference path="../types.js" />

import { roles } from "../schemas/index.js";
import { BaseModel } from "./base.model.js";

/**
 * Model for roles
 *
 * @class RolesModel
 * @extends BaseModel<RolesSchema>
 */
class RolesModel extends BaseModel {
  constructor() {
    super(roles);
    // reassigning gives better intellisense
    this.schema = roles;
  }
}

export { RolesModel };
