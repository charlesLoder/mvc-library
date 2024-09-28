//@ts-check
import { html } from "hono/html";

/**
 *
 * @param {Object} options
 * @param {string} options.href
 * @param {string} options.text
 */
export function DefaultButton({ href, text }) {
  return html`<a class="button" href="${href}">${text}</a>`;
}

/**
 *
 * @param {string} href
 */
export function ShowButton(href) {
  return html`<a class="button" href="${href}">Show</a>`;
}

/**
 *
 * @param {string} href
 */
export function EditButton(href) {
  return html`<a class="button" data-button-variant="edit" href="${href}">Edit</a>`;
}

/**
 *
 * @param {string} href
 */
export function DeleteButton(href) {
  return html`<a class="button" data-button-variant="delete" href="${href}">Delete</a>`;
}
