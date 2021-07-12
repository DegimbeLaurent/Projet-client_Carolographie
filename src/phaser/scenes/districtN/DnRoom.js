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
        controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig, game);
        //=================
        //  PORTAIL NORD
        //=================
            //============
            //  INIT
            //============         
            let x = 0; let y = 0;   
            var px = 500;
            var py = 500;
            player.setDepth(9199);
            var chevaletDNP1;
            var chevaletDNP2;
            var parchemin;
            var pierre_gravee;
            var sortieN = this.add.rectangle(x+150,y,50, 75, 0xffffff).setDepth(9101).setInteractive();
            pierre_gravee = this.add.image(px+380,py-50,"pierre_gravee").setDepth(999).setScale(0.5);
            var fondsNoir = this.add.rectangle(0, 0, 12600 , 6500, 0x000000).setDepth(1);   
            fondsNoir.setDepth(950); // A REMPLACER PAR LE LAYER DE LA ROOM QUAND IL SERA DISPO
            //============
            //  CHEVALET 1
            //============
            // Le Parc de la Serna à Jumet
                chevaletDNP1 = this.add.rectangle(0, 0, 50, 75, 0x926215).setInteractive().setDepth(9001);
                chevaletDNP1.on("pointerup", function(){
                    //======================================
                    var chevalet1_titre_majuscule = this.add.text(px-950, py-250, "D", {fontFamily: "berry_rotunda",fontSize: 48,color: '#8a2828'}).setDepth(999);
                    var chevalet1_titre_texte = this.add.text(px-900, py-235, "istrict Nord - Le Parc de la Serna à Jumet", {fontFamily: "berry_rotunda",fontSize: 32,color: '#000000'}).setDepth(999);
                    var chevalet1_quitter_majuscule = this.add.text(px+330, py+200, "Q", {fontFamily: "berry_rotunda",fontSize: 48,color: '#8a2828'}).setDepth(999);
                    var chevalet1_quitter_texte = this.add.text(px+375, py+215, "uitter", {fontFamily: "berry_rotunda",fontSize: 32,color: '#000000'}).setDepth(999);
                    var DNT1_00 = this.physics.add.image(px-300, py+110, "DNT1_00").setDepth(9101).setScale(0.4);
                    var DNT1_01 = this.physics.add.image(px-850, py-40, "DNT1_01").setDepth(9101).setScale(0.7);
                    var DNT1_02 = this.physics.add.image(px-850, py+160, "DNT1_02").setDepth(9101).setScale(0.75);
                    var DNT1_03 = this.physics.add.image(px-850, py+360, "DNT1_03").setDepth(9101).setScale(1);
                    let txt = "À deux pas de l’Aéroport de Gosselies, se trouve le Parc de la Serna,";
                    var chevalet1_legende_ligne1 = this.add.text(px-650, py+380, txt, {fontFamily: "berry_rotunda",fontSize: 16,color: '#000000'}).setDepth(999);
                    txt = "un des poumons verts de la région.";
                    var chevalet1_legende_ligne2 = this.add.text(px-650, py+420, txt, {fontFamily: "berry_rotunda",fontSize: 16,color: '#000000'}).setDepth(999);
                    //======================================
                    let x = 0;  let y = 0;
                    fondsNoir.setDepth(950);
                    chevaletDNP1.setDepth(1);
                    player.setDepth(25);
                    parchemin = this.add.image(px,py,"parchemin").setDepth(990);
                    var sortie1 = this.add.rectangle(x+150,y,50, 75, 0xffffff).setDepth(9101);
                    sortie1.setInteractive();
                    sortie1.on("pointerup", function(){
                        DNT1_00.destroy();
                        DNT1_01.destroy();
                        DNT1_02.destroy();
                        DNT1_03.destroy();
                        chevalet1_legende_ligne1.destroy();
                        chevalet1_legende_ligne2.destroy();
                        chevalet1_titre_majuscule.destroy();
                        chevalet1_titre_texte.destroy();
                        chevalet1_quitter_majuscule.destroy();
                        chevalet1_quitter_texte.destroy();
                        sortie1.destroy();
                        fondsNoir.setDepth(9000);
                        chevaletDNP1.setDepth(9001);
                        parchemin.destroy();
                        player.setDepth(9199);
                    })
                }, this);             
                //============
                //  CHEVALET 2
                //============
                // L’Aéroport et l’Aéropole de Gosselies
/*                 chevaletDNP2 = this.add.rectangle(150, 0, 50, 75, 0x92623A).setInteractive().setDepth(9001);
                chevaletDNP2.on("pointerup", function(){
                    //======================================                    
                    titre_majuscule = this.add.text(px-950, py-250, "D", {fontFamily: "berry_rotunda",fontSize: 48,color: '#8a2828'}).setDepth(999);
                    titre_texte = this.add.text(px-900, py-235, "istrict Nord - L’Aéroport et l’Aéropole de Gosselies", {fontFamily: "berry_rotunda",fontSize: 32,color: '#000000'}).setDepth(999);
                    quitter_majuscule = this.add.text(px+330, py+200, "Q", {fontFamily: "berry_rotunda",fontSize: 48,color: '#8a2828'}).setDepth(999);
                    quitter_texte = this.add.text(px+375, py+215, "uitter", {fontFamily: "berry_rotunda",fontSize: 32,color: '#000000'}).setDepth(999);
                    var DNT2_00 = this.physics.add.image(px-300, py+110, "DNT2_00").setDepth(9101).setScale(0.2);
                    var DNT2_01 = this.physics.add.image(px-850, py-40, "DNT2_01").setDepth(9101).setScale(0.2);
                    var DNT2_02 = this.physics.add.image(px-850, py+160, "DNT2_02").setDepth(9101).setScale(0.25);
                    let txt = "Gosselies et l’aviation, une grande histoire d’amour!";
                    legende_ligne1 = this.add.text(px-650, py+380, txt, {fontFamily: "berry_rotunda",fontSize: 16,color: '#000000'}).setDepth(999);
                    //======================================
                    let x = 0;  let y = 0;
                    var sortie2 = this.add.rectangle(x+150,y,50, 75, 0xffffff).setDepth(9101);
                    fondsNoir.setDepth(9100);
                    sortie2.setInteractive();
                    sortie2.on("pointerup", function(){
                        DNT2_00.destroy();
                        DNT2_01.destroy();
                        DNT2_02.destroy();
                        legende_ligne1.destroy();
                        titre_majuscule.destroy();
                        titre_texte.destroy();
                        quitter_majuscule.destroy();
                        quitter_texte.destroy();
                        sortie2.destroy();
                        fondsNoir.setDepth(0);
                        parchemin.destroy();
                    })
                }, this);  */
                //============
                //  CHEVALET 3
                //============

                //============
                //  SORTIE
                //============
                sortieN.on("pointerup", function(){
                    location.href = '/website/visite.html';
                    // layer40.setDepth(40);
                    // player.setDepth(25);
                    // fondsNoir.setDepth(1);
                    // pierre_gravee.destroy();
                    // sortieN.destroy(0);
                    // if(chevaletDNP1 != undefined){chevaletDNP1.destroy(0);}             
                }, this);
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
        game.players = this.removeDisconnectedPlayers(this, game.players);
    },
    changeScene: function(nameScene, gameData){
        this.scene.start(nameScene, gameData);
    }
});