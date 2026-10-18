// Episode 00 ending: the report, Ivo's response, what Echo can stand
// behind, and the arrival notice that closes the prologue.
// Story content, authored separately from the code. Same node shape as
// ep00Ivo.js, so the same Conversation engine runs it.

const echo = (text) => ({ who: 'ECHO', text });
const ivo = (text) => ({ who: 'IVO', text });
const act = (text) => ({ text, note: true });
const screen = (text) => ({ who: 'SCREEN', text });

// The report stays locked until Echo has the whole picture.
// Echo names the first thing still missing, in this order.
function firstGap(s) {
  const f = s.flags;
  if (!s.seen['obj.terminal'] || !s.seen['obj.cable'] || !s.seen['obj.tag']) {
    return 'Not yet. I haven’t looked at everything in this room.';
  }
  if (!f['clue.ivo_clip']) return 'Not yet. He recorded his shift. I want to see it.';
  if (!f['ep00.comparisonDone']) return 'Not yet. I have his memory. I haven’t stepped inside it.';
  if (!f['tst.ivo_pulled']) return 'Not yet. He hasn’t told me what he did.';
  if (!f['tst.ivo_four_minutes']) return 'Not yet. I don’t know when he did it.';
  if (!f['tst.ivo_walked_out']) return 'Not yet. He hasn’t told me how it ended.';
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
        act('The terminal opens a report form. One box: WHAT HAPPENED HERE?'),
        echo('The city wants one sentence from me. I can write it two ways.'),
      ];
    },
    choices: (s) => {
      if (firstGap(s)) {
        return [{ label: 'Step back', next: null }];
      }
      return [
        {
          label: 'Write only what I can prove.',
          detail: '“The cable was pulled. What it did is unknown.” The case stays open. Ivo doesn’t get his answer.',
          next: 'cautious',
        },
        {
          label: 'Write what Ivo believes.',
          detail: '“He pulled the cable, and it killed Dr. Vale.” The case closes. Ivo gets his answer. Nobody has proved it.',
          next: 'certain',
        },
        { label: 'Not yet', next: null },
      ];
    },
  },

  // Report A: only what Echo can prove
  cautious: {
    lines: [
      screen('REPORT FILED · 9:50 PM · CAUSE: UNKNOWN · CASE OPEN'),
      act('Under DECEASED, a new line blinks on: UNDER REVIEW.'),
      ivo('Unknown.'),
      act('His shoulder clicks.'),
      ivo('So I keep carrying it.'),
      echo('You carry what you did. Not what a screen says you did.'),
      ivo('Thirty-six minutes ago, those were the same thing.'),
    ],
    adds: ['inf.ep00_report', 'ep00.report.cautious'],
    choices: [{ label: 'Continue', next: 'conclusion' }],
  },

  // Report B: what Ivo believes
  certain: {
    lines: [
      screen('REPORT FILED · 9:50 PM · CAUSE: CABLE PULLED BY WITNESS · CASE CLOSED'),
      act('Under DECEASED, a new line blinks on: CONFIRMED.'),
      ivo('Thank you.'),
      act('For the first time tonight, his hands come out from behind his back.'),
      ivo('I needed it to be somebody’s fault. Then it could be mine.'),
      echo('It’s on the record your way now. The record doesn’t give things back.'),
      ivo('He asked me to pull it. You asked me what happened. I did what people asked all night.'),
    ],
    adds: ['inf.ep00_report', 'ep00.report.certain'],
    choices: [{ label: 'Continue', next: 'conclusion' }],
  },

  // The same conclusion on both routes; a different record of what Echo did
  conclusion: {
    lines: (s) => [
      echo('What I can stand behind:'),
      { who: 'I SAW', text: 'A cable pulled out by hand. A screen that calls Dr. Vale dead at 9:20 and admits nobody saw it happen. A freight tag with his ID number, printed at 9:06 for the gangway, found on this floor. Ivo’s memory: a man alive in the chair, mid-word, with the cable still in.' },
      { who: 'I HEARD', text: 'Ivo pulled the cable because the man asked him to. Four minutes later the man went still. Then he stood up and walked out.' },
      { who: 'I THINK', text: 'Something happened in that chair. I can’t prove the cable did it.' },
      echo(s.flags['ep00.report.cautious']
        ? 'So that’s what I wrote.'
        : 'I wrote it his way. The doubt stays in my notes.'),
    ],
    choices: [{ label: 'Continue', next: 'hook' }],
  },

  // The hook
  hook: {
    lines: [
      act('The terminal chimes. A new line crawls across the screen.'),
      screen('10:02 PM · FERRY ARRIVAL · GANGWAY · DR. SEN VALE (ID 7741-V) · IDENTITY CONFIRMED'),
      echo('The dead man just stepped off the ferry.'),
      ivo('He’s... at the gangway?'),
      act('Ivo looks at the chair. Then at the door.'),
      ivo('Then who was in the chair?'),
    ],
    choices: [{ label: 'Continue', next: 'end' }],
  },

  end: {
    lines: (s) => [
      { who: 'PROLOGUE', text: 'Complete.' },
      { who: 'YOU WROTE', text: s.flags['ep00.report.cautious']
        ? '“The cable was pulled. What it did is unknown.”'
        : '“He pulled the cable, and it killed Dr. Vale.”' },
      { who: 'NEXT', text: 'Week 1: A Familiar Face. Coming soon.' },
      act('Play again to write the other report.'),
    ],
    adds: ['ep00.complete'],
    choices: [{ label: 'Play again', next: null }],
  },
};
