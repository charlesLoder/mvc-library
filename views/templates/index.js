// @ts-check
import { html } from "hono/html";
import { BaseButton } from "../../views/templates/partials/buttons.js";
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
 * @param {object} data.pagination
 * @param {number} data.pagination.size the number of records to display per page
 * @param {number} data.pagination.offset the offset for pagination
 * @param {number} data.pagination.total the total number of records
 */
export const IndexTemplate = (context, { title, message, records, basePath, pagination }) => {
  const isAdmin = context.get("is_admin");
  const hasPagination = pagination && pagination.total > pagination.size;
  return Base(
    context,
    //prettier-ignore
    html`
      ${ListTemplate(context, title, records.map(r => {
        return  {
          title: r.text,
          show_button_href: `/${basePath}/${r.id}`,
          edit_button_href: `/${basePath}/${r.id}/edit`
        }
      }), "No records")}
      ${hasPagination
        ? html`
            <div class="row pagination">
              <p>Showing ${pagination.offset + 1} to ${Math.min(pagination.offset + pagination.size, pagination.total)} of ${pagination.total} records</p>
              <div>
                ${pagination.offset > 0 ?
                  BaseButton({ href: `/${basePath}?offset=${Math.max(pagination.offset - pagination.size, 0)}&size=${pagination.size}`, text: "Previous" })
                  : ""
                }
                ${pagination.total > (pagination.offset + pagination.size) ?
                  BaseButton({ href: `/${basePath}?size=${pagination.size}&offset=${pagination.offset + pagination.size}`, text: "Next" })
                  : ""
                }
              </div>
            </div>
          `
        : ""}
      ${isAdmin 
        ? html`
            <div>
              ${BaseButton({ href: `/${basePath}/new`, text: "New" })}
            </div>
          `
        : ""}
      
    `
  );
};
