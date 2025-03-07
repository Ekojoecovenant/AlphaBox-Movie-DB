/* IMPORrTING ALL EXTERNAL JS FILES */

// fetch-suggestions.js
import { fetchSuggestions } from "./fetch movie details/fetch-suggestions.js";

// fetch-trending-now.js
import { fetchTrendingMovies } from "./fetch movie details/fetch-trending-now.js";

// fetch-popular-movies.js
import { fetchPopularMovies } from "./fetch movie details/fetch-popular-movies.js";

// fetch-anime.js
import { fetchAnime } from "./fetch movie details/fetch-anime.js";

// fetch-cartoon.js
import { fetchCartoon } from "./fetch movie details/fetch-cartoon.js";

// fetch-top-movies.js
import { fetchTopMovies } from "./fetch movie details/fetch-top-movies.js";

// fetch-tv-shows.js
import { fetchTvShows } from "./fetch movie details/fetch-tv-shows.js";

function main() {
  fetchSuggestions();
  fetchTrendingMovies();
  fetchPopularMovies();
  fetchAnime();
  fetchCartoon();
  fetchTopMovies();
  fetchTvShows();
}

document.addEventListener("DOMContentLoaded", main);
