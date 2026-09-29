# Aeon Cereals Limited — Corporate Website

Static corporate site (HTML, CSS, vanilla JavaScript) for **Aeon Cereals Limited**, New Delhi (CIN U74899DL1995PLC072664), the company behind the **4K Natural** brand.

## Pages

| Navigation | Page | File |
|---|---|---|
| Home | Home | `index.html` |
| About | Our History, Founder-Chairman, Chairman & MD, Board of Directors, Board Committees | `history.html`, `founder.html`, `chairman.html`, `board.html`, `committees.html` |
| Business → FMCG → 4K Natural | Brand overview; product links open 4knatural.com | `products.html` |
| Investors → Financials | OTP-gated company report | `financials.html` |
| News & Media | Announcements and press | `news.html` |
| Careers | Open roles and application form | `careers.html` |
| Become a Distributor | Distributor application form | `distributor.html` |
| Footer | Registered Office | `offices.html` |

## Design system

Palette "Harvest Maroon": maroon `#6B1D2B`, saffron `#E09A2E`, warm ivory `#FAF5EC`, charcoal `#2B2522`. Tokens live in `:root` in `assets/css/style.css` as `--brand`, `--accent`, `--surface` and `--ink`.

Type: **Google Sans**, with **Karla** and **Work Sans** as fallbacks.

## Features

- Full-bleed looping **video hero** (`assets/hero_video.mp4`) with mute toggle and autoplay fallbacks.
- Preloader, curtain transition, Lenis smooth scrolling, GSAP ScrollTrigger reveals (left/right/clip-path), split-text headings, parallax heroes, custom cursor.
- **Vertical timeline** on Our History: a gold spine that fills as you scroll, with twelve entries alternating in from the left and right.
- Switchable **businesses panel** with cross-fading backgrounds, as on the Reliance home page.
- Voice dock (bottom-left): **speaker** reads the current page aloud (Web Speech API); **mic** accepts commands such as "open products", "go to history", "read this page", "stop".
- Financials: details form → Request OTP → simulated SMS shows the demo OTP → 6-box OTP entry → success → `assets/docs/AEON-2.pdf` opens in a new tab and inline.
- Fully responsive (mobile, tablet, desktop).

- Careers and Become a Distributor forms share `assets/js/forms.js`: field validation (Indian mobile, PIN code, GSTIN, email, CV type and size), an error summary, a loading state and a success panel with a reference number.

## Form submissions

The Careers and Distributor forms validate and confirm on screen but do not yet send data anywhere. Connect the `submit()` function in `assets/js/forms.js` to an email service or API before going live.

## Demo OTP

The OTP is a placeholder until an SMS gateway is connected. Change it in `assets/js/financials.js` (`DEMO_OTP`).

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8080
```
