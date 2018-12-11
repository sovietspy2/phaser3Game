import WeaponPlugin from 'phaser3-weapon-plugin';

export default class Wizard extends Phaser.Physics.Arcade.Sprite {

    constructor(config) {
        super(config.scene, config.x, config.y, config.key,0);

        this.scene.sys.displayList.add(this);
        this.scene.sys.updateList.add(this);
        this.scene.sys.arcadePhysics.world.enableBody(this, 0);
        this.body.collideWorldBounds = true;

        this.health = 100;

        this.createBullet();

        this.anims.play("wizard");

        this.on('animationcomplete', ()=>{
            this.scene.time.delayedCall(1000, ()=> {
                //this.weapon.fire();
                this.update();
                this.weapon.fireAtSprite(this.scene.player.sprite);
                this.anims.play("wizard");
                
            });
        });

        this.setScale(0.5);
        this.setSize(50,120);
        this.setOffset(66,60);


        this.scene.physics.add.collider(this, this.scene.groundLayer);
    }

    createBullet() {
        this.weapon = this.scene.weapons.add(2, 'skull');

        this.weapon.setBulletBodyOffset(70,70,0,30);

        //this.weapon.set

        //console.log(this.weapon.bullets);

        this.weapon.bullets.children.iterate(bullet => {
            bullet.setScale(0.5);
            //bullet.anims.play("skull-fly");
            bullet.body.allowGravity=false;
        });

        this.scene.physics.add.collider(this.weapon.bullets, this.scene.player.sprite, (bullet, player)=> bullet.kill(), null, this);

        this.weapon.fireAngle = 180;

        // Enable physics debugging for the bullets
        this.weapon.debugPhysics = true;

        //  The bullet will be automatically killed when it leaves the world bounds

        this.weapon.bulletKillType = WeaponPlugin.consts.KILL_DISTANCE;

        this.weapon.bulletKillDistance = 500;

        //  Because our bullet is drawn facing up, we need to offset its rotation:
        this.weapon.bulletAngleOffset = 200;

        //  The speed at which the bullet is fired
        this.weapon.bulletSpeed = 200;

        this.weapon.trackSprite(this);

        //this.weapon.bullets.children.iterate(bullet => {
       //     bullet.setScale(0.5);
       //     bullet.anims.play("skull-fly");
       //     bullet.body.allowGravity=false;
       // });
       this.weapon.bulletAnimation="skull-fly";
       //this.weapon.bulletGravity= new Phaser.Math.Vector2(0, 0);
    }

    changeFacing() {
        this.weapon.bulletAngleOffset = 200;
    }

    update() {
        if (this.scene.player.sprite.x > this.x) {
            this.weapon.fireAngle = 0;
            this.weapon.bulletAngleOffset=0;
            console.log("THIS") // RIGHT
           // this.weapon.bulletAngleOffset = 0;
            this.weapon.bullets.children.iterate( bullet=> {
                bullet.setFlipX(true);
            });
        } else {
            this.weapon.fireAngle = 180;
            this.weapon.bulletAngleOffset=200;
            console.log("that") // LEFT
            this.weapon.bullets.children.iterate( bullet=> {
               bullet.setFlipX(false);
            });
        }
    }

    



}