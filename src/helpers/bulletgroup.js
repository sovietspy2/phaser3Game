export default class BulletGroup extends Phaser.Physics.Arcade.Group {
    constructor(config){
        super(config.scene.physics.world, config.scene);
        this.scene.physics.add.collider(this, scene.player.sprite, this.collisonWithPlayer, null, this);
    }

    collisonWithPlayer(player, bullet) {
        debugger;
        bullet.destory();
    }

}