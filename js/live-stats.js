// ═══════════════════════════════════════════════════════════════════════════
// live-stats — DeckBall'un puan ve yorum sayısını Google Play'den canlı çeker
// ve sayfadaki [data-live] elementlerini günceller. Progressive enhancement:
// istek başarısız olursa HTML'deki elle-yazılı değerler olduğu gibi kalır.
//
// İndirme sayıları buraya DAHİL DEĞİL — onlar Play Console gerçeğiyle elle
// tutuluyor (Play halka açık sayfa yalnızca kademe gösterir).
//   [data-live="rating"]       → "4.6"
//   [data-live="rating-star"]  → "★ 4.6"
//   [data-live="reviews"]      → "94"   (yanındaki kelime i18n'den gelir)
// ═══════════════════════════════════════════════════════════════════════════
(function () {
  "use strict";
  var ENDPOINT = "/.netlify/functions/play-stats";
  var last = null;

  function fmtRating(s) {
    return (Math.round(s * 10) / 10).toFixed(1);
  }

  function fmtReviews(n) {
    var loc = (document.documentElement.lang === "tr") ? "tr-TR" : "en-US";
    try { return n.toLocaleString(loc); } catch (e) { return String(n); }
  }

  function setText(sel, value) {
    var nodes = document.querySelectorAll(sel);
    for (var i = 0; i < nodes.length; i++) nodes[i].textContent = value;
  }

  function apply(data) {
    var db = data && data.deckball;
    if (!db) return;
    if (typeof db.score === "number" && db.score > 0) {
      var r = fmtRating(db.score);
      setText('[data-live="rating"]', r);
      setText('[data-live="rating-star"]', "★ " + r);
    }
    if (typeof db.reviews === "number" && db.reviews > 0) {
      setText('[data-live="reviews"]', fmtReviews(db.reviews));
    }
  }

  fetch(ENDPOINT, { headers: { Accept: "application/json" } })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) { if (d && d.ok !== false) { last = d; apply(d); } })
    .catch(function () { /* elle değerlerde kal */ });

  // Dil değişince yorum sayısının binlik ayıracını güncelle.
  window.addEventListener("langchange", function () { if (last) apply(last); });
})();
