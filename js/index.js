/* Landing page script: ringan, tidak memuat Leaflet/XLSX */
(function(){
  function forceCloseIntro(){
    const intro = document.getElementById("ewIntro");
    const fill = document.getElementById("ewIntroFill");
    const percent = document.getElementById("ewIntroPercent");

    if (fill) fill.style.width = "100%";
    if (percent) percent.textContent = "100%";

    if (!intro) return;
    intro.classList.add("hide", "force-hide");
    intro.setAttribute("hidden", "hidden");
    intro.style.setProperty("display", "none", "important");
    intro.style.setProperty("visibility", "hidden", "important");
    intro.style.setProperty("opacity", "0", "important");
    intro.style.setProperty("pointer-events", "none", "important");
    document.body.classList.remove("ew-intro-active");
  }

  function setupIntro(){
    const intro = document.getElementById("ewIntro");
    const skipBtn = document.getElementById("ewSkipIntro");
    const fill = document.getElementById("ewIntroFill");
    const percent = document.getElementById("ewIntroPercent");

    if (!intro || !fill || !percent) return;

    document.body.classList.add("ew-intro-active");

    let progress = 0;
    let introDone = false;

    const progressTimer = setInterval(() => {
      if (introDone) return;

      const increment = progress < 70 ? 6 : progress < 92 ? 3 : 2;
      progress = Math.min(progress + increment, 100);

      fill.style.width = progress + "%";
      percent.textContent = progress + "%";

      if (progress >= 100) {
        clearInterval(progressTimer);
        setTimeout(closeIntro, 350);
      }
    }, 55);

    function closeIntro(){
      if (introDone) return;
      introDone = true;
      clearInterval(progressTimer);
      forceCloseIntro();
    }

    if (skipBtn) skipBtn.addEventListener("click", closeIntro, true);
    window.addEventListener("keydown", e => {
      if (e.key === "Escape") closeIntro();
    });

    window.addEventListener("load", () => setTimeout(closeIntro, 900));
    setTimeout(closeIntro, 3500);
  }

  function setupReveal(){
    const items = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

    if (!("IntersectionObserver" in window)) {
      items.forEach(item => item.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach(item => observer.observe(item));
  }

  function setupNavigation(){
    const openMap = () => { window.location.href = "map.html"; };

    const enterMapBtn = document.getElementById("enterMapBtn");
    const enterMapBtnBottom = document.getElementById("enterMapBtnBottom");

    if (enterMapBtn) enterMapBtn.addEventListener("click", openMap);
    if (enterMapBtnBottom) enterMapBtnBottom.addEventListener("click", openMap);
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupIntro();
    setupReveal();
    setupNavigation();
  });
})();