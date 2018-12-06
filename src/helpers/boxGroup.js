export default class BoxGroup extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.scene.physics.world, config.scene);

        let scene = config.scene;
        scene.physics.add.collider(this, scene.groundLayer);
        scene.physics.add.collider(this, scene.player.sprite);
        scene.physics.add.collider(this, scene.slimes);
        scene.physics.add.collider(this, this);

    }

    addBox(x,y) {
        this.create(x,y,"tiles",220)
    }

}