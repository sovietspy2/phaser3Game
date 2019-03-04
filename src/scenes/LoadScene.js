import { CST } from "../CST";
//import WeaponPlugin from 'phaser3-weapon-plugin';
export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        });
        
    }

    preload() {
        
        console.log("PRELOAD FUNCTION START");

       //let test = this.load.scenePlugin('WeaponPlugin', WeaponPlugin, 'weapons', CST.SCENES.GAME);
      // this.load.scenePlugin('WeaponPlugin', WeaponPlugin, "weapons", CST.SCENES.GAME);
        this.load.audio("sound","assets/audio/theme.mp3");
        this.load.audio("sword","assets/audio/sword.mp3");
        this.load.audio("spawn_box","assets/audio/spawn_box.mp3");
        //console.log(test);
        this.load.image("title_bg", "./assets/image/title_bg.jpg")
        //....
        this.load.image("potion","./assets/potion.png");
        this.load.image('playButton', 'assets/image/play_button.png');
        this.load.image('helpButton', 'assets/helpButton.png');
        this.load.image('backButton', 'assets/back.png');
        this.load.image('help', 'assets/helpImg.png');
        
        // this.load.image('sky', 'assets/sky.png');
        // this.load.image('ground', 'assets/platform.png');
        // this.load.image('star', 'assets/star.png');
        // this.load.image('bomb', 'assets/bomb.png');
        // this.load.spritesheet('dude',
        //     'assets/dude.png',
        //     {
        //         frameWidth: 32, frameHeight: 48
        //     });
        // this.load.spritesheet('dragon', 'assets/demon-idle.png',
        //     {
        //         frameWidth: 160, frameHeight: 144
        //     });
        //
        // this.load.spritesheet('dragon-attack', 'assets/demon-attack.png',
        //     {
        //         frameWidth: 240, frameHeight: 192
        //     });

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        });

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
        });

        this.load.once("complete", () => {
            this.scene.start(CST.SCENES.MENU, {nextMap: "castle.json"});
        });

        this.load.spritesheet('coin', 'assets/stolencoin.png', { frameWidth: 32, frameHeight: 32 });

        
        // tiles in spritesheet
        this.load.spritesheet('tiles', 'assets/tile_castle.png', { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet('skull', 'assets/fire-skull.png', { frameWidth: 96, frameHeight: 112 });

        // this.load.spritesheet('hero-idle', 'assets/hero-idle.png', { frameWidth: 37, frameHeight: 48 });
        // this.load.spritesheet('hero-jump', 'assets/hero-jump.png', { frameWidth: 60, frameHeight: 77 });
        // this.load.spritesheet('hero-attack', 'assets/hero-attack.png', { frameWidth: 100, frameHeight: 48 });
        // this.load.spritesheet('hero-run', 'assets/hero-run.png', { frameWidth: 65, frameHeight: 48 });
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 192, frameHeight: 192 });

        this.load.spritesheet('wizard', 'assets/wizard.png', { frameWidth: 200, frameHeight: 200 });


        this.load.spritesheet('slime', 'assets/slime.png', { frameWidth: 32, frameHeight: 33 });
        // simple coin image
        //this.load.image('coin', 'assets/coinGold.png');
        // player animations
        //this.load.atlas('player', 'assets/player.png', 'assets/player.json');

        this.load.tilemapTiledJSON('castle.json', 'assets/castle.json');


        //this.load.plugin('WeaponPlugin', WeaponPlugin, null, 'weapons');
        console.log("PRELOAD FUNCTION END");


       
    }
    create() {
        console.log("LOAD SCENE CREATE FUNCTION START ");

        if (!this.nextMap) {
        this.anims.create({
            key: 'slime',
            frames: this.anims.generateFrameNumbers('slime', { start: 0 , end: 20}),
            frameRate: 10,
            repeat: Phaser.FOREVER,
        });

        this.anims.create({
            key: 'wizard',
            frames: this.anims.generateFrameNumbers('wizard', { start: 0 , end: 6}),
            frameRate: 10,
            repeat: 0,
        });

        this.anims.create({
            key: 'skull-fly',
            frames: this.anims.generateFrameNumbers('skull', {start: 0, end: 7}),
            frameRate: 10,
            repeat: Phaser.FOREVER
        });

        this.anims.create({
            key: 'slime-die',
            frames: this.anims.generateFrameNumbers('slime', { start: 41 , end: 49}),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'player-attack',
            frames: this.anims.generateFrameNumbers('player', { start: 15 , end: 19}),
            frameRate: 8,
            repeat: 0,
        });

        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: Phaser.FOREVER
        });

        this.anims.create({
            key: 'player-idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: Phaser.FOREVER
        });

        this.anims.create({
            key: 'player-jump',
            frames: this.anims.generateFrameNumbers('player', { start: 20, end: 26 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'player-run',
            frames: this.anims.generateFrameNumbers('player', { start: 7, end: 14 }),
            frameRate: 12,
            repeat: Phaser.FOREVER
        });
    }

        //this.scene.start(CST.SCENES.MENU)
        console.log("LOAD SCENE CREATE FUNCTION END ");
    }


}
