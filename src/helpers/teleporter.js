import {CST} from "../CST";

export function teleporter(scene) {

    const start = scene.map.findObject("Objects", obj => obj.name === "doorin");
    scene.nextMap = start.properties.find(x=> x.name === "nextMap").value;
    const doorOut = scene.map.findObject("Objects", obj => obj.name === "doorout");

    let doorIn = scene.physics.add.sprite(start.x, start.y, ""); // it doesnt need an image because it will never render
    doorIn.body.allowGravity = false; 
    doorIn.visible = false;

    if (doorOut) {
        scene.doorOut = {x: doorOut.x, y: doorOut.y }
    }
    
    
    scene.physics.add.overlap(scene.player.sprite, doorIn, teleport, null, scene);

}

function teleport() {
    console.log("map changing . . . ");
    //this.player.sprite.x = this.doorOut.x;
    //this.player.sprite.y = this.doorOut.y;
    console.log(this.nextMap);
    
    this.scene.restart({nextMap: this.nextMap});


}