//====================================================
//import { config } from './config.js';
// import {LoadScene} from "./scenes/LoadScene.js";
// import {AbbeyScene} from "./scenes/AbbeyScene.js";
const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth);
const DEFAULT_HEIGHT = window.innerHeight-20;
const DEFAULT_WIDTH = window.innerWidth-20;
var config = {
    type: Phaser.AUTO,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    pixelArt: true,
    backgroundColor: '#000000',
    parent: 'visite',
    scene: [ LoadScene, BaseScene, DcRoom, DcPicture1, DcPicture2, DcPicture3, DcPicture4, DeRoom, DePicture1, DePicture2, DePicture3, DePicture4 ]
};
//====================================================
var game = new Phaser.Game(config);
var playerMap;
var player;
var minimap;
game.speed = 300;
game.players = [];
game.playersBU = [];
        var Client = {};
        Client.socket = io.connect();
// console.table(config);
// console.table(game);
// console.log("test gameSpeed = "+ game.speed);
// console.log("test config_width = "+ config.width);
// export {game};