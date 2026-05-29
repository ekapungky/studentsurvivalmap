/* FIX RADIUS 5 KM ONLY */
  window.FIXED_WEBGIS_RADIUS = 5000;

  document.addEventListener("DOMContentLoaded", function () {
    const radiusSelectFixed = document.getElementById("radiusSelect");
    if (radiusSelectFixed) {
      radiusSelectFixed.value = "5000";
      radiusSelectFixed.style.display = "none";
    }
  });
