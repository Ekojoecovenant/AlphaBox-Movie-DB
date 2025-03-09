import { fetchGenreContent2 } from "../fetch-by-genre.js";

async function fetchKDrama() {
  fetchGenreContent2(18, document.querySelector(".k-drama"), "ko");
}

export { fetchKDrama };
