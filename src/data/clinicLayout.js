export const CLINIC = {
    walkBand: { x: 30, y: 372, width: 900, height: 148 },
    spawn: { x: 870, y: 450},
    doors: [
        {
            name: 'staffDoor', x: 30, y: 110, width: 80, height: 290
        },
        {
            name: 'entryDoor', x: 850, y: 110, width: 80, height: 290
        },
    ],
    obstacles: [
        {
            name: 'chair', x: 505, y: 395, width: 85, height: 25 
        },
        {
            name: 'trolley', x: 60, y: 470, width: 140, height: 50
        },
        {
            name: 'bucket', x: 306, y: 472, width: 28, height: 28
        },
        {
            name: 'ivo', x: 422, y: 418, width: 36, height: 12
        },
    ],
    interactables: [ 
    {
        id: 'obj.terminal', label: 'Clinic terminal', frame: true, report: true, x: 650, y: 386, labelAt: { x: 650, y: 146},
        marker: { x: 600, y: 152, width: 100, height: 189, color: 0x3a4650 },
    },
    {
        id: 'obj.cable', label: 'Dock cable', x: 598, y: 410, labelAt: { x: 598, y: 392 },
        marker: { x: 592, y: 398, width: 10, height: 14, color: 0xc08a54, depth: 412 },
    },
    {
        id: 'obj.tag', label: 'Freight tag', x: 518, y: 444, labelAt: { x: 518, y: 434 },
        marker: { x: 504, y: 437, width: 28, height: 14, color: 0xe6dcc3, depth: 451 },
    },
    {
        id: 'obj.chair', label: 'Examination chair', frame: true, x: 548, y: 420, labelAt: { x: 548, y: 388 },
    },
    {
        id: 'obj.wallunit', label: 'Wall unit', x: 218, y: 386, labelAt: { x: 218, y: 166 },
        marker: { x: 190, y: 172, width: 57, height: 57, color: 0x2c3a43 },
    },
    {
        id: 'obj.board', label: 'Hours board', x: 433, y: 386, labelAt: { x: 433, y: 154 },
        marker: { x: 400, y: 160, width: 66, height: 56, color: 0xb9beb8 },
    },
    {
        id: 'chr.ivo', label: 'Ivo', talk: true, x: 440, y: 430, labelAt: { x: 440, y: 262 },
        marker: { x: 420, y: 270, width: 40, height: 160, color: 0x8a7560, depth: 430 },
    },

    ],
};