import { fetchGenreContent } from "../fetch-by-genre.js";

async function fetchMystery() {
  fetchGenreContent(9648, document.querySelector(".mystery"));
}

export { fetchMystery };
