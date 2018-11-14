import { CST } from "../CST";

export class GameScene extends Phaser.Scene{
    constructor() {
        super({
            key: CST.SCENES.GAME
        });
    }

    create() {
        console.log("GAME SCENE CREATE START");
        this.add.text(400, 400, 'TEST', { fontSize: '32px', fill: 'white' });
    }
}