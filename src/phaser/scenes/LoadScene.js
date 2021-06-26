var LoadScene = new Phaser.Class({
    Extends: TemplateScene,
    initialize: function(config){
        Phaser.Scene.call(this, config);
    },
    init: function(){
        playerMap = [];
    },
    preload: function(){
        this.load.image("arbre", "/maps/tilesets/arbre.png");
        this.load.image("bush", "/maps/tilesets/bush.png");
        this.load.image("flower_set", "/maps/tilesets/flower_set.png");
        this.load.image("grass_set", "/maps/tilesets/grass_set.png");
        this.load.image("gravel_set", "/maps/tilesets/gravel_set.png");
        this.load.image("ruine", "/maps/tilesets/ruine.png");
        this.load.image("wall_set", "/maps/tilesets/wall_set.png");
        this.load.image("roof_set", "/maps/tilesets/roof_set.png");
        //this.load.tilemapTiledJSON("demo1", "/maps/demo1.json");
        //this.load.tilemapTiledJSON("demo2", "/maps/demo2.json");
        //this.load.tilemapTiledJSON("map_abbaye", "/maps/map_abbaye.json");
        this.load.tilemapTiledJSON("map_visite", "/maps/map_visite.json");
        this.load.image('sprite', '/img/sprite.png');
        //this.load.image('background', '/img/background.png');
        this.load.image('minimap', '/img/minimap.png');
    },
    create: function(config){
        game.backgroundColor='#000000';
        //console.table(config);
        //==========================================
        //  GESTION CLIENT - SERVER
        //==========================================
        var Client = this.clientFunctions();
        // Client.sendClick = function (id, x, y) {
        //     // let xmod = Math.round(coeffZoom * x);
        //     // let ymod = Math.round(coeffZoom * y);
        //     // Client.socket.emit('click', { id: id, x: xmod, y: ymod });
        //     Client.socket.emit('click', { id: id, x: x, y: y });
        //     console.log("x="+x+" & y="+y+"["+id+"]");
        // };
        this.input.mouse.disableContextMenu();
        game.selfConnected = false;
        //==========================================
        //  CREATION DE LA MAP
        //==========================================
        this.cameras.main.setBounds(-8000, -200, 12600 , 6500);
        this.physics.world.setBounds(-8000,-200, 12600, 6500);
        var map = this.add.tilemap('map_visite');
        var tileset10 = map.addTilesetImage('grass_set', 'grass_set');
        var tileset20 = map.addTilesetImage('gravel_set', 'gravel_set');
        var tileset30 = map.addTilesetImage('flower_set', 'flower_set');
        var tileset40 = map.addTilesetImage('ruine', 'ruine');
        var tileset50 = map.addTilesetImage('bush', 'bush');
        var tileset60 = map.addTilesetImage('arbre', 'arbre');
        var tileset70 = map.addTilesetImage('wall_set', 'wall_set');
        var tileset80 = map.addTilesetImage('roof_set', 'roof_set');
        var layer10 = map.createLayer('ground', [tileset10, tileset20]).setDepth(10);
        var layer20 = map.createLayer('flowers', [tileset30]).setDepth(20);        
            //==========================================
            //  AJOUT DU JOUEUR
            //==========================================
            player = this.physics.add.image(500,500,'sprite').setDepth(25);
            player.name = "myPlayer";
            player.setCollideWorldBounds(true);
            playerVelocity = 2;
            cursors = this.input.keyboard.createCursorKeys();
            //==========================================    
        var layer30 = map.createLayer('ruines', [tileset40],0,-128).setDepth(30);
        var layer40 = map.createLayer('bushes', [tileset50],0,-128).setDepth(40);
        var layer50 = map.createLayer('arbres', [tileset60],0, -512).setDepth(50);
        var layer60 = map.createLayer('walls', [tileset70],0, -472).setDepth(60);
        var layer70 = map.createLayer('walls_invisible', [tileset70],0, -472).setDepth(70);
        var layer80 = map.createLayer('roofs', [tileset80],0, -372).setDepth(80);
        var layer90 = map.createLayer('roofs_invisible', [tileset80],0,-372).setDepth(90);
        
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

    },
    update: function(time, delta){
        controls.update(delta);
        player.setVelocity(0);
        let plId = parseInt(localStorage.getItem("playerId"));
        // Mouvements latéraux joueur
        if (cursors.left.isDown){
            //player.setVelocityX(-playerVelocity * 2);
            //player.setVelocityY(playerVelocity);
            //console.log("[["+plId+"]]");
            player.x -= Math.round(playerVelocity*2);
            player.y += Math.round(playerVelocity);
            Client.socket.emit('click', { id: plId, x: player.x, y: player.y })
            //console.log(player.x);
        }else if (cursors.right.isDown){
            //player.setVelocityX(playerVelocity * 2);
            //player.setVelocityY(-playerVelocity);
            player.x += Math.round(playerVelocity*2);
            player.y -= Math.round(playerVelocity);
            Client.socket.emit('click', { id: plId, x: player.x, y: player.y })
        }
        // Mouvements verticaux joueur
        if (cursors.up.isDown){
            //player.setVelocityX(-playerVelocity * 2);
            //player.setVelocityY(-playerVelocity);
            player.x -= Math.round(playerVelocity*2);
            player.y -= Math.round(playerVelocity);
            Client.socket.emit('click', { id: plId, x: player.x, y: player.y })
        }else if (cursors.down.isDown){
            //player.setVelocityX(playerVelocity * 2);
            //player.setVelocityY(playerVelocity);
            player.x += Math.round(playerVelocity*2);
            player.y += Math.round(playerVelocity);
            Client.socket.emit('click', { id: plId, x: player.x, y: player.y })
        }

        var mousePointer = this.input.activePointer;
        game.players = this.removeDisconnectedPlayers(this, game.players);
        this.updateConnectedPlayers(this, game.players, game.playersBU, player);
        this.movePlayers(this, game.players, plId);
        this.stopPlayers(this, game.players);
    },
    changeScene: function(){
        this.scene.start("BaseScene");
    },
    centerMap: function(myPlayer){
            //console.log(playerMap[myId].x + ","+playerMap[myId].y);
            //this.cameras.main.startFollow(myPlayer);
        //this.cameras.main.follow(playerMap[myId], Phaser.Camera.FOLLOW_LOCKON);
    }
});