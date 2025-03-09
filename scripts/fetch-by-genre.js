import { shuffleArray } from "./random.js";

const apiKey = "2d202e9510d7a1a79d7bc642da35995e";

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.results; // TMDB API returns results in a 'results' array
}

async function fetchDetails(id, type) {
  const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function displayContent(content, contentContainer) {
  contentContainer.innerHTML = ""; // Add category heading
  for (const item of content) {
    // const details = await fetchDetails(item.id, item.media_type); // Fetch additional details

    contentContainer.innerHTML += `
          <div class=movieSum>
            <img src="https://image.tmdb.org/t/p/w200${item.poster_path}" id="${
      item.id
    }" alt="${item.title || item.name}">
            <p>${item.title || item.name} (${
      item.media_type === "movie" ? "Movie" : "TV Show"
    })</p>
          </div>`;

    // moviesContainer.appendChild(itemElement);
  }
}

async function fetchGenreContent(genreId, contentContainer) {
  // Fetch movies of the specified genre
  const movies = await fetchData(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=vote_average.desc`
  );
  // Fetch TV shows of the specified genre
  const tvShows = await fetchData(
    `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genreId}&sort_by=vote_average.desc`
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
  await displayContent(shuffledContent.slice(0, 20), contentContainer); // Display top 8 results
}

async function fetchGenreContent2(genreId, contentContainer, language) {
  const movies = await fetchData(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&with_original_language=${language}`
  );
  const tvShows = await fetchData(
    `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genreId}&with_original_language=${language}`
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
  await displayContent(shuffledContent.slice(0, 20), contentContainer); // Display top 8 results
}

async function fetchGenreContent3(movieId, tvId, contentContainer) {
  // Fetch movies of the specified genre
  const movies = await fetchData(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${movieId}&sort_by=vote_average.desc`
  );
  // Fetch TV shows of the specified genre
  const tvShows = await fetchData(
    `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${tvId}&sort_by=vote_average.desc`
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
  await displayContent(shuffledContent.slice(0, 20), contentContainer); // Display top 8 results
}

export {
  fetchGenreContent,
  fetchGenreContent2,
  fetchGenreContent3,
  displayContent,
  fetchData,
};
