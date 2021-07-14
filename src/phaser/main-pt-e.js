//====================================================
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
    key: 'DeRoom',
    scene: [ DeRoom, LoadScene]
};
//====================================================
var game = new Phaser.Game(config);
var playerMap;
var player;
var minimap;
var camSubject;
game.speed = 300;
game.players = [];
game.playersBU = [];
var Client = {};
Client.socket = io.connect();