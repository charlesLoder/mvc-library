/** @type { import("drizzle-kit").Config } */
export default {
  dialect: "sqlite",
  schema: "./schemas/index.js",
  out: "./migrations",
  dbCredentials: {
    url: "sqlite://./db.sqlite",
  },
};
