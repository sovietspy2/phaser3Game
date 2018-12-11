import {
    CST
} from "../CST";
import Player from "../models/player";
import {
    coinFactory
} from "../helpers/coinHelper";
import {
    teleporter
} from "../helpers/teleporter";
import Creature from "../models/creature";
import Slime from "../models/slime";
import potionFactory from "../helpers/potionFactory";
import BoxGroup from "../helpers/boxGroup";
import WeaponPlugin from 'phaser3-weapon-plugin'


export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.GAME
        });

    }


    init(data) {
        this.nextMap = data.nextMap;
        this.initScore = data.score;
    }

    preload() {
        debugger;
        this.load.tilemapTiledJSON(this.nextMap, 'assets/' + this.nextMap);
        this.load.scenePlugin('WeaponPlugin', WeaponPlugin, null, 'weapons');
    }


    create() {
        console.log("GAME SCENE CREATE START");



        //this.sys.install('WeaponPlugin');
        this.map = this.make.tilemap({
            key: this.nextMap
        });
        var tiles = this.map.addTilesetImage('MapDetails', 'tiles');

        this.groundLayer3 = this.map.createDynamicLayer('Background', tiles, 0, 0);
        this.groundLayer = this.map.createStaticLayer('World', tiles, 0, 0);

        this.groundLayer2 = this.map.createStaticLayer('Lamps', tiles, 0, 0);
        this.layer1 = this.map.createStaticLayer('Flooring', tiles, 0, 0);
        this.groundLayer5 = this.map.createStaticLayer('Props', tiles, 0, 0);


        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;
        this.groundLayer.setCollisionByProperty({
            collides: true
        });

        // create the player sprite
        this.player = new Player(this);




         //// BULLET

         this.weapon = this.weapons.add(1, 'skull');

         //this.weapon.setBulletBodyOffset(50,50,30,40);
 
         //this.weapon.set
 
         //console.log(this.weapon.bullets);
 
         this.weapon.bullets.children.iterate(bullet => {
             bullet.setScale(0.5);
             bullet.anims.play("skull-fly");
             bullet.body.allowGravity=false;
         });
 
         this.physics.add.collider(this.weapon.bullets, this.player.sprite, (bullet, player)=> bullet.kill(), null, this);
 
         this.weapon.fireAngle = 180;
 
         // Enable physics debugging for the bullets
         this.weapon.debugPhysics = true
 
         //  The bullet will be automatically killed when it leaves the world bounds
         console.log(`setting bulletKillType`)
         this.weapon.bulletKillType = WeaponPlugin.consts.KILL_WORLD_BOUNDS;
 
         //  Because our bullet is drawn facing up, we need to offset its rotation:
         this.weapon.bulletAngleOffset = 200;
 
         //  The speed at which the bullet is fired
         this.weapon.bulletSpeed = 400;
 
         //  Tell the Weapon to track the 'player' Sprite
 




        // adding coins to the map
        coinFactory(this);
        teleporter(this);
        potionFactory(this);

        this.physics.add.collider(this.player.sprite, this.groundLayer);

        //let locations = [ {x:200, y:200}, {x:400,y:400}, {x:500, y:500}];
        let locations = this.map.filterObjects("Objects", (obj) => obj.name == "slime", this);

        this.slimes = this.physics.add.group(); // IT SHOULD BE REFACTORD TO LOOK LIKE POTIONFACTORY
        locations.forEach((location) => {
            let slime = new Slime({
                scene: this,
                x: location.x,
                y: location.y,
                key: "slime"
            });
            slime = this.physics.add.existing(slime);
            console.log(slime);
            slime.setDrag(1000, 0)
                .setMaxVelocity(300, 400)
                .setScale(0.5)
                .setScale(2)
                .setSize(13, 13) // hitbox size
                .setOffset(10, 20)
                .setCollideWorldBounds(true);

            this.weapon.trackSprite(slime);
            this.slimes.add(slime);
        });

        this.slimes.children.iterate(function (slime) {
            slime.setCollideWorldBounds(true);
        });


        //let config = {scene: this, x: 200, y:200, key:"slime"};
        //this.slime = new Slime(config);

        this.physics.add.collider(this.slimes, this.groundLayer);
        //this.physics.add.collider(this.slimes, this.player.sprite);
        this.player.enemyCollider(this.slimes);

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        // make the camera follow the player
        this.cameras.main.startFollow(this.player.sprite);

        // set background color, so the sky is not black
        this.cameras.main.setBackgroundColor('#ccccff');

        // this text will show the score
        this.addSimpleUI();



        this.boxGroup = new BoxGroup({
            scene: this
        });




    }

    addSimpleUI() {
        this.text = this.add.text(20, 570, '0', {
            fontSize: '20px',
            fill: '#ffffff'
        });
        // fix the text to the camera
        this.text.setScrollFactor(0);

        this.boxNumber = this.add.text(670, 17, 'Boxes: 2', {
            fontSize: '20px',
            fill: '#ffffff'
        });
        this.boxNumber.setScrollFactor(0);
    }

    update(time, delta) {

        this.weapon.fire();

        this.boxNumber.setText("Boxes: " + (this.boxGroup.getLength()));

        const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

        if (this.input.manager.activePointer.isDown) {
            //if (shiftKey.isDown) {
            //let sprite = this.physics.add.sprite(worldPoint.x, worldPoint.y, "tiles", 220);
            this.boxGroup.addBox(worldPoint.x, worldPoint.y);
            //groundLayer.removeTileAtWorldXY(worldPoint.x, worldPoint.y);
            // } else {
            //groundLayer.putTileAtWorldXY(353, worldPoint.x, worldPoint.y);
            //}
        }

        this.slimes.children.iterate(function (slime) {
            // if (slime.health>0) {
            slime.update(time, delta);
            //}
        });
        this.text.setText(this.player.score);

        //this.physics.moveToObject(this.slime.sprite,this.player.sprite);

        // update player stuff
        this.player.update();

        // handling death
        if (this.player.sprite.y > this.map.heightInPixels - 50) {
            //debugger;
            console.log("player destroyed, scene restarting . . . ")
            this.player.destroy();
            this.scene.restart();
        }

        this.boxGroup.update();

    }





}