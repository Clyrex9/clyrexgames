# 3.9 → 4.0 içerik denetimi

6 Ekim 2026. Yerel site metni için kaynak karşılaştırması; yayın yapılmadı.

Karşılaştırma: DeckBall `b0458b9` (29 Temmuz, 3.9 sürüm notu) → `178abbe` (6 Ekim, 4.0 build). Yeni motor dosyaları Git farkıyla, oyuncuya görünen davranışlar tamamlanan geliştirme raporları ve gerçek geliştirme ekranlarıyla kontrol edildi.

| Konu | Doğru anlatım | Kaynak |
| --- | --- | --- |
| Maç çeşitliliği | Eski 9 genel durumun yerini pozisyona bağlı 24 durum aldı. | Eski `localization/tr/constants.js`; yeni `engine/matchMoments.js`, `docs/MAC_4_0.md` |
| Kariyer hikâyeleri | Beş hat, üçer bölüm, gerçek haftalık eylemler; Kariyer Günlüğü. | Yeni `engine/careerStories.js`; `docs/KARIYER_HIKAYELERI_4_0.md` |
| Takım arkadaşları | Dört kişisel hat, toplam 12 bölüm. | Yeni `engine/teamStories.js`; `docs/TAKIM_HIKAYELERI_4_0.md` |
| Elif ve Derya | İki yeni partner; altıdan sekize çıktı, 20 ana konuşma eklendi. | Yeni `engine/newDatingProfiles.js`; `docs/YENI_PARTNERLER_4_0.md` |
| Kişisel ilişki hikâyeleri | Sekiz partner için toplam 24 ilk hikâye bölümü; sonraki sezon konuları ve güven süreçleri. | Yeni `relationshipStories.js`, `relationshipConflict.js`; `docs/YENI_SEZON_HIKAYELERI_4_0.md` |
| Medya | Üç dört bölümlük kamuoyu hikâyesi. | Yeni `engine/publicStories.js`; `docs/MEDYA_ZINCIRLERI_4_0.md` |
| Ödül gecesi | Yeni üç aşamalı sezon değerlendirmesi, arşiv ve kupa sunumu. Altın Top'un eski hikâye yolu zaten vardı; resmî Ballon d’Or simülasyonu iddiası yok. | Yeni `engine/seasonReviewEngine.js`; `docs/SEZON_TORENI_4_0.md` |
| Eğitim / deste | Yeni sekiz adımlık tur; aktif deste düzeni, satın alma makbuzu ve öneriler. | Yeni `tutorialEngine.js`, `deckEngine.js`; ilgili tamamlanan raporlar |
| Olaylar | 159 **mevcut** büyük olay yeniden işlendi; 159 yeni olay diye anlatılmadı. Mikro sahne çizimlerinin sayısı 12; yeni mekanik veya olay sayısı değil. | `docs/SON_48_OLAY_4_0.md`, `docs/MIKRO_OLAY_GORSELLERI_4_0.md` |
| Başarımlar | Mevcut 28 rozetin yeni vitrini; 28 yeni başarım diye anlatılmadı. | `engine/achievementPresentation.js`, `docs/BASARIM_VITRINI_4_0.md` |
| Dünya | 15 ülke, 37 bölüm, 734 başlangıç kulübü: güncel toplamlar; eklenen sayılar değil. | `engine/leagueEngine.js`, `leagueWorld2026.json` |
| Eski özellikler | Kaleci modu, DeckTalk, evlilik ve çocuk sistemi 4.0'ın yepyeni özellikleri olarak sunulmadı. | Eski kaynak, 3.9 devlogu ve sürüm notları |

Gerçek oyun veri yardımcılarıyla ayrıca 51 kart, 159 büyük olay, 28 başarım ve 33 seçilebilir milliyet doğrulandı. Ana oyun sayfasının eski 764 / 38 / 39 sayıları güncellendi. Kaynağı açıklanmayan 580+ olay ve 400K+ kelime pazarlama rakamları yerine doğrulanabilen 4.0 bilgileri kullanıldı.

4.0 henüz Google Play'de yayımlanmış olarak gösterilmiyor. Emeklilik sonrası oyun, gerçek zamanlı fizik motoru veya kapalı sunucu cüzdan özellikleri duyuruya eklenmedi.
