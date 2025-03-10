// Back to the home page from the search page using the home button
function backHomeFromSearch() {
  hide();
  mainD();
  setTimeout(display, 300);
}

function mainD() {
  document.querySelector(".main").style.display = "flex";
  document.querySelector(".search").style.display = "none";
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
document.addEventListener("DOMContentLoaded", function () {
  const searchToHomeBtn = document.getElementById("searchToHomeBtn");

  searchToHomeBtn.addEventListener("click", backHomeFromSearch);
});
