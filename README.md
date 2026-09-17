# Aeon Cereals Limited — Corporate Website

Static corporate site (HTML, CSS, vanilla JavaScript) for **Aeon Cereals Limited**, New Delhi (CIN U74899DL1995PLC072664), the company behind the **4K Natural** brand.

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| About → Our History | `history.html` |
| About → Founder-Chairman | `founder.html` |
| About → Chairman & Managing Director | `chairman.html` |
| About → Board of Directors | `board.html` |
| About → Board Committees | `committees.html` |
| Products (dropdown links to the 4K Natural store) | `products.html` |
| Financials (OTP-gated PDF) | `financials.html` |
| Registered Offices | `offices.html` |
| News / Media | `news.html` |

## Design system

Modelled on ril.com. Colours sampled from the live Reliance site: blue `#053C8F`, gold `#D2AB67`, cream `#FDF2DF`, ink `#373F41`. Type: **Playfair Display** for headings (same as Reliance) and **Figtree** for body, standing in for Reliance's proprietary JioType.

## Features

- Full-bleed looping **video hero** (`assets/hero_video.mp4`) with mute toggle and autoplay fallbacks.
- Preloader, curtain transition, Lenis smooth scrolling, GSAP ScrollTrigger reveals (left/right/clip-path), split-text headings, parallax heroes, custom cursor.
- **Vertical timeline** on Our History: a gold spine that fills as you scroll, with twelve entries alternating in from the left and right.
- Switchable **businesses panel** with cross-fading backgrounds, as on the Reliance home page.
- Voice dock (bottom-left): **speaker** reads the current page aloud (Web Speech API); **mic** accepts commands such as "open products", "go to history", "read this page", "stop".
- Financials: details form → Request OTP → simulated SMS shows the demo OTP → 6-box OTP entry → success → `assets/docs/AEON-2.pdf` opens in a new tab and inline.
- Fully responsive (mobile, tablet, desktop).

## Demo OTP

The OTP is a placeholder until an SMS gateway is connected. Change it in `assets/js/financials.js` (`DEMO_OTP`).

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8080
```
