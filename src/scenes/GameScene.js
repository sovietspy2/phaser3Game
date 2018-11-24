import { CST } from "../CST";
import Player from "../models/player";

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.GAME
        });

    }




    create() {
        console.log("GAME SCENE CREATE START");


        this.map = this.make.tilemap({ key: 'map' });
        var groundTiles = this.map.addTilesetImage('tiles');
        this.groundLayer = this.map.createDynamicLayer('World', groundTiles, 0, 0);
        this.groundLayer.setCollisionByExclusion([-1]);

        var coinTiles = this.map.addTilesetImage('coin');
        this.coinLayer = this.map.createDynamicLayer('Coins', coinTiles, 0, 0);

        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;

        // create the player sprite    
        this.player = new Player(this, 200, 200);


        // small fix to our player images, we resize the physics body object slightly
      
        // player will collide with the level tiles 
        this.physics.add.collider(this.groundLayer, this.player.sprite);

        this.coinLayer.setTileIndexCallback(17, this.collectCoin, this);
        // when the player overlaps with a tile with index 17, collectCoin 
        // will be called    
        this.physics.add.overlap(this.player.sprite, this.coinLayer);



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

    // this function will be called when the player touches a coin
    collectCoin(sprite, tile) {
        this.coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
        this.score++; // add 10 points to the score
        this.text.setText(this.score); // set the text to show the current score
        return false;

    }

    update(time, delta) {
        // update player stuff
        this.player.update();


        // handling death
        if (this.player.sprite.y > this.map.heightInPixels) {
           //debugger;
           console.log("player destroyed, scene restarting . . . ")
           this.player.destroy();
           this.scene.restart();
        }
    }

}