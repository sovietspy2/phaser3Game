import { CST } from "../CST";
export class MenuScene extends Phaser.Scene{
    constructor() {
        super({
            key: CST.SCENES.MENU
        });
    }

    init(data){
        console.log("menu here", data)
        this.nextMap = data.nextMap;
    }

    create() {
        console.log("yay menu");

        //logo
        //this.add.image(this.game.renderer.width/2, this.game.renderer.height*0.20, "logo").setDepth(1);

        //this.add.text(400, 300, 'GAME OVER', { fontSize: '32px', fill: 'white' });
        this.add.image(400,300,"title_bg").setDepth(0);
        //this.scene.start(CST.SCENES.MENU)

        let playButton = this.add.image(this.game.renderer.width/2, this.game.renderer.height*0.25, "playButton").setDepth(1);
        let helpButton = this.add.image(this.game.renderer.width/2, (this.game.renderer.height+500)*0.25, "helpButton").setDepth(1);
        helpButton.setScale(0.5);

        playButton.setInteractive();
        helpButton.setInteractive();


        playButton.on("pointerout", () => {
            console.log("hover");
        })

        playButton.on("pointerover", ()=> {
            console.log("real hover");
        });

        playButton.on("pointerdown", ()=> {
            console.log("GOING TO GAME SCENE");
            this.scene.start(CST.SCENES.GAME, {nextMap: this.nextMap});
        });

        helpButton.on("pointerdown", ()=> {
            console.log("GOING TO HELP");
            this.scene.start(CST.SCENES.HELP, {nextMap: this.nextMap});
        });

        playButton.on("pointerup", ()=> {
            console.log("down and up");
        });

    }


}