import { displayMovies, fetchData } from "./fetch-movies.js";

const apiKey = "2d202e9510d7a1a79d7bc642da35995e";

async function fetchAnime() {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16&with_origin_country=JP&sort_by=popularity.desc`;
  const movies = await fetchData(url);
  displayMovies(movies, document.querySelector(".anime"));
}

export { fetchAnime };
