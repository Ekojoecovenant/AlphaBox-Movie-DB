import { filterImages } from "./filter-image.js";
import { getContentTrailers } from "./details.js";

const apiKey = "2d202e9510d7a1a79d7bc642da35995e";

const searchBtn = document.querySelector(".search-icon"); // For the search button

// The Divs holding the display items
const mainDiv = document.querySelector(".main");
const searchDiv = document.querySelector(".search");
const detailsDiv = document.querySelector(".details");
const resultDiv = document.getElementById("searchDiv");

// the function to get the searched content and return the match
async function searchContent(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

//  the function to display the movies or tv shows
function displaySearch(result) {
  resultDiv.innerHTML = ""; // to clear the predefined/previous result

  if (result.length === 0) {
    resultDiv.innerHTML = `
    <div class='movieSum'>
        <h2 style="width: 100%; text-align: center;">No result found</h2>
    </div>`;
    return;
  }

  for (const item of result) {
    resultDiv.innerHTML += `
    <div class='movieSum'>
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
  console.log("Reached here 1");
  for (const img of IMG) {
    const id = img.getAttribute("data-my-id");
    const type = img.getAttribute("data-my-type");
    console.log("Reached here 2");

    img.style.cursor = "pointer";
    img.addEventListener("click", function () {
      getContentTrailers(id, type);
    });
  }
}

// The function to search for the inputted value from the db
async function search() {
  hide();
  const searchInput = document.getElementById("search-input").value; // For the input field
  document.getElementById("searched").innerText = `"${searchInput.trim()}"`;

  if (!searchInput) {
    // alert('Invalid Input');
    setTimeout(display, 300);
    mainD();
    return;
  }

  searchD();

  // to fetch the movies of a particular genre
  const movies = await searchContent(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      searchInput
    )}`
  );
  // to fetch the  TV shows of a particular genre
  const tvShows = await searchContent(
    `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(
      searchInput
    )}`
  );

  // adding a `media_type` key to the each object to differenciate between movies and TV shows
  const moviesWithType = movies.map((movie) => ({
    ...movie,
    media_type: "movie",
  }));
  const tvShowsWithType = tvShows.map((tv) => ({ ...tv, media_type: "tv" }));

  // Combine movies and TV shows into a single array
  const combinedContent = [...moviesWithType, ...tvShowsWithType];

  // Filter the array to remove content with broken images
  const filteredContent = filterImages(combinedContent);

  // Display the combined content
  await displaySearch(filteredContent);

  setTimeout(display, 1000);
}

searchBtn.addEventListener("click", search);

function mainD() {
  mainDiv.style.display = "flex";
  searchDiv.style.display = "none";
  detailsDiv.style.display = "none";
}

function searchD() {
  mainDiv.style.display = "none";
  searchDiv.style.display = "flex";
  detailsDiv.style.display = "none";
}

function display() {
  document.querySelector(".loader").style.display = "none";
  document.querySelector(".body").style.display = "unset";
}

function hide() {
  document.querySelector(".loader").style.display = "flex";
  document.querySelector(".body").style.display = "none";
}
