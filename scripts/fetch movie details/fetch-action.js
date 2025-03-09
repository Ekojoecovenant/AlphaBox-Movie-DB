import { fetchGenreContent } from "../fetch-by-genre.js";

const apiKey = "2d202e9510d7a1a79d7bc642da35995e";

async function fetchAction() {
  fetchGenreContent(28, document.querySelector(".action"));
}

export { fetchAction };
