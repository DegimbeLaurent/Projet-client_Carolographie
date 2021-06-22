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
        this.load.image('background', '/img/background.png');
    },
    create: function(config){
        game.backgroundColor='#000000';
        console.table(config);
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
        var layer10 = map.createLayer('ground', [tileset10, tileset20]);
        var layer20 = map.createLayer('flowers', [tileset30]);
        var layer30 = map.createLayer('ruines', [tileset40],0,-128);
        var layer40 = map.createLayer('bushes', [tileset50],0,-128);
        var layer50 = map.createLayer('arbres', [tileset60],0, -512);
        var layer60 = map.createLayer('walls', [tileset70],0, -472);
        var layer70 = map.createLayer('walls_invisible', [tileset70],0, -472);
        var layer80 = map.createLayer('roofs', [tileset80],0, -372);
        var layer90 = map.createLayer('roofs_invisible', [tileset80],0,-372);
        //==========================================
        // var tileset1 = map.addTilesetImage('arbre', 'arbre');
        // var tileset2 = map.addTilesetImage('bush', 'bush');
        // var tileset3 = map.addTilesetImage('flower_set', 'flower_set');
        // var tileset4 = map.addTilesetImage('grass_set', 'grass_set');
        // var tileset5 = map.addTilesetImage('gravel_set', 'gravel_set');
        // var tileset6 = map.addTilesetImage('ruine', 'ruine');
        // var tileset7 = map.addTilesetImage('wall_set', 'wall_set');
        //var layer1 = map.createLayer('ground', [ tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7 ]);
        //var layer1 = map.createLayer('ground', [ tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7 ],512,256);
        //var layer2 = map.createLayer('ruine', [ tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7 ]);
        //var layer2 = map.createLayer('ruine', [ tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7 ],512,128);
        //var layer3 = map.createLayer('building', [ tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7 ]);
        //var layer3 = map.createLayer('building', [ tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7 ],512,-192);
        //var layer4 = map.createLayer('natur', [ tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7 ]);
        //var layer4 = map.createLayer('natur', [ tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7 ],512,128);
        //==========================================
        //  AJOUT DU JOUEUR
        //==========================================
        player = this.physics.add.image(500,500,'sprite');
        player.setCollideWorldBounds(true);
        playerVelocity = 600;
        //==========================================
        //  DEPLACEMENT DU JOUEUR
        //==========================================
        cursors = this.input.keyboard.createCursorKeys();
        //==========================================
        //  GESTION DE LA CAMERA
        //==========================================
        this.cameras.main.startFollow(player, true, 0.1, 0.1);
        var coeffZoom = 0.5;
        this.cameras.main.setZoom(coeffZoom);
        controlConfig = {
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
    },
    update: function(time, delta){
        controls.update(delta);
        player.setVelocity(0);
        // Mouvements latéraux joueur
        if (cursors.left.isDown){
            player.setVelocityX(-playerVelocity * 2);
            player.setVelocityY(playerVelocity);
            //console.log(player.x);
        }else if (cursors.right.isDown){
            player.setVelocityX(playerVelocity * 2);
            player.setVelocityY(-playerVelocity);
        }
        // Mouvements verticaux joueur
        if (cursors.up.isDown){
            player.setVelocityX(-playerVelocity * 2);
            player.setVelocityY(-playerVelocity);
        }else if (cursors.down.isDown){
            player.setVelocityX(playerVelocity * 2);
            player.setVelocityY(playerVelocity);
        }

        var mousePointer = this.input.activePointer;
        this.removeDisconnectedPlayers(this, game.players);
        this.updateConnectedPlayers(this, game.players, game.playersBU);
        this.movePlayers(this, game.players);
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