// ═══════════════════════════════════════════════════════════════════════════
// live-stats — DeckBall'un puan ve yorum sayısını Google Play'den canlı çeker
// ve sayfadaki [data-live] elementlerini günceller. Progressive enhancement:
// istek başarısız olursa HTML'deki elle-yazılı değerler olduğu gibi kalır.
//
// İndirme sayıları buraya DAHİL DEĞİL — onlar Play Console gerçeğiyle elle
// tutuluyor (Play halka açık sayfa yalnızca kademe gösterir).
//   [data-live="rating"]       → "4.7" / "4,7"
//   [data-live="rating-star"]  → "★ 4.7" / "★ 4,7"
//   [data-live="reviews"]      → "117"  (yanındaki kelime i18n'den gelir)
// ═══════════════════════════════════════════════════════════════════════════
(function () {
  "use strict";
  var ENDPOINT = "/.netlify/functions/play-stats";
  // Publisher-provided snapshot (6 October 2026), retained if live stats fail.
  var last = { deckball: { score: 4.7, reviews: 117 } };

  function fmtRating(s) {
    var value = (Math.round(s * 10) / 10).toFixed(1);
    return document.documentElement.lang === "tr" ? value.replace(".", ",") : value;
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
    if (Number.isFinite(db.score) && db.score > 0 && db.score <= 5) {
      var r = fmtRating(db.score);
      setText('[data-live="rating"]', r);
      setText('[data-live="rating-star"]', "★ " + r);
    }
    if (Number.isFinite(db.reviews) && db.reviews > 0) {
      setText('[data-live="reviews"]', fmtReviews(db.reviews));
    }
  }

  apply(last);
  fetch(ENDPOINT, { headers: { Accept: "application/json" } })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) {
      if (!d || d.ok === false || !d.deckball) return;
      var next = d.deckball;
      // A partial live response must not discard the valid fallback snapshot.
      if (Number.isFinite(next.score) && next.score > 0 && next.score <= 5) last.deckball.score = next.score;
      if (Number.isFinite(next.reviews) && next.reviews > 0) last.deckball.reviews = next.reviews;
      apply(last);
    })
    .catch(function () { /* elle değerlerde kal */ });

  // Dil değişince yorum sayısının binlik ayıracını güncelle.
  window.addEventListener("langchange", function () { if (last) apply(last); });
})();
