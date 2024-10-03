// @ts-check
import { html } from "hono/html";

/**
 *
 * @param {Object} options
 * @param {string=} options.heading
 * @param {(string | ReturnType<typeof html>)=} options.body
 * @param {string=} options.variant
 */
export function BaseCallout({ heading, body, variant }) {
  return html`
    <div class="callout" ${variant ? `data-callout-variant=${variant}` : ""}>
      ${heading ? html`<p class="heading">${heading}</p>` : ``}
      ${body ? html`<p class="body">${body}</p>` : ``}
    </div>
  `;
}

/**
 * An error callout
 *
 * @param {(string | ReturnType<typeof html>)=} body
 */
export function ErrorCallout(body) {
  return BaseCallout({
    heading: "An error occured",
    variant: "error",
    body,
  });
}

/**
 * A warning callout
 *
 * @param {Object} options
 * @param {string=} options.heading
 * @param {(string | ReturnType<typeof html>)=} options.body
 */
export function WarningCallout({ heading, body }) {
  return BaseCallout({
    heading,
    variant: "warning",
    body,
  });
}
