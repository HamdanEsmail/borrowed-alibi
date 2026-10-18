import Phaser from 'phaser';
import './style.css';
import { ClinicScene } from './scenes/ClinicScene.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1920,
    height: 1080,
    backgroundColor: '#101b24',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: { debug: false },
    },
    scene: [ClinicScene],
};

new Phaser.Game(config);