export default class CoinFactory {
    constructor(scene) {
        this.scene = scene;

        this.scene.coins = this.scene.map.createFromObjects('Objects', 226, { key: 'coin' });

        this.scene.coins.forEach(coin => {
            coin.anims.play('spin');
            this.scene.physics.add.existing(coin);
            coin.body.allowGravity = false;
        });

        this.scene.physics.add.collider(this.scene.groundLayer, this.scene.coins)
        this.scene.physics.add.overlap(this.scene.player.sprite, this.scene.coins, this.destroyCoin, null, this)
    }
    destroyCoin(player, coin) {
        console.log("destroeyed coin");
        coin.destroy();
    }
}
