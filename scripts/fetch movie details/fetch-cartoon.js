import { fetchGenreContent2 } from "../fetch-by-genre.js";

const apiKey = "2d202e9510d7a1a79d7bc642da35995e";

async function fetchCartoon() {
  // const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16&with_origin_country=US&sort_by=popularity.desc`;
  // const movies = await fetchData(url);
  fetchGenreContent2(16, document.querySelector(".cartoon"), "en");
}

export { fetchCartoon };
