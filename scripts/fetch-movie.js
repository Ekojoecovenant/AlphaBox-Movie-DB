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

// fetch-adventure.js
import { fetchAdventure } from "./fetch movie details/fetch-adventure.js";

// fetch-action.js
import { fetchAction } from "./fetch movie details/fetch-action.js";

// fetch-comedy.js
import { fetchComedy } from "./fetch movie details/fetch-comedy.js";

// fetch-drama.js
import { fetchDrama } from "./fetch movie details/fetch-drama.js";

// fetch-documentary.js
import { fetchDocumentary } from "./fetch movie details/fetch-documentary.js";

// fetch-family.js
import { fetchFamily } from "./fetch movie details/fetch-family.js";

// fetch-mystery.js
import { fetchMystery } from "./fetch movie details/fetch-mystery.js";

// fetch-crime.js
import { fetchCrime } from "./fetch movie details/fetch-crime.js";

// fetch-kdrama.js
import { fetchKDrama } from "./fetch movie details/fetch-kdrama.js";

// fetch-science-fiction.js
import { fetchScienceFiction } from "./fetch movie details/fetch-science-fiction.js";

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
  fetchAdventure();
  fetchAction();
  fetchComedy();
  fetchTopMovies();
  fetchDrama();
  fetchDocumentary();
  fetchFamily();
  fetchMystery();
  fetchCrime();
  fetchKDrama();
  fetchScienceFiction();
  // fetchTvShows();
}

document.addEventListener("DOMContentLoaded", main);
