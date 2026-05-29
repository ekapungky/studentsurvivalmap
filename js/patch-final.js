/* =========================================================
   PATCH FINAL BERSIH
   - Hapus teks script yang tampil di halaman
   - Topbar jadi Panduan / Reset / Beranda
   - Dashboard insight tidak kepotong
   - Map tetap full screen
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const patchStyle = document.createElement("style");
  patchStyle.textContent = `
    body.map-active{
      overflow:hidden !important;
    }

    body.map-active .app{
      height:100vh !important;
      overflow:hidden !important;
    }

    body.map-active .map-page{
      height:100vh !important;
      min-height:100vh !important;
      overflow:hidden !important;
      display:flex !important;
      flex-direction:column !important;
    }

    body.map-active .topbar{
      height:78px !important;
      min-height:78px !important;
      flex-shrink:0 !important;
    }

    body.map-active .content{
      flex:1 !important;
      height:calc(100vh - 78px) !important;
      min-height:0 !important;
      overflow:hidden !important;
      padding:10px !important;
    }

    body.map-active .map-shell{
      width:100% !important;
      height:100% !important;
      min-height:0 !important;
      overflow:hidden !important;
      position:relative !important;
      border-radius:24px !important;
    }

    body.map-active #map,
    body.map-active .leaflet-container{
      width:100% !important;
      height:100% !important;
      min-height:0 !important;
      border-radius:22px !important;
    }

    body.map-active .floating-actions{
      top:12px !important;
      left:12px !important;
      z-index:1300 !important;
    }

    body.map-active .top-controls{
      top:70px !important;
      left:12px !important;
      z-index:1300 !important;
    }

    body.map-active .left-panel{
      top:70px !important;
      left:12px !important;
      z-index:1300 !important;
      max-height:calc(100% - 92px) !important;
    }

    body.map-active .left-panel.shifted{
      top:128px !important;
      max-height:calc(100% - 150px) !important;
    }

    body.map-active .right-panel{
      right:12px !important;
      bottom:12px !important;
      width:300px !important;
      max-height:calc(100% - 24px) !important;
      z-index:1300 !important;
    }

    body.map-active #insightDashboard.energy-index-mode{
      position:absolute !important;
      top:76px !important;
      left:24px !important;
      right:324px !important;
      bottom:24px !important;
      width:auto !important;
      max-width:none !important;
      height:auto !important;
      max-height:none !important;
      overflow:hidden !important;
      padding:0 !important;
      display:grid !important;
      grid-template-columns:minmax(0, 1.08fr) minmax(280px, .72fr) !important;
      gap:14px !important;
      z-index:1150 !important;
    }

    body.map-active #insightDashboard.energy-index-mode.hidden-dashboard{
      opacity:0 !important;
      transform:translateY(-12px) scale(.98) !important;
      pointer-events:none !important;
    }

    body.map-active #insightDashboard.energy-index-mode .insight-card{
      height:100% !important;
      max-height:100% !important;
      min-height:0 !important;
      overflow:hidden !important;
      border-radius:24px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .insight-main{
      padding:16px !important;
      display:flex !important;
      flex-direction:column !important;
      gap:12px !important;
      min-height:0 !important;
    }

    body.map-active #insightDashboard.energy-index-mode .insight-side{
      padding:14px !important;
      display:flex !important;
      flex-direction:column !important;
      gap:10px !important;
      min-height:0 !important;
    }

    body.map-active #insightDashboard.energy-index-mode .insight-head{
      margin-bottom:4px !important;
      flex-shrink:0 !important;
    }

    body.map-active #insightDashboard.energy-index-mode .insight-title{
      font-size:20px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .insight-kicker{
      font-size:10px !important;
      margin-bottom:3px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .insight-pill{
      min-height:30px !important;
      padding:6px 10px !important;
      font-size:10px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .energy-index-hero{
      grid-template-columns:132px minmax(0,1fr) !important;
      gap:14px !important;
      align-items:center !important;
      flex-shrink:0 !important;
    }

    body.map-active #insightDashboard.energy-index-mode .energy-gauge{
      width:126px !important;
      height:126px !important;
      flex-shrink:0 !important;
    }

    body.map-active #insightDashboard.energy-index-mode .energy-gauge::before{
      inset:13px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .energy-gauge::after{
      width:56px !important;
      height:56px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .gauge-value{
      font-size:38px !important;
      line-height:.9 !important;
      letter-spacing:-1px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .gauge-label{
      font-size:9px !important;
      margin-top:5px !important;
      letter-spacing:.5px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .energy-summary-title{
      font-size:24px !important;
      line-height:1.05 !important;
      margin-bottom:6px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .energy-summary-desc{
      font-size:11px !important;
      line-height:1.45 !important;
      max-width:100% !important;
    }

    body.map-active #insightDashboard.energy-index-mode .energy-stat-row{
      grid-template-columns:repeat(3, minmax(0,1fr)) !important;
      gap:8px !important;
      margin-top:10px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .energy-mini-stat{
      padding:10px !important;
      border-radius:16px !important;
      min-height:72px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .energy-mini-stat b{
      font-size:21px !important;
      line-height:1 !important;
    }

    body.map-active #insightDashboard.energy-index-mode .energy-mini-stat span{
      font-size:9px !important;
      line-height:1.25 !important;
    }

    body.map-active #insightDashboard.energy-index-mode .index-visual-row{
      margin-top:0 !important;
      display:grid !important;
      grid-template-columns:1fr 1fr !important;
      gap:10px !important;
      min-height:0 !important;
      flex:1 1 auto !important;
    }

    body.map-active #insightDashboard.energy-index-mode .intensity-bars-card,
    body.map-active #insightDashboard.energy-index-mode .category-donut-card,
    body.map-active #insightDashboard.energy-index-mode .energy-rank-card{
      padding:12px !important;
      border-radius:18px !important;
      min-height:0 !important;
      overflow:hidden !important;
    }

    body.map-active #insightDashboard.energy-index-mode .visual-card-title{
      font-size:12px !important;
      margin-bottom:8px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .visual-card-title small{
      font-size:9px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .intensity-chart{
      height:88px !important;
      gap:5px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .intensity-bar{
      min-height:10px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .category-donut-wrap{
      grid-template-columns:82px minmax(0,1fr) !important;
      gap:10px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .category-donut{
      width:82px !important;
      height:82px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .category-donut::after{
      inset:18px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .donut-legend{
      gap:5px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .donut-item{
      font-size:10px !important;
      line-height:1.2 !important;
    }

    body.map-active #insightDashboard.energy-index-mode .insight-footer{
      margin-top:0 !important;
      grid-template-columns:1fr auto !important;
      gap:10px !important;
      flex-shrink:0 !important;
    }

    body.map-active #insightDashboard.energy-index-mode .insight-note{
      font-size:10px !important;
      line-height:1.35 !important;
    }

    body.map-active #insightDashboard.energy-index-mode .insight-action{
      min-height:38px !important;
      padding:8px 12px !important;
      font-size:10px !important;
      border-radius:14px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .energy-side-panel{
      grid-template-rows:auto minmax(0,1fr) minmax(0,.95fr) auto !important;
    }

    body.map-active #insightDashboard.energy-index-mode .rank-list{
      gap:7px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .rank-item{
      padding:8px !important;
      border-radius:14px !important;
      gap:8px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .rank-no{
      width:26px !important;
      height:26px !important;
      border-radius:10px !important;
      font-size:10px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .rank-name{
      font-size:11px !important;
      line-height:1.2 !important;
    }

    body.map-active #insightDashboard.energy-index-mode .rank-cat,
    body.map-active #insightDashboard.energy-index-mode .rank-dist{
      font-size:9px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .category-bars{
      gap:9px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .bar-row{
      gap:5px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .bar-label{
      font-size:11px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .bar-track{
      height:9px !important;
    }

    body.map-active #insightDashboard.energy-index-mode .energy-action-row{
      gap:10px !important;
      flex-shrink:0 !important;
    }

    body.map-active #insightDashboard.energy-index-mode .energy-action{
      min-height:40px !important;
      font-size:10px !important;
      border-radius:14px !important;
    }

    .useful-topbar{
      gap:8px !important;
      flex-wrap:wrap !important;
      justify-content:flex-end !important;
    }

    .topbar-action-btn{
      min-height:42px;
      padding:10px 13px;
      border:none;
      border-radius:15px;
      background:rgba(255,255,255,.12);
      border:1px solid rgba(255,255,255,.15);
      color:#fff;
      font-size:12px;
      font-weight:900;
      display:flex;
      align-items:center;
      justify-content:center;
      gap:8px;
      cursor:pointer;
      box-shadow:0 10px 24px rgba(0,0,0,.12);
      transition:.25s ease;
      white-space:nowrap;
    }

    .topbar-action-btn:hover{
      transform:translateY(-2px);
      background:rgba(255,255,255,.20);
    }

    .topbar-home-btn{
      background:linear-gradient(135deg,#ff6a00,#ff8a1d) !important;
      border-color:rgba(255,255,255,.18);
      color:#fff !important;
    }

    @media (max-width:1280px){
      body.map-active #insightDashboard.energy-index-mode{
        left:16px !important;
        right:316px !important;
        top:72px !important;
        bottom:18px !important;
        grid-template-columns:minmax(0,1fr) 300px !important;
        gap:12px !important;
      }

      body.map-active #insightDashboard.energy-index-mode .energy-index-hero{
        grid-template-columns:118px minmax(0,1fr) !important;
      }

      body.map-active #insightDashboard.energy-index-mode .energy-gauge{
        width:112px !important;
        height:112px !important;
      }

      body.map-active #insightDashboard.energy-index-mode .gauge-value{
        font-size:34px !important;
      }

      body.map-active #insightDashboard.energy-index-mode .energy-summary-title{
        font-size:21px !important;
      }

      body.map-active #insightDashboard.energy-index-mode .energy-summary-desc{
        font-size:10px !important;
      }

      body.map-active #insightDashboard.energy-index-mode .energy-mini-stat{
        min-height:68px !important;
        padding:8px !important;
      }

      body.map-active #insightDashboard.energy-index-mode .energy-mini-stat b{
        font-size:19px !important;
      }

      body.map-active #insightDashboard.energy-index-mode .intensity-chart{
        height:78px !important;
      }
    }

    @media (max-width:900px){
      body.map-active{
        overflow:auto !important;
      }

      body.map-active .app,
      body.map-active .map-page{
        height:auto !important;
        min-height:100vh !important;
        overflow:visible !important;
      }

      body.map-active .content{
        height:auto !important;
        overflow:visible !important;
      }

      body.map-active .map-shell{
        height:auto !important;
        min-height:720px !important;
        overflow:visible !important;
        padding:8px !important;
      }

      body.map-active #map{
        height:520px !important;
      }

      body.map-active #insightDashboard.energy-index-mode{
        position:static !important;
        width:100% !important;
        max-height:none !important;
        overflow:visible !important;
        grid-template-columns:1fr !important;
        margin-bottom:10px !important;
      }

      body.map-active #insightDashboard.energy-index-mode .insight-card{
        height:auto !important;
        overflow:visible !important;
      }

      body.map-active #insightDashboard.energy-index-mode .energy-index-hero,
      body.map-active #insightDashboard.energy-index-mode .energy-stat-row,
      body.map-active #insightDashboard.energy-index-mode .index-visual-row,
      body.map-active #insightDashboard.energy-index-mode .energy-action-row{
        grid-template-columns:1fr !important;
      }

      body.map-active #insightDashboard.energy-index-mode .energy-gauge{
        margin:auto !important;
        width:150px !important;
        height:150px !important;
      }

      .useful-topbar{
        width:100% !important;
        display:grid !important;
        grid-template-columns:1fr 1fr 1fr !important;
        gap:8px !important;
      }

      .topbar-action-btn{
        width:100%;
      }
    }
  `;
  document.head.appendChild(patchStyle);

  const oldFloatingPanduan = document.getElementById("openTutorialBtn");
  if (oldFloatingPanduan) oldFloatingPanduan.remove();

  const topbarRight = document.querySelector(".topbar-right");
  if (topbarRight) {
    topbarRight.classList.add("useful-topbar");
    topbarRight.innerHTML = `
      <button class="topbar-action-btn" id="topbarGuideBtn" type="button">
        <i class="fa-solid fa-circle-question"></i>
        <span>Panduan</span>
      </button>
      <button class="topbar-action-btn" id="topbarResetBtn" type="button">
        <i class="fa-solid fa-rotate-right"></i>
        <span>Reset</span>
      </button>
      <button class="topbar-action-btn topbar-home-btn" id="topbarHomeBtn" type="button">
        <i class="fa-solid fa-house"></i>
        <span>Beranda</span>
      </button>
    `;
  }

  function setMapActiveStatus() {
    const mapPage = document.getElementById("mapPage");
    const isMapOpen = mapPage && !mapPage.classList.contains("hidden");
    document.body.classList.toggle("map-active", Boolean(isMapOpen));

    if (typeof map !== "undefined" && map) {
      setTimeout(() => map.invalidateSize(true), 250);
    }
  }

  const observerTarget = document.getElementById("mapPage");
  if (observerTarget) {
    const observer = new MutationObserver(setMapActiveStatus);
    observer.observe(observerTarget, { attributes:true, attributeFilter:["class"] });
  }

  function fitMapToVisiblePlacesFinal() {
    if (typeof map === "undefined" || !map) return;

    setTimeout(() => {
      map.invalidateSize(true);

      let visible = [];
      if (typeof filteredPlaces === "function") {
        visible = filteredPlaces().filter(item => !isNaN(item.lat) && !isNaN(item.lng));
      } else if (typeof places !== "undefined") {
        visible = places.filter(item => !isNaN(item.lat) && !isNaN(item.lng));
      }

      if (!visible.length) {
        if (typeof upnLatLng !== "undefined") map.setView(upnLatLng, 14);
        return;
      }

      const bounds = L.latLngBounds(visible.map(item => [item.lat, item.lng]));
      map.fitBounds(bounds, {
        paddingTopLeft: [60, 90],
        paddingBottomRight: [360, 90],
        maxZoom: 15,
        animate: true
      });
    }, 250);
  }

  function resetWebgisFinal() {
    if (typeof state !== "undefined") {
      state.categories = new Set([
        "laundry",
        "minimarket",
        "rumah_makan",
        "fasilitas_kesehatan",
        "emergency"
      ]);
      state.cheap = false;
      state.open24 = false;
      state.nearCampus = false;
      state.emergencyOnly = false;
      state.networkOn = false;
      state.search = "";
    }

    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.value = "";

    if (typeof basemapSelect !== "undefined" && basemapSelect) basemapSelect.value = "dark";
    if (typeof radiusSelect !== "undefined" && radiusSelect) radiusSelect.value = "5000";

    if (typeof setBasemap === "function") setBasemap("dark");
    if (typeof updateRadiusCircle === "function") updateRadiusCircle("5000");
    if (typeof clearRoute === "function") clearRoute();
    if (typeof resetOriginToCampus === "function") resetOriginToCampus();
    if (typeof hideRoutePlanner === "function") hideRoutePlanner();
    if (typeof hideInsightDashboard === "function") hideInsightDashboard();

    if (typeof originSelect !== "undefined" && originSelect) originSelect.value = "campus";
    if (typeof destinationSelect !== "undefined" && destinationSelect) destinationSelect.value = "";

    if (typeof renderFilterList === "function") renderFilterList();
    if (typeof syncChips === "function") syncChips();
    if (typeof renderMarkers === "function") renderMarkers();

    if (typeof selectedPlace !== "undefined") selectedPlace = null;
    if (typeof infoPanel !== "undefined" && infoPanel) infoPanel.classList.add("hidden");
    if (typeof openInfoPanel !== "undefined" && openInfoPanel) openInfoPanel.classList.add("hidden");

    fitMapToVisiblePlacesFinal();
  }

  const topbarGuideBtn = document.getElementById("topbarGuideBtn");
  const topbarResetBtn = document.getElementById("topbarResetBtn");
  const topbarHomeBtn = document.getElementById("topbarHomeBtn");

  if (topbarGuideBtn) {
    topbarGuideBtn.addEventListener("click", () => {
      if (typeof showTutorial === "function") showTutorial(true);
      else {
        const tutorialOverlay = document.getElementById("tutorialOverlay");
        if (tutorialOverlay) tutorialOverlay.classList.remove("hidden-tutorial");
      }
    });
  }

  if (topbarResetBtn) {
    topbarResetBtn.addEventListener("click", resetWebgisFinal);
  }

  if (topbarHomeBtn) {
    topbarHomeBtn.addEventListener("click", () => {
      const landingPage = document.getElementById("landingPage");
      const mapPage = document.getElementById("mapPage");

      if (mapPage) mapPage.classList.add("hidden");
      if (landingPage) landingPage.classList.remove("hidden");

      document.body.classList.remove("map-active");
      window.scrollTo({ top:0, behavior:"smooth" });
    });
  }

  const enterButtons = [
    document.getElementById("enterMapBtn"),
    document.getElementById("enterMapBtnBottom")
  ];

  enterButtons.forEach(btn => {
    if (!btn) return;
    btn.addEventListener("click", () => {
      setTimeout(() => {
        setMapActiveStatus();
        fitMapToVisiblePlacesFinal();
      }, 700);
    });
  });

  const fitAllInsightBtnFinal = document.getElementById("fitAllInsightBtn");
  if (fitAllInsightBtnFinal) {
    fitAllInsightBtnFinal.addEventListener("click", fitMapToVisiblePlacesFinal);
  }

  window.addEventListener("resize", () => {
    setTimeout(() => {
      setMapActiveStatus();
      fitMapToVisiblePlacesFinal();
    }, 250);
  });

  setMapActiveStatus();

  setTimeout(() => {
    setMapActiveStatus();
    fitMapToVisiblePlacesFinal();
  }, 1000);
});
/* =========================================================
   EVERSWAP-INSPIRED INTRO OPENING
   ========================================================= */

