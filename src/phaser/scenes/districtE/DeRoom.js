var DeRoom = new Phaser.Class({
    Extends: RoomTemplate,
    initialize: function(config){
        Phaser.Scene.call(this, {"key":"DeRoom"});
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
        //  AJOUT DES CHEVALETS
        //==========================================
        var chevaletPict1 = this.ajouteChevalet(this,400,350,25,"Pict 1");
        var chevaletPict2 = this.ajouteChevalet(this,500,350,25,"Pict 2");
        var chevaletPict3 = this.ajouteChevalet(this,600,350,25,"Pict 3");
        var chevaletPict4 = this.ajouteChevalet(this,700,350,25,"Pict 4");
        this.add.text(400, 200, "DISTRICT EST", {fontFamily: "Arial Black",fontSize: 36});
        var porteDistrictC = this.ajouteChevalet(this,400,650,25,"Centre [LD]");
        var porteDistrictN = this.ajouteChevalet(this,500,650,25,"Nord [MM]");
        var porteDistrictS = this.ajouteChevalet(this,600,650,25,"Sud [SE]");
        var porteDistrictO = this.ajouteChevalet(this,700,650,25,"Ouest [FG]");
        var porteDistrictE = this.ajouteChevalet(this,800,650,25,"Est [AD]");
        //==========================================
        //  AJOUT DES EVENTS CHEVALETS
        //==========================================
        chevaletPict1.setInteractive();
        chevaletPict1.on("pointerup", function(){this.changeScene("DePicture1");}, this);
        chevaletPict2.setInteractive();
        chevaletPict2.on("pointerup", function(){this.changeScene("DePicture2");}, this);
        chevaletPict3.setInteractive();
        chevaletPict3.on("pointerup", function(){this.changeScene("DePicture3");}, this);
        chevaletPict4.setInteractive();
        chevaletPict4.on("pointerup", function(){this.changeScene("DePicture4");}, this);
        porteDistrictC.setInteractive();
        porteDistrictC.on("pointerup", function(){this.changeScene("DcRoom");}, this);
        porteDistrictN.setInteractive();
        porteDistrictN.on("pointerup", function(){this.changeScene("DnRoom");}, this);
        porteDistrictS.setInteractive();
        porteDistrictS.on("pointerup", function(){this.changeScene("DsRoom");}, this);
        porteDistrictO.setInteractive();
        porteDistrictO.on("pointerup", function(){this.changeScene("DoRoom");}, this);
        porteDistrictE.setInteractive();
        porteDistrictE.on("pointerup", function(){this.changeScene("DeRoom");}, this);
        //==========================================
        //  AJOUT DU JOUEUR
        //==========================================
        player = this.physics.add.image(500,500,'sprite').setDepth(25);
        player.name = "myPlayer";
        player.setCollideWorldBounds(true);
        playerVelocity = 2;
        cursors = this.input.keyboard.createCursorKeys();        
        //==========================================
        //  GESTION DE LA CAMERA
        //==========================================
        this.cameras.main.startFollow(player, true, 0.1, 0.1);
        var coeffZoom = 1.2;
        this.cameras.main.setZoom(coeffZoom);
        controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            acceleration: 0.04,
            drag: 0.0005,
            maxSpeed: 0.2
        };
        controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
    },
    update: function(time, delta){
        controls.update(delta);
        player.setVelocity(0);
        let plId = parseInt(localStorage.getItem("playerId"));
        if (cursors.left.isDown){
            player.x -= Math.round(playerVelocity*2);
            player.y += Math.round(playerVelocity);
            //Client.socket.emit('click', { id: plId, x: player.x, y: player.y })
        }else if (cursors.right.isDown){
            player.x += Math.round(playerVelocity*2);
            player.y -= Math.round(playerVelocity);
            //Client.socket.emit('click', { id: plId, x: player.x, y: player.y })
        }
        if (cursors.up.isDown){
            player.x -= Math.round(playerVelocity*2);
            player.y -= Math.round(playerVelocity);
            //Client.socket.emit('click', { id: plId, x: player.x, y: player.y })
        }else if (cursors.down.isDown){
            player.x += Math.round(playerVelocity*2);
            player.y += Math.round(playerVelocity);
            //Client.socket.emit('click', { id: plId, x: player.x, y: player.y })
        }
        var mousePointer = this.input.activePointer;
//        game.players = this.removeDisconnectedPlayers(this, game.players);
        // this.updateConnectedPlayers(this, game.players, game.playersBU, player);
        // this.movePlayers(this, game.players, plId);
        // this.stopPlayers(this, game.players);
    }
});