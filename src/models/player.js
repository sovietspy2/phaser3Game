export default class Player {
    constructor(scene) {
        this.scene = scene;

        const spawnPoint = this.scene.map.findObject("Objects", obj => obj.name === "spawn");

        // anims
        const anims = scene.anims;

        // player creating
        this.score = 0;

        // jumping state
        this.jumping = false;

        this.sprite = scene.physics.add
            .sprite(spawnPoint.x,spawnPoint.y, "hero-idle", 0)
            .setDrag(1000,0)
            .setMaxVelocity(300,400)
            .setSize(20,50) // hitbox size
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

        this.isAttacking = false;
    }

    attack(sprite){
      //We use a boolean var to check if the player is currently attacking to prevent a new attack mid animation.
      if (!this.isAttacking){
  
          //Play the "attack" animation
          sprite.anims.play('hero-attack');
          this.isAttacking = true;

          sprite.on('animationcomplete', () => {
            this.isAttacking = false;
        });
          
      }
  }

    update() {

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
            //sprite.setOffset(50, 0);
          } else { // character facing right
            //sprite.setOffset(30, 0);
          }
          console.log("attacking");
          // Phaser.Math.Distance.Between() this is gonna calculate wheter it huts something or not
          return;
        }

        //debugger;
        // Apply horizontal acceleration when left/a or right/d are applied
        if (keys.left.isDown || keys.a.isDown) {
          sprite.setAccelerationX(-acceleration);
          // No need to have a separate set of graphics for running to the left & to the right. Instead
          // we can just mirror the sprite.
          sprite.setFlipX(true);
          
          if (onGround) {
            //this.sprite.setOffset(20, 0);
          }
          
        } else if (keys.right.isDown || keys.d.isDown) {
          sprite.setAccelerationX(acceleration);
          sprite.setFlipX(false); // RIGHT
          if (onGround) {
            //sprite.setOffset(25, 0);
          }
         
        } else {
          sprite.setAccelerationX(0);
          if (sprite.flipX) {
            //left
            //sprite.setOffset(70, 0);  
          } else {
            // right
            //sprite.setOffset(30, 0);  
          }
           
        }
    
        // Only allow the player to jump if they are on the ground
      
    
        // Update the animation/texture based on the state of the player
        if (onGround) {
          if ((keys.up.isDown || keys.w.isDown)) {
            sprite.setVelocityY(-500);
            if (sprite.flipX) { // RIGHT
              //sprite.setOffset(10, 10);
            } else { // LEFT
              //sprite.setOffset(30, 10);
            }
            sprite.anims.play("hero-jump", true);
          } else if (sprite.body.velocity.x !== 0) {
            sprite.anims.play("hero-run", true);
          } else {
            sprite.anims.play("hero-idle", true);
            //sprite.setOffset(10, 0);
          }
        }
      }

      setPlayerOffset(running , facing, jumping, attacking) {
               if (running && facing == "right" && jumping && attacking) {

        } else if (running && facing == "right" && jumping && !attacking) {

        } else if (running && facing == "right" && !jumping && attacking) {

        } else if (running && facing == "right" && !jumping && !attacking) {

        } else if (running && facing == "left" && jumping && attacking) {

        } else if (running && facing == "left" && jumping && !attacking) {

          } else if (running && facing == "left" && !jumping && attacking) {
  
          } else if (running && facing == "left" && !jumping && !attacking) {

          } else if (!running && facing == "left" && jumping && attacking) {

          } else if (!running && facing == "left" && jumping && !attacking) {
  
            } else if (!running && facing == "left" && !jumping && attacking) {
    
            } else if (!running && facing == "left" && !jumping && !attacking) {
  
          } else if (!running && facing == "right" && jumping && attacking) {

          } else if (!running && facing == "right" && jumping && !attacking) {
  
            } else if (!running && facing == "right" && !jumping && attacking) {
    
            } else if (!running && facing == "right" && !jumping && !attacking) {


      }
    }

      setJumpingFalse() {
        this.jumping = false;
      }
    
      destroy() {
        this.sprite.destroy();
      }


}