//@ts-check
import { html } from "hono/html";

/**
 *
 * @param {string} href
 */
export function ShowButton(href) {
  return html`<a class="button button-show" href="${href}">Show</a>`;
}

/**
 *
 * @param {string} href
 */
export function EditButton(href) {
  return html`<a class="button button-edit" href="${href}">Edit</a>`;
}

/**
 *
 * @param {string} href
 */
export function DeleteButton(href) {
  return html`<a class="button button-delete" href="${href}">Delete</a>`;
}
