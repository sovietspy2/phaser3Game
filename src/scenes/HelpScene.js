import {
    CST
} from "../CST";

export class HelpScene extends Phaser.Scene {

    constructor() {
        super({key: CST.SCENES.HELP});
    }

    init(data){
        this.nextMap = data.nextMap;
    }

    create() {
        this.add.image(400,300,"help").setDepth(0);
        let backButton = this.add.image(650, 450, "backButton").setDepth(1).setScale(0.3);
        backButton.setInteractive();

        backButton.on("pointerdown", ()=> {
            console.log("GOING TO GAME SCENE");
            this.scene.start(CST.SCENES.MENU, {nextMap: this.nextMap});
        });

    }
}