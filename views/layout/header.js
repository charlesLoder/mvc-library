//@ts-check
import { html } from "hono/html";

const Header = () => {
  //prettier-ignore
  return html
    `<header>
      <div class="container">
        <div class="title"><a href="/">MVC Library</a></div>
      </div>
    </header>`;
};

export { Header };
