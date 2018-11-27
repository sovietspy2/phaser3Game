export function teleporter(scene) {

    //const start = scene.map.findObject("Objects", obj => obj.name === "doorin");

    let doorIn = scene.map.createFromObjects("Objects", 168, {key: "doorin"});
    doorIn=doorIn[0];
    const doorOut = scene.map.findObject("Objects", obj => obj.name === "doorout");

    doorIn = scene.physics.add.existing(doorIn); 
    doorIn.body.allowGravity = false;

    scene.doorOut = {x: doorOut.x, y: doorOut.y }
    
    scene.physics.add.overlap(scene.player.sprite, doorIn, teleport, null, scene)

    //Phaser.Math.Distance.Between(doorIn.x, doorIn.y, player.sprite.x, player.sprite.y)
    debugger;
   // const secret = scene.map.findObject("Secret", obj => obj.name === "secret");
    //const tile = scene.map.getTileAtWorldXY(secret.x, secret.y);
    //scene.map.setCollision( [tile.x, tile.y] , )

}

function teleport() {
    console.log("teleporting . . . ")
    this.player.sprite.x = this.doorOut.x;
    this.player.sprite.y = this.doorOut.y;
}