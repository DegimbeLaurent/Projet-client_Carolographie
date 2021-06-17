var LoadScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function(){
        Phaser.Scene.call(this, { "key": "LoadScene"});
    },
    init: function(){

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
    },
    create: function(){
        game.backgroundColor='#bd4545';
        game.scale.on('enterfullscreen', function () { });
        //==========================================
        //  CREATION DE LA MAP
        //==========================================
        var map = this.add.tilemap('demo1');
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
        var player = this.add.image(400, 400, 'sprite').setInteractive();
        //==========================================
        //  DEPLACEMENT DU JOUEUR
        //==========================================
        var cursors = this.input.keyboard.createCursorKeys();
        player.on('pointerdown', function(){
            this.scene.start("BaseScene");
        }, this);
        //==========================================
        //  GESTION DE LA CAMERA
        //==========================================
        this.cameras.main.setZoom(1);
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
    },
    update: function(time, delta){
        controls.update(delta);
    },
    changeScene: function(){
        this.scene.start("BaseScene");
    }
});