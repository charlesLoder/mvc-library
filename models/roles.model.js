// @ts-check
import { roles } from "../schemas/index.js";
import { BaseModel } from "./base.model.js";

/**
 * @typedef {import("../schemas/index.js").roles} Roles
 */

/**
 * Model for users
 *
 * @class RolesModel
 * @extends BaseModel<Roles>
 */
class RolesModel extends BaseModel {
  constructor() {
    super(roles);
    // reassigning gives better intellisense
    this.schema = roles;
  }
}

export { RolesModel };
