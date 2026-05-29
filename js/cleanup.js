
/* EMERGENCY CLEANUP: hapus CSS mentah kalau tidak sengaja kepaste sebagai teks di body */
(function removeRawCssText(){
  function clean(){
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const remove = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const txt = node.nodeValue || "";
      if (
        txt.includes("FINAL FIX CHATGPT") ||
        txt.includes("Tempel otomatis sebelum") ||
        txt.includes("jadi CSS tidak tampil sebagai teks") ||
        (txt.includes(".intro-orbit") && txt.includes("!important") && txt.includes("io-loader"))
      ) {
        remove.push(node);
      }
    }
    remove.forEach(n => n.parentNode && n.parentNode.removeChild(n));
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", clean);
  else clean();
})();
