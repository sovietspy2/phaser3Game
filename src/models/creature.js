export default class Creature {
    constructor(scene, spriteName, spriteStartFrame, animName, x, y) {
        this.scene = scene;
        this.isAttacking = false;
        this.health = 100;

        this.sprite = scene.physics.add
            .sprite(x, y, spriteName, spriteStartFrame)
            //.setDrag(1000,0)
            //.setMaxVelocity(300,400)
            //.setScale(0.5)
            //.setSize(100,100) // hitbox size
            //.setOffset(70, 20)
            .setCollideWorldBounds(true);

        this.sprite.anims.play(animName)
    }

    attack() { }

    idle() { }

    update() {

        const onGround = this.sprite.body.blocked.down;

        //this.scene.physics.moveTo(this.sprite,this.scene.player.sprite.x, this.sprite.y);

        const spriteX = this.sprite.x;
        const playerX = this.scene.player.sprite.x;

        const distance = Math.sqrt(Math.pow((Math.abs(spriteX - playerX)), 2));

        if (distance < 400) {

            if (this.sprite.x > this.scene.player.sprite.x) {

                if (onGround && distance < 300) {
                    this.sprite.setVelocityY(-500);

                }
                this.sprite.setAccelerationX(-30);
            } else {
                if (onGround && distance < 300) {
                    this.sprite.setVelocityY(-500);

                }
                this.sprite.setAccelerationX(30);
            }

        } else {
            this.sprite.setAccelerationX(0);
        }
    }

    destroy() {
        this.sprite.destroy();
    }
}