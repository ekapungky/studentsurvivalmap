document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("map-active");

  const mapPage = document.getElementById("mapPage");
  if (mapPage) mapPage.classList.remove("hidden");

  const backHomeBtn = document.getElementById("backHomeBtn");
  if (backHomeBtn) {
    backHomeBtn.addEventListener("click", event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.href = "index.html";
    }, true);
  }

  if (typeof initMap === "function") {
    initMap();
  }
});
