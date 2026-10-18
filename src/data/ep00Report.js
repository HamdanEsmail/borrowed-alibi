// Episode 00 ending: the provisional report, Ivo's response, what Echo can
// stand behind, and the arrival notice that closes the prologue.
// Story content, authored separately from the code. Same node shape as
// ep00Ivo.js, so the same Conversation engine runs it.

const echo = (text) => ({ who: 'ECHO', text });
const ivo = (text) => ({ who: 'IVO', text });
const act = (text) => ({ text, note: true });
const terminal = (text) => ({ who: 'TERMINAL', text });

// The report stays locked until Echo has the whole picture.
// Echo names the first thing still missing, in this order.
function firstGap(s) {
  const f = s.flags;
  if (!s.seen['obj.terminal'] || !s.seen['obj.cable'] || !s.seen['obj.tag']) {
    return 'I haven’t looked at everything in this room.';
  }
  if (!f['clue.ivo_clip']) return 'I should see what he recorded.';
  if (!f['ep00.comparisonDone']) return 'I have his frame. I haven’t laid it over the room.';
  if (!f['tst.ivo_pulled']) return 'I haven’t heard what he did.';
  if (!f['tst.ivo_four_minutes']) return 'I haven’t heard what time he means.';
  if (!f['tst.ivo_walked_out']) return 'I haven’t heard what he says happened after.';
  return null;
}

export const REPORT = {
  start: {
    lines: (s) => {
      const gap = firstGap(s);
      if (gap) {
        return [echo(gap)];
      }
      return [
        { who: 'HEADER', text: 'PROVISIONAL REPORT · MUNICIPAL RECONSTRUCTION · Source identities are withheld until a separate disclosure filing.' },
        echo('The terminal wants a provisional account. Two ways to write what I have.'),
      ];
    },
    choices: (s) => {
      if (firstGap(s)) {
        return [{ label: 'Step back', next: null }];
      }
      return [
        {
          label: 'Record the disconnection as observed. Causation: not established.',
          detail: 'The file stays open. The witness stays unresolved.',
          next: 'cautious',
        },
        {
          label: 'Record the witness’s account as the cause.',
          detail: 'The file moves. The witness gets an answer. The cause is his word and the label’s.',
          next: 'certain',
        },
        { label: 'Not yet', next: null },
      ];
    },
  },

  // Filing A: cautious
  cautious: {
    lines: [
      terminal('21:50 · PROVISIONAL ACCOUNT FILED · CAUSATION NOT ESTABLISHED · FOLLOW-UP REQUIRED'),
      act('The FATAL EVENT banner stays. A cyan line appears beneath it: DISPUTED (PROVISIONAL).'),
      ivo('Not established.'),
      act('His shoulder clicks.'),
      ivo('So I wait. With this.'),
      echo('You wait with what you did. Not with what the screen says you did.'),
      ivo('Those were the same thing thirty minutes ago.'),
    ],
    adds: ['inf.ep00_report', 'ep00.report.cautious'],
    choices: [{ label: 'Continue', next: 'conclusion' }],
  },

  // Filing B: certain
  certain: {
    lines: [
      terminal('21:50 · PROVISIONAL ACCOUNT FILED · WITNESS ACCOUNT ACCEPTED AS CAUSE · FORWARDED'),
      act('The FATAL EVENT banner stays. A cyan line appears beneath it: CORROBORATED (PROVISIONAL).'),
      ivo('Thank you.'),
      act('His hands come out from behind his back for the first time.'),
      ivo('I wanted it to be somebody’s. So it could be mine.'),
      echo('It’s on the record the way you said it.'),
      ivo('That’s what I asked for. That’s what he asked for too. Me pulling it. I did what people asked all night.'),
    ],
    adds: ['inf.ep00_report', 'ep00.report.certain'],
    choices: [{ label: 'Continue', next: 'conclusion' }],
  },

  // The same earned conclusion on both routes; a different record of what Echo did
  conclusion: {
    lines: (s) => [
      act('What I can stand behind.'),
      { who: 'OBSERVED', text: 'A manually disconnected cable. The terminal logs a disconnection at 21:14 by its clock and labels a fatal event at 21:20. Ivo’s frame shows a seated cable and an occupied chair. The tag records 21:06 by the lift’s clock and a route to the gangway; it was found here.' },
      { who: 'STATED', text: 'Ivo says he pulled the cable at the occupant’s request, at fourteen past nine by his clock. He describes stillness, the fatal reading, and the occupant walking out.' },
      { who: 'INTERPRETED', text: 'The present evidence does not establish what the disconnection caused.' },
      echo(s.flags['ep00.report.cautious']
        ? 'I filed it that way.'
        : 'I filed it the way he told it. The gap is still in my notes.'),
    ],
    choices: [{ label: 'Continue', next: 'hook' }],
  },

  // The hook
  hook: {
    lines: [
      act('The terminal chimes.'),
      terminal('22:02 · EXTERNAL ARRIVAL · DECK 2 GANGWAY · VALE, SEN (7741-V) · IDENTITY VERIFIED'),
      echo('The registered identity on the fatal event has just walked onto the ship.'),
      ivo('He’s at the gangway?'),
      act('He looks at the chair. Then at the door.'),
      ivo('Then who got up?'),
    ],
    choices: [{ label: 'Continue', next: 'end' }],
  },

  end: {
    lines: (s) => [
      { who: 'PROLOGUE', text: 'Complete.' },
      { who: 'FILED', text: s.flags['ep00.report.cautious'] ? 'Causation not established.' : 'Witness account accepted as cause.' },
      { who: 'NEXT', text: 'Week 1 — A familiar face. Coming soon.' },
      act('Replay the opening to file the other account.'),
    ],
    adds: ['ep00.complete'],
    choices: [{ label: 'Replay the opening', next: null }],
  },
};
