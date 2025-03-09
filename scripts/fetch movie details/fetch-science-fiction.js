import { fetchGenreContent } from "../fetch-by-genre.js";

async function fetchScienceFiction() {
  fetchGenreContent(878, document.querySelector(".science-fiction"));
}

export { fetchScienceFiction };
