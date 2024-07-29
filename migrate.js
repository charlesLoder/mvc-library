import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

const betterSqlite = new Database(process.env.DB_PATH);
const db = drizzle(betterSqlite);
betterSqlite.pragma("foreign_keys = ON");
migrate(db, { migrationsFolder: "./migrations" });
betterSqlite.close();
