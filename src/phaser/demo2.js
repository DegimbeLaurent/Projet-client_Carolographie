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
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    backgroundColor: '#7fffd4',
    parent: 'visite'
};
//====================================================
var game = new Phaser.Game(config);
game.speed = 300;
game.players = [];
//====================================================
function preload(){
    //============================================
    //  PROGRESS BAR
    //============================================
    //progressBar(this);
    // this.load.image('logo', '/img/sprite.png');
    // for (var i = 0; i < 250; i++) {
    //     this.load.image('logo'+i, '/img/sprite.png');
    // }
    //============================================
    //  PRELOAD IMAGES
    //============================================
    this.load.image('sprite', '/img/sprite.png');
    this.load.image("base_tiles", "/maps/tilesheet.png");
    this.load.tilemapTiledJSON("tilemap", "/maps/example_map2.json");
    this.load.image('passage_door', '/img/passage_door.png');
}
function create(){
    playerMap = [];
    game.players = [];
    game.playersBU = [];
    passages = [];
    game.scale.on('enterfullscreen', function () { });
    const map = this.make.tilemap({ key: "tilemap" });
    const tileset = map.addTilesetImage("tilesheet", "base_tiles");
    const belowLayer3 = map.createLayer("ground", tileset, 0, 0);
    const belowLayer2 = map.createLayer("grass", tileset, 0, 0);
    const belowLayer = map.createLayer("Houses", tileset, 0, 0);

    passages["passageNord"] = this.physics.add.sprite(225,250,'passage_door');
    passages["passageNord"].body.immovable = true;

    this.physics.add.collider(passages["passageNord"],playerMap,hitPassage,null,"demo.html");

    console.table(game.players);
    let personalData = getPersonalData();
    console.table(personalData);
    //addNewPlayer(this, personalData);
    // let id = parseInt(personalData.id);
    // let x = parseInt(personalData.x);
    // let y = parseInt(personalData.y);
    // Client.sendClick(id, x, y);
    let players = localStorage.getItem("Players");
    console.table(players);
}
function update(){
    var mousePointer = this.input.activePointer;
    removeDisconnectedPlayers(this, game.players);
    updateConnectedPlayers(this, game.players, game.playersBU);
    movePlayers(this, game.players);
    stopPlayers(this, game.players);
}