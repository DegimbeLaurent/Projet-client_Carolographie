import {CST} from '/ph/CST.js';
export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        });
    }
    init(){

    }
    preload(){

    }
    create(){
        this.scene.start(CST.SCENES.ABBEY, "Hello from LoadScene!");
        this.scene.launch();
    }
}