import { shuffleArray } from "../random.js";

const apiKey = "2d202e9510d7a1a79d7bc642da35995e";

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.results; // TMDB API returns results in a 'results' array
}

async function displayContent(content, contentContainer) {
  contentContainer.innerHTML = ""; // Add category heading
  for (const item of content) {
    contentContainer.innerHTML += `
          <div class=movieSum>
            <img src="https://image.tmdb.org/t/p/w200${item.poster_path}" id="${
      item.id
    }" alt="${item.title || item.name}">
            <p>${item.title || item.name} (${
      item.media_type === "movie" ? "Movie" : "TV Show"
    })</p>
          </div>`;
  }
}

async function fetchPopularMovies() {
  // Fetch movies of the specified genre
  const movies = await fetchData(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
  );
  // Fetch TV shows of the specified genre
  const tvShows = await fetchData(
    `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
  );

  // Add a `media_type` field to distinguish between movies and TV shows
  const moviesWithType = movies.map((movie) => ({
    ...movie,
    media_type: "movie",
  }));
  const tvShowsWithType = tvShows.map((tv) => ({ ...tv, media_type: "tv" }));

  // Combine movies and TV shows into a single array
  const combinedContent = [...moviesWithType, ...tvShowsWithType];

  // Shuffle the combined array to mix movies and TV shows
  const shuffledContent = shuffleArray(combinedContent);

  // Display the combined content
  await displayContent(
    shuffledContent.slice(0, 20),
    document.querySelector(".popular-movies")
  ); // Display top 20 results
}

export { fetchPopularMovies };
