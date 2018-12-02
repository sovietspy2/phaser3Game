export default function potionFactory(scene) {
    let potionLocations = scene.map.filterObjects("Objects", (obj)=> obj.name == "potion", this );
    
    
    
    scene.potions = scene.physics.add.group();

    potionLocations.forEach( (location)=> {
        scene.potions.create(location.x, location.y, "potion").setSize(70,70).setScale(0.16);//.setOffset(60,70);
    });
   

    scene.physics.add.collider(scene.potions, scene.groundLayer);
    scene.physics.add.overlap(scene.player.sprite, scene.potions, healPlayer, null, scene.player);

}

function healPlayer(player, potion) {
    if (this.healthBar.value<80) {
        this.healthBar.value+=20;
    } else {
        this.healthBar.value = 100;
    }
    console.log(this.healthBar.value);
    potion.destroy();
}