export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;

        // anims
        const anims = scene.anims;

        anims.remove("player-idle");
        anims.remove("player-run");
        anims.create({
          key: "player-idle",
          frames: anims.generateFrameNumbers("player", { start: 0, end: 3 }),
          frameRate: 3,
          repeat: Phaser.FOREVER
        });
        anims.create({
          key: "player-run",
          frames: anims.generateFrameNumbers("player", { start: 8, end: 15 }),
          frameRate: 12,
          repeat: Phaser.FOREVER
        });

        // player creating

        this.sprite = scene.physics.add
            .sprite(x,y, "player", 0)
            .setDrag(1000,0)
            .setMaxVelocity(300,400)
            .setSize(20,20) // hitbox size
            .setCollideWorldBounds(true);

        const { LEFT, RIGHT, UP, W, A, D } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            w: W,
            a: A,
            d: D
        });


    }

    update() {
        const keys = this.keys;
        const sprite = this.sprite;
        const onGround = sprite.body.blocked.down;
        const acceleration = onGround ? 600 : 200;
    
        // Apply horizontal acceleration when left/a or right/d are applied
        if (keys.left.isDown || keys.a.isDown) {
          sprite.setAccelerationX(-acceleration);
          // No need to have a separate set of graphics for running to the left & to the right. Instead
          // we can just mirror the sprite.
          sprite.setFlipX(true);
        } else if (keys.right.isDown || keys.d.isDown) {
          sprite.setAccelerationX(acceleration);
          sprite.setFlipX(false);
        } else {
          sprite.setAccelerationX(0);
        }
    
        // Only allow the player to jump if they are on the ground
        if (onGround && (keys.up.isDown || keys.w.isDown)) {
          sprite.setVelocityY(-500);
        }
    
        // Update the animation/texture based on the state of the player
        if (onGround) {
          if (sprite.body.velocity.x !== 0) sprite.anims.play("player-run", true);
          else sprite.anims.play("player-idle", true);
        } else {
          sprite.anims.stop();
          sprite.setTexture("player", 10);
        }
      }
    
      destroy() {
        this.sprite.destroy();
      }


}