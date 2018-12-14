import { throws } from "assert";

export default class Slime extends Phaser.Physics.Arcade.Sprite{
    constructor(config) {

        super(config.scene, config.x, config.y, config.key,0);

        this.dead = false;
        //this.scene = config.scene;

        this.scene.sys.displayList.add(this);
        this.scene.sys.updateList.add(this);
        this.scene.sys.arcadePhysics.world.enableBody(this, 0);
        this.body.collideWorldBounds = true;

        this.health = 100;
        this.takesDamage = true;

        this.anims.play("slime");

        this.setCollideWorldBounds(true);

        this.scene.physics.add.overlap(this.scene.player.sword, this, this.takeDamage, null,this);

        this.scene.physics.add.overlap(this.scene.player.sprite, this, this.knockedBack, null,this); // Might not need this

    }

    takeDamage() {
        if (this.takesDamage) {
            this.scene.time.delayedCall(1000, this.setTakesDamageTrue, [], this);  // delay in
            this.takesDamage=false;
            this.setTint(0xff0000);
            console.log("ouch u hit me");
            this.health -= 50;
            this.knockedBack();
        }
    }

    setTakesDamageTrue() {
        console.log("ready to get hurt again :(");
        this.takesDamage = true;
        this.clearTint();
        this.setAccelerationX(0);
    }

    update(time,delta) {
        if (!this.dead) {
            const onGround = this.body.blocked.down;

            //this.scene.physics.moveTo(this.sprite,this.scene.player.sprite.x, this.sprite.y);
            const spriteX = this.x;
            const playerX = this.scene.player.sprite.x;

            const distance = Math.sqrt(Math.pow((Math.abs(spriteX - playerX)), 2));

            if (distance < 400 && this.takesDamage) {

                if (this.x > this.scene.player.sprite.x) {

                    if (onGround && distance < 300) {
                        this.setVelocityY(-500);
                    }
                    this.setAccelerationX(-30);
                } else {
                    if (onGround && distance < 300) {
                        this.setVelocityY(-500);

                    }
                    this.setAccelerationX(30);
                }

            } else if (this.takesDamage){
                this.setAccelerationX(0);
            }

            if (this.health<=0) {
                this.die();
            }
        }
    }

    die() {
        if (!this.dead) {
            this.dead = true;
            this.setOffset(10,15) // perfect
            //this.clearTint();
            console.log("Im slime and im dead :(")
            //this.setAccelerationX(0);
            //this.setVelocityY(0);
            this.anims.remove("slime");
            this.anims.play('slime-die');
            this.setMass(500);
            this.setBounce(0);
            this.on("animationcomplete", ()=> {
                this.destroy();
                this.visible=false;
                //this.setFrame(9);  
            });
        }
    }
    knockedBack() {
        let acc = this.scene.player.sprite.x < this.x ? 300 : -300;
        this.setVelocityY(-100);
        this.setAccelerationX(acc);
    }

}
