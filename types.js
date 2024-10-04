// @ts-check

// DATABASE TYPES
/**
 * @typedef {import("drizzle-orm").InferSelectModel<typeof import("./schemas/index.js").authors>} Author
 * @typedef {import("./schemas/index.js").authors} AuthorsSchem
 * @typedef {import("drizzle-orm").InferSelectModel<typeof import("./schemas/index.js").books>} Book
 * @typedef {import("./schemas/index.js").books} BooksSchema
 * @typedef {import("drizzle-orm").InferSelectModel<typeof import("./schemas/index.js").book_authors>} BookAuthor
 * @typedef {import("drizzle-orm").InferSelectModel<typeof import("./schemas/index.js").genres>} Genre
 * @typedef {import("./schemas/index.js").genres} GenresSchema
 * @typedef {import("drizzle-orm").InferSelectModel<typeof import("./schemas/index.js").roles>} Role
 * @typedef {import("./schemas/index.js").roles} RolesSchema
 * @typedef {import("drizzle-orm").InferSelectModel<typeof import("./schemas/index.js").users>} User
 * @typedef {import("./schemas/index.js").users} UsersSchema
 * @typedef {import("./schemas/index.js").sessions} SessionsSchema
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
