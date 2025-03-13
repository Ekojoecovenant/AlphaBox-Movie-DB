export async function getTrailerDetails(id, type) {
  const apiKey = "2d202e9510d7a1a79d7bc642da35995e";

  // content ids
  const $dtitle = document.getElementById("details-title");
  const $title = document.getElementById("trailer-title");
  const $date = document.getElementById("trailer-date");
  const $rating = document.getElementById("trailer-rating");
  const $overview = document.getElementById("trailer-overview");
  const $genre = document.getElementById("trailer-genre");

  // divs
  const starring = document.querySelector(".starring");
  const recommendations = document.querySelector(".recommendations");

  const content =
    type === "movie"
      ? await getMovieDetails(id, apiKey)
      : await getTvShowDetails(id, apiKey);

  // to clear the divs
  starring.innerHTML = "";
  recommendations.innerHTML = "";

  // Displaying the movie/tv show details
  $dtitle.innerText = content.title;
  $title.innerText = content.title;
  $date.innerText = content.date;
  $rating.innerText = content.rating;
  $overview.innerText = content.overview;
  $genre.innerText = content.genres;

  //   console.log(content.cast);
  //   console.log(content.recommendations);

  // for the movie/tv show cast
  for (let i = 0; i < content.cast.length; i++) {
    starring.innerHTML += `
            <div class="cast">
                <img src="${content.cast[i].image}" alt="${content.cast[i].name}">
                <p><strong>${content.cast[i].name}</strong> AS ${content.cast[i].character}</p>
            </div>
        `;
  }

  // for the movie/tv show recommendation based on content
  for (let i = 0; i < content.recommendations.length; i++) {
    recommendations.innerHTML += `
            <div class="movieSum">
                <img src="${content.recommendations[i].image}" alt="${
      content.recommendations[i].title
    }">
                <p>${content.recommendations[i].title} (${
      content.recommendations[i].type === "movie" ? "Movie" : "Tv Show"
    })</p>
            </div>
        `;
  }

  if (!recommendations.innerHTML) {
    recommendations.innerHTML = "<p>No Recommendation</p>";
  }
}

// to get the details for movies
async function getMovieDetails(id, apiKey) {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits,recommendations`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const movieDetails = {
      id: id,
      type: "movie",
      title: data.title,
      date: data.release_date,
      rating: data.vote_average.toFixed(1),
      overview: data.overview,
      genres: data.genres.map((genre) => genre.name).join(", "),
      cast: data.credits.cast.slice(0, 30).map((member) => ({
        name: member.name,
        character: member.character,
        image: member.profile_path
          ? `https://image.tmdb.org/t/p/w500${member.profile_path}`
          : "../media/Images/noImage.jpg",
      })),
      recommendations: data.recommendations.results.map((rec) => ({
        id: rec.id,
        title: rec.title || rec.name,
        type: rec.media_type || (rec.title ? "movie" : "tv"),
        image: rec.poster_path
          ? `https://image.tmdb.org/t/p/w500${rec.poster_path}`
          : "../media/Images/noImage.jpg",
      })),
    };

    return movieDetails;
  } catch (error) {
    console.error("Error in the getMovieDetails()");
  }
}

// to get the details for tv shwos
async function getTvShowDetails(id, apiKey) {
  const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&append_to_response=aggregate_credits,recommendations`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const tvShowDetails = {
      id: id,
      type: "tv",
      title: data.name,
      date: data.first_air_date,
      rating: data.vote_average.toFixed(1),
      overview: data.overview,
      genres: data.genres.map((genre) => genre.name).join(", "),
      cast: data.aggregate_credits.cast.slice(0, 30).map((member) => ({
        name: member.name,
        character:
          member.roles.length > 0
            ? member.roles.map((role) => role.character).join(", ")
            : "Unknown",
        //   member.roles.length > 0 ? member.roles[0].character : "Unknown",
        image: member.profile_path
          ? `https://image.tmdb.org/t/p/w500${member.profile_path}`
          : "../media/Images/noImage.jpg",
      })),
      recommendations: data.recommendations.results.map((rec) => ({
        id: rec.id,
        title: rec.title || rec.name,
        type: rec.media_type || (rec.title ? "movie" : "tv"),
        image: rec.poster_path
          ? `https://image.tmdb.org/t/p/w500${rec.poster_path}`
          : "../media/Images/noImage.jpg",
      })),
    };

    return tvShowDetails;
  } catch (error) {
    console.error("Error in the getTvShowDetails()");
  }
}
