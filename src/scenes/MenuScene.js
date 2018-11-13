import { CST } from "../CST";
export class MenuScene extends Phaser.Scene{
    constructor() {
        super({
            key: CST.SCENES.MENU
        });
    }

    init(data){
        console.log("menu here")
    }

    create() {
        console.log("yay menu");

        //logo
        //this.add.image(this.game.renderer.width/2, this.game.renderer.height*0.20, "logo").setDepth(1);

        //this.add.text(400, 300, 'GAME OVER', { fontSize: '32px', fill: 'white' });
        this.add.image(400,300,"title_bg").setDepth(0);
        //this.scene.start(CST.SCENES.MENU)

        let playButton = this.add.image(this.game.renderer.width/2, this.game.renderer.height*0.25, "playButton").setDepth(1);

        playButton.setInteractive();

        playButton.on("pointerout", () => {
            console.log("hover");
        })

        playButton.on("pointerover", ()=> {
            console.log("real hover");
        });

        playButton.on("pointerdown", ()=> {
            console.log("down");
        });

        playButton.on("pointerup", ()=> {
            console.log("down and up");
        });

    }


}