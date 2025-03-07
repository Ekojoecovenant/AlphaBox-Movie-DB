import { displayMovies, fetchData } from "./fetch-movies.js";

const apiKey = "2d202e9510d7a1a79d7bc642da35995e";

async function fetchTopMovies() {
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
  const movies = await fetchData(url);
  displayMovies(movies, document.querySelector(".top-movies"));
}

export { fetchTopMovies };
