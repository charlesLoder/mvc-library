//@ts-check
import { relations } from "drizzle-orm";
import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const books = sqliteTable("books", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  pubdate: text("pubdate").notNull(),
  description: text("description"),
  genre_id: integer("genre_id").references(() => genres.id, { onDelete: "set null" }), // when a genres record is deleted, this becomes null
});

export const authors = sqliteTable("authors", {
  id: integer("id").primaryKey(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  bio: text("bio").notNull(),
});

export const genres = sqliteTable("genres", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
});

export const book_authors = sqliteTable(
  "book_authors",
  {
    book_id: integer("book_id")
      .references(() => books.id, { onDelete: "cascade" }) // when a book record is deleted, all corresponding book_authors with the book_id are also deleted
      .notNull(),
    author_id: integer("author_id")
      .references(() => authors.id, { onDelete: "cascade" }) // when an author record is deleted, all corresponding book_authors with the author_id are also deleted
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.book_id, table.author_id] }),
    };
  }
);

export const booksRelations = relations(books, ({ one, many }) => ({
  genre: one(genres, {
    fields: [books.genre_id],
    references: [genres.id],
  }),
  book_authors: many(book_authors),
}));

export const authorsRelations = relations(authors, ({ many }) => ({
  book_authors: many(book_authors),
}));

export const book_authorsRelations = relations(book_authors, ({ one }) => ({
  book: one(books, {
    fields: [book_authors.book_id],
    references: [books.id],
  }),
  author: one(authors, {
    fields: [book_authors.author_id],
    references: [authors.id],
  }),
}));

export const genresRelations = relations(genres, ({ many }) => ({
  books: many(books),
}));

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role_id: integer("role_id")
    .references(() => roles.id, { onDelete: "set null" })
    .default(1),
});

export const roles = sqliteTable("roles", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

export const sessions = sqliteTable("sessions", {
  id: integer("id").primaryKey(),
  user_id: integer("user_id")
    .references(() => users.id, { onDelete: "set null" })
    .notNull(),
  token: text("token").notNull().unique(),
  expires_at: text("expires_at").notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  role: one(roles, {
    fields: [users.role_id],
    references: [roles.id],
  }),
  sessions: many(sessions),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.user_id],
    references: [users.id],
  }),
}));
