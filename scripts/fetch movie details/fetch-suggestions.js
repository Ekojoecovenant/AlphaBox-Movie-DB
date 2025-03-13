import { shuffleArray } from "../random-export.js";
import { getContentTrailers } from "../details.js";

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
            <img src="https://image.tmdb.org/t/p/w200${
              item.poster_path
            }" class="contentImg" data-my-id="${item.id}" data-my-type="${
      item.media_type
    }" alt="${item.title || item.name}">
            <p>${item.title || item.name} (${
      item.media_type === "movie" ? "Movie" : "TV Show"
    })</p>
          </div>`;
  }

  const IMG = document.querySelectorAll(".contentImg");
  for (const img of IMG) {
    const id = img.getAttribute("data-my-id");
    const type = img.getAttribute("data-my-type");

    img.style.cursor = "pointer";
    img.addEventListener("click", function () {
      getContentTrailers(id, type);
    });
  }
}

async function fetchSuggestions() {
  // Fetch movies of the specified genre
  const movies = await fetchData(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
  );
  // Fetch TV shows of the specified genre
  const tvShows = await fetchData(
    `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`
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
    document.querySelector(".suggestions")
  ); // Display top 8 results
}

export { fetchSuggestions };
