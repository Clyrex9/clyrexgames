// ═══════════════════════════════════════════════════════════════════════════
// DeckBall Store — Elmas & VIP (Xsolla)
//
// Akış:
//   1. Oyuncu, oyundaki "Oyuncu ID"yi (Firestore uid) buraya yapıştırır
//      (veya Google ile giriş yapıp otomatik doldurur — sadece oyunda Google'a
//      bağlı hesaplar için).
//   2. Paket seçer → Xsolla ödeme sayfası açılır (user_id = Oyuncu ID).
//   3. Ödeme bitince Xsolla, Firebase Cloud Function webhook'una bildirir →
//      elmaslar users/{uid} dokümanına yazılır. (functions/index.js)
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// ⚙️  YAPILANDIRMA — Xsolla onayı gelince burayı doldur
// ─────────────────────────────────────────────────────────────────────────────
const XSOLLA = {
  // EN KOLAY YOL — Xsolla "Web Shop" (Xsolla'nın barındırdığı hazır mağaza).
  // Onaylanınca panelden mağaza URL'ini al ve buraya yapıştır:
  //   örn: "https://clyrexgames.web-store.xsolla.com"
  storeUrl: "",

  // Pay Station / Buy Button kullanacaksan proje bilgileri (Web Shop kullanırsan boş bırak):
  projectId: "",   // Xsolla Project ID
  merchantId: "",  // Xsolla Merchant ID

  // Oyuncu ID'yi Xsolla'ya hangi query parametresiyle göndereceğin.
  // Web Shop kurarken Xsolla'da "external user id" parametresinin adına göre ayarla.
  userParam: "user_id",
};

// ─────────────────────────────────────────────────────────────────────────────
// 💎  PAKETLER  (bonus dahil — webhook GEMS_BY_SKU ile BİREBİR aynı olmalı!)
//     SKU isimleri Xsolla katalogunda da aynen oluşturulmalı.
// ─────────────────────────────────────────────────────────────────────────────
// badge = i18n anahtarı (yoksa null). Metinler js/i18n.js sözlüğünde.
const PACKAGES = [
  { sku: "gems_100",  base: 100,  bonus: 20,  badge: null,                accent: "#3b82f6" },
  { sku: "gems_500",  base: 500,  bonus: 150, badge: "badge_popular",     accent: "#a855f7" },
  { sku: "gems_1000", base: 1000, bonus: 350, badge: null,                accent: "#d4a645" },
  { sku: "gems_2000", base: 2000, bonus: 800, badge: "badge_bestvalue",   accent: "#e91e63" },
  { sku: "vip-pass",  vip: true,  badge: "badge_subscription",            accent: "#d4a645" },
];

// ── i18n yardımcıları (js/i18n.js yüklenmezse İngilizce/anahtar fallback) ──
const t   = (k) => (window.I18N ? window.I18N.t(k) : k);
const loc = () => (window.I18N ? window.I18N.locale : "tr-TR");

// ─────────────────────────────────────────────────────────────────────────────
// Firebase (yalnızca Google ile otomatik ID doldurma için — opsiyonel)
// Config, oyun uygulamasıyla (src/services/firebaseService.js) aynı projedir.
// ─────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyDaGlnL9vieo36u7nKpzfanvqUs1h5_YeA",
  authDomain:        "deckball.firebaseapp.com",
  projectId:         "deckball",
  storageBucket:     "deckball.firebasestorage.app",
  messagingSenderId: "628821249096",
  appId:             "1:628821249096:android:a3681a4567343cf149dc7d",
};

const idInput   = document.getElementById("playerId");
const idStatus  = document.getElementById("idStatus");
const googleBtn = document.getElementById("googleBtn");
const googleLbl = document.getElementById("googleBtnLabel");
const grid      = document.getElementById("packageGrid");

// ── Oyuncu ID basit doğrulama (Firebase uid formatı ~28 karakter alfanümerik) ─
function looksLikeUid(v) {
  return /^[A-Za-z0-9]{20,40}$/.test((v || "").trim());
}

