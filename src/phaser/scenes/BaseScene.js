//import Phaser from 'phaser';
export class BaseScene extends Phaser.Scene{
    constructor(key){
        super(key);
    }
    preload(){

    }
    create(){
        console.log("Ready!!!");
    }
    update(){

    }
    randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }
}