# DeckBall 4.0 website update

6 October 2026. New bilingual development article: `devlog-deckball-v40.html`, at `/devlog-deckball-v40`. DeckBall 4.0 is released on Google Play, as confirmed by the publisher. The article and trailer now describe the released update. Website changes are local until deployed. Previous devlogs remain an archive.

## Article and artwork

TR/EN article text and images switch with the site's existing language preference. The new article covers the career hub, cards and match presentation, 734 starting clubs in 37 divisions across 15 countries, relationships, DeckTalk, visual onboarding and weekly-flow fixes. Existing careers keep their saved world; no claim is made about supporting every real tournament format. Mobile layouts stack the images instead of forcing a horizontal article carousel.

`assets/images/deckball-v40/en/` and `tr/` contain localized screenshots captured from DeckBall's actual development review screens. The cover and one-two artwork are existing game/marketing images. JPEG conversion resizes whole screenshots proportionally to 760 px wide at quality 88; no game UI or statistics were painted over. `js/devlog-v40.js` contains bilingual text and image switching; `css/devlog-v40.css` is scoped to the article. No new client dependency or build step.

The article is first in the devlog list and linked by visual callouts on the home and DeckBall pages. The home game card uses the newly approved DeckBall icon, saved separately as `assets/images/deckball-v40-icon.png`. No native game build or existing website image was overwritten by this change.

## Counts and live data

- Publisher-provided DeckBall snapshot: **14,500 downloads, 117 Google Play reviews, 4.7 rating**, 6 October 2026.
- Downloads are maintained manually from the publisher's number; the public Play installation bucket is not treated as an exact total.
- Rating and review counts still update from the existing `/.netlify/functions/play-stats` endpoint. Endpoint failure retains 4.7 / 117; partial responses retain each missing valid value. Switching to Turkish formats the rating as 4,7.
- Home studio total is **18.5K+**, combining DeckBall's 14.5K with the site's existing Money Clicker Tycoon 4K+ figure. The label now explicitly says total downloads. Money Clicker's source figure was not remeasured.
- The new devlog's thank-you paragraph records the 6 October milestone; it stays a dated editorial snapshot even if live counters later change.

## Local verification

See `DECKBALL_V40_VALIDATION.json` and `previews/` for the browser checks and screenshots. The article was checked in both languages at 1365, 390 and 320 px, with the real Netlify CSP applied. Localized images decoded, metadata switched, content fit without horizontal overflow. Mock live responses updated ratings/reviews without changing publisher download counts; the devlog list filters and article navigation were checked. Existing payment pages/functions were not exercised or changed.

**Not published:** no commit, push or deployment was made. No live Firebase, Play Console, YouTube or website settings were changed. Serve the project locally to navigate extensionless links; directly opening the article file can preview its text/images, while site-root links need a server.

## 6 October revision

The homepage and game-page callouts now use the localized horizontal cover, with an explicit automatic image height. This fixes the 170×800 px crop and keeps the announcement compact. A 320 px navigation and game-header overflow was also corrected.

The article now separates eight groups of additions from refreshed existing content. The 3.9 release commit was compared against the 4.0 build; see [the content audit](DECKBALL_V40_DELTA_AUDIT.md). Current game-page statistics were aligned with the source. Goalkeeper mode, DeckTalk, marriage and children are explicitly identified as existing systems.

[Revision checks](DECKBALL_V40_REVISION_VALIDATION.json): 24 page/viewport/language combinations, across 1920, 1365, 390 and 320 px. Both languages, cover proportions, teaser height, horizontal overflow and the added content were verified with the Netlify CSP.

A separate real-gameplay Turkish trailer was produced in DeckBall's `marketing/4.0/video/`: 30 seconds, 1080×1920, H.264/AAC, with the game's music. It is a local MP4, not a published YouTube video.
