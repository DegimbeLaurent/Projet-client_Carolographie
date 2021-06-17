var LoadScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function(){
        Phaser.Scene.call(this, { "key": "LoadScene"});
    },
    init: function(){

    },
    preload: function(){
        this.load.image('tiles', '/maps/iso-64x64-outside.png');
        this.load.image('tiles2', '/maps/iso-64x64-building.png');
        this.load.tilemapTiledJSON('map', '/maps/isorpg.json');

        // this.load.image("arbre", "/maps/arbre.png");
        // this.load.image("bush", "/maps/bush.png");
        // this.load.image("flower_set", "/maps/flower_set.png");
        // this.load.image("grass_set", "/maps/grass_set.png");
        // this.load.image("gravel_set", "/maps/gravel_set.png");
        // this.load.image("ruine", "/maps/ruine.png");
        // this.load.image("wall_set", "/maps/wall_set.png");
        // this.load.tilemapTiledJSON("demo1", "../maps/demo1.json");
        // this.load.tilemapTiledJSON("tilemap", "/maps/example_map2.json");
        // this.load.tilemapTiledJSON("demo2", "/maps/demo2.json");
        // this.load.tilemapTiledJSON("map_abbaye", "/maps/map_abbaye.json");
        this.load.image('sprite', '/img/sprite.png');
    },
    create: function(){
        game.backgroundColor='#bd4545';
        game.scale.on('enterfullscreen', function () { });
        //==========================================
        //  CREATION DE LA MAP
        //==========================================
        var map = this.add.tilemap('map');
        var tileset1 = map.addTilesetImage('iso-64x64-outside', 'tiles');
        var tileset2 = map.addTilesetImage('iso-64x64-building', 'tiles2');
        var layer1 = map.createLayer('Tile Layer 1', [ tileset1, tileset2 ]);
        var layer2 = map.createLayer('Tile Layer 2', [ tileset1, tileset2 ]);
        var layer3 = map.createLayer('Tile Layer 3', [ tileset1, tileset2 ]);
        var layer4 = map.createLayer('Tile Layer 4', [ tileset1, tileset2 ]);
        var layer5 = map.createLayer('Tile Layer 5', [ tileset1, tileset2 ]);
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
            maxSpeed: 0.2
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