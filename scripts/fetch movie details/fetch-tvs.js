const apiKey = "2d202e9510d7a1a79d7bc642da35995e";

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.results; // TMDB API returns results in a 'results' array
}

async function fetchTvDetails(tvId) {
  const url = `https://api.themoviedb.org/3/tv/${tvId}?api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function displayTvs(tvs, tvContainer) {
  tvContainer.innerHTML = ""; // Clear previous results
  for (const tv of tvs) {
    const tvDetails = await fetchTvDetails(tv.id); // Fetch additional details
    console.log("\nMovie Details:\n", tvDetails);

    tvContainer.innerHTML += `
            <div class=movieSum>
                <img src="https://image.tmdb.org/t/p/w200${tv.poster_path}" alt="${tv.title}">
                <p>${tv.title}</p>
            </div>
        `;
  }
}

export { displayTvs, fetchData as "fetchTvData" };
