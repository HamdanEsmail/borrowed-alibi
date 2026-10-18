// Episode 00 borrowed memory: Ivo's recorded frame laid over the room.
// Story content, authored separately from the code. Same node shape as
// ep00Ivo.js, so the same Conversation engine runs it.
//
// Until the frame art exists, THEN and NOW are written out per callout.

const echo = (text) => ({ who: 'ECHO', text });
const then = (text) => ({ who: 'THEN', text });
const now = (text) => ({ who: 'NOW', text });
const hint = (text) => ({ who: 'HINT', text });

const HINTS = [
  'Look at what changed between then and now.',
  'His memory shows the moment before. Does it show the moment after?',
  'A hand on a cable isn’t proof of what the cable did.',
];

// The callouts, plus the reasoning question once all three are compared.
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
    choices.push({ label: 'So what does his memory prove?', next: 'reason' });
  }
  choices.push({ label: 'Step out of the memory', next: null });
  return choices;
}

// The three answers. Only one stays inside what the memory shows.
// Hints come one at a time and never answer for the player.
function claims(s) {
  const f = s.flags;
  const choices = [
    { label: 'Ivo killed him. His hand is right there on the cable.', next: 'claimCause' },
    { label: 'Dr. Vale was alive and asking for help when Ivo took hold of the cable. Nothing here shows what happened after.', next: 'claimStates' },
    { label: 'Dr. Vale was fine. The chair is empty now.', next: 'claimHarm' },
  ];
  if (!f['ep00.cmp.help3']) {
    const level = f['ep00.cmp.help2'] ? 'help3' : f['ep00.cmp.help1'] ? 'help2' : 'help1';
    choices.push({ label: level === 'help1' ? 'Hint' : 'Another hint', next: level });
  }
  choices.push({ label: 'Step out of the memory', next: null });
  return choices;
}

export const FRAME = {
  frame: {
    lines: [
      echo('I borrow his eyes. The room fills back in the way he saw it: 9:14 PM, the moment he took hold.'),
      { who: 'MEMORY', text: 'Ivo’s left hand grips the cable at the plug. The plug is still in the machine.' },
      { who: 'MEMORY', text: 'Dr. Vale is in the chair, wrist straps open, a freight tag on his left wrist. His head is turned toward Ivo. His mouth is open, mid-word.' },
      { who: 'MEMORY', text: 'The screen reads: WORKING · 41% · HOLD. Nobody else is in the room.' },
      echo('One frame, and it ends there. Whatever he was saying, the sentence never finishes.'),
    ],
    choices: frameMenu,
  },

  // Callouts: each adds one observation the first time it is compared
  cable: {
    lines: [
      then('Plugged in. Ivo’s hand on it.'),
      now('Hanging loose, plug down.'),
      echo('In his memory it’s still in. Now it hangs. The frame never shows it coming out.'),
    ],
    adds: ['obs.cmp.cable'],
    choices: frameMenu,
  },
  chair: {
    lines: (s) => [
      then('Dr. Vale in the chair. The tag on his wrist.'),
      now('An empty chair. The tag on the floor.'),
      echo('Then he was here. Now he isn’t. Nobody filmed the part in between.'),
      ...(s.flags['tst.ivo_walked_out'] ? [echo('Ivo says he stood up and walked out.')] : []),
    ],
    adds: ['obs.cmp.chair'],
    choices: frameMenu,
  },
  screen: {
    lines: [
      then('WORKING · 41% · HOLD'),
      now('DECEASED · 9:20 PM'),
      echo('At 9:14 the machine was still working on him. By 9:20 it was calling him dead. The minutes in between are blank.'),
    ],
    adds: ['obs.cmp.screen'],
    choices: frameMenu,
  },

  // Player reasoning
  reason: {
    lines: [echo('So what does Ivo’s memory actually prove?')],
    choices: claims,
  },
  claimCause: {
    lines: [echo('His hand is on it, and it’s still plugged in. That’s the moment before, not the cause. The screen already filled this blank with a guess. I’m not doing it twice.')],
    choices: claims,
  },
  claimHarm: {
    lines: [echo('An empty chair says he left. It doesn’t say he was fine. Stick to what’s in the picture.')],
    choices: claims,
  },
  claimStates: {
    lines: [echo('That’s all the picture can carry. The cable came out. What that did is still an open question.')],
    adds: ['inf.ep00_no_causation', 'ep00.comparisonDone'],
    choices: frameMenu,
  },

  // Optional hints, one level at a time
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
