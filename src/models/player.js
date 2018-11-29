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
        this.health = 100;

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

        const { LEFT, RIGHT, UP, W, A, D , SPACE} = Phaser.Input.Keyboard.KeyCodes;
        this.keys = scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            w: W,
            a: A,
            d: D,
            space: SPACE
        });

        this.healthbar = new HealthBar(scene, 20,20);
       
    }

    attack(sprite){
      //We use a boolean var to check if the player is currently attacking to prevent a new attack mid animation.
      if (!this.isAttacking){
  
          //Play the "attack" animation
          sprite.anims.play('player-attack');
          this.isAttacking = true;
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
         

          sprite.on('animationcomplete', () => {
            this.isAttacking = false;
            this.setSwordInactive();
        });

        
          
      }
  }

  setSwordActive() {
    this.sword.body.checkCollision.none = false;
  }

  setSwordInactive() {
    this.sword.body.checkCollision.none = true;
  }


    update() {

        this.healthbar.update();

        const keys = this.keys;
        const sprite = this.sprite;
        const onGround = sprite.body.blocked.down;
        const acceleration = onGround ? 600 : 200;

        
        


        if (this.isAttacking) {
          return;
        }

        if (keys.space.isDown) {
          this.attack(sprite);
          if (sprite.flipX) { // character facing left
          } else { // character facing right
          }
          console.log("attacking");
          // Phaser.Math.Distance.Between() this is gonna calculate wheter it huts something or not
          return;
        }

        // Apply horizontal acceleration when left/a or right/d are applied
        if (keys.left.isDown || keys.a.isDown) {
          sprite.setAccelerationX(-acceleration);
          // No need to have a separate set of graphics for running to the left & to the right. Instead
          // we can just mirror the sprite.
          sprite.setFlipX(true);
          
  
          
        } else if (keys.right.isDown || keys.d.isDown) {
          sprite.setAccelerationX(acceleration);
          sprite.setFlipX(false); // RIGHT
          
         
        } else {
          sprite.setAccelerationX(0);
           
        }
    
        // Only allow the player to jump if they are on the ground
    
        // Update the animation/texture based on the state of the player
        if (onGround) {
          if ((keys.up.isDown || keys.w.isDown)) {
            sprite.setVelocityY(-500);
            sprite.anims.play("player-jump", true);
          } else if (sprite.body.velocity.x !== 0) {
            sprite.anims.play("player-run", true);
          } else {
            sprite.anims.play("player-idle", true);
            //sprite.setOffset(10, 0);
          }
        }

        //this.scene.healthbar.value = this.health;

      }

      destroy() {
        this.sprite.destroy();
      }


}