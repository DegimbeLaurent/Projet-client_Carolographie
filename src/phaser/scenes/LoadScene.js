var LoadScene = new Phaser.Class({
    Extends: TemplateScene,
    initialize: function(){
        Phaser.Scene.call(this, { "key": "LoadScene"});
    },
    init: function(){
        playerMap = [];
    },
    preload: function(){
        // this.load.image('tiles', '/maps/iso-64x64-outside.png');
        // this.load.image('tiles2', '/maps/iso-64x64-building.png');
        // this.load.tilemapTiledJSON('map', '/maps/isorpg.json');

        this.load.image("arbre", "/maps/tilesets/arbre.png");
        this.load.image("bush", "/maps/tilesets/bush.png");
        this.load.image("flower_set", "/maps/tilesets/flower_set.png");
        this.load.image("grass_set", "/maps/tilesets/grass_set.png");
        this.load.image("gravel_set", "/maps/tilesets/gravel_set.png");
        this.load.image("ruine", "/maps/tilesets/ruine.png");
        this.load.image("wall_set", "/maps/tilesets/wall_set.png");
        this.load.tilemapTiledJSON("demo1", "/maps/demo1.json");
        //this.load.tilemapTiledJSON("demo2", "/maps/demo2.json");
        //this.load.tilemapTiledJSON("map_abbaye", "/maps/map_abbaye.json");
        this.load.image('sprite', '/img/sprite.png');
        this.load.image('background', '/img/background.png');
    },
    create: function(){
        this.cameras.main.setBounds(0, 0, 1920 , 1080);
        var bg = this.add.image(0,0,"background").setOrigin(0);
        //game.Align.scaleToGameW(bg, 2);
        game.backgroundColor='#bd4545';
        //game.scale.on('enterfullscreen', function () { });
        //==========================================
        //  CREATION DE LA MAP
        //==========================================
        var map = this.add.tilemap('demo1');
        var coeffZoom = 1.2;
        var tileset1 = map.addTilesetImage('arbre', 'arbre');
        var tileset2 = map.addTilesetImage('bush', 'bush');
        var tileset3 = map.addTilesetImage('flower_set', 'flower_set');
        var tileset4 = map.addTilesetImage('grass_set', 'grass_set');
        var tileset5 = map.addTilesetImage('gravel_set', 'gravel_set');
        var tileset6 = map.addTilesetImage('ruine', 'ruine');
        var tileset7 = map.addTilesetImage('wall_set', 'wall_set');
        var layer1 = map.createLayer('ground', [ tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7 ]);
        var layer2 = map.createLayer('ruine', [ tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7 ]);
        var layer3 = map.createLayer('nature', [ tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7 ]);
        //var layer2=
        // var tileset1 = map.addTilesetImage('iso-64x64-outside', 'tiles');
        // var tileset2 = map.addTilesetImage('iso-64x64-building', 'tiles2');
        // var layer1 = map.createLayer('Tile Layer 1', [ tileset1, tileset2 ]);
        // var layer2 = map.createLayer('Tile Layer 2', [ tileset1, tileset2 ]);
        // var layer3 = map.createLayer('Tile Layer 3', [ tileset1, tileset2 ]);
        // var layer4 = map.createLayer('Tile Layer 4', [ tileset1, tileset2 ]);
        // var layer5 = map.createLayer('Tile Layer 5', [ tileset1, tileset2 ]);
        var text = this.add.text(
            640, 
            360, 
            "Hello World 1", 
            {
                fontSize: 50,
                color: "#000000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
        //==========================================
        //  AJOUT DU JOUEUR
        //==========================================
        //var arbre = this.add.image(500, 500, 'arbre').setInteractive();
        this.player = this.add.image(600, 500, 'sprite').setInteractive();
        //var player;
        //player.x = 450;
        //player.y = 450;
        //==========================================
        //  DEPLACEMENT DU JOUEUR
        //==========================================
        var Client = this.clientFunctions();
        var cursors = this.input.keyboard.createCursorKeys();
        // player.on('pointerdown', function(){
            //     Client.socket.emit("testjs","helloooo");
            //     this.scene.start("BaseScene");
            //     //let coordEntrance = getCoordEntrance();
            //     //console.table(game);
            //     //Client.socket.emit('newplayer', localStorage.getItem('pseudo'),coordEntrance);
            // }, this);
        //==========================================
        //  GESTION DE LA CAMERA
        //==========================================
        this.cameras.main.setSize(1920, 1080);
        //this.cameras.main.startFollow(this.player);
        // this.cameras.main.setZoom(coeffZoom);        
        // this.cameras.main.centerOn(0,0);
        var controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            acceleration: 0.04,
            drag: 0.0005,
            maxSpeed: 0.4
        };
        controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
        //==========================================
        //  GESTION CLIENT - SERVER
        //==========================================
        Client.socket.on('personalData', function (data, tablePlayers) {
            let perso = Object.entries(data);
            localStorage.setItem("personalData", perso);
            game.players = tablePlayers;
            game.selfConnected = true;
            console.table(game.players);
            //console.table(game);
            //movePlayers(this, game.players);
            //addNewPlayer(game, data);
        });
        Client.sendClick = function (id, x, y) {
            // let xmod = Math.round(coeffZoom * x);
            // let ymod = Math.round(coeffZoom * y);
            // Client.socket.emit('click', { id: id, x: xmod, y: ymod });
            Client.socket.emit('click', { id: id, x: x, y: y });
            console.log("x="+x+" & y="+y+"["+id+"]");
        };
        this.input.mouse.disableContextMenu();
        this.input.on('pointerup', function (pointer) {
            if (pointer.leftButtonReleased()) {
                //rotateSprite(playerMap[id], pointer.x, pointer.y);
                if(localStorage.getItem("playerId") != ""){
                    Client.sendClick(localStorage.getItem("playerId"), pointer.x, pointer.y);
                    //this.cameras.main.centerOn(pointer.x,pointer.y);
                    this.cameras.main.startFollow(this.player);
                    console.log("yes: "+ localStorage.getItem("playerId"));
                }else{
                    console.log("no");
                }
                //this.clickOnMap(id, pointer);
            }
        }, this);
        game.selfConnected = false;
    },
    update: function(time, delta){
        controls.update(delta);
        var mousePointer = this.input.activePointer;
        this.removeDisconnectedPlayers(this, game.players);
        this.updateConnectedPlayers(this, game.players, game.playersBU);
        //showUsersConnected(game.players);
        this.movePlayers(this, game.players);
        this.stopPlayers(this, game.players);
    },
    changeScene: function(){
        this.scene.start("BaseScene");
    }
});