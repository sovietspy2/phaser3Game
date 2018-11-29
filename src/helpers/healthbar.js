export default class HealthBar {

    constructor (scene, x, y)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.value = 100;
        this.p = 76 / 100;

        this.draw();

        scene.add.existing(this.bar);

        this.bar.scrollFactorX=false;
        this.bar.scrollFactorY=false;
    }

   
    draw ()
    {
        this.bar.clear();

        //  BG
        this.bar.fillStyle("black");
        this.bar.fillRect(this.x, this.y, 80, 16);

        //  Health

        this.bar.fillStyle(0xDAD3F2);
        this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);

        if (this.value < 30)
        {
            this.bar.fillStyle(0xff0000);
        }
        else
        {
            this.bar.fillStyle(0x00ff00);
        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    }
    update() {
        if (this.value>-10) {
            this.draw();
        }
    }

}