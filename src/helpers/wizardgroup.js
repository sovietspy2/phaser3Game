import Wizard from "../models/wizard";

export default class WizardGroup extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.scene.physics.world, config.scene);

        this.scene.physics.add.collider(this, this.scene.groundLayer);

        //let wizardLocations = this.scene.map.filterObjects("Objects", (obj)=> obj.name == "wizard", this);
        let wizardLocations = [{x:200,y:700}]


        wizardLocations.forEach( (location)=> {
            let wizard = new Wizard({scene: this.scene, x:location.x, y:location.y, key:"wizard"});
            this.add(wizard, this.scene);//.setSize(70,70).setScale(0.16);//.setOffset(60,70);
        });

        this.scene.physics.add.collider(this, this.scene.groundLayer);
        this.scene.physics.add.collider(this, this.scene.player.sword, (sword, wizard) => {
            wizard.takeDamage();
            if (wizard.dead === true) {
                wizard.die();
                this.remove(wizard,true,true);
            }
        }, null, this);
    }

    update() {
        this.children.iterate( (child)=> {
            child.update();
        });
    }

}