import { CST } from "../CST";
export class LoadScene extends Phaser.Scene{
    constructor() {
        super({
            key: CST.SCENES.LOAD
        });
    }
    init(){

    }

    preload() {
        console.log("PRELOAD FUNCTION START");
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
                    loadingBar.fillRect(0,this.game.renderer.height/2, this.game.renderer.width*percent, 50)
                });

                this.load.on("complete", () => {
                    this.scene.start(CST.SCENES.MENU);
                });


        console.log("PRELOAD FUNCTION END");
    }
    create() {
        console.log("LOAD SCENE CREATE FUNCTION START ");

        
             
        //this.scene.start(CST.SCENES.MENU)

        console.log("LOAD SCENE CREATE FUNCTION END ");
    }

    
}