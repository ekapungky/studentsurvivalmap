
  const landingPage = document.getElementById("landingPage");
  const mapPage = document.getElementById("mapPage");
  const enterMapBtn = document.getElementById("enterMapBtn");
  const enterMapBtnBottom = document.getElementById("enterMapBtnBottom");
  const backHomeBtn = document.getElementById("backHomeBtn");
  const basemapSelect = document.getElementById("basemapSelect");
  const radiusSelect = document.getElementById("radiusSelect");
  const legendText = document.getElementById("legendText");
  const routeButton = document.getElementById("routeButton");
  const themeToggle = document.getElementById("themeToggle");
  const routePlanner = document.getElementById("routePlanner");
  const originSelect = document.getElementById("originSelect");
  const destinationSelect = document.getElementById("destinationSelect");
  const routeNowBtn = document.getElementById("routeNowBtn");
  const clearRouteBtn = document.getElementById("clearRouteBtn");
  const routeHint = document.getElementById("routeHint");
  const routeDirections = document.getElementById("routeDirections");
  const routeSummary = document.getElementById("routeSummary");
  const routeSteps = document.getElementById("routeSteps");
  const toggleDashboard = document.getElementById("toggleDashboard");
  const insightDashboard = document.getElementById("insightDashboard");
  const metricTotal = document.getElementById("metricTotal");
  const metricOpen24 = document.getElementById("metricOpen24");
  const metricNearest = document.getElementById("metricNearest");
  const metricEmergency = document.getElementById("metricEmergency");
  const insightSummary = document.getElementById("insightSummary");
  const routeInsight = document.getElementById("routeInsight");
  const focusNearestBtn = document.getElementById("focusNearestBtn");
  const barLaundry = document.getElementById("barLaundry");
  const barMinimarket = document.getElementById("barMinimarket");
  const barEmergency = document.getElementById("barEmergency");
  const barLaundryText = document.getElementById("barLaundryText");
  const barMinimarketText = document.getElementById("barMinimarketText");
  const barEmergencyText = document.getElementById("barEmergencyText");
  const barRumahMakanText = document.getElementById("barRumahMakanText");
  const survivalGauge = document.getElementById("survivalGauge");
  const survivalScore = document.getElementById("survivalScore");
  const energyHeadline = document.getElementById("energyHeadline");
  const intensityChart = document.getElementById("intensityChart");
  const categoryDonut = document.getElementById("categoryDonut");
  const nearestRankList = document.getElementById("nearestRankList");
  const barLaundryValue = document.getElementById("barLaundryValue");
  const barMinimarketValue = document.getElementById("barMinimarketValue");
  const barEmergencyValue = document.getElementById("barEmergencyValue");
  const barRumahMakanValue = document.getElementById("barRumahMakanValue");
  const openRouteFromInsight = document.getElementById("openRouteFromInsight");
  const fitAllInsightBtn = document.getElementById("fitAllInsightBtn");
  const tutorialOverlay = document.getElementById("tutorialOverlay");
  const openTutorialBtn = document.getElementById("openTutorialBtn");
  const closeTutorialBtn = document.getElementById("closeTutorialBtn");
  const startUsingWebgisBtn = document.getElementById("startUsingWebgisBtn");
  const dontShowTutorialAgain = document.getElementById("dontShowTutorialAgain");

  const infoPanel = document.getElementById("infoPanel");
  const closeInfoPanel = document.getElementById("closeInfoPanel");
  const openInfoPanel = document.getElementById("openInfoPanel");

  // Default: panel kanan disembunyikan dulu.
  // Nanti baru muncul setelah marker / lokasi diklik.
  if (infoPanel) infoPanel.classList.add("hidden");
  if (openInfoPanel) openInfoPanel.classList.add("hidden");

  const topControls = document.getElementById("topControls");
  const leftPanel = document.getElementById("leftPanel");
  const toggleTopPanel = document.getElementById("toggleTopPanel");
  const toggleLeftPanel = document.getElementById("toggleLeftPanel");

  const detailTitle = document.getElementById("detailTitle");
  const detailDistance = document.getElementById("detailDistance");
  const detailPrice = document.getElementById("detailPrice");
  const detailImage = document.getElementById("detailImage");
  const detailMeta = document.getElementById("detailMeta");
  const detailButton = document.getElementById("detailButton");

  const upnLatLng = [-7.7620236, 110.4092470];

const categories = {
  laundry: {
    label: "Laundry",
    color: "#2374d8",
    icon: "fa-solid fa-shirt",
    folder: "laundry"
  },
  minimarket: {
    label: "Minimarket",
    color: "#24a8c8",
    icon: "fa-solid fa-basket-shopping",
    folder: "minimarket"
  },
  rumah_makan: {
    label: "Rumah Makan",
    color: "#f59e0b",
    icon: "fa-solid fa-utensils",
    folder: "rumah_makan"
  },
  fasilitas_kesehatan: {
    label: "Fasilitas Kesehatan",
    color: "#22c55e",
    icon: "fa-solid fa-house-medical",
    folder: "fasilitas_kesehatan"
  },
  emergency: {
    label: "Emergency",
    color: "#c94b47",
    icon: "fa-solid fa-triangle-exclamation",
    folder: "emergency"
  }
  };



  /* =====================================================
     FILE EXCEL SESUAI STRUKTUR FOLDER PROJECT
     Folder kamu:
       data/laundry.xlsx
       data/minimarket.xlsx
       data/rumah_makan.xlsx
       data/fasilitas_kesehatan.xlsx
       data/emergency.xlsx
     ===================================================== */
  const EXCEL_FILES = {
    laundry: ["data/laundry.xlsx"],
    minimarket: ["data/minimarket.xlsx"],
    rumah_makan: ["data/rumah_makan.xlsx"],
    fasilitas_kesehatan: ["data/fasilitas_kesehatan.xlsx"],
    emergency: ["data/emergency.xlsx"]
  };

  let places = [];

const state = {
  categories: new Set(["laundry", "minimarket", "rumah_makan", "fasilitas_kesehatan", "emergency"]),
  cheap: false,
  open24: false,
  nearCampus: false,
  emergencyOnly: false,
  networkOn: false,
  search: ""
};

  let mapInitialized = false;
  let map;
  let layers = {};
  let currentBaseLayer;
  let radiusCircle;
  let routeControl = null;
  let selectedPlace = null;
  let originMarker = null;
  let currentOriginLatLng = upnLatLng;
  let currentOriginLabel = "Rektorat UPN";

  const baseMaps = {
    dark: L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
    }),
    streets: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }),
    satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      attribution: "Tiles &copy; Esri"
    }),
    light: L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
    })
  };

  function normalizeHeaderKey(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/_/g, "")
      .replace(/\./g, "")
      .replace(/-/g, "")
      .replace(/\//g, "")
      .trim();
  }

  function getCell(row, keys, fallback = "") {
    const normalizedRow = {};

    Object.keys(row || {}).forEach(originalKey => {
      normalizedRow[normalizeHeaderKey(originalKey)] = row[originalKey];
    });

    for (const key of keys) {
      const directValue = row[key];

      if (directValue !== undefined && directValue !== null && String(directValue).trim() !== "") {
        return directValue;
      }

      const normalizedKey = normalizeHeaderKey(key);
      const normalizedValue = normalizedRow[normalizedKey];

      if (normalizedValue !== undefined && normalizedValue !== null && String(normalizedValue).trim() !== "") {
        return normalizedValue;
      }
    }

    return fallback;
  }

  function cleanText(value) {
    if (value === undefined || value === null || value === "") return "-";
    return String(value).trim();
  }

  function cleanId(value, fallback) {
    const raw = cleanText(value);
    return raw === "-" ? fallback : raw;
  }


