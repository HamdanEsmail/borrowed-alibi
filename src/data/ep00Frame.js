// Episode 00 borrowed perspective: Ivo's recorded frame laid over the room.
// Story content, authored separately from the code. Same node shape as
// ep00Ivo.js, so the same Conversation engine runs it.
//
// Until the frame art exists, THEN and NOW are written out per callout.

const echo = (text) => ({ who: 'ECHO', text });
const act = (text) => ({ text, note: true });
const then = (text) => ({ who: 'THEN', text });
const now = (text) => ({ who: 'NOW', text });
const hint = (text) => ({ who: 'HELP', text });

const HINTS = [
  'Name what changed between then and now.',
  'Compare the cable and the screen as separate observations.',
  'A changed state is visible. What caused it is not.',
];

// The callouts, plus the reasoning question once all three are confirmed.
function frameMenu(s) {
  const f = s.flags;
  const tick = (flag) => (f[flag] ? ' ✓' : '');
  const choices = [
    { label: `The cable, then and now${tick('obs.cmp.cable')}`, next: 'cable' },
    { label: `The chair, then and now${tick('obs.cmp.chair')}`, next: 'chair' },
    { label: `The screen, then and now${tick('obs.cmp.screen')}`, next: 'screen' },
  ];
  const allCompared = f['obs.cmp.cable'] && f['obs.cmp.chair'] && f['obs.cmp.screen'];
  if (allCompared && !f['ep00.comparisonDone']) {
    choices.push({ label: 'What can this comparison establish?', next: 'reason' });
  }
  choices.push({ label: 'Close the frame', next: null });
  return choices;
}

// The three claims. Only one stays inside what the pictures show.
// Help is offered one level at a time and never answers for the player.
function claims(s) {
  const f = s.flags;
  const choices = [
    { label: 'The disconnection caused the fatal event.', next: 'claimCause' },
    { label: 'The cable is seated in the recording and hangs loose now. These pictures do not show what caused the change.', next: 'claimStates' },
    { label: 'The occupant was unharmed.', next: 'claimHarm' },
  ];
  if (!f['ep00.cmp.help3']) {
    const level = f['ep00.cmp.help2'] ? 'help3' : f['ep00.cmp.help1'] ? 'help2' : 'help1';
    choices.push({ label: level === 'help1' ? 'Help' : 'More help', next: level });
  }
  choices.push({ label: 'Close the frame', next: null });
  return choices;
}

export const FRAME = {
  frame: {
    lines: [
      act('Ivo’s frame, laid over the room.'),
      { who: 'STAMP', text: 'IVO · 21:14:07 · DEVICE CLOCK' },
      { who: 'FRAME', text: 'Recorded by Ivo, 21:14:07 by Ivo’s device clock. Ivo’s left hand grips the dock cable at the connector; the cable is seated in the cradle. The frame does not show the connector leaving.' },
      { who: 'FRAME', text: 'The chair is occupied by a figure with Dr. Sen Vale’s face; both wrist restraints are open; a transit tag is on the figure’s left wrist. The figure’s head is turned toward Ivo and its mouth is open. The terminal reads SESSION ACTIVE, 41%, HOLD. No other person is visible. The frame ends here.' },
      { who: 'LIMITS', text: 'This frame ends at 21:14:07 by Ivo’s device clock. It shows his hand on a cable that is still seated. It does not show the connector leaving the cradle. It shows nothing after this frame. Ivo’s clock is his; it has not been checked against the terminal clock.' },
    ],
    choices: frameMenu,
  },

  // Callouts: each adds one observation the first time it is confirmed
  cable: {
    lines: [
      then('Cable seated in the cradle. Ivo’s hand on the connector.'),
      now('Cable hanging, connector down.'),
      echo('At 21:14:07 by Ivo’s device clock the cable is seated and his hand is on the connector. Now the cable hangs, connector down. The frame does not show the connector leaving the cradle.'),
    ],
    adds: ['obs.cmp.cable'],
    choices: frameMenu,
  },
  chair: {
    lines: (s) => [
      then('Chair occupied. Tag on the left wrist.'),
      now('Chair empty. Tag on the floor.'),
      echo('At 21:14:07 the chair is occupied and the tag is on the left wrist. Now the chair is empty and the tag is on the floor. These are two positions. The frames do not show the tag being removed.'),
      ...(s.flags['tst.ivo_walked_out'] ? [echo('Ivo says he took the tag off and dropped it.')] : []),
    ],
    adds: ['obs.cmp.chair'],
    choices: frameMenu,
  },
  screen: {
    lines: [
      then('SESSION ACTIVE · 41% · HOLD'),
      now('FATAL EVENT · recorded 21:20'),
      echo('The THEN screen reads SESSION ACTIVE, 41%. The NOW display reads FATAL EVENT, recorded 21:20. The frame does not show the change.'),
    ],
    adds: ['obs.cmp.screen'],
    choices: frameMenu,
  },

  // Player reasoning
  reason: {
    lines: [echo('What can this comparison establish?')],
    choices: claims,
  },
  claimCause: {
    lines: [echo('That puts a cause into the gap between the pictures. The comparison does not show that gap.')],
    choices: claims,
  },
  claimHarm: {
    lines: [echo('The empty chair does not show the occupant’s condition. Keep the claim inside what these pictures show.')],
    choices: claims,
  },
  claimStates: {
    lines: [echo('The difference is observed. The cause is still a question.')],
    adds: ['inf.ep00_no_causation', 'ep00.comparisonDone'],
    choices: frameMenu,
  },

  // Optional help, one level at a time
  help1: {
    lines: HINTS.slice(0, 1).map(hint),
    adds: ['ep00.cmp.help1'],
    choices: claims,
  },
  help2: {
    lines: HINTS.slice(0, 2).map(hint),
    adds: ['ep00.cmp.help2'],
    choices: claims,
  },
  help3: {
    lines: HINTS.map(hint),
    adds: ['ep00.cmp.help3'],
    choices: claims,
  },
};
