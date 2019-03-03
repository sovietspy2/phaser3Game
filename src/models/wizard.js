import WeaponPlugin from '@sovietspy2/phaser3-weapon-plugin';
import BoxGroup from './../helpers/boxGroup';

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
                this.weaponUpdate();
                this.weapon.fireAtSprite(this.scene.player.sprite);
                this.anims.play("wizard");
                
            });
        });

        this.setScale(0.5);
        this.setSize(50,120);
        this.setOffset(66,60);

        this.dead = false;
    }

    takeDamage() {
            this.scene.time.delayedCall(1000, ()=>this.clearTint(), [], this);  // delay in
            this.setTint(0xff0000);
            console.log("WIZARD: OUTCH");
            this.health -= 50;
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

        this.scene.physics.add.collider(this.weapon.bullets, this.scene.boxGroup, (bullet,other) => {
            bullet.kill();
            console.log("THE BOX SAVED U");
        },null,this);

        this.scene.physics.add.collider(this.weapon.bullets, this.scene.player.sprite, (bullet, player)=> {
            bullet.kill();
            this.scene.player.takeDamage();
        }, null, this);

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

       this.weapon.bulletAnimation="skull-fly";
    }

    /**
     * this method handles the facing of the wizard. eg turns the bullets left or right
     */
    weaponUpdate() {
       if (!this.dead) {
        if (this.scene.player.sprite.x > this.x) {
            this.weapon.fireAngle = 0;
            this.weapon.bulletAngleOffset=0;
            console.log("THIS"); // RIGHT
           // this.weapon.bulletAngleOffset = 0;
            this.weapon.bullets.children.iterate( bullet=> {
                bullet.setFlipX(true);
            });
        } else {
            this.weapon.fireAngle = 180;
            this.weapon.bulletAngleOffset=200;
            console.log("that"); // LEFT
            this.weapon.bullets.children.iterate( bullet=> {
               bullet.setFlipX(false);
            });
        }
       }        
    }

    die() {
        let particles = this.scene.add.particles('skull');
        let whiteSmoke = particles.createEmitter({
            x: this.x,
            y: this.y,
            speed: { min: 10, max: 80 },
            angle: { min: 0, max: 360},
            scale: { start: 1, end: 0},
            alpha: { start: 0, end: 0.5},
            lifespan: 500,
            //active: false
        });
        whiteSmoke.explode(25);

      
        this.scene.time.delayedCall(1000, ()=> {
            particles.destroy();
        }, {}, this);
    }

    update() {
        if (this.health < 0 && !this.dead) {
            this.dead = true;
            //this.weapon.destroy();
        }
    }

    



}