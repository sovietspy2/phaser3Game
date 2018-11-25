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
        var tiles = this.map.addTilesetImage('MapDetails','tiles');
        //var iconTiles = this.map.addTilesetImage('fb');
        this.groundLayer3 = this.map.createDynamicLayer('Background', tiles,0,0);
        this.groundLayer = this.map.createStaticLayer('World', tiles,0,0);
        this.map.setCollisionByProperty({collides: true});
        this.groundLayer2 = this.map.createStaticLayer('Lamps', tiles,0,0);
        this.layer1 = this.map.createStaticLayer('Flooring', tiles,0,0);
        this.groundLayer5 = this.map.createStaticLayer('Props', tiles,0,0);
        var coinTiles = this.map.addTilesetImage('stolencoin','coin');
        this.coinLayer = this.map.createDynamicLayer('CoinLayer', coinTiles, 0, 0);


       
        //this.coinLayer.setTileIndexCallback(192, this.collectCoin, this);
        


        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;

        // create the player sprite    
        const spawnPoint = this.map.findObject("Objects", obj => obj.name === "spawn");
        this.player = new Player(this, spawnPoint.x, spawnPoint.y);

        
        this.physics.add.collider(this.player.sprite, this.groundLayer);
        //this.physics.add.overlap(this.player.sprite, this.coinLayer, this.collectCoin, null, this);
        this.coinLayer.setTileIndexCallback(226, this.collectCoin, this);
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

        this.score = 0;

    }

    // this function will be called when the player touches a coin
    collectCoin(sprite, tile) {
        console.log("collectCion triggered");
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