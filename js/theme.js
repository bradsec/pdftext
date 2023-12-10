document.addEventListener("DOMContentLoaded", () => {
  const themeSwitcher = document.getElementById("theme-switcher");

  function setTheme(theme) {
    const body = document.body;
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    const sunIcon = document.getElementById("sun-icon");
    const moonIcon = document.getElementById("moon-icon");

    if (theme === "dark") {
      body.setAttribute("data-theme", "dark");
      themeColorMeta.content = "#202020";
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    } else {
      body.removeAttribute("data-theme");
      themeColorMeta.content = "#FFFFFF";
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    }
  }

  // Load saved theme from local storage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme("light");
  }

  themeSwitcher.addEventListener("click", () => {
    const body = document.body;
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });
});


function displayFlashMessage(message, type) {
  const flashBannerContainer = document.querySelector(
    ".flash-banner-container"
  );

  // Remove existing color classes
  flashBannerContainer.classList.remove(
    "flash-banner-success",
    "flash-banner-danger",
    "flash-banner-warning",
    "flash-banner-info"
  );

  // Add the class for the specified type
  switch (type) {
    case "danger":
      flashBannerContainer.classList.add("flash-banner-danger");
      break;
    case "warning":
      flashBannerContainer.classList.add("flash-banner-warning");
      break;
    case "success":
      flashBannerContainer.classList.add("flash-banner-success");
      break;
    case "info":
      flashBannerContainer.classList.add("flash-banner-info");
      break;
    default:
      flashBannerContainer.classList.add("flash-banner-success");
  }

  // Set the message and show the banner
  flashBannerContainer.textContent = message;
  flashBannerContainer.style.display = "block";

  // Hide the banner after a delay
  setTimeout(function () {
    flashBannerContainer.style.display = "none";
  }, 3000);
}