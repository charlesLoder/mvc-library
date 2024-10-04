// @ts-check
/// <reference path="../types.js" />

import { and, eq } from "drizzle-orm";
import { book_authors, books } from "../schemas/index.js";
import { BaseModel } from "./base.model.js";

/**
 * Model for books
 *
 * @class BooksModel
 * @extends BaseModel<BooksSchema>
 */
class BooksModel extends BaseModel {
  constructor() {
    super(books);
    // reassigning gives better intellisense
    this.schema = books;
  }

  async getAll() {
    return await this.db.query.books.findMany({
      with: {
        genre: true,
        book_authors: {
          with: {
            author: true,
          },
        },
      },
    });
  }

  /**
   * Get a book by its ID.
   *
   * @param {number} id the id of the book
   */
  async getById(id) {
    return await this.db.query.books.findMany({
      where: eq(books.id, id),
      with: {
        genre: true,
        book_authors: {
          with: {
            author: true,
          },
        },
      },
    });
  }

  /**
   * Get all books for a given genre
   *
   * @param {number} genre_id the id of the genre
   *
   * @remarks
   * Maybe this could be in a service
   */
  async getBooksByGenreId(genre_id) {
    return await this.db.query.books.findMany({
      where: eq(this.schema.genre_id, genre_id),
    });
  }

  /**
   * Update a book
   *
   * @param {number} book_id
   * @param {object} data
   * @param {string} data.title
   * @param {string} data.pubdate
   * @param {number | null} data.genre_id
   * @param {number[]} data.author_ids
   *
   * @remarks
   * Maybe this could be in a service as it's pretty complex
   */
  async update(book_id, data) {
    const updateBook = super.update(book_id, {
      title: data.title,
      pubdate: data.pubdate,
      genre_id: data.genre_id,
    });

    const current_book_authors_author_ids = (
      await this.db.select().from(book_authors).where(eq(book_authors.book_id, book_id))
    ).map((r) => r.author_id);

    // find the set difference between the current author ids and the new author ids
    // https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
    const authors_removed = current_book_authors_author_ids.filter(
      (x) => !data.author_ids.includes(x)
    );

    const deleteAuthors = authors_removed.map(async (author_id) => {
      return this.db
        .delete(book_authors)
        .where(and(eq(book_authors.book_id, book_id), eq(book_authors.author_id, author_id)));
    });

    // find the set difference between the new author ids and the current author ids
    const authors_added = data.author_ids.filter(
      (x) => !current_book_authors_author_ids.includes(x)
    );

    const addAuthors = authors_added.map(async (author_id) => {
      return this.db.insert(book_authors).values({ book_id, author_id }).returning();
    });

    const [updateBookResp, _deleteAuthorsResp, _addAuthorsResp] = await Promise.all([
      updateBook,
      deleteAuthors,
      addAuthors,
    ]);

    return updateBookResp;
  }
}

export { BooksModel };
