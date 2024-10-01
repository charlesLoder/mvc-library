//@ts-check
import { html } from "hono/html";
import { Base } from "../layout/base.js";

/** @typedef {import("hono").Context} Context */

/**
 *
 * @param {Context} context
 * @param {object} data
 * @param {string} data.title
 * @param {ReturnType<import("hono/html").html>} data.content
 * @returns
 */
export const ShowTemplate = (context, { title, content }) => {
  return Base(
    context,
    html`
      <h1 class="title">${title}</h1>
      ${content}
    `
  );
};
