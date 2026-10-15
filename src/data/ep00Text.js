// Episode 00 inspection text: what the player reads when inspecting each
// object in the clinic. Story content, authored separately from the code.
//
// Each entry has a title, the text shown the first time (`first`), and a
// shorter line for later inspections (`repeat`). `who` labels whose words
// a line is: ECHO is Echo's own observation; other labels are printed text.
// `after` adds one more line once Echo has heard the matching testimony.

export const INSPECT = {
  'obj.terminal': {
    title: 'Clinic terminal',
    first: [
      { who: 'DISPLAY', text: 'INCIDENT 2041-M · FATAL EVENT · Registered identity: VALE, SEN (7741-V) · Recorded 21:20 · Cause: terminal disconnection — INTERPRETED.' },
      { who: 'ECHO', text: 'The word “interpreted” is set smaller than the verdict. I open the detail view on the cabinet.' },
      { who: 'DETAIL', text: 'Interpretation: automated, standard incident template T-7. Observed time of identity loss: none. Last intervention logged: data cable disconnected, 21:14, terminal clock.' },
      { who: 'ECHO', text: 'It has a cause and no moment. I record both.' },
    ],
    repeat: [
      { who: 'ECHO', text: 'Still FATAL EVENT. Still no observed time of loss. The screen is certain in a way the detail view is not.' },
    ],
  },

  'obj.cable': {
    title: 'Dock cable',
    first: [
      { who: 'ECHO', text: 'The dock cable hangs from the cradle, connector down. The latch is intact. The sleeve is scuffed where a hand gripped it. Pulled, not cut, not failed. Someone did this on purpose. That is all it tells me.' },
    ],
    repeat: [
      { who: 'ECHO', text: 'Pulled by hand. Nothing about what happened afterward is in the cable.' },
    ],
    after: { flag: 'tst.ivo_pulled', text: 'Scuffed where he said he gripped it.' },
  },

  'obj.tag': {
    title: 'Freight tag',
    first: [
      { who: 'ECHO', text: 'A transit tag — the paper kind the lift prints for freight.' },
      { who: 'TAG', text: 'SERVICE LIFT 3 · TRANSIT · 21:06 · REG 7741-V · DECK 6 → DECK 2 (GANGWAY)' },
      { who: 'ECHO', text: 'The strap is torn, not unbuckled. Printed by the lift’s clock, not the clinic’s. It says the registered identity was moving at 21:06, bound for the gangway. It does not say what happened after 21:06, or that anyone finished the journey in this room.' },
    ],
    repeat: [
      { who: 'ECHO', text: 'Freight tag. Lift clock. 21:06. Bound for the gangway. Found beside this chair.' },
    ],
    after: { flag: 'tst.ivo_walked_out', text: 'He said he took it off and dropped it. It fell here.' },
  },

  'obj.chair': {
    title: 'Examination chair',
    first: [
      { who: 'ECHO', text: 'The old examination chair, re-padded in dock canvas. The head cradle is raised. Both wrist restraints are open, not torn. Whoever was in it was released, or released themselves.' },
    ],
    repeat: [
      { who: 'ECHO', text: 'Open restraints. Raised cradle. An empty chair tells you how someone left, not why.' },
    ],
  },

  'obj.wallunit': {
    title: 'Wall unit',
    first: [
      { who: 'ECHO', text: 'A sealed passenger-era wall unit. MEDICAL RECORDER is stencilled under the residents’ teal paint — someone painted over it, then scraped the word RECORDER clean again. It is not connected to the terminal. It wants a ship key I do not have.' },
    ],
    repeat: [
      { who: 'ECHO', text: 'Sealed. Ship key. Not mine to open tonight.' },
    ],
  },

  'obj.board': {
    title: 'Hours board',
    first: [
      { who: 'BOARD', text: 'CLINIC HOURS · TECH 15:00–21:00 · THE MACHINE IS ALWAYS ON.' },
      { who: 'ECHO', text: 'Under it, taped: a child’s drawing of a figure with a square chest holding hands with a smaller figure. Written across the top in a careful hand: MUM’S FIXED.' },
    ],
    repeat: [
      { who: 'ECHO', text: 'Mum’s fixed. Somebody’s night went better than this one.' },
    ],
  },
};
