export function teleporter(scene) {

    const start = scene.map.findObject("Objects", obj => obj.name === "doorin");
    const doorOut = scene.map.findObject("Objects", obj => obj.name === "doorout");

    let doorIn = scene.physics.add.sprite(start.x, start.y, ""); // it doesnt need an image because it will never render
    doorIn.body.allowGravity = false; 
    doorIn.visible = false;

    scene.doorOut = {x: doorOut.x, y: doorOut.y }
    
    scene.physics.add.overlap(scene.player.sprite, doorIn, teleport, null, scene);

}

function teleport() {
    console.log("teleporting . . . ")
    this.player.sprite.x = this.doorOut.x;
    this.player.sprite.y = this.doorOut.y;
}