// @ts-check
import { html } from "hono/html";
export function DeleteForm({ href, text }) {
  return html`
    <form action="${href}" method="post" class="stack">
      <div class="field">
        <div>
          <input class="button" data-button-variant="delete" type="submit" value="${text}" />
        </div>
      </div>
    </form>
  `;
}
