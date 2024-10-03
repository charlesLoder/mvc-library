// @ts-check
import { html } from "hono/html";
import { DefaultButton } from "../../views/templates/partials/buttons.js";
import { Base } from "../layout/base.js";
import { ListTemplate } from "./partials/list.js";

/** @typedef {import("hono").Context} Context */

/**
 * Displays a list of records
 *
 * @param {Context} context
 * @param {object} data
 * @param {string} data.title the h1 of the page
 * @param {string=} data.message the message to be displayed
 * @param {object[]} data.records the records to be displayed
 * @param {string} data.records[].text the text to be displayed
 * @param {number} data.records[].id the id of the record
 * @param {string} data.basePath the base path for the records
 */
export const IndexTemplate = (context, { title, message, records, basePath }) => {
  return Base(
    context,
    //prettier-ignore
    html`
      ${ListTemplate(title, records.map(r => {
        return  {
          title: r.text,
          show_button_href: `/${basePath}/${r.id}`,
          edit_button_href: `/${basePath}/${r.id}/edit`
        }
      }), "No records")}
      <div>
        ${DefaultButton({ href: `/${basePath}/new`, text: "New" })}
      </div>
    `
  );
};
