import { fetchGenreContent } from "../fetch-by-genre.js";

async function fetchCrime() {
  fetchGenreContent(80, document.querySelector(".crime"));
}

export { fetchCrime };
