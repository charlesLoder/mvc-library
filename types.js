// @ts-check

// DATABASE TYPES
/**
 * @typedef {import("drizzle-orm").InferSelectModel<typeof import("./schemas/index.js").authors>} Author
 * @typedef {import("drizzle-orm").InferSelectModel<typeof import("./schemas/index.js").books>} Book
 * @typedef {import("drizzle-orm").InferSelectModel<typeof import("./schemas/index.js").book_authors>} BookAuthor
 * @typedef {import("drizzle-orm").InferSelectModel<typeof import("./schemas/index.js").genres>} Genre
 * @typedef {import("drizzle-orm").InferSelectModel<typeof import("./schemas/index.js").roles>} Role
 * @typedef {import("drizzle-orm").InferSelectModel<typeof import("./schemas/index.js").users>} User
 */

// APP CONFIG
/**
 * @typedef {Awaited<ReturnType<import("./models/sessions.model").SessionsModel["getUserBySessionToken"]>>} Session
 *
 * @typedef {Object} SessionVariables
 * @property {Session} SessionVariables.session
 * @property {boolean} SessionVariables.is_admin
 *
 * @typedef {import("hono").Hono<{Variables: SessionVariables}>} App
 *
 * @typedef {import("hono").Context<{Variables: SessionVariables}>} Context
 */
