import Slime from "../models/slime";

export default class SlimeGroup extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.scene.physics.world, config.scene,{collideWorldBounds: true});

        let scene = config.scene;
        scene.physics.add.collider(this, scene.groundLayer);
        scene.physics.add.collider(this, this);

        let locations = scene.map.filterObjects("Objects", (obj) => obj.name == "slime", this);

        scene.slimes = scene.physics.add.group(); // IT SHOULD BE REFACTORD TO LOOK LIKE POTIONFACTORY
        locations.forEach((location) => {
            let slime = new Slime({
                scene: scene,
                x: location.x,
                y: location.y
            });
            //slime = this.physics.add.existing(slime);

            slime.setCollideWorldBounds(true);

            slime.setDrag(1000, 0)
                .setMaxVelocity(300, 400)
                .setScale(0.5)
                .setScale(2)
                .setSize(13, 13) // hitbox size
                .setOffset(10, 20)
            //this.weapon.trackSprite(slime);
            this.add(slime);
        });

        this.children.iterate(function (slime) {
            //slime.setCollideWorldBounds(true);
        });



    }
    update(time,delta) {
        this.children.iterate(function (slime) {
            // if (slime.health>0) {
            slime.update(time, delta);
            //}
        });
    }
}