function refreshIdStatus() {
  const v = idInput.value.trim();
  if (!v) { idStatus.textContent = ""; idStatus.className = "store-id-status"; return; }
  if (looksLikeUid(v)) {
    idStatus.textContent = t("id_ok");
    idStatus.className = "store-id-status is-ok";
  } else {
    idStatus.textContent = t("id_warn");
    idStatus.className = "store-id-status is-warn";
  }
}
idInput.addEventListener("input", refreshIdStatus);

// ── Google ile giriş (opsiyonel, lazy-load) ──────────────────────────────────
googleBtn.addEventListener("click", async () => {
  googleLbl.textContent = t("g_loading");
  googleBtn.disabled = true;
  try {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js");
    const { getAuth, GoogleAuthProvider, signInWithPopup } =
      await import("https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js");

    const app  = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const uid = result?.user?.uid;
    if (uid) {
      idInput.value = uid;
      refreshIdStatus();
      googleLbl.textContent = t("g_filled") + " (" + (result.user.email || "Google") + ")";

      // Oyuncu profilini sunucuda oluştur/güncelle (oyunda da görünür olsun).
      // ID token'ı backend doğrular; başarısız olsa bile satın alma engellenmez.
      try {
        const idToken = await result.user.getIdToken();
        await fetch("/.netlify/functions/ensure-profile", {
          method: "POST",
          headers: { Authorization: "Bearer " + idToken },
        });
      } catch (e) {
        console.warn("[Store] profil senkronu atlandı:", e);
      }
    } else {
      googleLbl.textContent = t("g_failed");
      googleBtn.disabled = false;
    }
  } catch (e) {
    console.warn("[Store] Google giriş hatası:", e);
    googleLbl.textContent = t("g_cancelled");
    googleBtn.disabled = false;
  }
});

// ── Satın alma → Xsolla'ya yönlendir ─────────────────────────────────────────
function buy(pkg) {
  const uid = idInput.value.trim();
  if (!looksLikeUid(uid)) {
    idInput.focus();
    idStatus.textContent = t("id_need");
    idStatus.className = "store-id-status is-warn";
    return;
  }

  if (typeof gtag === "function") {
    gtag("event", "web_store_checkout", { sku: pkg.sku });
  }

  // Xsolla henüz bağlı değilse kullanıcıyı bilgilendir
  if (!XSOLLA.storeUrl) {
    alert(t("store_soon") + uid);
    return;
  }

  // Xsolla Web Shop'a yönlendir (ID + seçilen ürün parametreleriyle)
  const url = new URL(XSOLLA.storeUrl);
  url.searchParams.set(XSOLLA.userParam, uid);
  url.searchParams.set("sku", pkg.sku);
  window.location.href = url.toString();
}

// ── Paket kartlarını çiz ──────────────────────────────────────────────────────
function render() {
  grid.innerHTML = "";
  for (const pkg of PACKAGES) {
    const card = document.createElement("div");
    card.className = "store-card" + (pkg.badge ? " has-badge" : "");
    card.style.setProperty("--card-accent", pkg.accent);

    const total = pkg.vip ? null : pkg.base + pkg.bonus;

    const l = loc();
    card.innerHTML = `
      ${pkg.badge ? `<span class="store-card-badge">${t(pkg.badge)}</span>` : ""}
      <div class="store-card-icon">${pkg.vip ? "👑" : "💎"}</div>
      ${pkg.vip
        ? `<div class="store-card-amount">VIP</div>
           <div class="store-card-sub">${t("vip_sub")}</div>`
        : `<div class="store-card-amount">${total.toLocaleString(l)} <span>${t("gems_word")}</span></div>
           <div class="store-card-sub">${pkg.base.toLocaleString(l)} + ${pkg.bonus.toLocaleString(l)} ${t("bonus_word")}</div>`}
      <button class="store-buy-btn" type="button">${t("buy_btn")}</button>
    `;
    card.querySelector(".store-buy-btn").addEventListener("click", () => buy(pkg));
    grid.appendChild(card);
  }
}

render();

// Dil değişince paketleri ve durum metnini yeniden çiz
window.addEventListener("langchange", () => {
  render();
  refreshIdStatus();
});
