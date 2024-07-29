//@ts-check
import { html } from "hono/html";
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
                    <a class="button button-show" href="/${basePath}/${record.id}">Show</a>
                    <a class="button button-edit" href="/${basePath}/${record.id}/edit">Edit</a>
                  </div>
                </li>
              `
            })
          : "Nothing to see here"}
      </ul>
      <div>
        <a class="button button-show" href="/${basePath}/new">New</a>
      </div>
      `
  );
};
