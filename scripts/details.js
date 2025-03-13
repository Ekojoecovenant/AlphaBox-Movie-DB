import { getTrailerDetails } from "./trailer-details.js";

// function to fetch the trauler of a specific movie / tv show
async function getContentTrailers(movieId, type) {
  hide();
  displayDetailsPage();

  const apiKey = "2d202e9510d7a1a79d7bc642da35995e";
  const url = `https://api.themoviedb.org/3/${type}/${movieId}/videos?api_key=${apiKey}&language=en-US`;

  try {
    const response = await fetch(`${url}`);
    if (!response.ok) {
      //   throw new Error(`Error: ${response.status}`);
      return [];
    }

    const data = await response.json();
    const videos = data.results || [];

    // Filter trailers
    const trailers = videos.filter((video) => video.type === "Trailer");
    updateTrailer(trailers);
    getTrailerDetails(movieId, type);
  } catch (error) {
    console.error("Error fetching trailers:", error);
    return [];
  }
}

// Function to update the iframe with the trailer
function updateTrailer(trailers) {
  // Get the iframe element
  const trailerIframe = document.querySelector(".trailer iframe");

  if (trailers.length > 0) {
    const trailer = trailers[0];

    let trailerURL = "";
    switch (trailer.site) {
      case "YouTube":
        trailerURL = `https://www.youtube.com/embed/${trailer.key}`;
        break;
      case "Vimeo":
        trailerURL = `https://player.vimeo.com/video/${trailer.key}`;
        break;
      case "Dailymotion":
        trailerURL = `https://www.dailymotion.com/embed/video/${trailer.key}`;
        break;
      default:
        trailerURL = "../noImage.html"; // Trailer not found
        break;
    }
    trailerIframe.src = trailerURL;
  } else {
    trailerIframe.src = "../noImage.html";
  }

  setTimeout(display, 1000);
}

export { getContentTrailers };

function displayDetailsPage() {
  document.querySelector(".main").style.display = "none";
  document.querySelector(".search").style.display = "none";
  document.querySelector(".details").style.display = "flex";
}

function display() {
  document.querySelector(".loader").style.display = "none";
  document.querySelector(".body").style.display = "unset";
}

function hide() {
  document.querySelector(".loader").style.display = "flex";
  document.querySelector(".body").style.display = "none";
}

// onload to declare the essential variables
// setTimeout(function () {
//   const IMG = document.querySelectorAll(".contentImg");
//   console.log("Reached here 1");
//   for (const img of IMG) {
//     const id = img.getAttribute("data-my-id");
//     const type = img.getAttribute("data-my-type");
//     console.log("Reached here 2");

//     img.style.cursor = "pointer";
//     img.addEventListener("click", function () {
//       getContentTrailers(id, type);
//     });
//   }
// }, 6000);
