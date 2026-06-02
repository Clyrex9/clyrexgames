// ═══════════════════════════════════════════════════════════════════════════
// ensure-profile — Web'de Google ile giriş yapan oyuncu için Firestore'da
// users/{uid} profilini oluşturur/günceller.
//
// Akış:
//   1. Frontend (store.js) Google ile giriş yapar → Firebase ID token alır.
//   2. Token'ı Authorization: Bearer <idToken> ile buraya POST eder.
//   3. Burada token Admin SDK ile DOĞRULANIR (sahte uid gönderilemez).
//   4. users/{uid} merge ile yazılır — oyunun yazdığı alanlar EZİLMEZ.
//
// Böylece oyuncu daha önce oyunu hiç açmamış olsa bile, aynı Google hesabıyla
// oyuna girince aynı uid ile profili hazır bulur (gmail kayıtlı → oyunda belli).
//
// Endpoint: https://clyrexgames.com/.netlify/functions/ensure-profile
// ═══════════════════════════════════════════════════════════════════════════

import admin from "firebase-admin";

function getAdmin() {
  if (!admin.apps.length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT env değişkeni eksik");
    const text = raw.trim().startsWith("{")
      ? raw
      : Buffer.from(raw, "base64").toString("utf8");
    admin.initializeApp({ credential: admin.credential.cert(JSON.parse(text)) });
  }
  return admin;
}

function resp(statusCode, obj) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  };
}

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return resp(405, { error: "POST bekleniyor" });
  }

  const authHeader = event.headers?.authorization || event.headers?.Authorization || "";
  const idToken = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!idToken) {
    return resp(401, { error: "ID token eksik" });
  }

  let a;
  try {
    a = getAdmin();
  } catch (e) {
    console.error("[ensure-profile] init hatası:", e.message);
    return resp(500, { error: "Sunucu yapılandırma hatası" });
  }

  let decoded;
  try {
    decoded = await a.auth().verifyIdToken(idToken);
  } catch (e) {
    console.warn("[ensure-profile] token doğrulanamadı:", e.message);
    return resp(401, { error: "Geçersiz token" });
  }

  const uid = decoded.uid;
  const userRef = a.firestore().collection("users").doc(uid);

  try {
    const snap = await userRef.get();
    const now = admin.firestore.FieldValue.serverTimestamp();

    // Sadece profil tanıtım alanları + zaman damgaları. gems/coins gibi oyun
    // verisine DOKUNMUYORUZ (merge: true zaten mevcut alanları korur).
    const profile = {
      email: decoded.email ?? null,
      displayName: decoded.name ?? null,
      photoURL: decoded.picture ?? null,
      lastWebLoginAt: now,
    };
    if (!snap.exists) {
      profile.createdAt = now;
      profile.createdVia = "web";
      // Oyun şemasıyla uyumlu başlangıç değerleri (gemSyncService + firestore.rules).
      profile.purchasedGems = 0;
      profile.earnedCoins = 0;
      profile.isVip = false;
    }

    await userRef.set(profile, { merge: true });

    return resp(200, { uid, created: !snap.exists });
  } catch (e) {
    console.error("[ensure-profile] Firestore hatası:", e);
    return resp(500, { error: "Profil yazılamadı" });
  }
};
