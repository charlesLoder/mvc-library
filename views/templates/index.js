//@ts-check
import { html } from "hono/html";
import { DefaultButton, EditButton, ShowButton } from "../../views/templates/partials/buttons.js";
import { Base } from "../layout/base.js";

/**
 * Displays a list of records
 *
 * @param {object} data
 * @param {string} data.title the h1 of the page
 * @param {string=} data.message the message to be displayed
 * @param {object[]} data.records the records to be displayed
 * @param {string} data.records[].text the text to be displayed
 * @param {number} data.records[].id the id of the record
 * @param {string} data.basePath the base path for the records
 * @returns
 */
export const IndexTemplate = ({ title, message, records, basePath }) => {
  return Base(
    //prettier-ignore
    html`
      <h1 class="title">${title}</h1>
      ${message ? html`<p class="message">${message}</p>` : ""}
      <ul class="list">
          ${records.length ? records.map((record) =>
            {
              return html`
                <li class="list-item">
                  <div class="item-title">${record.text}</div>
                  <div class="item-buttons">
                    ${ShowButton(`/${basePath}/${record.id}`)}
                    ${EditButton(`/${basePath}/${record.id}/edit`)}
                  </div>
                </li>
              `
            })
          : "Nothing to see here"}
      </ul>
      <div>
        ${DefaultButton({ href: `/${basePath}/new`, text: "New" })}
      </div>
      `
  );
};
