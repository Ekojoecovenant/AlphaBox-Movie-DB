import { displayMovies, fetchData } from "./fetch-movies.js";

const apiKey = "2d202e9510d7a1a79d7bc642da35995e";

async function fetchPopularMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
  const movies = await fetchData(url);
  displayMovies(movies, document.querySelector(".popular-movies"));
}

export { fetchPopularMovies };
