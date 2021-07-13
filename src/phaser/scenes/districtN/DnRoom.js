//config.key = "LoadScene2";
var DnRoom = new Phaser.Class({
    Extends: TemplateScene,
    initialize: function LoadScene(config){
        //Phaser.Scene.call(this, config);
        Phaser.Scene.call(this, {"key":"DnRoom"});
    },
    init: function(){
        playerMap = [];
    },
    preload: function(){
        this.load.image('set_tuile', '/assets/maps/set_tuile.png');
        this.load.tilemapTiledJSON("map_visite", "/maps/map_abbaye_V2.json");
        this.load.image('sprite', '/img/sprite.png');
        this.load.image('minimap', '/img/minimap.png');
        this.load.image('parchemin', '/img/parchemin.jpg');
        this.load.image('pierre_gravee', '/img/pierre_gravee.png');
        // PICTURES
            // DISTRICT NORD
                this.load.image('DNT1_00', '/img/visit/districtN/DN-T1/DNT1_00.jpg');
                this.load.image('DNT1_01', '/img/visit/districtN/DN-T1/DNT1_01.JPG');
                this.load.image('DNT1_02', '/img/visit/districtN/DN-T1/DNT1_02.JPG');
                this.load.image('DNT1_03', '/img/visit/districtN/DN-T1/DNT1_03.JPG');
                this.load.image('DNT2_00', '/img/visit/districtN/DN-T2/DNT2_00.jpg');
                this.load.image('DNT2_01', '/img/visit/districtN/DN-T2/DNT2_01.jpg');
                this.load.image('DNT2_02', '/img/visit/districtN/DN-T2/DNT2_02.jpg');
                //this.load.image('DNT2_03', '/img/visit/districtN/DN-T1/DNT2_03.JPG');
/*                 this.load.image('DNT3_00', '/img/visit/districtN/DN-T1/DNT3_00.jpg');
                this.load.image('DNT3_01', '/img/visit/districtN/DN-T1/DNT3_01.JPG');
                this.load.image('DNT3_02', '/img/visit/districtN/DN-T1/DNT3_02.JPG');
                this.load.image('DNT3_03', '/img/visit/districtN/DN-T1/DNT3_03.JPG');
                this.load.image('DNT4_00', '/img/visit/districtN/DN-T1/DNT4_00.jpg');
                this.load.image('DNT4_01', '/img/visit/districtN/DN-T1/DNT4_01.JPG');
                this.load.image('DNT4_02', '/img/visit/districtN/DN-T1/DNT4_02.JPG');
                this.load.image('DNT4_03', '/img/visit/districtN/DN-T1/DNT4_03.JPG'); */
    },
    create: function(config){
        game.backgroundColor='#000000';
        //==========================================
        //  GESTION CLIENT - SERVER
        //==========================================
        this.initLocalStorage();
        var Client = this.clientFunctions();
        this.input.mouse.disableContextMenu();
        game.selfConnected = false;
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
        player = this.physics.add.image(0,0,'sprite').setDepth(25);
        player.name = "myPlayer";
        player.setCollideWorldBounds(true);
        playerVelocity = 2;
        cursors = this.input.keyboard.createCursorKeys();
        //==========================================
        //  GESTION DE LA CAMERA
        //==========================================
        this.cameras.main.startFollow(player, true, 0.1, 0.1);
        var coeffZoom = 1;
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
        controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig, game);
        //=================
        //  PORTAIL NORD
        //=================
            //============
            //  INIT
            //============         
            let x = 0; let y = 0; var px = 0; var py = 0; let txt = "";
            player.setDepth(9099);
            //var pierre_gravee = this.add.image(px+380,py-50,"pierre_gravee").setDepth(999).setScale(0.5);
            var fondsEcran = this.add.rectangle(0, 0, 12600 , 6500, 0xf4edde).setDepth(950); // A REMPLACER PAR LE LAYER DE LA ROOM QUAND IL SERA DISPO
            var fontFam = "Montserrat";
            var toDestroy = [];
            camSubject = "room";
            var sortieN = this.add.rectangle(x+350,y,50, 75, 0xffffff).setDepth(9100).setInteractive();
            //============
            //  CHEVALET 1
            //============
            // Le Parc de la Serna à Jumet
            var chevaletDNP1 = this.add.rectangle(0, 0, 50, 75, 0x926215).setInteractive().setDepth(9001);
            chevaletDNP1.on("pointerup", function(){
                //======================================
                toDestroy.push(this.add.text(px-225, py-100, "District Nord - Le Parc de la Serna à Jumet", {fontFamily: fontFam, fontSize: 30,color: '#000000'}).setDepth(9101));
                toDestroy.push(this.physics.add.image(px, py+300, "DNT1_00").setDepth(9101));
                toDestroy.push(this.physics.add.image(px-350, py+900, "DNT1_01").setDepth(9101));
                toDestroy.push(this.physics.add.image(px-350, py+1200, "DNT1_02").setDepth(9101));
                toDestroy.push(this.physics.add.image(px-350, py+1450, "DNT1_03").setDepth(9101));
                txt = "À deux pas de l’Aéroport de Gosselies, se trouve le Parc de la Serna, un des poumons verts de la région.";
                toDestroy.push(this.add.text(px-400, py+650, txt, {fontFamily: fontFam,fontSize: 20,color: '#000000'}).setDepth(999));
                //======================================
                var arrayShadows = this.addShadows(toDestroy, [1,2,3,4]);
                arrayShadows.forEach((item) => {toDestroy.push(item);})
                camSubject = "chevalet";
                chevaletDNP1.setDepth(1);
                player.setDepth(1);
                var sortie1 = this.add.rectangle(x+50,y+1700,50, 75, 0xffffff).setDepth(9101);
                sortieN.setDepth(949);
                sortie1.setInteractive();
                sortie1.on("pointerup", function(){
                    sortie1.destroy();
                    toDestroy.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(9000);
                    sortieN.setDepth(9100);
                    chevaletDNP1.setDepth(9001);
                    player.setDepth(9199);
                    player.y = 200;
                    camSubject = "room";
                })
            }, this);             
            //============
            //  CHEVALET 2
            //============
            // L’Aéroport et l’Aéropole de Gosselies

            //============
            //  CHEVALET 3
            //============
            
            //============
            //  SORTIE
            //============
            sortieN.on("pointerup", function(){
                if(camSubject == "room"){
                    localStorage.setItem("insideRoom", false);
                    Client.socket.emit("goOutRoom");
                    Client.socket.on("okGoOutRoom", function(){
                        location.href = '/website/visite.html';
                    });
                };            
            }, this);
        },
        update: function(time, delta){
            controls.update(delta);
            player.setVelocity(0);
            let plId = parseInt(localStorage.getItem("playerId"));
            if (cursors.left.isDown){
                player.x -= Math.round(playerVelocity*2);
                Client.socket.emit('click', { id: plId, x: player.x, y: player.y });
            }else if (cursors.right.isDown){
                player.x += Math.round(playerVelocity*2);
                Client.socket.emit('click', { id: plId, x: player.x, y: player.y })
            }
            if (cursors.up.isDown){
                player.y -= Math.round(playerVelocity*3);
                Client.socket.emit('click', { id: plId, x: player.x, y: player.y })
            }else if (cursors.down.isDown){
                player.y += Math.round(playerVelocity*3);
                Client.socket.emit('click', { id: plId, x: player.x, y: player.y })
            }
            var mousePointer = this.input.activePointer;
            game.players = this.removeDisconnectedPlayers(this, game.players);
            this.movePlayers(this, game.players, plId);
        },
        changeScene: function(nameScene, gameData){
            this.scene.start(nameScene, gameData);
        }
});