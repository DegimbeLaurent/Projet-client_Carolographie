var BaseScene = new Phaser.Class({
    Extends: TemplateScene,
    initialize: function BaseScene(config){
        //Phaser.Scene.call(this, config);
        Phaser.Scene.call(this, {"key":"BaseScene"});
    },
    init: function(data){
        this.game = data.gmData;
        this.playerMap = data.pm;
        this.player = data.pl;
        console.log("yepBS");
        console.table(game.players);
        console.table(this.game.players);
        //playerMap = [];
    },
    preload: function(){
        this.load.image('set_tuile', '/assets/maps/set_tuile.png');
        this.load.tilemapTiledJSON("map_visite", "/maps/map_abbaye_V2.json");
        this.load.image('sprite', '/img/sprite.png');
        this.load.image('minimap', '/img/minimap.png');
    },
    create: function(config){
        console.log("on passe par BaseScene...");
        console.log(this.game.players);
        this.game.backgroundColor='#000000';
        //console.table(config);
        //==========================================
        //  GESTION CLIENT - SERVER
        //==========================================
        var Client = this.clientFunctions();
        this.input.mouse.disableContextMenu();
        this.game.selfConnected = false;
        //==========================================
        //  CREATION DE LA MAP
        //==========================================
        this.cameras.main.setBounds(-8000, -200, 12600 , 6500);
        this.physics.world.setBounds(-8000,-200, 12600, 6500);
        var map = this.add.tilemap('map_visite');
        var tileset10 = map.addTilesetImage('set_tuile', 'set_tuile');
        var layer10 = map.createLayer('ground', [tileset10]).setDepth(10);
        var layer20 = map.createLayer('flower', [tileset10]).setDepth(20);        
            //==========================================
            //  AJOUT DU JOUEUR
            //==========================================
            this.player = this.physics.add.image(500,500,'sprite').setDepth(25);
            this.player.name = "myPlayer";
            this.player.setCollideWorldBounds(true);
            this.playerVelocity = 2;
            cursors = this.input.keyboard.createCursorKeys();
            //==========================================    
        var layer30 = map.createLayer('buisson', [tileset10]).setDepth(30);
        var layer40 = map.createLayer('tp', [tileset10]).setDepth(40);
        var layer50 = map.createLayer('ruine stage 2', [tileset10]).setDepth(50);
        var layer60 = map.createLayer('ruine top', [tileset10]).setDepth(60);
        var layer70 = map.createLayer('ruine bottom', [tileset10]).setDepth(70);
        var layer80 = map.createLayer('ruine stage', [tileset10]).setDepth(80);
        var layer90 = map.createLayer('building bottom', [tileset10]).setDepth(90);
        var layer100 = map.createLayer('building top ', [tileset10]).setDepth(100);
        var layer110 = map.createLayer('building transparanse', [tileset10]).setDepth(110);
        var layer120 = map.createLayer('correction', [tileset10]).setDepth(120);
        var layer130 = map.createLayer('roof 2', [tileset10]).setDepth(130);
        var layer140 = map.createLayer('roof 1', [tileset10]).setDepth(140);
        var layer150 = map.createLayer('tronc', [tileset10]).setDepth(150);
        var layer160 = map.createLayer('arbre', [tileset10]).setDepth(160);
        var layer170 = map.createLayer('chappelle', [tileset10]).setDepth(170);
        var layer180 = map.createLayer('chappelle center', [tileset10]).setDepth(180);
        var layer190 = map.createLayer('chappelle top', [tileset10]).setDepth(190);
        //var layer30 = map.createLayer('ruines', [tileset10],0,-128).setDepth(30);
        //var layer40 = map.createLayer('bushes', [tileset10],0,-128).setDepth(40);
        //var layer50 = map.createLayer('arbres', [tileset10],0, -512).setDepth(50);
        //var layer60 = map.createLayer('walls', [tileset10],0, -472).setDepth(60);
        //var layer70 = map.createLayer('walls_invisible', [tileset10],0, -472).setDepth(70);
        //var layer80 = map.createLayer('roofs', [tileset10],0, -372).setDepth(80);
        //var layer90 = map.createLayer('roofs_invisible', [tileset10],0,-372).setDepth(90);
        
        //==========================================
        //  AJOUT D'UN PORTAIL
        //==========================================
        let x = 0;
        let y = 0;
        var portail = this.add.rectangle(x, y, 50, 75, 0x92623A).setDepth(999);
        this.add.text(x-20,y-65,"Portails",{fontFamily: "Arial Black",fontSize: 12});
        portail.setInteractive();
        portail.on("pointerup", function(){this.changeScene("DcRoom")},this);
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
        //controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
        controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
        //==========================================
        //  CREATION DE LA MINIMAP
        //==========================================  
        let lgMax = Math.round(DEFAULT_WIDTH / 4);
        let htMax = Math.round(DEFAULT_HEIGHT / 4);
        this.minimap = this.cameras.add(DEFAULT_WIDTH - lgMax, DEFAULT_HEIGHT - htMax, lgMax, htMax).setZoom(0.1).setName('mini').startFollow(player, true, 0.1, 0.1);
        this.minimap.setBackgroundColor(0x002244);
        this.minimap.scrollX = 1600;
        this.minimap.scrollY = 900;
        //this.scene.start("DcRoom");
    },
    update: function(time, delta){
        controls.update(delta);
        player.setVelocity(0);
        let plId = parseInt(localStorage.getItem("playerId"));
        // Mouvements latéraux joueur
        if (cursors.left.isDown){
            player.x -= Math.round(playerVelocity*2);
            player.y += Math.round(playerVelocity);
            Client.socket.emit('click', { id: plId, x: player.x, y: player.y })
            //console.log(player.x);
        }else if (cursors.right.isDown){
            player.x += Math.round(playerVelocity*2);
            player.y -= Math.round(playerVelocity);
            Client.socket.emit('click', { id: plId, x: player.x, y: player.y })
        }
        // Mouvements verticaux joueur
        if (cursors.up.isDown){
            player.x -= Math.round(playerVelocity*2);
            player.y -= Math.round(playerVelocity);
            Client.socket.emit('click', { id: plId, x: player.x, y: player.y })
        }else if (cursors.down.isDown){
            player.x += Math.round(playerVelocity*2);
            player.y += Math.round(playerVelocity);
            Client.socket.emit('click', { id: plId, x: player.x, y: player.y })
        }

        var mousePointer = this.input.activePointer;
        this.game.players = this.removeDisconnectedPlayers(this, this.game.players);
        this.updateConnectedPlayers(this, this.game.players, this.game.playersBU, player);
        this.movePlayers(this, this.game.players, plId);
        this.stopPlayers(this, this.game.players);
    },
    changeScene: function(nameScene){
        this.scene.start(nameScene);
    },
    centerMap: function(myPlayer){
            //console.log(playerMap[myId].x + ","+playerMap[myId].y);
            //this.cameras.main.startFollow(myPlayer);
        //this.cameras.main.follow(playerMap[myId], Phaser.Camera.FOLLOW_LOCKON);
    }
});