//@ts-check
import { html } from "hono/html";
import { ShowButton, EditButton, DeleteButton } from "./buttons.js";

/**
 * @typedef {{title: string, show_button_href?: string, edit_button_href?: string, delete_button_href?: string}} ListItemTemplateOptions
 */

/**
 * Template for a list item
 *
 * @param {ListItemTemplateOptions} options
 *
 */
export const ListItemTemplate = ({
  title,
  show_button_href = "",
  edit_button_href = "",
  delete_button_href = "",
}) => {
  return html`
    <li class="list-item">
      <div class="item-title">${title}</div>
      <div class="item-buttons">
        ${show_button_href ? html`${ShowButton(show_button_href)}` : ""}
        ${edit_button_href ? html`${EditButton(edit_button_href)}` : ""}
        ${delete_button_href ? html`${DeleteButton(delete_button_href)}` : ""}
      </div>
    </li>
  `;
};

/**
 * Template for a list
 *
 * @param {string} title
 * @param {ListItemTemplateOptions[]} items
 * @param {string} empty_message
 *
 */
export const ListTemplate = (title, items, empty_message) => {
  return html`
    <h2 class="title">${title}</h2>
    <ul class="list">
      ${items.length ? items.map((item) => ListItemTemplate(item)) : html`<p>${empty_message}</p>`}
    </ul>
  `;
};
