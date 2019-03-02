/** @type {import("../typings/phaser")} */
import Phaser from 'phaser';
import {LoadScene} from "./scenes/LoadScene";
import {MenuScene} from "./scenes/MenuScene";
import { GameScene } from "./scenes/GameScene";
import {MapLoadScene} from "./scenes/MapLoadScene";
//import WeaponPlugin from 'phaser3-weapon-plugin';

let game = new Phaser.Game({
    type: Phaser.AUTO,
            width: 800,
            height: 600,
            pixerArt: true,
            physics: {
               default: 'arcade',
               arcade: {
                    gravity: { y: 1000 },
                    debug: true
                }
            },
            scene: [
                LoadScene,
                MenuScene,
                GameScene
            ],
            //global: [
           //     { key:'WeaponPlugin',plugin: WeaponPlugin, start:true, mapping:'weapons'}
           // ],
           //plugins: [ 'WeaponPlugin' ],
          /// map: {
          //  'weapons': 'weapons'
          //  },
            parent: "game"
});
