// @ts-check
import { html } from "hono/html";

/**
 *
 * @param {Object} options
 * @param {string} options.href
 * @param {string} options.text
 * @param {string=} options.variant
 */
export function BaseButton({ href, text, variant }) {
  return html`<a class="button" ${variant ? `data-button-variant=${variant}` : ""} href="${href}"
    >${text}</a
  >`;
}

/**
 *
 * @param {string} href
 */
export function ShowButton(href) {
  return BaseButton({
    text: "Show",
    href,
  });
}

/**
 *
 * @param {string} href
 */
export function EditButton(href) {
  return BaseButton({
    text: "Edit",
    variant: "edit",
    href,
  });
}

/**
 *
 * @param {string} href
 */
export function DeleteButton(href) {
  return BaseButton({
    text: "Delete",
    variant: "delete",
    href,
  });
}
