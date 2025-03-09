import { fetchGenreContent } from "../fetch-by-genre.js";

async function fetchFamily() {
  fetchGenreContent(10751, document.querySelector(".family"));
}

export { fetchFamily };
