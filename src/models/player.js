import HealthBar from "../helpers/healthbar";

export default class Player {
    constructor(scene) {
        this.scene = scene;

        const spawnPoint = this.scene.map.findObject("Objects", obj => obj.name === "spawn");

        // anims
        const anims = scene.anims;

        // player creating
        this.score = 0;
        this.isAttacking = false;
        this.invincible = false;

        this.sword = scene.physics.add
        .sprite(spawnPoint.x, spawnPoint.y, "", 0)
        .setSize(60,70)
        .setVisible(false);
        this.sword.body.allowGravity=false;
        this.sword.body.checkCollision.none = true;


        this.sprite = scene.physics.add
            .sprite(spawnPoint.x,spawnPoint.y, "player", 0)
            .setDrag(1000,0)
            .setMaxVelocity(300,400)
            .setScale(0.5)
            .setSize(50,120) // hitbox size
            .setOffset(70, 20)
            .setCollideWorldBounds(true);

        const { LEFT, RIGHT, UP, W, A, D , SPACE, R} = Phaser.Input.Keyboard.KeyCodes;
        this.keys = scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            w: W,
            a: A,
            d: D,
            space: SPACE,
            r: R
        });

        this.healthBar = new HealthBar(scene, 20,20);
    }

    attack(sprite){
      this.isAttacking = true;
      //We use a boolean var to check if the player is currently attacking to prevent a new attack mid animation.

          //Play the "attack" animation
          sprite.anims.play('player-attack');

          //this.healthbar.value = this.healthbar.value -10;

          if (sprite.flipX) {
            this.sword.x = sprite.x-35;
            this.sword.y = sprite.y;
            this.setSwordActive();
          } else {
            this.sword.x = sprite.x+35;
            this.sword.y = sprite.y;
            this.setSwordActive();
          }

          this.scene.time.delayedCall(500, this.setSwordInactive, [], this);  // delay in

          sprite.once('animationcomplete', () => { //this is temporary chanegd for timer because it takes too much time
            sprite.anims.play('player-idle');
            //this.isAttacking = false;
            //console.log("PLAYER: attack anmation compelte READY to attack again")
        });

        this.scene.time.delayedCall(1200, ()=>{
          this.isAttacking = false;
        }, [], this);  // delay in
  }

  enemyCollider(group) {

    //this.scene.physics.add.collider(this.scene.player.sprite, group)
    this.scene.physics.add.overlap(this.scene.player.sprite, group, this.takeDamage, null,this)
  }

  takeDamage() {
    if (!this.invincible) {
      this.invincible = true;
      this.sprite.setTint(0xff0000);
      //console.log("ENEMY COLLIDE")
      this.healthBar.value -= 20;
      this.scene.time.delayedCall(300, () =>{
        this.invincible=false;
        this.sprite.clearTint();
      }  ,[], this);
      ///this.scene.time.delayedCall(150, this.test, ["test"], this); this is how args work
    }
  }

  setSwordActive() {
    console.log("SWORD BODY ACTIVE");
    this.sword.body.checkCollision.none = false;
  }

  setSwordInactive() {
    console.log("SWORD BODY INACTIVE");
    this.sword.body.checkCollision.none = true;
  }
    update() {

        this.healthBar.update();

        const keys = this.keys;
        const sprite = this.sprite;
        const onGround = sprite.body.blocked.down || sprite.body.touching.down;

        //console.log( sprite.body.checkCollision); // check if enabled

        const acceleration = onGround ? 600 : 200;

        if (keys.left.isDown || keys.a.isDown) {
          sprite.setAccelerationX(-acceleration);
          sprite.setFlipX(true);

        } else if (keys.right.isDown || keys.d.isDown) {
          sprite.setAccelerationX(acceleration);
          sprite.setFlipX(false); // RIGHT

        } else {
          sprite.setAccelerationX(0);
        }

        if (onGround) {
          if ((keys.up.isDown || keys.w.isDown)) {
            sprite.setVelocityY(-500);
            if (this.sprite.anims.getCurrentKey() != "player-attack") {
              sprite.anims.play("player-jump", true);
            }

          } else if (sprite.body.velocity.x !== 0) {
            if (this.sprite.anims.getCurrentKey() != "player-attack") {
              sprite.anims.play("player-run", true);
            }
          } else {
            if (this.sprite.anims.getCurrentKey() != "player-attack") {
              sprite.anims.play("player-idle", true);
            }
          }
        }

        if (keys.space.isDown) {
          if (!this.isAttacking) {
            this.attack(sprite);
            console.log("ATTACKING BECAUSE ISATTACKING IS FALSE");
            // Phaser.Math.Distance.Between() this is gonna calculate wheter it huts something or not
          }
        }

        if (keys.r.isDown) {
          this.scene.boxGroup.clear(true,true);
        }
      }

      destroy() {
        this.sprite.destroy();
      }
}
