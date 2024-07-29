//@ts-check
import { html } from "hono/html";
import { Base } from "../layout/base.js";

/**
 *
 * @param {object} data
 * @param {string} data.title
 * @param {ReturnType<import("hono/html").html>} data.content
 * @returns
 */
export const ShowTemplate = ({ title, content }) => {
  return Base(html`
    <h1 class="title">${title}</h1>
    ${content}
  `);
};
