const toggleBtn = document.getElementById("dark-light-mode");

let isDarkMode = true;

toggleBtn.addEventListener("click", function () {
  if (isDarkMode) {
    document.documentElement.style.setProperty("--main-bg-color", "#ddd");
    document.documentElement.style.setProperty("--bg-shades", "#aaa");
    document.documentElement.style.setProperty("--main-text-color", "#111");
    document.documentElement.style.setProperty(
      "--searchBorder-focus-color",
      "#222"
    );
    document.documentElement.style.setProperty("--searchBorder-color", "#ccc");
    document.documentElement.style.setProperty("--title-color", "black");
    document.documentElement.style.setProperty("--details-shade", "#fff");
    toggleBtn.src = "./media/Icons/light-mode.png";
  } else {
    document.documentElement.style.setProperty("--main-bg-color", "#111");
    document.documentElement.style.setProperty("--bg-shades", "#444");
    document.documentElement.style.setProperty("--main-text-color", "#aaa");
    document.documentElement.style.setProperty(
      "--searchBorder-focus-color",
      "#fff"
    );
    document.documentElement.style.setProperty("--searchBorder-color", "#777");
    document.documentElement.style.setProperty("--title-color", "#fff");
    document.documentElement.style.setProperty("--details-shade", "#222");
    toggleBtn.src = "./media/Icons/dark-mode.png";
  }

  isDarkMode = !isDarkMode;
});
