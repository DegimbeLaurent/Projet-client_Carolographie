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
    backgroundColor: '#6E5940',
    parent: 'visite',
    key: 'LoadScene',
    scene: [ LoadScene, DnRoom, DcRoom, DeRoom ]
};
//====================================================
var game = new Phaser.Game(config);
var playerMap;
var player;
var minimap;
var portailN;
var portailC;
var portailO;
var portailE;
var portailS;
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