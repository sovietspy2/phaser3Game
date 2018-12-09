export default class BoxGroup extends Phaser.Physics.Arcade.Group {
    constructor(config) {

        super(config.scene.physics.world, config.scene);
        this.MAX_BOXES = 2;

        let scene = config.scene;
        scene.physics.add.collider(this, scene.groundLayer);
        scene.physics.add.collider(this, scene.player.sprite);
        scene.physics.add.collider(this, scene.slimes);
        scene.physics.add.collider(this, this);

        this.runChildUpdate=true;

        this.wurking = false;
        this.scene.time.delayedCall(3000, this.activateAddBox, [], this); // its important because it adds one up on start
    }

    addBox(x, y) {

        if (this.wurking) {
            this.create(x, y, "tiles", 220);
            this.wurking = false;
            this.scene.time.delayedCall(3000, this.activateAddBox, [], this); // delay in
            if (this.getLength() > this.MAX_BOXES) {
                let box = this.getFirst(true);
                this.remove(box);
            }
        }

    }

    update(time,delta) {
        this.children.iterate( (child)=> {
            if (child.y>this.scene.map.heightInPixels-50) {
                this.remove(child);
            }
        });
    }


    activateAddBox() {
        this.wurking = true;
    }

}