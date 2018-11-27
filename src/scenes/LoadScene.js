import { CST } from "../CST";
export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        });
    }
    init() {

    }

    preload() {


        console.log("PRELOAD FUNCTION START");


        this.load.spritesheet(
            "player",
            "assets/player_sprite.png",
            {
              frameWidth: 32,
              frameHeight: 32,
              margin: 1,
              spacing: 2
            }
          );


        this.load.image("title_bg", "./assets/image/title_bg.jpg")
        //....
        this.load.image('playButton', 'assets/image/play_button.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude',
            'assets/dude.png',
            {
                frameWidth: 32, frameHeight: 48
            });
        this.load.spritesheet('dragon', 'assets/demon-idle.png',
            {
                frameWidth: 160, frameHeight: 144
            });

        this.load.spritesheet('dragon-attack', 'assets/demon-attack.png',
            {
                frameWidth: 240, frameHeight: 192
            });

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        });

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
        });

        this.load.on("complete", () => {
            this.scene.start(CST.SCENES.MENU, "test");
        });

        this.load.spritesheet('coin', 'assets/stolencoin.png', { frameWidth: 32, frameHeight: 32 });
    
        this.load.tilemapTiledJSON('map', 'assets/castle.json');
        // tiles in spritesheet 
        this.load.spritesheet('tiles', 'assets/tile_castle.png', { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet('hero-idle', 'assets/hero-idle.png', { frameWidth: 37, frameHeight: 48 });
        this.load.spritesheet('hero-jump', 'assets/hero-jump.png', { frameWidth: 60, frameHeight: 77 });
        this.load.spritesheet('hero-attack', 'assets/hero-attack.png', { frameWidth: 100, frameHeight: 48 });
        this.load.spritesheet('hero-run', 'assets/hero-run.png', { frameWidth: 65, frameHeight: 48 });

        // simple coin image
        //this.load.image('coin', 'assets/coinGold.png');
        // player animations
        //this.load.atlas('player', 'assets/player.png', 'assets/player.json');

        


        console.log("PRELOAD FUNCTION END");
    }
    create() {
        console.log("LOAD SCENE CREATE FUNCTION START ");


        this.anims.create({
            key: 'hero-attack',
            frames: this.anims.generateFrameNumbers('hero-attack', { frames: [0,1,2,3,4,5]}),
            frameRate: 8,
            repeat: 0,
        });

        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 6 }),
            frameRate: 16,
            repeat: Phaser.FOREVER
        });

        this.anims.create({
            key: 'hero-idle',
            frames: this.anims.generateFrameNumbers('hero-idle', { start: 0, end: 3 }),
            frameRate: 7,
            repeat: Phaser.FOREVER
        });

        this.anims.create({
            key: 'hero-jump',
            frames: this.anims.generateFrameNumbers('hero-jump', { start: 0, end: 4 }),
            frameRate: 7,
            repeat: 0
        });

        this.anims.create({
            key: 'hero-run',
            frames: this.anims.generateFrameNumbers('hero-run', { start: 0, end: 11 }),
            frameRate: 12,
            repeat: Phaser.FOREVER
        });

        //this.scene.start(CST.SCENES.MENU)

        console.log("LOAD SCENE CREATE FUNCTION END ");
    }


}