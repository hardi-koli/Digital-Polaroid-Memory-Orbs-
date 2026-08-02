# Digital Polaroid Memory Orbs 🔮📸

An interactive scrapbook where memories float as glowing orbs on a shelf — tap one and it drifts to center stage, opening into a flippable polaroid card with a hidden message on the back. Wrapped in soft pastel colors and playful washi-tape accents.

Built for Friendship Day, but easy to re-theme for any occasion — anniversaries, birthdays, or just a personal memory board.

## ✨ Features

- **Floating memory orbs** — each memory sits on a wooden shelf as a gently bobbing, glowing orb, colored to match its card.
- **Tap-to-open animation** — tap an orb and it flies from the shelf to the center of the screen, growing as it travels.
- **Flippable polaroid cards** — the card fades in where the orb landed; tap it to flip and reveal a hidden message on the back.
- **Washi tape details** — each card has colorful, textured tape strips at the corners for a real scrapbook feel.
- **Three card types** — photo with caption, photo only (photo fills the whole card), or text-only sticky note.
- **Fully responsive** — works on both desktop and mobile.
- **No build tools, no dependencies** — pure HTML, CSS, and vanilla JavaScript.

## 🛠️ Tech Stack

- HTML5
- CSS3 (animations, 3D transforms, gradients)
- Vanilla JavaScript (no frameworks or libraries)

## 🚀 Getting Started

No installation or build step needed.

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/digital-polaroid-memory-orbs.git
   ```
2. Open `index.html` in any browser — that's it.

Optionally, host it for free with **GitHub Pages** (Settings → Pages → deploy from the `main` branch) to share a live link.

## 📁 Project Structure

```
digital-polaroid-memory-orbs/
├── index.html    # Page structure (shelf + overlay markup)
├── style.css     # All styling: shelf, orbs, cards, tape, animations
├── script.js     # Memory data + all interaction logic
└── README.md
```

## ✏️ Customizing Your Own Memories

All content lives in **one place**: the `memories` array near the top of `script.js`, marked with an `EDIT ME` comment. Each memory is an object like this:

```js
{
    type: 'photo-with-caption',   // 'photo-with-caption' | 'photo-only' | 'text-only'
    imageUrl: '...',              // image link (leave '' for text-only)
    caption: 'Our first trip!',   // label under the photo, or the sticky-note text
    backMessage: '...',           // message revealed when the card is flipped
    cardColor: '#ffffff',         // front-of-card color (also the orb's base color)
    backColor: '#ffe5ec',         // back-of-card color (also the orb's glow color)
    textColor: '#333333'          // text color used on that card
}
```

- **Add or remove objects** to add or remove orbs — they automatically wrap into new shelf rows.
- **`type: 'text-only'`** needs no `imageUrl`.
- **`type: 'photo-only'`** skips the caption and lets the photo fill the whole card.

Other quick tweaks (also marked `EDIT ME` in the code):

| What | Where |
|---|---|
| Orbs per shelf row | `ORBS_PER_ROW` in `script.js` |
| Tape color cycle | `TAPE_CLASSES` in `script.js` + matching classes in `style.css` |
| Page title & subtitle | `<header>` in `index.html` |
| Background gradient | `body` in `style.css` |
| Shelf wood colors | `.shelf-plank` / `.shelf-top-line` in `style.css` |

## 📄 License

Free to use and adapt for personal projects.
