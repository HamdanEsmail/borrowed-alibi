import Phaser from 'phaser';
import { CLINIC } from '../data/clinicLayout.js';

const ECHO_SPEED = 180;

export class ClinicScene extends Phaser.Scene {
    constructor() {
        super('ClinicScene');
    }
    create() {
        this.drawRoom();
        this.createObstacles();
        this.createEcho();
        this.createControls();
    }

    drawRoom() {
        // Back wall and floor
        this.add.rectangle(0, 0, 960, 372, 0x1b2a36).setOrigin(0);
        this.add.rectangle(0, 372, 960, 168, 0x24323d).setOrigin(0)

        for (const door of CLINIC.doors) {
            this.add.rectangle(door.x, door.y, door.width, door.height, 0x34495a).setOrigin(0);
        }
    }
    createObstacles() {
        this.obstacles = this.physics.add.staticGroup();

        for (const item of CLINIC.obstacles) {
            const block = this.add.rectangle(item.x, item.y, item.width, item.height, 0x6b5843).setOrigin(0);

            // The Things i made lower on the screen are closer to the camera, so they should be drawn on top of other objects
            block.setDepth(item.y + item.height);
            this.obstacles.add(block);
        }
    }

    createEcho() {
        const { x, y } = CLINIC.spawn;
        const band = CLINIC.walkBand;

        this.echo = this.add.rectangle(x, y, 44, 170, 0x9fc3d6).setOrigin(0.5, 1);
        this.physics.add.existing(this.echo);

        // Not the whole body will collide, Only Echo's feet will have collisions
        this.echo.body.setSize(36, 14, false);
        this.echo.body.setOffset(4, 156);

        this.physics.world.setBounds(band.x, band.y, band.width, band.height);
        this.echo.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.echo, this.obstacles);
    }
    createControls() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W, A, S, D');
    }
    update() {
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
}