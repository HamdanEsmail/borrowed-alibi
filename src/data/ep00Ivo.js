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
    choices.push({ label: 'Tell me about him.', next: 'n20' });
  }
  const hasReasonToAsk = f['ep00.asked.act'] || f['ep00.asked.person'] || s.seen['obj.terminal'];
  if (hasReasonToAsk && !f['clue.ivo_clip']) {
    choices.push({ label: 'Show me what you saw.', next: 'n30' });
  }
  choices.push({ label: f['ep00.clipHeld'] ? 'That’s all for now.' : 'I’ll look around first.', next: null });

  return choices;
}

// Route A must hear the time before it can move on; "why" stays optional.
function afterWhyOrWhen(s) {
  const f = s.flags;
  if (!f['tst.ivo_four_minutes']) {
    return [{ label: 'What time?', next: 'n12' }];
  }
  const choices = [];
  if (!f['tst.ivo_please']) {
    choices.push({ label: 'Why did he ask you?', next: 'n11' });
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
      ivo('You’re the municipal unit. It said remain for statement. I remained.'),
      act('He rolls his left shoulder. It clicks.'),
    ],
    adds: ['ep00.ivo.met'],
    choices: hub,
  },
  n01: {
    lines: [ivo('Still here.')],
    choices: hub,
  },

  // Route A: what you did
  n10: {
    lines: [ivo('I pulled the cable. The thick one, from his neck to the machine. He asked me to, and I did it.')],
    adds: ['ep00.asked.act', 'tst.ivo_pulled'],
    choices: [
      { label: 'Why did he ask you?', next: 'n11' },
      { label: 'What time?', next: 'n12' },
    ],
  },
  n11: {
    lines: [
      ivo('He said they were taking something out of him through it. He said if it finished, he’d be gone. He said please.'),
      ivo('Dr. Vale doesn’t say please. He says “unit.” I’ve been in this chair eleven times. I’d know.'),
    ],
    adds: ['tst.ivo_please'],
    choices: afterWhyOrWhen,
  },
  n12: {
    lines: [
      ivo('Fourteen past nine, my clock. I pulled it and I counted. He went still at four minutes. The screen said fatal at six.'),
      act('He looks at the chair.'),
      ivo('I counted the wrong thing. I should have counted him.'),
    ],
    adds: ['tst.ivo_four_minutes'],
    choices: afterWhyOrWhen,
  },
  n14: {
    lines: [ivo('Then the screen said what it said. Then he stood up.')],
    choices: [{ label: 'He stood up.', next: 'n15' }],
  },
  n15: {
    lines: (s) => [
      ivo('Stood up. Took the tag off his wrist, dropped it, walked out. Didn’t look at me. He’d looked at me the whole time before.'),
      act('His shoulder clicks.'),
      ivo('The terminal says fatal. I’m not arguing with it. I’m telling you what I did.'),
      ...(s.seen['obj.tag'] ? [ivo('You’ve seen the tag. That’s where it landed.')] : []),
    ],
    adds: ['tst.ivo_walked_out'],
    choices: hub,
  },

  // Route B: who he was
  n20: {
    lines: [ivo('Dr. Vale. He runs this place — the contract one. The hours are his, the machine is his. I was here for my shoulder. Twenty-one hundred. After the tech leaves, the machine does it alone.')],
    adds: ['ep00.asked.person', 'tst.ivo_vale_identity'],
    choices: [
      { label: 'He took your appointment?', next: 'n21' },
      { label: 'Did he know you?', next: 'n22' },
    ],
  },
  n21: {
    lines: [ivo('I was standing in the queue tape. He came in fast, holding his arm like it was a bag he was carrying. Said he needed to put something on record before— he didn’t finish the before. I gave him the chair. Shoulders keep.')],
    adds: ['tst.ivo_on_record'],
    choices: afterChairOrKnew,
  },
  n22: {
    lines: [
      ivo('He looked at me like he was trying to. I said, “Dr. Vale, what do you need,” and he said—'),
      act('A pause.'),
      ivo('“Not that name.” I thought the session was already hurting him. The machine says confusion is normal.'),
    ],
    adds: ['tst.ivo_not_that_name'],
    choices: afterChairOrKnew,
  },
  n24: {
    lines: [ivo('I don’t know what he put on record. The machine doesn’t tell you. It just says HOLD.')],
    choices: hub,
  },

  // The clip
  n30: {
    lines: (s) => [
      ...(!s.flags['ep00.asked.act'] && !s.flags['ep00.asked.person'] ? [ivo('You read the screen. Then read this.')] : []),
      ivo('I record my shifts. Dock rule: if a load drops, you show the foreman what you saw. I was still recording in here.'),
      act('He touches the panel on his left forearm.'),
      ivo('I’ll give you the part from in here. It’s what I did. I want it looked at by someone who looks.'),
      echo('Received. One frame, 21:14:07, your device clock. I can lay it over the room.'),
    ],
    adds: ['clue.ivo_clip', 'ep00.clipHeld'],
    choices: hub,
  },
};
