export default function potionFactory(scene) {
    let potions = scene.map.filterObjects("Objects", (obj)=> obj.name == "potion", this );
    console.log(potions);

    
    this.slimes = this.physics.add.group();
   

    slime = this.physics.add.existing(slime);

}