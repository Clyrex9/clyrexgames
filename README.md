# Clyrex Games — Official Website

> **[clyrexgames.com](https://clyrexgames.com)** — Independent mobile game studio based in İzmir, Turkey.

---

## Games

### DeckBall: Futbol Kart RPG
A football career RPG where every match decision is made with cards. Build your career from the lower leagues, manage your form, and live a life beyond the pitch.

- ★ 4.7 rating · 117 Google Play reviews · 14,500 downloads (publisher snapshot, 6 October 2026)
- [DeckBall 4.0 development article](devlog-deckball-v40.html): bilingual TR/EN with localized game screenshots; 4.0 is being prepared for release
- Eight game languages supported
- [Google Play →](https://play.google.com/store/apps/details?id=com.deckball.game)

### Money Clicker Tycoon
Idle tycoon with upgrades, daily rewards, and achievements. Tap your way to millions.

- 3,000+ downloads · PEGI 3
- [Google Play →](https://play.google.com/store/apps/details?id=com.moneyclickertycoon.game)

---

## Tech

Plain HTML · CSS · Vanilla JS — no frameworks, no build step.

```
clyrexgames-website/
├── index.html
├── css/style.css
├── js/main.js
└── assets/images/
```

**Fonts:** Space Grotesk (display) · Inter (body) via Google Fonts  
**Design:** Dark editorial — Space Grotesk outlined type, section numbering, CSS phone mockups with hover swap animation

---

## Local Development

The 4.0 article is linked from the homepage, DeckBall page and devlog list. [Update details](docs/DECKBALL_V40_WEBSITE.md), [local browser validation](docs/DECKBALL_V40_VALIDATION.json). This local change has not been pushed or deployed.

```bash
# Just open the file — no server needed
open index.html

# Or serve locally
npx serve .
```

---

## Deployment

Hosted on **GitHub Pages** with custom domain `clyrexgames.com`.

```bash
git add .
git commit -m "update"
git push origin main
```

Changes go live in ~60 seconds after push.

---

## License

© 2026 Clyrex — All rights reserved. Game assets and screenshots are property of Clyrex Games.
