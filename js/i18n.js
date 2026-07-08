// ═══════════════════════════════════════════════════════════════════════════
// Basit i18n — statik site için TR/EN dil değiştirici.
//   • [data-i18n]      → textContent değişir
//   • [data-i18n-html] → innerHTML değişir (<br>, <strong> içeren metinler)
//   • [data-i18n-ph]   → placeholder değişir
// Dil: localStorage → yoksa tarayıcı dili → varsayılan EN.
// store.js gibi dinamik içerik için window.I18N.t(key) + "langchange" olayı.
// ═══════════════════════════════════════════════════════════════════════════
(function () {
  const STORE_KEY = "clyrex_lang";

  const dict = {
    en: {
      // ── Nav / Footer (ortak) ──
      nav_games: "Games",
      nav_studio: "Studio",
      nav_store: "Store",
      nav_devlog: "Devlog",
      foot_contact: "Contact",
      foot_privacy: "Privacy Policy",
      foot_copy: "© 2026  ·  İzmir, Turkey",

      // ── Ortak ──
      tag_football_cardrpg: "Football · Card RPG",
      reviews_39: "55 reviews",
      db_subtitle: "Football Card RPG",
      btn_googleplay: "Get on Google Play",

      // ── index: hero ──
      idx_hero_tagline: "Independent mobile games<br>built for players who want more.",
      idx_hero_scroll: "See the games",
      stat_games_l: "Games",
      stat_downloads_l: "Downloads",
      stat_rating_l: "Top Rating",

      // ── index: featured ──
      idx_featured_label: "FEATURED GAME",
      idx_feature_body: "Start from the bottom. Fight for a place in the lineup. Every match, every decision — played with cards. Build a career across 15 countries and 764 teams. Find love. Handle the media. Survive the lower leagues.",
      idx_fl_1: "Card-based match decisions",
      idx_fl_2: "15 countries · 764 teams",
      idx_fl_3: "Career RPG with life events",
      idx_fl_4: "8 languages supported",

      // ── index: all games ──
      idx_allgames_label: "ALL GAMES",
      badge_new: "New",
      idx_db_desc: "Build your football career from the bottom up. Strategic card-based matches, team management, and a life beyond the pitch.",
      downloads_3k: "3K+ downloads",
      downloads_5k: "5K+ downloads",
      detail_link: "Details →",
      playstore_link: "Play Store ↗",
      mct_genre: "Idle · Tycoon",
      idx_mct_desc: "Tap your way to millions. Upgrade your empire, claim daily rewards, unlock achievements, and become a money tycoon.",
      badge_soon: "Coming Soon",
      syn_genre: "Interactive Fiction · AI",
      idx_syn_desc: "Chat with AI characters and live out interactive stories. Create your own characters, share them with the community, and shape every story with your choices.",
      syn_status: "In closed beta on Google Play",
      devlog_link: "Devlog →",

      // ── index: studio ──
      idx_studio_label: "STUDIO",
      idx_studio_heading: "One developer.<br>Serious games.",
      idx_studio_body1: "Clyrex is a solo indie studio based in İzmir, Turkey. We make mobile games that prioritize depth over simplicity — games worth spending time with.",
      idx_studio_body2: "DeckBall started as a personal love letter to lower-league football culture. Every mechanic, every card, every career moment was designed to feel earned — not purchased.",
      sfact_founded_l: "Founded",
      sfact_location_l: "Location",
      sfact_games_l: "Games shipped",

      // ── deckball ──
      gstat_teams_l: "Teams",
      gstat_countries_l: "Countries",
      gstat_downloads_l: "Downloads",
      db_about_label: "ABOUT THE GAME",
      db_about_1: "Start from the bottom. Fight for a place in the lineup. Every match, every decision — played with cards. DeckBall is a football career RPG where strategy happens before the whistle blows.",
      db_about_2: "Build a career spanning 15 countries and 764 real-world clubs. Navigate transfer windows, media pressure, and life events off the pitch. Find love. Handle rivals. Survive the lower leagues and rise to the top.",
      db_about_3: "Every card you play is a decision. Every decision shapes your legacy.",
      gfeat1_label: "Card-Based Matches",
      gfeat1_desc: "Strategic decisions on every play",
      gfeat2_label: "15 Countries",
      gfeat2_desc: "764 real clubs to sign for",
      gfeat3_label: "Career RPG",
      gfeat3_desc: "Life events beyond the pitch",
      gfeat4_label: "8 Languages",
      gfeat4_desc: "Full localisation, 8 languages",
      db_screenshots_label: "SCREENSHOTS",

      // ── deckball: by the numbers ──
      stats_label: "BY THE NUMBERS",
      stats_clubs: "Clubs",
      stats_leagues: "Leagues",
      stats_countries: "Countries",
      stats_nationalities: "Nationalities",
      stats_cards: "Action cards",
      stats_cosmetics: "Cosmetics",
      stats_events: "Story events",
      stats_languages: "Languages",
      stats_words: "Words of story",

      // ── store (statik) ──
      store_label: "DECKBALL STORE",
      store_title: "Gems & VIP",
      store_lede: "Enter your Player ID, pick a package, pay securely. Gems are credited to your account right after Xsolla confirms — ready when you open the game.",
      store_bonus_flag: "✦ Web-exclusive bonus gems",
      store_id_label: "PLAYER ID",
      store_id_help: "Copy your ID from <strong>Settings → Player ID</strong> in the game and paste it here. Payment is made to this ID.",
      store_id_ph: "Paste your Player ID here",
      store_or: "or",
      store_google_btn: "Sign in with Google (auto-fill ID)",
      store_google_note: "Only works if you signed in with Google in the game. Otherwise paste the ID manually.",
      store_packages_label: "PACKAGES",

      // ── store (dinamik / store.js) ──
      badge_popular: "MOST POPULAR",
      badge_bestvalue: "BEST VALUE",
      badge_subscription: "SUBSCRIPTION",
      gems_word: "gems",
      bonus_word: "bonus",
      vip_sub: "Monthly subscription · ad-free + bonus gems",
      buy_btn: "Buy",
      id_ok: "✓ Looks valid",
      id_warn: "ID format looks off — make sure you copied it",
      id_need: "Enter a valid Player ID first",
      g_loading: "Loading…",
      g_filled: "✓ ID filled",
      g_failed: "Sign-in failed — paste ID manually",
      g_cancelled: "Sign-in cancelled — paste ID manually",
      store_soon: "The store is opening very soon! We're in the final approval step.\nYour Player ID: ",
    },

    tr: {
      // ── Nav / Footer ──
      nav_games: "Oyunlar",
      nav_studio: "Stüdyo",
      nav_store: "Mağaza",
      nav_devlog: "Devlog",
      foot_contact: "İletişim",
      foot_privacy: "Gizlilik Politikası",
      foot_copy: "© 2026  ·  İzmir, Türkiye",

      // ── Ortak ──
      tag_football_cardrpg: "Futbol · Kart RPG",
      reviews_39: "55 yorum",
      db_subtitle: "Futbol Kart RPG",
      btn_googleplay: "Google Play'den İndir",

      // ── index: hero ──
      idx_hero_tagline: "Daha fazlasını isteyen oyuncular için<br>bağımsız mobil oyunlar.",
      idx_hero_scroll: "Oyunları gör",
      stat_games_l: "Oyun",
      stat_downloads_l: "İndirme",
      stat_rating_l: "En Yüksek Puan",

      // ── index: featured ──
      idx_featured_label: "ÖNE ÇIKAN OYUN",
      idx_feature_body: "En alttan başla. İlk 11'de yer kapmak için savaş. Her maç, her karar — kartlarla oynanır. 15 ülke ve 764 takım arasında bir kariyer kur. Aşkı bul. Medyayla başa çık. Alt liglerde hayatta kal.",
      idx_fl_1: "Kart tabanlı maç kararları",
      idx_fl_2: "15 ülke · 764 takım",
      idx_fl_3: "Yaşam olaylı kariyer RPG'si",
      idx_fl_4: "8 dil desteği",

      // ── index: all games ──
      idx_allgames_label: "TÜM OYUNLAR",
      badge_new: "Yeni",
      idx_db_desc: "Futbol kariyerini en alttan zirveye kur. Stratejik kart tabanlı maçlar, takım yönetimi ve saha dışında bir hayat.",
      downloads_3k: "3B+ indirme",
      downloads_5k: "5B+ indirme",
      detail_link: "Detaylar →",
      playstore_link: "Play Store ↗",
      mct_genre: "Idle · Tycoon",
      idx_mct_desc: "Dokunarak milyonlara ulaş. İmparatorluğunu büyüt, günlük ödülleri topla, başarımları aç ve para tycoon'u ol.",
      badge_soon: "Çok Yakında",
      syn_genre: "İnteraktif Kurgu · Yapay Zekâ",
      idx_syn_desc: "Yapay zekâ karakterleriyle sohbet et, interaktif hikâyeler yaşa. Kendi karakterlerini yarat, toplulukla paylaş ve her hikâyeyi seçimlerinle şekillendir.",
      syn_status: "Google Play'de kapalı beta",
      devlog_link: "Devlog →",

      // ── index: studio ──
      idx_studio_label: "STÜDYO",
      idx_studio_heading: "Tek geliştirici.<br>Ciddi oyunlar.",
      idx_studio_body1: "Clyrex, İzmir merkezli tek kişilik bağımsız bir stüdyodur. Basitlikten çok derinliğe önem veren — vakit ayırmaya değer — mobil oyunlar yapıyoruz.",
      idx_studio_body2: "DeckBall, alt lig futbol kültürüne yazılmış kişisel bir aşk mektubu olarak başladı. Her mekanik, her kart, her kariyer anı satın alınmış değil — hak edilmiş hissettirmek için tasarlandı.",
      sfact_founded_l: "Kuruluş",
      sfact_location_l: "Konum",
      sfact_games_l: "Yayınlanan oyun",

      // ── deckball ──
      gstat_teams_l: "Takım",
      gstat_countries_l: "Ülke",
      gstat_downloads_l: "İndirme",
      db_about_label: "OYUN HAKKINDA",
      db_about_1: "En alttan başla. İlk 11'de yer kapmak için savaş. Her maç, her karar — kartlarla oynanır. DeckBall, stratejinin düdük çalmadan önce yaşandığı bir futbol kariyer RPG'sidir.",
      db_about_2: "15 ülke ve 764 gerçek kulüp boyunca bir kariyer kur. Transfer dönemlerini, medya baskısını ve saha dışındaki yaşam olaylarını yönet. Aşkı bul. Rakiplerle başa çık. Alt liglerde hayatta kal ve zirveye çık.",
      db_about_3: "Oynadığın her kart bir karardır. Her karar mirasını şekillendirir.",
      gfeat1_label: "Kart Tabanlı Maçlar",
      gfeat1_desc: "Her pozisyonda stratejik kararlar",
      gfeat2_label: "15 Ülke",
      gfeat2_desc: "İmza atılacak 764 gerçek kulüp",
      gfeat3_label: "Kariyer RPG",
      gfeat3_desc: "Saha dışında yaşam olayları",
      gfeat4_label: "8 Dil",
      gfeat4_desc: "Tam yerelleştirme, 8 dil",
      db_screenshots_label: "EKRAN GÖRÜNTÜLERİ",

      // ── deckball: rakamlarla ──
      stats_label: "RAKAMLARLA",
      stats_clubs: "Kulüp",
      stats_leagues: "Lig",
      stats_countries: "Ülke",
      stats_nationalities: "Milliyet",
      stats_cards: "Aksiyon kartı",
      stats_cosmetics: "Kozmetik",
      stats_events: "Yaşam olayı",
      stats_languages: "Dil",
      stats_words: "Kelime içerik",

      // ── store (statik) ──
      store_label: "DECKBALL MAĞAZA",
      store_title: "Elmas & VIP",
      store_lede: "Oyuncu ID'ni gir, paketini seç, güvenle öde. Elmaslar Xsolla onayından sonra hesabına anında tanımlanır — oyunu açtığında hazır olur.",
      store_bonus_flag: "✦ Web'e özel bonus elmas",
      store_id_label: "OYUNCU ID",
      store_id_help: "Oyunda <strong>Ayarlar → Oyuncu ID</strong> bölümünden ID'ni kopyala ve buraya yapıştır. Ödeme bu ID'ye yapılır.",
      store_id_ph: "Oyuncu ID'ni buraya yapıştır",
      store_or: "veya",
      store_google_btn: "Google ile giriş yap (ID'yi otomatik doldur)",
      store_google_note: "Yalnızca oyunda Google ile giriş yaptıysan çalışır. Aksi halde ID'yi elle yapıştır.",
      store_packages_label: "PAKETLER",

      // ── store (dinamik) ──
      badge_popular: "EN POPÜLER",
      badge_bestvalue: "EN AVANTAJLI",
      badge_subscription: "ABONELİK",
      gems_word: "elmas",
      bonus_word: "bonus",
      vip_sub: "Aylık abonelik · reklamsız + bonus elmas",
      buy_btn: "Satın Al",
      id_ok: "✓ Geçerli görünüyor",
      id_warn: "ID formatı beklenenden farklı — kopyaladığından emin ol",
      id_need: "Önce geçerli bir Oyuncu ID gir",
      g_loading: "Yükleniyor…",
      g_filled: "✓ ID dolduruldu",
      g_failed: "Giriş yapılamadı — ID'yi elle yapıştır",
      g_cancelled: "Giriş iptal edildi — ID'yi elle yapıştır",
      store_soon: "Mağaza çok yakında açılıyor! Şu an son onay aşamasındayız.\nOyuncu ID'n: ",
    },
  };

  function detect() {
    const saved = localStorage.getItem(STORE_KEY);
    if (saved === "en" || saved === "tr") return saved;
    // Varsayılan her zaman İngilizce; TR isteyen butondan seçer (seçim hatırlanır).
    return "en";
  }

  let lang = detect();

  function t(key) {
    const v = dict[lang] && dict[lang][key];
    return v != null ? v : (dict.en[key] != null ? dict.en[key] : key);
  }

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
    });
    const btn = document.getElementById("langToggle");
    if (btn) btn.textContent = lang === "tr" ? "EN" : "TR";
    window.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  function setLang(next) {
    if (next !== "en" && next !== "tr") return;
    lang = next;
    localStorage.setItem(STORE_KEY, lang);
    apply();
  }

  // store.js gibi dinamik modüller için
  window.I18N = {
    t,
    get lang() { return lang; },
    get locale() { return lang === "tr" ? "tr-TR" : "en-US"; },
    setLang,
  };

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("langToggle");
    if (btn) btn.addEventListener("click", () => setLang(lang === "tr" ? "en" : "tr"));
    apply();
  });
})();
