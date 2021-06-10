import {CST} from '/ph/CST.js';
export class AbbeyScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.ABBEY
        });
    }
    init(data){
        console.log(data);
        console.log("I GOT IT!");
    }
    preload(){

    }
    create(){
        
    }
}