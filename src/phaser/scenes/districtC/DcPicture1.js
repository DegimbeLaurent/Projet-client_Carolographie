var DcPicture1 = new Phaser.Class({
    Extends: PicturesTemplate,
    initialize: function(config){
        Phaser.Scene.call(this, {"key":"DcPicture1"});
    },
    init: function(){
        playerMap = [];
    },
    preload: function(){
        // this.load.image("xxx_set", "/maps/tilesets/xxx.png");
        // this.load.tilemapTiledJSON("map_room", "/maps/map_room.json");
        this.load.image('sprite', '/img/sprite.png');
    },
    create: function(config){
        game.backgroundColor='#000000';
        //==========================================
        //  GESTION CLIENT - SERVER
        //==========================================
        //var Client = this.clientFunctions();
        this.input.mouse.disableContextMenu();
        game.selfConnected = false;
        //==========================================
        //  CREATION DE LA MAP
        //==========================================
        // this.cameras.main.setBounds(-8000, -200, 12600 , 6500);
        // this.physics.world.setBounds(-8000,-200, 12600, 6500);
        // var map = this.add.tilemap('map_room');
        // var tileset10 = map.addTilesetImage('xxx_set', 'xxx_set');
        // var layer10 = map.createLayer('ground', [tileset10]).setDepth(10);      
        //==========================================
        //  AJOUT DES TEXTES & IMAGES
        //==========================================
        this.add.text(400, 200, "DISTRICT CENTRE - PICTURE 1", {fontFamily: "Arial Black",fontSize: 36});
        this.add.text(400, 250, "La Chaîne des Terrils à Dampremy", {fontFamily: "Arial Black",fontSize: 36});
        //==========================================
        //  AJOUT DU BOUTON RETOUR
        //==========================================
        // chevaletPict1.setInteractive();
        // chevaletPict1.on("pointerup", function(){
        //     this.changeScene("DcPicture1");
        // }, this);      
        let btn = this.createButtonReturnRoom(this, "DcRoom");
        //==========================================
        //  GESTION DE LA CAMERA
        //==========================================
        var coeffZoom = 1.2;
        this.cameras.main.setZoom(coeffZoom);
    },
    update: function(time, delta){
        var mousePointer = this.input.activePointer;
//        game.players = this.removeDisconnectedPlayers(this, game.players);
        // this.updateConnectedPlayers(this, game.players, game.playersBU, player);
        // this.movePlayers(this, game.players, plId);
        // this.stopPlayers(this, game.players);
    }
});