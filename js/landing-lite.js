document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("ewIntro");
  const skip = document.getElementById("ewSkipIntro");
  const fill = document.getElementById("ewIntroFill");
  const percent = document.getElementById("ewIntroPercent");

  function closeIntro(){
    if (!intro) return;
    intro.classList.add("hidden");
    intro.style.display = "none";
  }

  skip?.addEventListener("click", closeIntro);

  let value = 0;
  const timer = setInterval(() => {
    value += 20;
    if (fill) fill.style.width = Math.min(value, 100) + "%";
    if (percent) percent.textContent = Math.min(value, 100) + "%";
    if (value >= 100) {
      clearInterval(timer);
      setTimeout(closeIntro, 200);
    }
  }, 100);

  const revealItems = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("in-view"));
  }
});
