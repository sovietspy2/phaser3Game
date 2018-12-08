import { CST } from "../CST";

export class MapLoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOADMAP
        });
    }
    init(mapData) {
        this.mapData = mapData;
    }

    preload() {
        console.log("MAP LOADING STARTED");
        debugger;
        if (!this.mapData.nextMap) {
            this.load.tilemapTiledJSON('map', 'assets/castle.json');
            this.scene.start(CST.SCENES.MENU);
        } else {
            this.load.tilemapTiledJSON('map', 'assets/'+this.nextMap);
            this.scene.restart(CST.SCENES.GAME);
        }
        



        
        console.log("MAP LOAD FINISHED");
    }

}
