import { fetchGenreContent } from "../fetch-by-genre.js";

async function fetchDrama() {
  fetchGenreContent(18, document.querySelector(".drama"));
}

export { fetchDrama };