function getDisplayName(place) {
  if (!place) return "-";

  return (
    place.Nama ||
    place.Nama_Laundry ||
    place.Nama_Minimarket ||
    place.Nama_Rumah_Makan ||
    place.Nama_Fasilitas_Kesehatan ||
    place.Nama_Emergency ||
    place.Nama_Tempat ||
    place.name ||
    "-"
  );
}

  function parseCoordinate(value) {
    if (typeof value === "number") return value;
    return parseFloat(String(value || "").replace(",", "."));
  }

  const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif", "svg", "avif", "bmp", "tif", "tiff"];
  const imageFolderCache = {};

  function uniq(array) {
    return [...new Set(array.filter(Boolean))];
  }

  function normalizeFileBase(value) {
    return String(value || "")
      .trim()
      .replace(/\\/g, "/")
      .split("/").pop()
      .split("?")[0].split("#")[0]
      .replace(/\.[a-z0-9]+$/i, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  }

  function safeSrc(path) {
    return encodeURI(path).replace(/#/g, "%23");
  }

  function getImageFileName(value, fallbackId) {
    let raw = cleanText(value);

    if (raw === "-") raw = fallbackId;

    raw = String(raw).trim().replace(/\\/g, "/");
    raw = raw.split("?")[0].split("#")[0];

    return raw || fallbackId;
  }

  function getFileCode(value, fallbackId) {
    const fileName = getImageFileName(value, fallbackId);
    const code = fileName.split("/").pop().replace(/\.[a-z0-9]+$/i, "");

    return code.toUpperCase();
  }

  function getImageCandidates(category, dokumentasi, id) {
    const folder = categories[category]?.folder || category;
    const rawFile = getImageFileName(dokumentasi, id);
    const fileName = rawFile.split("/").pop();
    const hasExtension = /\.[a-z0-9]+$/i.test(fileName);
    const code = fileName.replace(/\.[a-z0-9]+$/i, "");
    const idCode = String(id || code || "").replace(/\.[a-z0-9]+$/i, "");

    const baseNames = uniq([
      code,
      idCode,
      code.toUpperCase(),
      code.toLowerCase(),
      idCode.toUpperCase(),
      idCode.toLowerCase(),
      normalizeFileBase(code),
      normalizeFileBase(idCode)
    ]);

    const candidates = [];

    // Kalau kolom Dokumentasi sudah berisi path lengkap, pakai dulu.
    if (rawFile.includes("/")) {
      candidates.push(rawFile);
    }

    // Cek juga root assets/images, karena foto tim/logo ada di situ.
    if (hasExtension) {
      candidates.push(`assets/images/${fileName}`);
      candidates.push(`assets/images/${folder}/${fileName}`);
    }

    if (hasExtension) {
      const ext = fileName.match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase();
      candidates.push(`assets/images/${folder}/${fileName}`);
      candidates.push(`assets/images/${folder}/${fileName.toLowerCase()}`);
      candidates.push(`assets/images/${folder}/${fileName.toUpperCase()}`);

      baseNames.forEach(base => {
        candidates.push(`assets/images/${folder}/${base}.${ext}`);
        candidates.push(`assets/images/${base}.${ext}`);
        IMAGE_EXTENSIONS.filter(format => format !== ext).forEach(format => {
          candidates.push(`assets/images/${folder}/${base}.${format}`);
          candidates.push(`assets/images/${base}.${format}`);
        });
      });
    } else {
      baseNames.forEach(base => {
        IMAGE_EXTENSIONS.forEach(format => {
          candidates.push(`assets/images/${folder}/${base}.${format}`);
          candidates.push(`assets/images/${base}.${format}`);
        });
      });
    }

    return uniq(candidates).map(safeSrc);
  }

  function getImagePath(category, dokumentasi, id) {
    return getImageCandidates(category, dokumentasi, id)[0];
  }

  async function getImagesFromFolder(category) {
    const folder = categories[category]?.folder || category;
    const folderPath = `assets/images/${folder}/`;

    if (imageFolderCache[folderPath]) return imageFolderCache[folderPath];

    imageFolderCache[folderPath] = fetch(folderPath)
      .then(response => response.ok ? response.text() : "")
      .then(html => {
        const matches = [...html.matchAll(/href=["']([^"']+)["']/gi)]
          .map(match => decodeURIComponent(match[1]))
          .map(link => link.split("?")[0].split("#")[0].split("/").pop())
          .filter(name => IMAGE_EXTENSIONS.some(ext => name.toLowerCase().endsWith(`.${ext}`)))
          .map(name => safeSrc(`${folderPath}${name}`));

        return uniq(matches);
      })
      .catch(() => []);

    return imageFolderCache[folderPath];
  }

  async function getSmartImageCandidates(place) {
    const category = place.category;
    const basicCandidates = getImageCandidates(category, place.Dokumentasi || place.image, place.id);
    const folderImages = await getImagesFromFolder(category);

    const keys = uniq([
      normalizeFileBase(place.Dokumentasi),
      normalizeFileBase(place.id),
      normalizeFileBase(getDisplayName(place))
    ]).filter(Boolean);

    const matchedFolderImages = folderImages.filter(src => {
      const base = normalizeFileBase(src);
      return keys.some(key => key && (base === key || base.includes(key) || key.includes(base)));
    });

    return uniq([
      ...matchedFolderImages,
      ...basicCandidates,
      ...folderImages
    ]);
  }

  async function setDetailImage(place) {
    const candidates = await getSmartImageCandidates(place);
    let index = 0;

    detailImage.onerror = function () {
      index += 1;

      if (index < candidates.length) {
        this.src = candidates[index];
        return;
      }

      this.onerror = null;
      this.src = getFallbackImage(place.category);
    };

    detailImage.src = candidates[0] || getFallbackImage(place.category);
  }

  function getFallbackImage(category) {
    if (category === "emergency") {
      return "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=900&q=80";
    }

    if (category === "minimarket") {
      return "https://images.unsplash.com/photo-1604719312566-8912e9c8a213?auto=format&fit=crop&w=900&q=80";
    }

    if (category === "rumah_makan") {
      return "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80";
    }

    return "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=900&q=80";
  }

  function isOpen24(value, jam) {
    const text = `${value || ""} ${jam || ""}`.toLowerCase();

    return (
      text.includes("ya") ||
      text.includes("24 jam") ||
      text.includes("buka 24") ||
      text.includes("00.00-23.59") ||
      text.includes("00:00-23:59")
    );
  }

  async function readExcel(filePath) {
    const url = filePath;
    const response = await fetch(url, { cache: "force-cache" });

    if (!response.ok) {
      throw new Error(`File tidak ditemukan: ${filePath}`);
    }

    const buffer = await response.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array", cellDates: false });

    // Baca SEMUA sheet, bukan hanya sheet pertama.
    const rows = workbook.SheetNames.flatMap(sheetName => {
      const sheet = workbook.Sheets[sheetName];
      return XLSX.utils.sheet_to_json(sheet, {
        defval: "",
        raw: false
      }).map(row => ({ ...row, _sheetName: sheetName }));
    });

    // Buang baris kosong total.
    return rows.filter(row => {
      return Object.entries(row).some(([key, value]) => {
        if (key === "_sheetName") return false;
        return value !== undefined && value !== null && String(value).trim() !== "";
      });
    });
  }

  async function readFirstExistingExcel(category) {
    const filePaths = EXCEL_FILES[category] || [`data/${category}.xlsx`];
    const errors = [];

    for (const filePath of filePaths) {
      try {
        const rows = await readExcel(filePath);
        console.info(`Berhasil membaca ${rows.length} baris dari ${filePath}`);
        return rows;
      } catch (error) {
        errors.push(error.message);
      }
    }

    console.warn(`Excel kategori ${category} tidak terbaca:`, errors);
    return [];
  }

  function normalizeLaundry(row, index) {
    const id = cleanId(getCell(row, ["id", "ID", "Id", "Dokumentasi"]), `L${String(index + 1).padStart(3, "0")}`);
    const nama = cleanText(getCell(row, [
      "Nama_Laundry", "Nama Laundry", "Nama_laundry",
      "Nama", "Nama Tempat", "Nama_Tempat", "NamaTempat",
      "Nama Fasilitas", "Nama_Fasilitas", "NamaFasilitas",
      "Nama Usaha", "Nama_Usaha", "NamaUsaha",
      "Nama Tempat Usaha", "Nama_Tempat_Usaha"
    ]));
    const keterangan = cleanText(getCell(row, ["Keterangan", "Layanan"]));
    const hari = cleanText(getCell(row, ["Hari_operasional", "Hari Operasional"]));
    const jam = cleanText(getCell(row, ["Jam_operasional", "Jam Operasional"]));
    const alamat = cleanText(getCell(row, ["Alamat_lengkap", "Alamat Lengkap", "Alamat"]));
    const telepon = cleanText(getCell(row, ["No.Telepon", "No_Telepon", "No Telepon", "Nomor_Kontak"]));
    const lat = parseCoordinate(getCell(row, ["Latitude", "latitude", "Lat"]));
    const lng = parseCoordinate(getCell(row, ["Longitude", "longitude", "Lng", "Long"]));
    const rating = cleanText(getCell(row, ["Rating", "Ulasan"]));
    const maps = cleanText(getCell(row, ["Link_google_maps", "Link Google Maps", "Maps"]));
    const dokumentasi = cleanText(getCell(row, ["Dokumentasi", "images", "Foto"], id));
    const buka24 = cleanText(getCell(row, ["Buka_24_jam", "Buka 24 jam", "Buka_24_Jam"]));

    return {
      id,
      category: "laundry",
      name: nama === "-" ? `Laundry ${id}` : nama,
      Nama: nama === "-" ? `Laundry ${id}` : nama,
      Nama_Laundry: nama === "-" ? `Laundry ${id}` : nama,
      Nama_Tempat: nama === "-" ? `Laundry ${id}` : nama,
      Keterangan: keterangan,
      Hari_operasional: hari,
      Jam_operasional: jam,
      Alamat_lengkap: alamat,
      No_Telepon: telepon,
      Latitude: lat,
      Longitude: lng,
      Rating: rating,
      Link_google_maps: maps,
      Dokumentasi: dokumentasi,
      Buka_24_jam: buka24,

      lat,
      lng,
      price: keterangan,
      address: alamat,
      contact: telepon,
      open: `${hari}, ${jam}`,
      rating,
      maps,
      image: getImagePath("laundry", dokumentasi, id),
      cheap: true,
      open24: isOpen24(buka24, jam),
      nearCampus: true,
      detailLabel: "Detail Laundry"
    };
  }

  function normalizeMinimarket(row, index) {
    const dokumentasiUntukId = getCell(row, ["Dokumentasi", "images", "Foto"], "");
    const id = cleanId(
      getCell(row, ["id", "ID", "Id"], ""),
      getFileCode(dokumentasiUntukId, `M${String(index + 1).padStart(3, "0")}`)
    );

    const kategori = cleanText(getCell(row, ["Kategori"], "Minimarket/Supermarket"));
    const nama = cleanText(getCell(row, [
      "Nama_Minimarket", "Nama Minimarket", "Nama_minimarket",
      "Nama", "Nama Tempat", "Nama_Tempat", "NamaTempat",
      "Nama Fasilitas", "Nama_Fasilitas", "NamaFasilitas",
      "Nama Usaha", "Nama_Usaha", "NamaUsaha",
      "Nama Toko", "Nama_Toko", "NamaToko"
    ], `Minimarket ${id}`));
    const alamat = cleanText(getCell(row, ["Alamat", "Alamat_lengkap", "Alamat Lengkap"]));
    const hari = cleanText(getCell(row, ["Hari_operasional", "Hari Operasional"]));
    const jam = cleanText(getCell(row, ["Jam_operasional", "Jam Operasional", "Jam_Operasional"]));
    const harga = cleanText(getCell(row, ["Harga", "Keterangan"]));
    const telepon = cleanText(getCell(row, ["Nomor_Kontak", "No.Telepon", "No_Telepon"]));
    const lat = parseCoordinate(getCell(row, ["Latitude", "latitude", "Lat"]));
    const lng = parseCoordinate(getCell(row, ["Longitude", "longitude", "Lng", "Long"]));
    const rating = cleanText(getCell(row, ["Ulasan", "Rating"]));
    const maps = cleanText(getCell(row, ["Link_google_maps", "Link Google Maps", "Maps"]));
    const dokumentasi = cleanText(getCell(row, ["Dokumentasi", "images", "Foto"], id));
    const buka24 = cleanText(getCell(row, ["Buka_24_jam", "Buka 24 jam", "Buka_24_Jam"]));

    return {
      id,
      category: "minimarket",
      name: nama === "-" ? `Minimarket ${id}` : nama,
      Nama: nama === "-" ? `Minimarket ${id}` : nama,
      Nama_Minimarket: nama === "-" ? `Minimarket ${id}` : nama,
      Nama_Tempat: nama === "-" ? `Minimarket ${id}` : nama,
      Keterangan: harga,
      Hari_operasional: hari,
      Jam_operasional: jam,
      Alamat_lengkap: alamat,
      No_Telepon: telepon,
      Latitude: lat,
      Longitude: lng,
      Rating: rating,
      Link_google_maps: maps,
      Dokumentasi: dokumentasi,
      Buka_24_jam: buka24,

      lat,
      lng,
      price: harga === "-" ? "Kebutuhan harian" : harga,
      address: alamat,
      contact: telepon,
      open: `${hari}, ${jam}`,
      rating,
      maps,
      image: getImagePath("minimarket", dokumentasi, id),
      cheap: false,
      open24: isOpen24(buka24, jam),
      nearCampus: true,
      detailLabel: "Detail Minimarket"
    };
  }


  function normalizeRumahMakan(row, index) {
    const id = cleanId(getCell(row, ["id", "ID", "Id", "Dokumentasi"]), `RM${String(index + 1).padStart(3, "0")}`);

    const nama = cleanText(getCell(row, [
      "Nama_Rumah_Makan", "Nama Rumah Makan", "Nama_rumah_makan", "Rumah_Makan",
      "Nama Tempat Makan Murah", "Nama_Tempat_Makan_Murah", "NamaTempatMakanMurah",
      "Nama Warung", "Nama_Warung", "NamaWarung",
      "Nama", "Nama Tempat", "Nama_Tempat", "NamaTempat",
      "Nama Usaha", "Nama_Usaha", "NamaUsaha",
      "Kategori"
    ], `Rumah Makan ${id}`));

    const keterangan = cleanText(getCell(row, [
      "Keterangan", "Menu", "Layanan", "Harga", "Jenis_Makanan", "Jenis Makanan"
    ], "Makanan dan minuman"));

    const hari = cleanText(getCell(row, [
      "Hari_operasional", "Hari Operasional", "Hari"
    ], "-"));

    const jam = cleanText(getCell(row, [
      "Jam_operasional", "Jam Operasional", "Jam_Operasional", "Jam"
    ], "-"));

    const alamat = cleanText(getCell(row, [
      "Alamat_lengkap", "Alamat Lengkap", "Alamat", "Lokasi"
    ], "-"));

    const telepon = cleanText(getCell(row, [
      "No.Telepon", "No_Telepon", "No Telepon", "Nomor_Kontak", "Nomor Kontak", "Telepon"
    ], "-"));

    const lat = parseCoordinate(getCell(row, ["Latitude", "latitude", "Lat"]));
    const lng = parseCoordinate(getCell(row, ["Longitude", "longitude", "Lng", "Long"]));
    const rating = cleanText(getCell(row, ["Rating", "Ulasan", "Review"], "-"));
    const maps = cleanText(getCell(row, ["Link_google_maps", "Link Google Maps", "Maps"], "-"));
    const dokumentasi = cleanText(getCell(row, ["Dokumentasi", "images", "Foto"], id));
    const buka24 = cleanText(getCell(row, ["Buka_24_jam", "Buka 24 jam", "Buka_24_Jam"], ""));

    return {
      id,
      category: "rumah_makan",
      name: nama === "-" ? `Rumah Makan ${id}` : nama,
      Nama: nama === "-" ? `Rumah Makan ${id}` : nama,
      Nama_Rumah_Makan: nama === "-" ? `Rumah Makan ${id}` : nama,
      Nama_Tempat: nama === "-" ? `Rumah Makan ${id}` : nama,
      Keterangan: keterangan,
      Hari_operasional: hari,
      Jam_operasional: jam,
      Alamat_lengkap: alamat,
      No_Telepon: telepon,
      Latitude: lat,
      Longitude: lng,
      Rating: rating,
      Link_google_maps: maps,
      Dokumentasi: dokumentasi,
      Buka_24_jam: buka24 || (isOpen24(buka24, jam) ? "Ya" : "Tidak"),

      lat,
      lng,
      price: keterangan === "-" ? "Makanan dan minuman" : keterangan,
      address: alamat,
      contact: telepon,
      open: `${hari}, ${jam}`,
      rating,
      maps,
      image: getImagePath("rumah_makan", dokumentasi, id),
      cheap: true,
      open24: isOpen24(buka24, jam),
      nearCampus: true,
      detailLabel: "Detail Rumah Makan"
    };
  }
function normalizeFasilitasKesehatan(row, index) {
  const dokumentasiUntukId = getCell(row, ["Dokumentasi", "images", "Foto"], "");
  const id = cleanId(
    getCell(row, ["id", "ID", "Id"], ""),
    getFileCode(dokumentasiUntukId, `FK${String(index + 1).padStart(3, "0")}`)
  );

  const nama = cleanText(getCell(row, [
    "Nama_Fasilitas_Kesehatan", "Nama Fasilitas Kesehatan", "Nama_fasilitas_kesehatan",
    "Nama_Klinik", "Nama Klinik",
    "Nama_Apotek", "Nama Apotek",
    "Nama_Rumah_Sakit", "Nama Rumah Sakit",
    "Nama", "Nama Tempat", "Nama_Tempat", "NamaTempat",
    "Nama Fasilitas", "Nama_Fasilitas", "NamaFasilitas",
    "Nama Layanan", "Nama_Layanan", "NamaLayanan"
  ], `Fasilitas Kesehatan ${id}`));

  const kategori = cleanText(getCell(row, [
    "Kategori", "Jenis", "Jenis_Fasilitas", "Jenis Fasilitas"
  ], "Fasilitas Kesehatan"));

  const keterangan = cleanText(getCell(row, [
    "Keterangan", "Layanan", "Harga", "Jenis_Layanan", "Jenis Layanan"
  ], kategori));

  const hari = cleanText(getCell(row, [
    "Hari_operasional", "Hari Operasional", "Hari"
  ], "-"));

  const jam = cleanText(getCell(row, [
    "Jam_operasional", "Jam Operasional", "Jam_Operasional", "Jam"
  ], "-"));

  const alamat = cleanText(getCell(row, [
    "Alamat_lengkap", "Alamat Lengkap", "Alamat", "Lokasi"
  ], "-"));

  const telepon = cleanText(getCell(row, [
    "No.Telepon", "No_Telepon", "No Telepon", "Nomor_Kontak", "Nomor Kontak", "Telepon"
  ], "-"));

  const lat = parseCoordinate(getCell(row, ["Latitude", "latitude", "Lat"]));
  const lng = parseCoordinate(getCell(row, ["Longitude", "longitude", "Lng", "Long"]));
  const rating = cleanText(getCell(row, ["Rating", "Ulasan", "Review"], "-"));
  const maps = cleanText(getCell(row, ["Link_google_maps", "Link Google Maps", "Maps"], "-"));
  const dokumentasi = cleanText(getCell(row, ["Dokumentasi", "images", "Foto"], id));
  const buka24 = cleanText(getCell(row, ["Buka_24_jam", "Buka 24 jam", "Buka_24_Jam"], ""));

  return {
    id,
    category: "fasilitas_kesehatan",
    name: nama === "-" ? `Fasilitas Kesehatan ${id}` : nama,
    Nama: nama === "-" ? `Fasilitas Kesehatan ${id}` : nama,
    Nama_Fasilitas_Kesehatan: nama === "-" ? `Fasilitas Kesehatan ${id}` : nama,
    Nama_Tempat: nama === "-" ? `Fasilitas Kesehatan ${id}` : nama,
    Keterangan: keterangan,
    Hari_operasional: hari,
    Jam_operasional: jam,
    Alamat_lengkap: alamat,
    No_Telepon: telepon,
    Latitude: lat,
    Longitude: lng,
    Rating: rating,
    Link_google_maps: maps,
    Dokumentasi: dokumentasi,
    Buka_24_jam: buka24 || (isOpen24(buka24, jam) ? "Ya" : "Tidak"),

    lat,
    lng,
    price: keterangan === "-" ? "Fasilitas kesehatan" : keterangan,
    address: alamat,
    contact: telepon,
    open: `${hari}, ${jam}`,
    rating,
    maps,
    image: getImagePath("fasilitas_kesehatan", dokumentasi, id),
    cheap: false,
    open24: isOpen24(buka24, jam),
    nearCampus: true,
    detailLabel: "Detail Fasilitas Kesehatan"
  };
}
  function normalizeEmergency(row, index) {
    const dokumentasiRaw = cleanText(getCell(row, ["Dokumentasi", "images", "Foto"]));
    const fallbackId = `E${String(index + 1).padStart(3, "0")}`;
    const id = getFileCode(dokumentasiRaw, fallbackId);

    const kategori = cleanText(getCell(row, ["Kategori"], "Fasilitas Darurat/Emergency"));
    const nama = cleanText(getCell(row, [
      "Nama_Emergency", "Nama Emergency", "Nama_emergency",
      "Nama", "Nama Tempat", "Nama_Tempat", "NamaTempat",
      "Nama Fasilitas", "Nama_Fasilitas", "NamaFasilitas",
      "Nama Layanan", "Nama_Layanan", "NamaLayanan",
      "Nama Usaha", "Nama_Usaha", "NamaUsaha"
    ], `Emergency ${id}`));
    const alamat = cleanText(getCell(row, ["Alamat", "Alamat_lengkap", "Alamat Lengkap"]));
    const jam = cleanText(getCell(row, ["Jam_Operasional", "Jam_operasional", "Jam Operasional"]));
    const harga = cleanText(getCell(row, ["Harga", "Keterangan"]));
    const telepon = cleanText(getCell(row, ["Nomor_Kontak", "No.Telepon", "No_Telepon"]));
    const lat = parseCoordinate(getCell(row, ["Latitude", "latitude", "Lat"]));
    const lng = parseCoordinate(getCell(row, ["Longitude", "longitude", "Lng", "Long"]));
    const rating = cleanText(getCell(row, ["Ulasan", "Rating"]));
    const maps = cleanText(getCell(row, ["Link_google_maps", "Link Google Maps", "Maps"]));
    const buka24 = isOpen24("Ya", jam) ? "Ya" : "Tidak";

    return {
      id,
      category: "emergency",
      name: nama === "-" ? `Emergency ${id}` : nama,
      Nama: nama === "-" ? `Emergency ${id}` : nama,
      Nama_Emergency: nama === "-" ? `Emergency ${id}` : nama,
      Nama_Tempat: nama === "-" ? `Emergency ${id}` : nama,
      Keterangan: harga,
      Hari_operasional: "Setiap Hari",
      Jam_operasional: jam,
      Alamat_lengkap: alamat,
      No_Telepon: telepon,
      Latitude: lat,
      Longitude: lng,
      Rating: rating,
      Link_google_maps: maps,
      Dokumentasi: dokumentasiRaw,
      Buka_24_jam: buka24,

      lat,
      lng,
      price: harga === "-" ? "Layanan darurat" : harga,
      address: alamat,
      contact: telepon,
      open: jam,
      rating,
      maps,
      image: getImagePath("emergency", dokumentasiRaw, id),
      cheap: false,
      open24: isOpen24("Ya", jam),
      nearCampus: true,
      detailLabel: "Detail Emergency"
    };
  }


  function getNearestPlace(list = places) {
    const valid = list.filter(item => !isNaN(item.lat) && !isNaN(item.lng));
    if (!valid.length) return null;

    return valid
      .map(place => ({
        ...place,
        distanceMeters: Math.round(distanceKm(upnLatLng[0], upnLatLng[1], place.lat, place.lng) * 1000)
      }))
      .sort((a, b) => a.distanceMeters - b.distanceMeters)[0];
  }

  function updateInsightDashboard() {
    const total = places.length;
    const visible = filteredPlaces ? filteredPlaces() : places;
    const laundryCount = places.filter(p => p.category === "laundry").length;
    const minimarketCount = places.filter(p => p.category === "minimarket").length;
    const rumahMakanCount = places.filter(p => p.category === "rumah_makan").length;
    const emergencyCount = places.filter(p => p.category === "emergency").length;
    const open24Count = places.filter(p => p.open24).length;
    const nearest = getNearestPlace(places);
    const visibleCount = visible.length;

    const readinessScore = total
      ? Math.min(100, Math.round(
          38 +
          Math.min(total, 120) * 0.22 +
          Math.min(open24Count, 40) * 0.55 +
          Math.min(emergencyCount, 20) * 0.65 +
          Math.min(visibleCount, 80) * 0.10
        ))
      : 0;

    if (metricTotal) metricTotal.textContent = total;
    if (metricOpen24) metricOpen24.textContent = open24Count;
    if (metricEmergency) metricEmergency.textContent = `${emergencyCount} emergency`;
    if (metricNearest) metricNearest.textContent = nearest ? `${nearest.distanceMeters}m` : "-";
    if (survivalScore) survivalScore.textContent = readinessScore;
    if (survivalGauge) survivalGauge.style.setProperty("--score", readinessScore);

    const headline = readinessScore >= 82
      ? "High Access Readiness"
      : readinessScore >= 64
        ? "Good Student Coverage"
        : readinessScore >= 42
          ? "Moderate Area Coverage"
          : "Low Data Coverage";
    if (energyHeadline) energyHeadline.textContent = headline;

    const maxCount = Math.max(laundryCount, minimarketCount, rumahMakanCount, emergencyCount, 1);
    const totalForDonut = Math.max(total, 1);
    const laundryPercent = (laundryCount / totalForDonut) * 100;
    const minimarketPercent = ((laundryCount + minimarketCount) / totalForDonut) * 100;

    if (barLaundry) barLaundry.style.width = `${(laundryCount / maxCount) * 100}%`;
    if (barMinimarket) barMinimarket.style.width = `${(minimarketCount / maxCount) * 100}%`;
    if (barRumahMakan) barRumahMakan.style.width = `${(rumahMakanCount / maxCount) * 100}%`;
    if (barEmergency) barEmergency.style.width = `${(emergencyCount / maxCount) * 100}%`;

    if (barLaundryText) barLaundryText.textContent = laundryCount;
    if (barMinimarketText) barMinimarketText.textContent = minimarketCount;
    if (barRumahMakanText) barRumahMakanText.textContent = rumahMakanCount;
    if (barEmergencyText) barEmergencyText.textContent = emergencyCount;
    if (barLaundryValue) barLaundryValue.textContent = laundryCount;
    if (barMinimarketValue) barMinimarketValue.textContent = minimarketCount;
    if (barRumahMakanValue) barRumahMakanValue.textContent = rumahMakanCount;
    if (barEmergencyValue) barEmergencyValue.textContent = emergencyCount;

    if (categoryDonut) {
      const laundryPercent = total ? (laundryCount / total) * 100 : 0;
      const minimarketPercent = total ? laundryPercent + (minimarketCount / total) * 100 : 0;
      const rumahMakanPercent = total ? minimarketPercent + (rumahMakanCount / total) * 100 : 0;

      categoryDonut.style.background = `conic-gradient(
        #2f80ed 0 ${laundryPercent}%,
        #24a8c8 ${laundryPercent}% ${minimarketPercent}%,
        #f59e0b ${minimarketPercent}% ${rumahMakanPercent}%,
        #e45f5f ${rumahMakanPercent}% 100%
      )`;
    }

    if (intensityChart) {
      const bars = Array.from(intensityChart.querySelectorAll(".intensity-bar"));
      bars.forEach((bar, index) => {
        const wave = 26 + ((readinessScore + index * 13 + visibleCount * 3) % 64);
        bar.style.height = `${wave}%`;
        bar.classList.toggle("hot", index % 3 === 2 || wave > 72);
      });
    }

    if (nearestRankList) {
      const ranked = places
        .filter(item => !isNaN(item.lat) && !isNaN(item.lng))
        .map(place => ({
          ...place,
          distanceMeters: Math.round(distanceKm(upnLatLng[0], upnLatLng[1], place.lat, place.lng) * 1000)
        }))
        .sort((a, b) => a.distanceMeters - b.distanceMeters)
        .slice(0, 4);

      nearestRankList.innerHTML = ranked.length
        ? ranked.map((place, index) => `
          <div class="rank-item" data-rank-place="${place.id}">
            <div class="rank-no">${index + 1}</div>
            <div>
              <div class="rank-name">${getDisplayName(place)}</div>
              <div class="rank-cat">${categories[place.category]?.label || place.category}</div>
            </div>
            <div class="rank-dist">${place.distanceMeters}m</div>
          </div>
        `).join("")
        : `
          <div class="rank-item">
            <div class="rank-no">1</div>
            <div>
              <div class="rank-name">Data belum tersedia</div>
              <div class="rank-cat">Upload/cek Excel</div>
            </div>
            <div class="rank-dist">-</div>
          </div>
        `;

      nearestRankList.querySelectorAll("[data-rank-place]").forEach(item => {
        item.addEventListener("click", () => {
          const place = getPlaceById(item.dataset.rankPlace);
          if (place) {
            setDestinationPlace(place, true);
            if (map) map.flyTo([place.lat, place.lng], 17, { duration: 0.8 });
          }
        });
      });
    }

    if (insightSummary) {
      if (nearest) {
        insightSummary.textContent = `Index ${readinessScore}/100 dihitung dari jumlah titik, lokasi 24 jam, emergency, dan radius aktif. Titik terdekat: ${getDisplayName(nearest)} sekitar ${nearest.distanceMeters} meter dari Rektorat UPN.`;
      } else {
        insightSummary.textContent = "Data belum tersedia atau koordinat belum terbaca.";
      }
    }

    if (routeInsight) {
      const routeText = selectedPlace
        ? `Tujuan aktif: ${getDisplayName(selectedPlace)}. Klik Buka Rute untuk memakai asal-tujuan.`
        : "Klik marker atau ranking lokasi untuk menjadikan titik itu tujuan rute.";
      routeInsight.textContent = routeText;
    }
  }

  function showInsightDashboard() {
    if (insightDashboard) {
      insightDashboard.classList.remove("hidden-dashboard");
      updateInsightDashboard();
      setTimeout(restartDashboardMotion, 120);
    }
  }

  function hideInsightDashboard() {
    if (insightDashboard) {
      insightDashboard.classList.add("hidden-dashboard");
    }
  }

  function toggleInsightDashboard() {
    if (!insightDashboard) return;

    if (insightDashboard.classList.contains("hidden-dashboard")) {
      showInsightDashboard();
    } else {
      hideInsightDashboard();
    }
  }

  function focusNearestPlace() {
    const nearest = getNearestPlace(filteredPlaces());

    if (!nearest) {
      if (insightSummary) insightSummary.textContent = "Tidak ada lokasi terdekat pada filter/radius aktif.";
      return;
    }

    setDestinationPlace(nearest, true);

    if (map) {
      map.flyTo([nearest.lat, nearest.lng], 17, { duration: 0.8 });
    }

    if (insightSummary) {
      insightSummary.textContent = `Fokus ke ${getDisplayName(nearest)}, jarak sekitar ${nearest.distanceMeters} meter dari Rektorat UPN.`;
    }
  }

  async function loadAllData() {
  try {
    const [
      laundryRows,
      minimarketRows,
      rumahMakanRows,
      fasilitasKesehatanRows,
      emergencyRows
    ] = await Promise.all([
      readFirstExistingExcel("laundry"),
      readFirstExistingExcel("minimarket"),
      readFirstExistingExcel("rumah_makan"),
      readFirstExistingExcel("fasilitas_kesehatan"),
      readFirstExistingExcel("emergency")
    ]);

    const laundryData = laundryRows
      .map(normalizeLaundry)
      .filter(item => !isNaN(item.lat) && !isNaN(item.lng));

    const minimarketData = minimarketRows
      .map(normalizeMinimarket)
      .filter(item => !isNaN(item.lat) && !isNaN(item.lng));

    const rumahMakanData = rumahMakanRows
      .map(normalizeRumahMakan)
      .filter(item => !isNaN(item.lat) && !isNaN(item.lng));

    const fasilitasKesehatanData = fasilitasKesehatanRows
      .map(normalizeFasilitasKesehatan)
      .filter(item => !isNaN(item.lat) && !isNaN(item.lng));

    const emergencyData = emergencyRows
      .map(normalizeEmergency)
      .filter(item => !isNaN(item.lat) && !isNaN(item.lng));

    places = [
      ...laundryData,
      ...minimarketData,
      ...rumahMakanData,
      ...fasilitasKesehatanData,
      ...emergencyData
    ];
    console.info(`Total data terbaca: ${places.length}`);

    populateDestinationOptions();
    renderFilterList();
    syncChips();
    renderMarkers();
    updateInsightDashboard();

    if (!places.length) {
      detailTitle.textContent = "Data Excel kosong / koordinat belum terbaca";
      detailDistance.textContent = "";
      detailPrice.textContent = "Cek kolom Latitude dan Longitude di file Excel";
      detailMeta.innerHTML = `
        <div>Script sudah membaca folder <b>data</b>, tapi tidak ada baris dengan koordinat valid.</div>
        <div>Pastikan nama file: laundry.xlsx, minimarket.xlsx, rumah_makan.xlsx, fasilitas_kesehatan.xlsx, emergency.xlsx.</div>
      `;
    }

  } catch (error) {
    console.error(error);

    places = [];
    renderFilterList();
    syncChips();

    detailTitle.textContent = "Data belum terbaca";
    detailDistance.textContent = "";
    detailPrice.textContent = "Cek folder data dan nama file Excel";
    detailMeta.innerHTML = `
      <div><b>Error:</b> ${error.message}</div>
      <div>Pastikan file ada di folder:</div>
      <div>data/laundry.xlsx</div>
      <div>data/minimarket.xlsx</div>
      <div>data/rumah_makan.xlsx</div>
      <div>data/fasilitas_kesehatan.xlsx</div>
      <div>data/emergency.xlsx</div>
    `;
  }
}

  function applyBasemapClass(type) {
    document.body.classList.remove(
      "basemap-dark",
      "basemap-streets",
      "basemap-satellite",
      "basemap-light"
    );

    document.body.classList.add(`basemap-${type}`);
  }

  function setBasemap(type) {
    if (!map) return;

    if (currentBaseLayer) {
      map.removeLayer(currentBaseLayer);
    }

    currentBaseLayer = baseMaps[type];
    currentBaseLayer.addTo(map);

    applyBasemapClass(type);
  }

  function applyTheme(mode) {
    document.body.classList.remove("theme-dark", "theme-light", "force-dark", "force-light");

    if (mode === "dark") {
      document.body.classList.add("theme-dark", "force-dark");
      if (themeToggle) {
        themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i> Light`;
      }
      localStorage.setItem("studentSurvivalTheme", "dark");
    } else {
      document.body.classList.add("theme-light", "force-light");
      if (themeToggle) {
        themeToggle.innerHTML = `<i class="fa-solid fa-moon"></i> Dark`;
      }
      localStorage.setItem("studentSurvivalTheme", "light");
    }
  }

  function toggleTheme() {
    const isDark = document.body.classList.contains("force-dark");
    applyTheme(isDark ? "light" : "dark");
  }

  function distanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  function createIcon(category) {
    const cfg = categories[category] || categories.laundry;

    return L.divIcon({
      className: "custom-div-icon",
      html: `<div class="marker-wrap" style="background:${cfg.color};"><i class="${cfg.icon}"></i></div>`,
      iconSize: [42, 48],
      iconAnchor: [21, 42],
      popupAnchor: [0, -36]
    });
  }

  function updateRadiusCircle(radiusValue) {
    if (!map) return;

    const radius = 5000;

    if (radiusCircle) {
      map.removeLayer(radiusCircle);
    }

    radiusCircle = L.circle(upnLatLng, {
      radius: radius,
      color: "#4da3ff",
      weight: 2,
      fillColor: "#4da3ff",
      fillOpacity: 0.10
    }).addTo(map);

    legendText.textContent = "Radius aktif: 5 km dari Rektorat UPN";
  }

  function clearRoute() {
    if (routeControl) {
      map.removeControl(routeControl);
      routeControl = null;
    }

    clearRouteDirections();

    if (routeHint) {
      routeHint.textContent = "Rute dibersihkan. Pilih asal dan tujuan untuk membuat rute baru.";
    }
  }

  function showRoutePlanner() {
    if (routePlanner) {
      routePlanner.classList.remove("hidden-route");
    }
  }

  function hideRoutePlanner() {
    if (routePlanner) {
      routePlanner.classList.add("hidden-route");
    }
  }

  function setOriginMarker(latlng, label) {
    currentOriginLatLng = latlng;
    currentOriginLabel = label || "Titik asal";

    if (!map) return;

    if (originMarker) {
      map.removeLayer(originMarker);
    }

    originMarker = L.marker(latlng, {
      icon: L.divIcon({
        className: "custom-div-icon",
        html: '<div class="origin-marker-wrap"><i class="fa-solid fa-location-crosshairs"></i></div>',
        iconSize: [42, 42],
        iconAnchor: [21, 21]
      })
    }).addTo(map).bindPopup(`<b>Asal:</b> ${currentOriginLabel}`);

    if (routeHint) {
      routeHint.textContent = `Asal dipilih: ${currentOriginLabel}`;
    }
  }

function resetOriginToCampus() {
    currentOriginLatLng = upnLatLng;
    currentOriginLabel = "Rektorat UPN";

    if (originMarker && map) {
      map.removeLayer(originMarker);
      originMarker = null;
    }

    if (routeHint) {
      routeHint.textContent = "Asal dipilih: Rektorat UPN";
    }
  }

  function setOriginFromMyLocation() {
    if (!navigator.geolocation) {
      if (routeHint) routeHint.textContent = "Browser tidak mendukung geolocation.";
      return;
    }

    if (routeHint) routeHint.textContent = "Mengambil lokasi kamu...";

    navigator.geolocation.getCurrentPosition(
      position => {
        const latlng = [position.coords.latitude, position.coords.longitude];
        setOriginMarker(latlng, "Lokasi Saya");
        map.setView(latlng, 16);
      },
      () => {
        if (routeHint) routeHint.textContent = "Lokasi gagal diambil. Izinkan akses lokasi di browser.";
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  function populateDestinationOptions() {
    if (!destinationSelect) return;

    const currentValue = destinationSelect.value;

    destinationSelect.innerHTML = '<option value="">Tujuan: pilih lokasi</option>' +
      places
        .slice()
        .sort((a, b) => String(getDisplayName(a)).localeCompare(String(getDisplayName(b))))
        .map(place => `<option value="${place.id}">${getDisplayName(place)} - ${categories[place.category]?.label || place.category}</option>`)
        .join("");

    if (currentValue) {
      destinationSelect.value = currentValue;
    }
  }

  function getPlaceById(id) {
    return places.find(place => String(place.id) === String(id));
  }

  function setDestinationPlace(place, shouldOpenPanel = true) {
    if (!place) return;

    selectedPlace = place;

    if (destinationSelect) {
      destinationSelect.value = place.id;
    }

    if (shouldOpenPanel) {
      updateDetail(place);
    }
  }

  function drawRouteToSelectedDestination() {
    const destinationId = destinationSelect ? destinationSelect.value : "";
    const destination = destinationId ? getPlaceById(destinationId) : selectedPlace;

    if (!destination) {
      if (routeHint) routeHint.textContent = "Pilih tujuan dulu.";
      return;
    }

    selectedPlace = destination;
    drawRouteTo(destination);
    updateDetail(destination);

    if (routeHint) {
      routeHint.textContent = `Rute aktif: ${currentOriginLabel} → ${getDisplayName(destination)}`;
    }
  }

  function formatDistanceMeters(value) {
    const meters = Number(value) || 0;

    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1).replace(".", ",")} km`;
    }

    return `${Math.round(meters)} m`;
  }

  function formatDurationSeconds(value) {
    const seconds = Number(value) || 0;
    const minutes = Math.max(1, Math.round(seconds / 60));

    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes ? `${hours} jam ${remainingMinutes} menit` : `${hours} jam`;
    }

    return `${minutes} menit`;
  }

  function cleanInstructionText(textValue) {
    return String(textValue || "")
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function clearRouteDirections() {
    if (routeDirections) {
      routeDirections.classList.add("hidden-route-directions");
    }

    if (routeSummary) {
      routeSummary.textContent = "-";
    }

    if (routeSteps) {
      routeSteps.innerHTML = "";
    }
  }

  function renderRouteDirections(route) {
    if (!routeDirections || !routeSteps) return;

    const instructions = Array.isArray(route && route.instructions) ? route.instructions : [];
    const summary = route && route.summary ? route.summary : {};

    if (routeSummary) {
      const distanceText = formatDistanceMeters(summary.totalDistance || route.totalDistance || 0);
      const timeText = formatDurationSeconds(summary.totalTime || route.totalTime || 0);
      routeSummary.textContent = `${distanceText} • ${timeText}`;
    }

    if (!instructions.length) {
      routeSteps.innerHTML = `
        <li>
          <span class="route-step-number">1</span>
          <span>Rute berhasil dibuat, tapi arahan detail jalan tidak tersedia dari server rute.</span>
          <span class="route-step-distance">-</span>
        </li>
      `;
      routeDirections.classList.remove("hidden-route-directions");
      return;
    }

    routeSteps.innerHTML = instructions
      .map((instruction, index) => {
        const directionText = cleanInstructionText(instruction.text) || "Ikuti rute pada peta.";
        const distanceText = formatDistanceMeters(instruction.distance || 0);

        return `
          <li>
            <span class="route-step-number">${index + 1}</span>
            <span>${directionText}</span>
            <span class="route-step-distance">${distanceText}</span>
          </li>
        `;
      })
      .join("");

    routeDirections.classList.remove("hidden-route-directions");
  }

  function drawRouteTo(place) {
    if (!map || !place) return;

    clearRoute();

    if (routeHint) {
      routeHint.textContent = `Menghitung rute dan arahan: ${currentOriginLabel} → ${getDisplayName(place)}...`;
    }

    routeControl = L.Routing.control({
      waypoints: [
        L.latLng(currentOriginLatLng[0], currentOriginLatLng[1]),
        L.latLng(place.lat, place.lng)
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      createMarker: function () {
        return null;
      },
      lineOptions: {
        styles: [
          { color: "#2f80ed", opacity: 0.96, weight: 5, dashArray: "10 12" },
          { color: "#8ec5ff", opacity: 0.50, weight: 8, dashArray: "2 18" }
        ]
      }
    })
      .on("routesfound", function (event) {
        const route = event.routes && event.routes[0];

        renderRouteDirections(route);

        if (routeHint) {
          routeHint.textContent = `Rute aktif: ${currentOriginLabel} → ${getDisplayName(place)}. Arahan lengkap ada di panel bawah.`;
        }
      })
      .on("routingerror", function () {
        clearRouteDirections();

        if (routeHint) {
          routeHint.textContent = "Rute gagal dibuat. Coba pilih lokasi tujuan lain atau cek koneksi internet.";
        }
      })
      .addTo(map);
  }

  function parseTimeToMinutes(timeText) {
    const match = String(timeText).match(/(\d{1,2})[.:](\d{2})/);

    if (!match) return null;

    const hour = parseInt(match[1], 10);
    const minute = parseInt(match[2], 10);

    return hour * 60 + minute;
  }

  function getOpenStatus(place) {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const jam = String(place.Jam_operasional || place.open || "").toLowerCase();

    if (place.open24 || jam.includes("24 jam") || jam.includes("00.00-23.59")) {
      return {
        isOpen: true,
        text: "Masih Buka",
        icon: "🟢"
      };
    }

    const times = jam.match(/\d{1,2}[.:]\d{2}/g);

    if (!times || times.length < 2) {
      return {
        isOpen: null,
        text: "Jam tidak terbaca",
        icon: "⚪"
      };
    }

    const openTime = parseTimeToMinutes(times[0]);
    const closeTime = parseTimeToMinutes(times[1]);

    let isOpen = false;

    if (openTime <= closeTime) {
      isOpen = currentMinutes >= openTime && currentMinutes <= closeTime;
    } else {
      isOpen = currentMinutes >= openTime || currentMinutes <= closeTime;
    }

    return {
      isOpen,
      text: isOpen ? "Masih Buka" : "Sudah Tutup",
      icon: isOpen ? "🟢" : "🔴"
    };
  }

  function updateDetail(place) {
    infoPanel.classList.remove("hidden");
    openInfoPanel.classList.add("hidden");

    const dist = distanceKm(upnLatLng[0], upnLatLng[1], place.lat, place.lng);
    const status = getOpenStatus(place);
    const category = categories[place.category] || {};
    const categoryLabel = category.label || place.category || "Lokasi";
    const isOpen = String(status.text || "").toLowerCase().includes("buka");

    selectedPlace = place;

    if (destinationSelect) {
      destinationSelect.value = place.id;
    }

    const clean = value => {
      const text = value === undefined || value === null ? "" : String(value).trim();
      return text && text !== "-" ? text : "-";
    };

    const detailItem = (icon, label, value) => `
      <div class="detail-item">
        <i class="${icon}"></i>
        <div>
          <span class="detail-label">${label}</span>
          <span class="detail-value">${clean(value)}</span>
        </div>
      </div>
    `;

    detailTitle.textContent = getDisplayName(place);
    detailDistance.textContent = `(${Math.round(dist * 1000)} m)`;

    detailPrice.innerHTML = `
      <span class="service-icon"><i class="${category.icon || "fa-solid fa-location-dot"}"></i></span>
      <span>
        <span class="service-label">Layanan / Keterangan</span>
        ${clean(place.Keterangan || place.price)}
      </span>
    `;

    setDetailImage(place);

    detailButton.textContent = place.Link_google_maps && place.Link_google_maps !== "-" ? "Google Maps" : "Detail Lokasi";

    detailMeta.innerHTML = `
      <div class="status-card ${isOpen ? "" : "closed"}">
        <span class="status-dot"></span>
        <div>
          <b>${status.text}</b>
          <span>${isOpen ? "Layanan tersedia saat ini" : "Cek kembali jam operasional"}</span>
        </div>
      </div>

      <div class="info-section-title">
        <i class="fa-solid fa-circle-info"></i>
        Informasi Tambahan
      </div>

      <div class="detail-grid compact-detail-grid">
        ${detailItem("fa-solid fa-calendar-days", "Hari Operasional", place.Hari_operasional)}
        ${detailItem("fa-solid fa-clock", "Jam Operasional", place.Jam_operasional)}
        ${detailItem("fa-solid fa-phone", "No. Telepon", place.No_Telepon)}
        ${detailItem("fa-solid fa-star", "Rating", place.Rating ? `⭐ ${place.Rating}` : "-")}
        ${detailItem("fa-solid fa-location-dot", "Alamat Lengkap", place.Alamat_lengkap)}
      </div>

    `;

    updateInsightDashboard();
    setTimeout(restartDashboardMotion, 120);

    if (state.networkOn) {
      drawRouteTo(place);
    }
  }

  function filteredPlaces() {
    const radius = 5000;

    return places.filter(place => {
      const searchText = [
        place.id,
        place.name,
        place.Nama,
        place.Nama_Laundry,
        place.Nama_Minimarket,
        place.Nama_Rumah_Makan,
        place.Nama_Emergency,
        place.Keterangan,
        place.Alamat_lengkap,
        place.No_Telepon,
        place.Rating,
        place.Dokumentasi
      ].join(" ").toLowerCase();

      const matchSearch =
        !state.search ||
        searchText.includes(state.search);

      const matchCategory = state.emergencyOnly
        ? place.category === "emergency"
        : state.categories.has(place.category);

      const matchCheap = !state.cheap || place.cheap;
      const match24 = !state.open24 || place.open24;
      const matchNear = !state.nearCampus || place.nearCampus;

      const distMeters =
        distanceKm(upnLatLng[0], upnLatLng[1], place.lat, place.lng) * 1000;

      const matchRadius = distMeters <= radius;

      return matchSearch && matchCategory && matchCheap && match24 && matchNear && matchRadius;
    });
  }


  function buildMarkerPopup(place, status) {
    const name = getDisplayName(place);
    const categoryLabel = categories[place.category]?.label || place.category || "Lokasi";
    const categoryIcon = categories[place.category]?.icon || "fa-solid fa-location-dot";
    const isOpen = String(status.text || "").toLowerCase().includes("buka");

    const mapsButton =
      place.Link_google_maps && place.Link_google_maps !== "-"
        ? `<a class="map-popup-btn primary" href="${place.Link_google_maps}" target="_blank" rel="noopener">
             <i class="fa-brands fa-google"></i> Google Maps
           </a>`
        : "";

    return `
      <div class="map-popup-card">
        <div class="map-popup-head">
          <div class="map-popup-badge">
            <i class="${categoryIcon}"></i>
            ${categoryLabel}
          </div>
        </div>

        <div class="map-popup-body">
          <h3 class="map-popup-title">${name}</h3>

          <div class="map-popup-sub">
            <span class="map-popup-pill">
              <i class="fa-solid fa-fingerprint"></i> ID: ${place.id || "-"}
            </span>
            <span class="map-popup-pill ${isOpen ? "status-open" : "status-closed"}">
              ${status.icon} ${status.text}
            </span>
            <span class="map-popup-pill">
              <i class="fa-solid fa-star" style="color:#ffd166;"></i> ${place.Rating || "-"}
            </span>
          </div>

          <div class="map-popup-info">
            <div class="map-popup-row">
              <i class="fa-solid fa-circle-info"></i>
              <div>
                <span class="map-popup-label">Keterangan</span>
                <span class="map-popup-value">${place.Keterangan || "-"}</span>
              </div>
            </div>

            <div class="map-popup-row">
              <i class="fa-solid fa-clock"></i>
              <div>
                <span class="map-popup-label">Jam Operasional</span>
                <span class="map-popup-value">${place.Jam_operasional || "-"}</span>
              </div>
            </div>
          </div>

          <div class="map-popup-actions">
            ${mapsButton}
            <a class="map-popup-btn secondary" href="#" onclick="return false;">
              <i class="fa-solid fa-location-crosshairs"></i> Pilih Lokasi
            </a>
          </div>
        </div>
      </div>
    `;
  }

  function renderMarkers() {
    Object.values(layers).forEach(layer => layer.clearLayers());

    const visiblePlaces = filteredPlaces();

    visiblePlaces.forEach(place => {
      const status = getOpenStatus(place);

      const marker = L.marker([place.lat, place.lng], {
        icon: createIcon(place.category)
      })
        .bindPopup(buildMarkerPopup(place, status), {
          maxWidth: 360,
          minWidth: 300,
          closeButton: true,
          autoPanPadding: [24, 24],
          className: "student-popup"
        })
        .on("click", e => {
          setDestinationPlace(place, true);
          if (map) {
            map.flyTo([place.lat, place.lng], Math.max(map.getZoom(), 16), { duration: 0.7 });
          }
          e.target.openPopup();
        });

      layers[place.category].addLayer(marker);
    });

    // Jangan auto-buka panel Informasi Lokasi saat WebGIS pertama dimuat.
    // Panel hanya muncul saat user klik marker / ranking lokasi / pilih rute.
    if (visiblePlaces.length > 0) {
      infoPanel.classList.add("hidden");
      openInfoPanel.classList.add("hidden");
    } else {
      selectedPlace = null;
      infoPanel.classList.add("hidden");
      openInfoPanel.classList.add("hidden");

      detailTitle.textContent = "Tidak ada data";
      detailDistance.textContent = "";
      detailPrice.textContent = "Coba ubah filter atau radius";
      detailMeta.innerHTML = `<div>Data tidak ditemukan pada radius/filter aktif.</div>`;
      clearRoute();
    }

    document.getElementById("emergencyCount").textContent =
      places.filter(p => p.category === "emergency").length;

    updateInsightDashboard();
      setTimeout(restartDashboardMotion, 120);
  }

 function renderFilterList() {
  const filterList = document.getElementById("filterList");
  const keys = ["laundry", "minimarket", "rumah_makan", "fasilitas_kesehatan", "emergency"];

  filterList.innerHTML = keys.map(key => {
    const cfg = categories[key];
    const count = places.filter(p => p.category === key).length;
    const active = state.categories.has(key) ? "active" : "";

    return `
      <div class="filter-item ${active}" data-category="${key}">
        <div class="filter-left">
          <div class="cat-icon" style="background:${cfg.color};">
            <i class="${cfg.icon}"></i>
          </div>
          <div class="cat-label">
            ${cfg.label}<span class="cat-count">(${count})</span>
          </div>
        </div>
        <div class="check">✓</div>
      </div>
    `;
  }).join("");

  document.querySelectorAll(".filter-item").forEach(item => {
    item.addEventListener("click", () => {
      const key = item.dataset.category;

      if (state.categories.has(key)) {
        state.categories.delete(key);
      } else {
        state.categories.add(key);
      }

      renderFilterList();
      renderMarkers();
    });
  });
}

  function syncChips() {
    document.querySelectorAll("[data-chip]").forEach(btn => {
      const key = btn.dataset.chip;

      const active =
        (key === "murah" && state.cheap) ||
        (key === "24jam" && state.open24) ||
        (key === "dekat" && state.nearCampus) ||
        (key === "emergency" && state.emergencyOnly) ||
        (key === "network" && state.networkOn);

      btn.classList.toggle("active", active);
    });
  }

  function syncPanelPositions() {
    const topOpen = !topControls.classList.contains("collapsed");
    const leftOpen = !leftPanel.classList.contains("collapsed");

    if (topOpen && leftOpen && window.innerWidth > 900) {
      leftPanel.classList.add("shifted");
    } else {
      if (leftPanel) leftPanel.classList.remove("shifted");
    }
  }

  function initRevealAnimations() {
    const items = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    }, { threshold: 0.12 });

    items.forEach(item => observer.observe(item));
  }

  
  function closePanelsForDashboard() {
    if (topControls && !topControls.classList.contains("collapsed")) {
      topControls.classList.add("collapsed");
    }
    if (leftPanel && !leftPanel.classList.contains("collapsed")) {
      leftPanel.classList.add("collapsed");
    }
    if (routePlanner) {
      routePlanner.classList.add("hidden-route");
    }
    syncPanelPositions();
  }

function handleResponsivePanels() {
    const isMobile = window.innerWidth <= 900;

    if (isMobile) {
      if (topControls) topControls.classList.remove("collapsed");
      if (leftPanel) leftPanel.classList.remove("collapsed");
      if (leftPanel) leftPanel.classList.remove("shifted");
    }
  }

  async function initMap() {
    if (mapInitialized) return;

    map = L.map("map", { zoomControl: false, preferCanvas: true, zoomAnimation: false, fadeAnimation: false, markerZoomAnimation: false }).setView(upnLatLng, 15);
    L.control.zoom({ position: "topright" }).addTo(map);

    setBasemap("dark");
    updateRadiusCircle(radiusSelect.value);

    L.marker(upnLatLng, {
      icon: L.divIcon({
        className: "custom-div-icon",
        html: '<div class="marker-wrap" style="background:#2f80ed;"><i class="fa-solid fa-building-columns"></i></div>',
        iconSize: [42, 48],
        iconAnchor: [21, 42]
      })
    }).addTo(map).bindPopup("<b>Rektorat UPN Jogja</b>");

    resetOriginToCampus();

    map.on("click", e => {
      if (originSelect && originSelect.value === "pick") {
        setOriginMarker([e.latlng.lat, e.latlng.lng], "Titik Klik di Peta");
      }
    });

    Object.keys(categories).forEach(key => {
      layers[key] = L.layerGroup().addTo(map);
    });

    renderFilterList();
    syncChips();

    await loadAllData();

    syncPanelPositions();
    handleResponsivePanels();

    basemapSelect.addEventListener("change", function () {
      setBasemap(this.value);

      const savedTheme = localStorage.getItem("studentSurvivalTheme");
      if (!savedTheme) {
        document.body.classList.remove("force-dark", "force-light");
      }
    });

    if (themeToggle) {
      themeToggle.addEventListener("click", toggleTheme);
    }

    if (toggleDashboard) {
      toggleDashboard.addEventListener("click", toggleInsightDashboard);
    }

    if (focusNearestBtn) {
      focusNearestBtn.addEventListener("click", focusNearestPlace);
    }


    if (openRouteFromInsight) {
      openRouteFromInsight.addEventListener("click", () => {
        showRoutePlanner();
        state.networkOn = true;
        syncChips();
        if (selectedPlace) {
          drawRouteTo(selectedPlace);
        }
      });
    }

    if (fitAllInsightBtn) {
      fitAllInsightBtn.addEventListener("click", () => {
        const valid = filteredPlaces().filter(item => !isNaN(item.lat) && !isNaN(item.lng));
        if (valid.length && map) {
          const bounds = L.latLngBounds(valid.map(item => [item.lat, item.lng]));
          map.fitBounds(bounds, { padding: [60, 60] });
        }
      });
    }

    if (originSelect) {
      originSelect.addEventListener("change", function () {
        showRoutePlanner();

        if (this.value === "campus") {
          resetOriginToCampus();
          map.setView(upnLatLng, 15);
        }

        if (this.value === "mylocation") {
          setOriginFromMyLocation();
        }

        if (this.value === "pick" && routeHint) {
          routeHint.textContent = "Klik satu titik di peta untuk menentukan asal.";
        }

        clearRouteDirections();
      });
    }

    if (destinationSelect) {
      destinationSelect.addEventListener("change", function () {
        const place = getPlaceById(this.value);
        if (place) {
          setDestinationPlace(place, true);
          clearRouteDirections();
          map.flyTo([place.lat, place.lng], Math.max(map.getZoom(), 16), { duration: 0.7 });
        }
      });
    }

    if (routeNowBtn) {
      routeNowBtn.addEventListener("click", () => {
        state.networkOn = true;
        syncChips();
        drawRouteToSelectedDestination();
      });
    }

    if (clearRouteBtn) {
      clearRouteBtn.addEventListener("click", () => {
        state.networkOn = false;
        syncChips();
        clearRoute();
      });
    }

    if (radiusSelect) {
      radiusSelect.value = "5000";
    }

    mapInitialized = true;

    setTimeout(() => {
      map.invalidateSize();
    }, 250);
  }

  function openMapPage() {
    if (landingPage) landingPage.classList.add("hidden");
    if (mapPage) mapPage.classList.remove("hidden");
    document.body.classList.add("map-active");
    initMap();
    if (insightDashboard) insightDashboard.classList.remove("hidden-dashboard");
    setTimeout(() => showTutorial(false), 650);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (enterMapBtn) enterMapBtn.addEventListener("click", openMapPage);
  if (enterMapBtnBottom) enterMapBtnBottom.addEventListener("click", openMapPage);

  if (backHomeBtn) {
    backHomeBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  if (toggleTopPanel) toggleTopPanel.addEventListener("click", () => {
    if (window.innerWidth <= 900) return;
    topControls.classList.toggle("collapsed");

    if (topControls.classList.contains("collapsed")) {
      hideRoutePlanner();
      hideInsightDashboard();
    }

    syncPanelPositions();
  });

  if (toggleLeftPanel) toggleLeftPanel.addEventListener("click", () => {
    if (window.innerWidth <= 900) return;
    leftPanel.classList.toggle("collapsed");
    syncPanelPositions();
  });

  if (closeInfoPanel) closeInfoPanel.addEventListener("click", () => {
    infoPanel.classList.add("hidden");
    openInfoPanel.classList.remove("hidden");
  });

  if (openInfoPanel) openInfoPanel.addEventListener("click", () => {
    infoPanel.classList.remove("hidden");
    openInfoPanel.classList.add("hidden");
  });

  document.querySelectorAll("[data-chip]").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.chip;

      if (key === "murah") state.cheap = !state.cheap;
      if (key === "24jam") state.open24 = !state.open24;
      if (key === "dekat") state.nearCampus = !state.nearCampus;
      if (key === "emergency") state.emergencyOnly = !state.emergencyOnly;

      if (key === "network") {
        state.networkOn = !state.networkOn;

        if (!state.networkOn) {
          clearRoute();
          hideRoutePlanner();
        } else {
          showRoutePlanner();
          if (selectedPlace) {
            drawRouteTo(selectedPlace);
          }
        }
      }

      syncChips();
      renderMarkers();
    });
  });

  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) resetBtn.addEventListener("click", () => {
    state.categories = new Set(["laundry", "minimarket", "rumah_makan", "fasilitas_kesehatan", "emergency"]);
    state.cheap = false;
    state.open24 = false;
    state.nearCampus = false;
    state.emergencyOnly = false;
    state.networkOn = false;
    state.search = "";

    document.getElementById("searchInput").value = "";

    basemapSelect.value = "dark";
    radiusSelect.value = "5000";

    setBasemap("dark");
    updateRadiusCircle("5000");
    clearRoute();
    resetOriginToCampus();
    if (originSelect) originSelect.value = "campus";
    if (destinationSelect) destinationSelect.value = "";
    hideRoutePlanner();
    hideInsightDashboard();

    renderFilterList();
    syncChips();
    renderMarkers();

    map.setView(upnLatLng, 15);

    selectedPlace = null;
    infoPanel.classList.add("hidden");
    openInfoPanel.classList.add("hidden");

    syncPanelPositions();
    handleResponsivePanels();
  });

  document.getElementById("searchBtn").addEventListener("click", () => {
    state.search = document.getElementById("searchInput").value.trim().toLowerCase();
    renderMarkers();
  });

  document.getElementById("searchInput").addEventListener("keydown", e => {
    if (e.key === "Enter") {
      state.search = document.getElementById("searchInput").value.trim().toLowerCase();
      renderMarkers();
    }
  });

  if (routeButton) routeButton.addEventListener("click", () => {
    showRoutePlanner();

    if (selectedPlace) {
      state.networkOn = true;
      syncChips();
      setDestinationPlace(selectedPlace, false);
      drawRouteTo(selectedPlace);
    }
  });

  if (detailButton) detailButton.addEventListener("click", () => {
    if (selectedPlace && selectedPlace.Link_google_maps && selectedPlace.Link_google_maps !== "-") {
      window.open(selectedPlace.Link_google_maps, "_blank");
    }
  });

  

  function showTutorial(force = false) {
    if (!tutorialOverlay) return;

    const hiddenByUser = localStorage.getItem("studentSurvivalHideTutorial") === "true";

    if (hiddenByUser && !force) {
      return;
    }

    tutorialOverlay.classList.remove("hidden-tutorial");
  }

  function hideTutorial() {
    if (!tutorialOverlay) return;

    tutorialOverlay.classList.add("hidden-tutorial");

    if (dontShowTutorialAgain && dontShowTutorialAgain.checked) {
      localStorage.setItem("studentSurvivalHideTutorial", "true");
    }
  }

  function initTutorialEvents() {
    if (openTutorialBtn) {
      openTutorialBtn.addEventListener("click", () => showTutorial(true));
    }

    if (closeTutorialBtn) {
      closeTutorialBtn.addEventListener("click", hideTutorial);
    }

    if (startUsingWebgisBtn) {
      startUsingWebgisBtn.addEventListener("click", hideTutorial);
    }

    if (tutorialOverlay) {
      tutorialOverlay.addEventListener("click", event => {
        if (event.target === tutorialOverlay) {
          hideTutorial();
        }
      });
    }

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && tutorialOverlay && !tutorialOverlay.classList.contains("hidden-tutorial")) {
        hideTutorial();
      }
    });
  }

  function initMotionMode() {
    const cards = document.querySelectorAll(".energy-index-mode .insight-card");

    cards.forEach(card => {
      card.addEventListener("mousemove", event => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 7;
        const rotateX = ((0.5 - y / rect.height)) * 7;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });

    if (toggleDashboard && insightDashboard) {
      const syncDashboardButton = () => {
        toggleDashboard.classList.toggle("active", !insightDashboard.classList.contains("hidden-dashboard"));
      };

      syncDashboardButton();

      toggleDashboard.addEventListener("click", () => {
        setTimeout(syncDashboardButton, 20);
      });
    }
  }

  function animateNumberText(element, target, suffix = "") {
    if (!element) return;

    const cleanTarget = Number(String(target).replace(/[^\d.]/g, ""));
    if (Number.isNaN(cleanTarget)) {
      element.textContent = target + suffix;
      return;
    }

    const start = Number(String(element.textContent).replace(/[^\d.]/g, "")) || 0;
    const duration = 850;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(start + (cleanTarget - start) * eased);

      element.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  function animateDashboardNumbers() {
    if (survivalScore) {
      const value = Number(String(survivalScore.textContent).replace(/[^\d.]/g, "")) || 0;
      animateNumberText(survivalScore, value);
    }

    if (metricTotal) animateNumberText(metricTotal, metricTotal.textContent);
    if (metricOpen24) animateNumberText(metricOpen24, metricOpen24.textContent);
  }

  function restartDashboardMotion() {
    if (!insightDashboard) return;

    insightDashboard.querySelectorAll(".intensity-bar, .rank-item, .insight-main, .insight-side").forEach(el => {
      el.style.animation = "none";
      void el.offsetHeight;
      el.style.animation = "";
    });

    animateDashboardNumbers();
  }

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("studentSurvivalTheme");

    if (savedTheme === "dark" || savedTheme === "light") {
      applyTheme(savedTheme);
    } else {
      document.body.classList.add("theme-light");
      if (basemapSelect) applyBasemapClass(basemapSelect.value || "dark");
    }

    initRevealAnimations();
    handleResponsivePanels();
    initTutorialEvents();
    initMotionMode();

    if (document.getElementById("map")) {
      document.body.classList.add("map-active");
      if (mapPage) mapPage.classList.remove("hidden");
      initMap();
    }

    setTimeout(restartDashboardMotion, 400);
  });

  window.addEventListener("resize", () => {
    handleResponsivePanels();
    syncPanelPositions();

    if (typeof mapInitialized !== "undefined" && mapInitialized && map) {
      setTimeout(() => map.invalidateSize(), 200);
    }
  });
