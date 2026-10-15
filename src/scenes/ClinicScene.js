import Phaser from 'phaser';
import { CLINIC } from '../data/clinicLayout.js';
import { INSPECT } from '../data/ep00Text.js';
import { IVO } from '../data/ep00Ivo.js';
import { Conversation } from '../dialogue/Conversation.js';
import { state } from '../state/gameState.js';
import { InspectPanel } from '../ui/InspectPanel.js';

const ECHO_SPEED = 180;
const REACH = 90;
const LABEL_RANGE = 180;

export class ClinicScene extends Phaser.Scene {
    constructor() {
        super('ClinicScene');
    }

    create() {
        this.drawRoom();
        this.createObstacles();
        this.createInteractables();
        this.createEcho();
        this.createControls();
        this.panel = new InspectPanel();
        this.ivoTalk = new Conversation('Ivo', IVO, this.panel);
    }

    drawRoom() {
        // Back wall and floor
        this.add.rectangle(0, 0, 960, 372, 0x1b2a36).setOrigin(0);
        this.add.rectangle(0, 372, 960, 168, 0x24323d).setOrigin(0);

        for (const door of CLINIC.doors) {
            this.add.rectangle(door.x, door.y, door.width, door.height, 0x34495a).setOrigin(0);
        }
    }

    createObstacles() {
        this.obstacles = this.physics.add.staticGroup();

        for (const item of CLINIC.obstacles) {
            const block = this.add.rectangle(item.x, item.y, item.width, item.height, 0x6b5843).setOrigin(0);

            // Things Lower on screen are closer to the camera, so they draw on top
            block.setDepth(item.y + item.height);
            this.obstacles.add(block);
        }
    }

    createInteractables() {
        for (const item of CLINIC.interactables) {
            if (item.marker) {
                const m = item.marker;
                this.add.rectangle(m.x, m.y, m.width, m.height, m.color).setOrigin(0).setDepth(m.depth ?? 0);
            }
        }

        // One label, moved to whichever object Echo is closest to
        this.focusLabel = this.add.text(0, 0, '', {
            fontFamily: 'system-ui, sans-serif',
            fontSize: '16px',
            color: '#e6dcc3',
            backgroundColor: '#101b24',
            padding: { x: 8, y: 4 },
        })
        .setOrigin(0.5, 1)
        .setDepth(1000)
        .setVisible(false);
    }

    createEcho() {
        const { x, y } = CLINIC.spawn;
        const band = CLINIC.walkBand;

        this.echo = this.add.rectangle(x, y, 44, 170, 0x9fc3d6).setOrigin(0.5, 1);
        this.physics.add.existing(this.echo);

        // Only Echo's feet Collide, Not the whole body.
        this.echo.body.setSize(36, 14, false);
        this.echo.body.setOffset(4, 156);

        this.physics.world.setBounds(band.x, band.y, band.width, band.height);
        this.echo.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.echo, this.obstacles);
    }
    
    createControls() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W, A, S, D');
        this.actionKeys = this.input.keyboard.addKeys('E, ENTER, ESC');
        const numbers = this.input.keyboard.addKeys('ONE, TWO, THREE, FOUR');
        this.choiceKeys = [numbers.ONE, numbers.TWO, numbers.THREE, numbers.FOUR];
    }
    update() {
        // JustDown is true only on the frame a key goes down, so read each key once
        const pressedAction = Phaser.Input.Keyboard.JustDown(this.actionKeys.E) || Phaser.Input.Keyboard.JustDown(this.actionKeys.ENTER);
        const pressedEscape = Phaser.Input.Keyboard.JustDown(this.actionKeys.ESC);
        const pressedChoice = this.choiceKeys.map((key) => Phaser.Input.Keyboard.JustDown(key)).indexOf(true);

        if (this.ivoTalk.isActive) {
            this.echo.body.setVelocity(0, 0);

            if (pressedChoice !== -1) {
                this.ivoTalk.choose(pressedChoice);
            } else if (pressedEscape) {
                this.ivoTalk.leave();
            }
            return;
        }

        if (this.panel.isOpen) {
            this.echo.body.setVelocity(0, 0);

            if (pressedAction || pressedEscape) {
                this.panel.close();
            }
            return;
        }
        this.moveEcho();

        const target = this.findNearest();
        this.showFocus(target);

        if (pressedAction && target && target.distance <= REACH) {
            this.interact(target.item);
        }
    }

    moveEcho() {
        const left = this.cursors.left.isDown || this.wasd.A.isDown;
        const right = this.cursors.right.isDown || this.wasd.D.isDown;
        const up = this.cursors.up.isDown || this.wasd.W.isDown;
        const down = this.cursors.down.isDown || this.wasd.S.isDown;

        const direction = new Phaser.Math.Vector2(
            Number(right) - Number(left),
            Number(down) - Number(up),
        ).normalize();
        
        this.echo.body.setVelocity(direction.x * ECHO_SPEED, direction.y * ECHO_SPEED);
        this.echo.setDepth(this.echo.y);
    }

    findNearest() {
        let best = null;
        for (const item of CLINIC.interactables) {
            const distance = Phaser.Math.Distance.Between(this.echo.x, this.echo.y, item.x, item.y);

            if (distance <= LABEL_RANGE && (!best || distance < best.distance)) {
                best = { item, distance };
            }
        }
        return best;
    }
    showFocus(target) {
        if (!target) {
            this.focusLabel.setVisible(false);
            return;
        }
        const { item, distance } = target;
        const text = distance <= REACH ? `[E] ${item.label}` : item.label;

        this.focusLabel.setText(text).setPosition(item.labelAt.x, item.labelAt.y).setVisible(true);
    }
    interact(item) {
        if (item.talk) {
            this.ivoTalk.start(state.flags['ep00.ivo.met'] ? 'n01' : 'n00');
            return;
        }

        const text = INSPECT[item.id];
        const firstTime = !state.seen[item.id];
        const lines = [...(firstTime ? text.first : text.repeat)];

        if (text.after && state.flags[text.after.flag]) {
            lines.push ({ who: 'ECHO', text: text.after.text });
        }

        state.seen[item.id] = true;
        this.panel.open(item.label, lines);
    }
}