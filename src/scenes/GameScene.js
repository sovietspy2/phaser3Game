import { CST } from "../CST";
import Player from "../models/player";
import {coinFactory} from "../helpers/coinHelper";
import {teleporter} from "../helpers/teleporter";

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.GAME
        });

    }




    create() {
        console.log("GAME SCENE CREATE START");

        this.map = this.make.tilemap({ key: 'map' });
        var tiles = this.map.addTilesetImage('MapDetails','tiles');
        
        this.groundLayer3 = this.map.createDynamicLayer('Background', tiles,0,0);
        this.groundLayer = this.map.createStaticLayer('World', tiles,0,0);
        this.map.setCollisionByProperty({collides: true});
        this.groundLayer2 = this.map.createStaticLayer('Lamps', tiles,0,0);
        this.layer1 = this.map.createStaticLayer('Flooring', tiles,0,0);
        this.groundLayer5 = this.map.createStaticLayer('Props', tiles,0,0);


        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;

        // create the player sprite    
        this.player = new Player(this);

        // adding coins to the map
        coinFactory(this);
        teleporter(this);
        
        this.physics.add.collider(this.player.sprite, this.groundLayer);

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        // make the camera follow the player
        this.cameras.main.startFollow(this.player.sprite);

        // set background color, so the sky is not black    
        this.cameras.main.setBackgroundColor('#ccccff');

        // this text will show the score
        this.text = this.add.text(20, 570, '0', {
            fontSize: '20px',
            fill: '#ffffff'
        });
        // fix the text to the camera
        this.text.setScrollFactor(0);

        
    }

    update(time, delta) {
        
        this.text.setText(this.player.score);


        // update player stuff
        this.player.update();


        // handling death
        if (this.player.sprite.y > this.map.heightInPixels-50) {
           //debugger;
           console.log("player destroyed, scene restarting . . . ")
           this.player.destroy();
           this.scene.restart();
        }
    }

}