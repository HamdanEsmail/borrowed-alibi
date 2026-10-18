// Episode 00 opening: where this is, who Echo is, and what happened tonight.
// Story content, authored separately from the code. Same node shape as
// ep00Ivo.js, so the same Conversation engine runs it.

const echo = (text) => ({ who: 'ECHO', text });
const act = (text) => ({ text, note: true });

export const INTRO = {
  start: {
    lines: [
      act('The Meridian. 9:41 PM. Raining.'),
      echo('The Meridian used to be a cruise ship. Now it’s a neighbourhood, tied to the dock with rope and old promises. The city wants it empty by winter.'),
      echo('I’m Echo. The city built me to find out what happened when nobody agrees. I borrow other people’s memories, when they let me, and walk around inside them.'),
      echo('Tonight it’s the clinic on Deck 4. A screen says the clinic’s own doctor is dead. A dock worker says he killed him.'),
      echo('Nobody calls me for the easy ones.'),
      { who: 'CONTROLS', text: 'Move with WASD or the arrow keys. Walk up to something and press E to look at it or talk.' },
    ],
    choices: [{ label: 'Begin', next: null }],
  },
};
