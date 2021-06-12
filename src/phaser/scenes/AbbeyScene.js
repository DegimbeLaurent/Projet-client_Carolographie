import {CST} from '/ph/CST.js';
import { BaseScene } from '../scenes/BaseScene.js';
export class AbbeyScene extends BaseScene {
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
        this.load.image('sprite', '/img/sprite.png');
        this.load.image("base_tiles", "/maps/tilesheet.png");
        this.load.tilemapTiledJSON("tilemap", "/maps/example_map2.json");
    }
    create(){
        this.scale.on('enterfullscreen', function () { });
        const map = this.make.tilemap({ key: "tilemap" });
        const tileset = map.addTilesetImage("tilesheet", "base_tiles");
        const belowLayer3 = map.createLayer("ground", tileset, 0, 0);
        const belowLayer2 = map.createLayer("grass", tileset, 0, 0);
        const belowLayer = map.createLayer("Houses", tileset, 0, 0);
        this.physics.add.sprite(500,500,"sprite");
        let test = this.randomInt(10,100);
        console.log(test);
    }
    update(){
        
    }
}