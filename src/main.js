/** @type {import("../typings/phaser")} */
import Phaser from 'phaser';
import {LoadScene} from "./scenes/LoadScene";
import {MenuScene} from "./scenes/MenuScene";
import { GameScene } from "./scenes/GameScene";


var map;
var player;
var cursors;
var groundLayer, coinLayer;
var text;
var score = 0;

let game = new Phaser.Game({
    type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
               arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
            scene: [
                LoadScene,
                MenuScene,
                GameScene
            ]
});


