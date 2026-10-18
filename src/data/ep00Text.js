// Episode 00 inspection text: what the player reads when inspecting each
// object in the clinic. Story content, authored separately from the code.
//
// Each entry has a title, the text shown the first time (`first`), and a
// shorter line for later inspections (`repeat`). `who` labels whose words
// a line is: ECHO is Echo's own voice; other labels are printed text.
// `after` adds one more line once Echo has heard the matching testimony.

export const INSPECT = {
  'obj.terminal': {
    title: 'Clinic terminal',
    first: [
      { who: 'SCREEN', text: 'DR. SEN VALE (ID 7741-V) · DECEASED · 9:20 PM · CAUSE: CABLE PULLED' },
      { who: 'ECHO', text: 'One word on a screen, and everyone in this room already believes it.' },
      { who: 'ECHO', text: 'Underneath, in smaller letters, the screen tells on itself.' },
      { who: 'SCREEN', text: 'Cable pulled: 9:14 PM. Moment of death: not observed. Cause: system’s best guess.' },
      { who: 'ECHO', text: 'Nobody saw him die. The machine saw a cable come out, saw a dead man six minutes later, and drew a line between the two.' },
    ],
    repeat: [
      { who: 'ECHO', text: 'Big letters: dead. Small letters: guessing. Machines always hide the doubt in the small print.' },
    ],
  },

  'obj.cable': {
    title: 'Dock cable',
    first: [
      { who: 'ECHO', text: 'The thick cable hangs off the machine, plug end down. Nothing’s broken. The grip is scuffed where a hand held on hard. Somebody pulled this out on purpose. That’s all a cable can tell you.' },
    ],
    repeat: [
      { who: 'ECHO', text: 'Pulled out by hand. The cable knows how. It doesn’t know what happened next.' },
    ],
    after: { flag: 'tst.ivo_pulled', text: 'Scuffed right where Ivo said he grabbed it.' },
  },

  'obj.tag': {
    title: 'Freight tag',
    first: [
      { who: 'ECHO', text: 'A paper tag with a torn strap. The cargo lift prints these for crates.' },
      { who: 'TAG', text: 'LIFT 3 · FREIGHT · 9:06 PM · ID 7741-V · DECK 6 → GANGWAY' },
      { who: 'ECHO', text: 'Same ID number as the dead doctor on the screen. Since when does a doctor ship out as freight?' },
      { who: 'ECHO', text: 'It says when it was printed and where it was going. It doesn’t say who wore it, or how it ended up on this floor.' },
    ],
    repeat: [
      { who: 'ECHO', text: 'Freight tag. 9:06. The doctor’s ID number. Bound for the gangway. Found by this chair.' },
    ],
    after: { flag: 'tst.ivo_walked_out', text: 'Ivo says the man tore it off on his way out. It landed right here.' },
  },

  'obj.chair': {
    title: 'Examination chair',
    first: [
      { who: 'ECHO', text: 'The patient chair. Old cruise-ship leather, patched with dock canvas. The headrest is up. Both wrist straps are open, not broken. Whoever sat here was let go, or let themselves go.' },
    ],
    repeat: [
      { who: 'ECHO', text: 'Open straps. An empty chair tells you somebody left. It doesn’t tell you how.' },
    ],
  },

  'obj.wallunit': {
    title: 'Wall unit',
    first: [
      { who: 'ECHO', text: 'A machine sealed into the wall, left over from the cruise-ship days. Somebody painted over the words MEDICAL RECORDER, then scraped RECORDER clean again.' },
      { who: 'ECHO', text: 'It takes a ship’s key. I don’t have one. Somebody wanted that word seen.' },
    ],
    repeat: [
      { who: 'ECHO', text: 'Sealed tight. Ship’s key. Not tonight.' },
    ],
  },

  'obj.board': {
    title: 'Hours board',
    first: [
      { who: 'BOARD', text: 'CLINIC HOURS · TECHNICIAN 3 PM–9 PM · THE MACHINE NEVER CLOSES' },
      { who: 'ECHO', text: 'Taped underneath: a kid’s drawing. A figure with a square chest, holding hands with a smaller one. Across the top, in careful letters: MUM’S FIXED.' },
    ],
    repeat: [
      { who: 'ECHO', text: 'Mum’s fixed. Somebody’s night in here went better than this one.' },
    ],
  },
};
