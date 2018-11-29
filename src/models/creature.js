export default class Creature {
    constructor(scene, spriteName, spriteStartFrame, animName, x, y) {
        this.scene = scene;
        this.isAttacking = false;
        this.health = 100;
        this.takesDamage = true;
        

        this.sprite = scene.physics.add
            .sprite(x, y, spriteName, spriteStartFrame)
            .setDrag(1000,0)
            .setMaxVelocity(300,400)
            //.setScale(0.5)
            .setScale(2)
            .setSize(13,13) // hitbox size
            .setOffset(10, 20)
            .setCollideWorldBounds(true);

        this.sprite.anims.play("slime-die");

        scene.physics.add.overlap(this.scene.player.sword, this.sprite, this.takeDamage, null,this)


    }

    takeDamage() {
        if (this.takesDamage) {
            this.scene.time.delayedCall(1000, this.setTakesDamageTrue, [], this);  // delay in
            this.takesDamage=false;
            this.sprite.setTint(0xff0000);
            console.log("ouch u hit me");
            this.scene.player.sword.body.active = false;
            this.health -= 50;
        }
    }

    setTakesDamageTrue() {
        console.log("ready to get hurt again :(");
        this.takesDamage = true;
        this.sprite.clearTint();
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


        if (this.health<=0) {
            this.die();
        }

    }

    die() {
        console.log("Im slime and im dead :(")
        this.sprite.setAccelerationX(0);
        this.sprite.setVelocityY(0);
        debugger;
        this.sprite.anims.play('slime-die');
        this.sprite.on("animationcomplete", ()=> {
            this.destroy();
            this.sprite.setFrame(50);
            debugger;
            this.sprite;
        })
    }

    destroy() {
        //this.sprite.destroy();
    }
}