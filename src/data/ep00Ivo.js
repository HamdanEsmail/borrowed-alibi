// Episode 00 conversation with Ivo, the dock worker who stayed to give a statement.
// Story content, authored separately from the code.
//
// Each node is one thing Ivo (or Echo) says, plus the choices that follow it.
// `lines` and `choices` are usually plain lists. When they depend on what has
// already happened, they are functions that receive the game state instead.
// `adds` lists the flags a node records the first time it is shown.
// A choice with `next: null` ends the conversation.

const ivo = (text) => ({ who: 'IVO', text });
const echo = (text) => ({ who: 'ECHO', text });
const act = (text) => ({ text, note: true });

// The hub: what Echo can ask about right now.
function hub(s) {
  const f = s.flags;
  const choices = [];

  if (!f['tst.ivo_walked_out']) {
    choices.push({ label: 'Tell me what you did.', next: 'n10' });
  }
  if (!f['ep00.asked.person']) {
    choices.push({ label: 'Tell me about Dr. Vale.', next: 'n20' });
  }
  const hasReasonToAsk = f['ep00.asked.act'] || f['ep00.asked.person'] || s.seen['obj.terminal'];
  if (hasReasonToAsk && !f['clue.ivo_clip']) {
    choices.push({ label: 'Show me your memory of it.', next: 'n30' });
  }
  choices.push({ label: f['ep00.clipHeld'] ? 'That’s all for now.' : 'I’ll look around first.', next: null });

  return choices;
}

// Route A must hear the time before it can move on; "why" stays optional.
function afterWhyOrWhen(s) {
  const f = s.flags;
  if (!f['tst.ivo_four_minutes']) {
    return [{ label: 'When?', next: 'n12' }];
  }
  const choices = [];
  if (!f['tst.ivo_please']) {
    choices.push({ label: 'Why would he ask you that?', next: 'n11' });
  }
  choices.push({ label: 'Go on.', next: 'n14' });
  return choices;
}

// Route B: both follow-up questions are optional.
function afterChairOrKnew(s) {
  const f = s.flags;
  const choices = [];
  if (!f['tst.ivo_on_record']) {
    choices.push({ label: 'He took your appointment?', next: 'n21' });
  }
  if (!f['tst.ivo_not_that_name']) {
    choices.push({ label: 'Did he know you?', next: 'n22' });
  }
  choices.push({ label: 'Go on.', next: 'n24' });
  return choices;
}

export const IVO = {
  // Entry
  n00: {
    lines: [
      act('A dock android in a work vest. He stands the way dock workers are taught to stand: hands behind his back, out of everybody’s way.'),
      ivo('You’re the investigator. The screen said wait here and give a statement. So I waited.'),
      act('He rolls his left shoulder. It clicks.'),
    ],
    adds: ['ep00.ivo.met'],
    choices: hub,
  },
  n01: {
    lines: [ivo('Still here. Nowhere else to be.')],
    choices: hub,
  },

  // Route A: what you did
  n10: {
    lines: [
      ivo('I pulled the cable. The thick one, from his neck to the machine. He asked me to, so I did.'),
      echo('People don’t ask for that. Not unless they’re running from something.'),
    ],
    adds: ['ep00.asked.act', 'tst.ivo_pulled'],
    choices: [
      { label: 'Why would he ask you that?', next: 'n11' },
      { label: 'When?', next: 'n12' },
    ],
  },
  n11: {
    lines: [
      ivo('He said the machine was taking something out of him. He said when it finished, he’d be gone.'),
      ivo('Then he said please.'),
      ivo('Dr. Vale doesn’t say please. He says “unit.” I’ve sat in that chair eleven times. I’d know.'),
    ],
    adds: ['tst.ivo_please'],
    choices: afterWhyOrWhen,
  },
  n12: {
    lines: [
      ivo('Fourteen past nine. I pulled it and started counting. He went still at four minutes. The screen said dead at six.'),
      act('He looks at the empty chair.'),
      ivo('I counted the wrong thing. Should have been watching him.'),
    ],
    adds: ['tst.ivo_four_minutes'],
    choices: afterWhyOrWhen,
  },
  n14: {
    lines: [ivo('Then the screen said what it said. And then he stood up.')],
    choices: [{ label: 'He stood up?', next: 'n15' }],
  },
  n15: {
    lines: (s) => [
      ivo('Stood up. Tore the tag off his wrist, dropped it, walked out that door. Never looked at me. He’d looked at me the whole time before that.'),
      act('His shoulder clicks.'),
      ivo('The screen says dead. I’m not here to argue with a screen. I’m here to tell you what I did.'),
      ...(s.seen['obj.tag'] ? [ivo('That’s his tag on the floor. Where it landed.')] : []),
    ],
    adds: ['tst.ivo_walked_out'],
    choices: hub,
  },

  // Route B: who he was
  n20: {
    lines: [
      ivo('Dr. Vale runs this clinic. The hours are his. The machine is his. I came in at nine for my shoulder. After the technician goes home, the machine does the work by itself.'),
      ivo('Tonight he was the one in the chair.'),
    ],
    adds: ['ep00.asked.person', 'tst.ivo_vale_identity'],
    choices: [
      { label: 'He took your appointment?', next: 'n21' },
      { label: 'Did he know you?', next: 'n22' },
    ],
  },
  n21: {
    lines: [ivo('I was waiting my turn. He came in fast, holding his arm like it belonged to somebody else. Said he had to put something on record before he... He didn’t finish. I gave him the chair. Shoulders can wait.')],
    adds: ['tst.ivo_on_record'],
    choices: afterChairOrKnew,
  },
  n22: {
    lines: [
      ivo('He looked at me like he was trying to remember me. I said, “Dr. Vale, what do you need?” And he said...'),
      act('Ivo stops. Starts again.'),
      ivo('“Not that name.” I thought the machine was hurting him. It says confusion is normal.'),
    ],
    adds: ['tst.ivo_not_that_name'],
    choices: afterChairOrKnew,
  },
  n24: {
    lines: [ivo('I don’t know what he put on record. The machine doesn’t tell you things. It just said HOLD.')],
    choices: hub,
  },

  // The memory
  n30: {
    lines: (s) => [
      ...(!s.flags['ep00.asked.act'] && !s.flags['ep00.asked.person'] ? [ivo('You read the screen. Now read me.')] : []),
      ivo('Dock rule: you record your shift. If a load drops, the foreman sees what you saw. I was still recording when I came in here.'),
      act('He opens a small panel on his left forearm.'),
      ivo('Take the part from in here. It’s what I did. I want somebody to look at it who actually looks.'),
      echo('One frame, 9:14 PM, seen through his eyes. If I stand by the chair, I can step inside it.'),
    ],
    adds: ['clue.ivo_clip', 'ep00.clipHeld'],
    choices: hub,
  },
};
