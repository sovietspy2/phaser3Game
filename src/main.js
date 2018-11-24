/** @type {import("../typings/phaser")} */
import Phaser from 'phaser';
import {LoadScene} from "./scenes/LoadScene";
import {MenuScene} from "./scenes/MenuScene";
import { GameScene } from "./scenes/GameScene";



let game = new Phaser.Game({
    type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
               arcade: {
                    gravity: { y: 350 },
                    debug: true
                }
            },
            scene: [
                LoadScene,
                MenuScene,
                GameScene
            ],
            parent: "game"
});


