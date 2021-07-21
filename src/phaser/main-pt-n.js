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
            debug: true
        }
    },
    pixelArt: true,
    backgroundColor: '#000000',
    parent: 'visite',
    key: 'DnRoom',
    scene: [ DnRoom, LoadScene]
};
//====================================================
var game = new Phaser.Game(config);
var playerMap;
var player;
var minimap;
var camSubject;
var resetPlayer;
var centerPlayer;
var lecture;
var posSortie;
var crate;
var mgraphic;
var bloc1;
var map;
var layer160;
var bruit_course;
var bruit_ambiance;
var bruit_feu;
var bruit_portail;
var stopCourse;
game.speed = 300;
game.players = [];
game.playersBU = [];
var Client = {};
Client.socket = io.connect();