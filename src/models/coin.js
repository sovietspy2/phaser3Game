export default class Coin {
    constructor(scene, sprite) {
        this.scene = scene;
        this.sprite = sprite;

       // need an animation with the name 'coin'
       this.sprite.anims.play('spin');
       this.physics.add.existing(this.sprite);
       this.sprite.body.allowGravity = false;
    }
}