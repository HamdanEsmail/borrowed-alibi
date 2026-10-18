// The clinic's pictures (sources in art/clinic/, made by art/clinic/export.py).
// Every picture is drawn at twice the game's size so it stays sharp, and shown at half scale.
// x, y: where the picture's top-left corner goes, in the same coordinates as clinicLayout.js.
// depth: the same depth the old greybox block had, so Echo still walks in front of and behind things.

export const CLINIC_ART = [
    { key: 'room', file: 'art/clinic/room.png', x: 0, y: 0, depth: 0 },
    { key: 'cable', file: 'art/clinic/cable.png', x: 566, y: 258, depth: 412 },
    { key: 'chair', file: 'art/clinic/chair.png', x: 496, y: 272, depth: 420 },
    { key: 'ivo', file: 'art/clinic/ivo.png', x: 402, y: 226, depth: 430 },
    { key: 'tag', file: 'art/clinic/tag.png', x: 498, y: 430, depth: 451 },
    { key: 'bucket', file: 'art/clinic/bucket.png', x: 296, y: 416, depth: 500 },
    { key: 'trolley', file: 'art/clinic/trolley.png', x: 32, y: 376, depth: 520 },
    { key: 'lamp', file: 'art/clinic/lamp.png', x: 0, y: 0, depth: 998, breathes: true },
    { key: 'shade', file: 'art/clinic/shade.png', x: 0, y: 0, depth: 999 },
];

// Echo moves, so its picture follows Echo instead of having a fixed place.
// Its feet are 200 down a 208-tall picture.
export const ECHO_ART = { key: 'echo', file: 'art/clinic/echo.png', feet: 200, height: 208 };
