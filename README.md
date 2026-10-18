<p align="center">
  <img src=".github/readme/banner.svg" alt="Borrowed Alibi: an android investigation thriller" width="100%">
</p>

<p align="center">
  <img alt="Status: prologue playable" src="https://img.shields.io/badge/status-prologue%20playable-C08A54?style=flat-square&labelColor=101B24">
  <img alt="Engine: Phaser 3.90" src="https://img.shields.io/badge/engine-Phaser%203.90-70CFCF?style=flat-square&labelColor=101B24">
  <img alt="Platform: browser" src="https://img.shields.io/badge/platform-browser-9FB0B8?style=flat-square&labelColor=101B24">
  <img alt="Hack Club Terra" src="https://img.shields.io/badge/Hack%20Club-Terra%202026--27-3E7F7A?style=flat-square&labelColor=101B24">
</p>

> **Two androids confess to the same murder. Their recordings are genuine. Their accounts cannot both be right. Then the man they say they killed walks through the door.**

**Borrowed Alibi** is a browser game about judging testimony. You play **Echo**, a municipal android built to reconstruct what witnesses saw. Your job has always been to help other people establish what happened. This case asks what *your* judgment is worth.

It takes place aboard **the Meridian**, a retired passenger liner turned into a neighbourhood. The old cabins are homes now, the promenade is a night market, and the service decks keep everything running.

<p align="center"><b><a href="https://hamdanesmail.github.io/borrowed-alibi/">Play the prologue in your browser</a></b></p>

<p align="center">
  <img src=".github/readme/clinic-style-test.png" alt="Style test of the clinic: a dark ship's room lit by one amber work lamp over an empty examination chair, a wall display reading FATAL EVENT, and Echo standing by the door" width="100%">
  <br>
  <sub><i>Style test of the opening room. A still image, not yet in the game.</i></sub>
</p>

## What you do

- **Walk the scene.** Inspect what's physically there, in any order.
- **Hear the account.** Question the people involved, who each want something.
- **Borrow a perspective.** Lay a recorded memory over the real room and compare them. A genuine recording can still be misread.
- **Decide what goes on record.** Your report changes how people treat you, and what the ship remembers.

Echo keeps what it *saw*, what it was *told*, and what it *thinks* separate, so the deductions are yours to make. Optional hints are there if you get stuck.

## The case file

<p align="center">
  <img src=".github/readme/case-file.svg" alt="Case file board: Episode 00, The Clinic, in progress; Episodes 01 to 12 sealed" width="100%">
</p>

The game grows one chapter at a time, released weekly from October 2026 to January 2027. Each new file opens as its chapter ships. Choices you make carry forward into later chapters. Sealed files stay sealed: this repository doesn't contain story spoilers.

## Current build

**Prep Week 3: the prologue.** The first investigation is playable from start to finish, with placeholder shapes standing in for the art. It includes:

- a short opening;
- six things to inspect in the clinic;
- a conversation with Ivo, the witness;
- Ivo's memory laid over the room, with optional hints;
- a report with two endings.

Saving and the painted art come next.

| Control | Action |
|---|---|
| <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> / arrow keys | Move |
| <kbd>E</kbd> / <kbd>Enter</kbd> | Inspect, talk, close |
| <kbd>1</kbd>–<kbd>5</kbd> / mouse click | Pick a choice |
| <kbd>Esc</kbd> | Close, or leave a conversation |

## Run it locally

You need [Node.js](https://nodejs.org/) 20 or newer.

```bash
git clone https://github.com/HamdanEsmail/borrowed-alibi.git
cd borrowed-alibi
npm install
npm run dev
```

Then open the address it prints (usually `http://localhost:5173`). `npm run build` produces a static version in `dist/`.

## How it's made

| | |
|---|---|
| **Game** | [Phaser 3.90](https://phaser.io/) and plain JavaScript, bundled with [Vite](https://vite.dev/) |
| **Art** | SVG drawn rendered with [Inkscape](https://inkscape.org/). Sources live in [`art/`](art/) |
| **Layout** | Room positions live in data files ([`src/data/`](src/data/)), so the art and the code share one blueprint |
| **Hosting** | Built and published to GitHub Pages by a GitHub Actions workflow on every push |


## Repository layout

```
src/
  main.js              game configuration
  scenes/              one file per game screen
  dialogue/            the conversation engine
  ui/                  the text panel
  state/               what the player has seen and done
  data/                room layout and story text
art/
  style-test/          clinic style test (editable SVG)
  readme/              sources for the images in this README
.github/workflows/     builds the game and publishes it to GitHub Pages
.github/readme/        exported README images
vite.config.js         build settings
```

## License

The **code** is under the [MIT License](LICENSE). The **story, characters and art** are all rights reserved. See [`LICENSE`](LICENSE) for details.

---

<sub>Made by Hamdan Esmail for <a href="https://hackclub.com/">Hack Club</a> Terra. All characters, places and institutions are fictional.</sub>
