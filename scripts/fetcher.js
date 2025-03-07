import { shuffleArray } from "./random";

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

async function displayContent(content, moviesContainer) {
  // moviesContainer.innerHTML += `<h2>${category}</h2>`; // Add category heading
  for (const item of content) {
    const details = await fetchDetails(item.id, item.media_type); // Fetch additional details

    const itemElement = document.createElement("div");
    itemElement.classList.add("item");

    // Extract director (for movies) or creator (for TV shows)
    let directorOrCreator = "Unknown";
    if (item.media_type === "movie") {
      const creditsUrl = `https://api.themoviedb.org/3/movie/${item.id}/credits?api_key=${apiKey}`;
      const creditsResponse = await fetch(creditsUrl);
      const creditsData = await creditsResponse.json();
      directorOrCreator =
        creditsData.crew.find((person) => person.job === "Director")?.name ||
        "Unknown";
    } else if (item.media_type === "tv") {
      directorOrCreator =
        details.created_by.map((creator) => creator.name).join(", ") ||
        "Unknown";
    }

    // Extract genres
    const genres = details.genres.map((genre) => genre.name).join(", ");

    itemElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${
              item.poster_path
            }" alt="${item.title || item.name}">
            <h2>${item.title || item.name}</h2>
            <p><strong>Type:</strong> ${
              item.media_type === "movie" ? "Movie" : "TV Show"
            }</p>
            <p><strong>Release Date:</strong> ${
              item.release_date || item.first_air_date
            }</p>
            <p><strong>Rating:</strong> ${item.vote_average}</p>
            <p><strong>Genre:</strong> ${genres}</p>
            <p><strong>${
              item.media_type === "movie" ? "Director" : "Creator"
            }:</strong> ${directorOrCreator}</p>
            <p><strong>Overview:</strong> ${item.overview}</p>
        `;

    moviesContainer.appendChild(itemElement);
  }
}

async function fetchGenreContent(genreId, genreName) {
  // Fetch movies of the specified genre
  const movies = await fetchData(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
  );
  // Fetch TV shows of the specified genre
  const tvShows = await fetchData(
    `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genreId}`
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
  await displayContent(shuffledContent.slice(0, 8), genreName); // Display top 8 results
}

// Fetch and display Animation genre content (genre ID: 16)
window.onload = () => fetchGenreContent(16, "Animation (Movies & TV Shows)");
