import { fetchGenreContent } from "../fetch-by-genre.js";

async function fetchAdventure() {
  fetchGenreContent(12, document.querySelector(".adventure"));
}

export { fetchAdventure };
