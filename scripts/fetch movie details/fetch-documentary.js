import { fetchGenreContent } from "../fetch-by-genre.js";

async function fetchDocumentary() {
  fetchGenreContent(99, document.querySelector(".documentary"));
}

export { fetchDocumentary };
