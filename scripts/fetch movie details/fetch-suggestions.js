import { displayMovies, fetchData } from "./fetch-movies.js";
import { displayTvs, fetchTvData } from "./fetch-tvs.js";
import { shuffleArray } from "../random.js";

const apiKey = "2d202e9510d7a1a79d7bc642da35995e";

async function fetchSuggestions() {
  // Fetch data from multiple endpoints
  const trendingMovies = await fetchData(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
  );
  const popularMovies = await fetchData(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
  );
  const animeMovies = await fetchData(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16`
  ); // Anime
  const dramaMovies = await fetchData(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=18`
  ); // Drama (K-Drama)
  const popularTvs = await fetchData(
    `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
  );
  const animeTvs = await fetchData(
    `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=16`
  ); // Anime

  // Combine results into a single array
  const allMovies = [
    // ...trendingMovies,
    ...dramaMovies,
    // ...popularTvs,
    ...popularMovies,
    ...animeMovies,
  ];

  // Remove duplicates using a Set
  const uniqueMovies = [];
  const movieIds = new Set(); // Track movie IDs to avoid duplicates

  for (const movie of allMovies) {
    if (!movieIds.has(movie.id)) {
      uniqueMovies.push(movie);
      movieIds.add(movie.id);
    }
  }

  // Shuffle the unique movies array to mix the results
  const shuffledSuggestions = shuffleArray(uniqueMovies).slice(0, 20); // Display 20 unique movies

  // Display the suggestions
  displayMovies(shuffledSuggestions, document.querySelector(".suggestions"));
}

export { fetchSuggestions };