(function setupEverswapIntro() {
  const intro = document.getElementById("ewIntro");
  const skipBtn = document.getElementById("ewSkipIntro");
  const enterBtn = document.getElementById("ewEnterIntro");
  const fill = document.getElementById("ewIntroFill");
  const percent = document.getElementById("ewIntroPercent");

  if (!intro || !fill || !percent) return;

  document.body.classList.add("ew-intro-active");

  let progress = 0;
  let introDone = false;

  const progressTimer = setInterval(() => {
    if (introDone) return;

    const increment = progress < 70 ? 4 : progress < 92 ? 2 : 1;
    progress = Math.min(progress + increment, 100);

    fill.style.width = `${progress}%`;
    percent.textContent = `${progress}%`;

    if (progress >= 100) {
      clearInterval(progressTimer);
      setTimeout(closeIntro, 650);
    }
  }, 95);

  function closeIntro() {
    if (introDone) return;

    introDone = true;
    clearInterval(progressTimer);

    fill.style.width = "100%";
    percent.textContent = "100%";

    intro.classList.add("hide");
    document.body.classList.remove("ew-intro-active");

    setTimeout(() => {
      intro.style.display = "none";
    }, 900);
  }

  skipBtn?.addEventListener("click", closeIntro);
  enterBtn?.addEventListener("click", closeIntro);

  window.addEventListener("keydown", e => {
    if (e.key === "Escape") closeIntro();
  });
})();
