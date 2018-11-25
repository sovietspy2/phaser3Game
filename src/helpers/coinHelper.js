export function coinFactory(scene) {

        scene.coins = scene.map.createFromObjects('Objects', 226, { key: 'coin' });
        
        scene.coins.forEach(coin => {  
            coin.anims.play('spin');
            scene.physics.add.existing(coin); 
            coin.body.allowGravity = false;
        });

        scene.physics.add.collider(scene.groundLayer, scene.coins)
        scene.physics.add.overlap(scene.player.sprite, scene.coins, destroyCoin, null, scene.player)
    }
    
    function destroyCoin(player, coin) { // context = player obj
        this.score++;
        console.log(this.score);
        console.log("coin collected");
        coin.destroy();
    }
