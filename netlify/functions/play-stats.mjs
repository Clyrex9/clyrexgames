// ═══════════════════════════════════════════════════════════════════════════
// play-stats — DeckBall'un Google Play halka açık sayfasından CANLI puan ve
// yorum sayısını çeker. Frontend (js/live-stats.js) bunu çağırıp sayfadaki
// [data-live="rating"] / [data-live="reviews"] elementlerini günceller.
//
// NOT: İndirme sayısı BİLEREK dönülmüyor. Play halka açık sayfada gerçek
// sayıyı değil kademe ("10.000+") gösterir; site indirmeyi Play Console'daki
// gerçek değerle elle tutuyor. Buraya sadece puan + yorum güveniliyor.
//
// Cache: CDN'de 6 saat tutulur (Netlify-CDN-Cache-Control) — her ziyaretçide
// Google'a gidilmez. Scrape başarısızsa ok:false döner, frontend elle
// değerlerde kalır.
//
// Endpoint: https://clyrexgames.com/.netlify/functions/play-stats
// ═══════════════════════════════════════════════════════════════════════════

import gplayPkg from "google-play-scraper";
const gplay = gplayPkg?.default ?? gplayPkg;

const DECKBALL_ID = "com.deckball.game";

// Google bazı bölgelerde puan bloğunu farklı sunuyor: US/GB isteğinde score
// boş gelebilirken TR isteğinde tam geliyor. İlk dolu geleni kullanmak için
// sırayla dene (score global toplamdır, ülke parametresinden bağımsız).
const REGIONS = [
  { country: "tr", lang: "en" },
  { country: "us", lang: "en" },
  { country: "gb", lang: "en" },
];

export const handler = async () => {
  try {
    let app = null;
    for (const region of REGIONS) {
      try {
        const a = await gplay.app({ appId: DECKBALL_ID, ...region });
        if (typeof a.score === "number" && a.score > 0) { app = a; break; }
        if (!app) app = a; // hiç puan gelmezse en azından son yanıtı tut
      } catch (_) { /* sıradaki bölgeyi dene */ }
    }
    if (!app) throw new Error("no response from any region");

    const score = typeof app.score === "number" && app.score > 0 ? app.score : null;
    // Play kartındaki "94 reviews" sayısı = TOPLAM OY (ratings), yazılı yorum
    // (reviews) değil. Önce ratings, yoksa reviews'e düş.
    const reviews =
      typeof app.ratings === "number" && app.ratings > 0
        ? app.ratings
        : typeof app.reviews === "number" && app.reviews > 0
          ? app.reviews
          : null;

    const body = {
      ok: true,
      updatedAt: new Date().toISOString(),
      deckball: { score, reviews },
    };

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        // Tarayıcı 30 dk, Netlify CDN 6 saat (arka planda tazeleyerek) tutar.
        "Cache-Control": "public, max-age=1800",
        "Netlify-CDN-Cache-Control":
          "public, durable, s-maxage=21600, stale-while-revalidate=86400",
      },
      body: JSON.stringify(body),
    };
  } catch (e) {
    console.error("[play-stats] scrape başarısız:", e?.message || e);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
      },
      body: JSON.stringify({ ok: false, error: "unavailable" }),
    };
  }
};
