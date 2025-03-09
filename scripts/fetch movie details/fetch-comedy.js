import { fetchGenreContent } from "../fetch-by-genre.js";

async function fetchComedy() {
  fetchGenreContent(35, document.querySelector(".comedy"));
}

export { fetchComedy };
