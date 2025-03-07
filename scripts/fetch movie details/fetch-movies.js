const apiKey = "2d202e9510d7a1a79d7bc642da35995e";

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.results; // TMDB API returns results in a 'results' array
}

async function fetchMovieDetails(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function displayMovies(movies, moviesContainer) {
  moviesContainer.innerHTML = ""; // Clear previous results
  for (const movie of movies) {
    const movieDetails = await fetchMovieDetails(movie.id); // Fetch additional details
    // console.log("\nMovie Details:\n", movieDetails);

    moviesContainer.innerHTML += `
            <div class=movieSum>
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
                <p>${movie.title}</p>
            </div>
        `;
  }
}

export { displayMovies, fetchData };
