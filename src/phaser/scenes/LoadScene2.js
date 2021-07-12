//config.key = "LoadScene2";
var LoadScene2 = new Phaser.Class({
    Extends: TemplateScene,
    initialize: function LoadScene(config){
        //Phaser.Scene.call(this, config);
        Phaser.Scene.call(this, {"key":"LoadScene2"});
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
        //this.load.bitmapFont('myfont', '/assets/fonts/Berry-Rotunda.png','/assets/fonts/BerryRotunda.xml');
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
        console.log("on passe ici...");
        game.backgroundColor='#000000';
        //console.table(config);
        //==========================================
        //  TEST POLICE
        //==========================================
        //this.add.text(400,400,"Test font Berry Rotunda !!!",{fontFamily: "myfont",fontSize: 12,color:0xffffff});
        // let px = 500;
        // let py = 500;
        // var parchemin = this.add.image(px,py,"parchemin").setDepth(998);
        // var pierre_gravee = this.add.image(px+380,py-50,"pierre_gravee").setDepth(999).setScale(0.5);
        // this.add.text(px-950, py-250, "D", {fontFamily: "berry_rotunda",fontSize: 48,color: '#8a2828'}).setDepth(999);
        // this.add.text(px-900, py-235, "istrict Nord - Le Parc de la Serna à Jumet", {fontFamily: "berry_rotunda",fontSize: 32,color: '#000000'}).setDepth(999);
        // this.add.text(px+330, py+200, "Q", {fontFamily: "berry_rotunda",fontSize: 48,color: '#8a2828'}).setDepth(999);
        // this.add.text(px+375, py+215, "uitter", {fontFamily: "berry_rotunda",fontSize: 32,color: '#000000'}).setDepth(999);
        // var DNT1_00 = this.physics.add.image(px-300, py+110, "DNT1_00").setDepth(9101).setScale(0.4);
        // var DNT1_01 = this.physics.add.image(px-850, py-40, "DNT1_01").setDepth(9101).setScale(0.7);
        // var DNT1_02 = this.physics.add.image(px-850, py+160, "DNT1_02").setDepth(9101).setScale(0.75);
        // var DNT1_03 = this.physics.add.image(px-850, py+360, "DNT1_03").setDepth(9101).setScale(1);
        // let txt = "À deux pas de l’Aéroport de Gosselies, se trouve le Parc de la Serna,";
        // this.add.text(px-650, py+380, txt, {fontFamily: "berry_rotunda",fontSize: 16,color: '#000000'}).setDepth(999);
        // txt = "un des poumons verts de la région.";
        // this.add.text(px-650, py+420, txt, {fontFamily: "berry_rotunda",fontSize: 16,color: '#000000'}).setDepth(999);
        
        //this.add.DynamicBitmapText(this,150,400, 'myfont', 'Test Berry Rotunda!',36);
        //==========================================
        //  GESTION CLIENT - SERVER
        //==========================================
        //this.initLocalStorage();
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
        controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig, game);
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
        this.minimap.visible = false;
        //==========================================
        //  AJOUT DES PORTAILS
        //==========================================
        var fondsNoir = this.add.rectangle(0, 0, 12600 , 6500, 0x000000).setDepth(1);   
        this.add.text(-20,-65,"Portails",{fontFamily: "Arial Black",fontSize: 12});
        //=================
        //  PORTAIL NORD
        //=================
        console.log("Scene B");
        let test = localStorage.getItem('personalData');
        console.table(test);
        var portailN = this.add.rectangle(0, 0, 50, 75, 0x92623A).setDepth(999).setInteractive();
        portailN.on("pointerup", function(){
            location.href = '/website/visite.html';
            //this.scene.start("LoadScene");
            //============
            //  INIT
            //============         
            let x = 0; let y = 0;   
            var px = 500;
            var py = 500;
            player.setDepth(9199);
            this.minimap.visible = false;
            var chevaletDNP1;
            var chevaletDNP2;
            var parchemin;
            var pierre_gravee;
            var sortieN = this.add.rectangle(x+150,y,50, 75, 0xffffff).setDepth(9101).setInteractive();
            pierre_gravee = this.add.image(px+380,py-50,"pierre_gravee").setDepth(999).setScale(0.5);
            fondsNoir.setDepth(950); // A REMPLACER PAR LE LAYER DE LA ROOM QUAND IL SERA DISPO
            portailN.setDepth(1);
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
                // Le Parc de la Serna à Jumet
/*                 var chevaletDNP1 = this.add.rectangle(0, 0, 50, 75, 0x92623A).setInteractive().setDepth(9001);
                chevaletDNP1.on("pointerup", function(){
                    //======================================
                    let px = 500;
                    let py = 500;
                    parchemin = this.add.image(px,py,"parchemin").setDepth(998);
                    pierre_gravee = this.add.image(px+380,py-50,"pierre_gravee").setDepth(999).setScale(0.5);
                    this.add.text(px-950, py-250, "D", {fontFamily: "berry_rotunda",fontSize: 48,color: '#8a2828'}).setDepth(999);
                    this.add.text(px-900, py-235, "istrict Nord - Le Parc de la Serna à Jumet", {fontFamily: "berry_rotunda",fontSize: 32,color: '#000000'}).setDepth(999);
                    this.add.text(px+330, py+200, "Q", {fontFamily: "berry_rotunda",fontSize: 48,color: '#8a2828'}).setDepth(999);
                    this.add.text(px+375, py+215, "uitter", {fontFamily: "berry_rotunda",fontSize: 32,color: '#000000'}).setDepth(999);
                    var DNT3_00 = this.physics.add.image(px-300, py+110, "DNT3_00").setDepth(9101).setScale(0.4);
                    var DNT3_01 = this.physics.add.image(px-850, py-40, "DNT3_01").setDepth(9101).setScale(0.7);
                    var DNT3_02 = this.physics.add.image(px-850, py+160, "DNT3_02").setDepth(9101).setScale(0.75);
                    var DNT3_03 = this.physics.add.image(px-850, py+360, "DNT3_03").setDepth(9101).setScale(1);
                    let txt = "À deux pas de l’Aéroport de Gosselies, se trouve le Parc de la Serna,";
                    this.add.text(px-650, py+380, txt, {fontFamily: "berry_rotunda",fontSize: 16,color: '#000000'}).setDepth(999);
                    txt = "un des poumons verts de la région.";
                    this.add.text(px-650, py+420, txt, {fontFamily: "berry_rotunda",fontSize: 16,color: '#000000'}).setDepth(999);
                    //======================================
                    let x = 0;  let y = 0
                    fondsNoir.setDepth(9100);
                    var sortie = this.add.rectangle(x+150,y,50, 75, 0x92623A).setDepth(9101);
                    sortie.setInteractive();
                    sortie.on("pointerup", function(){
                        DNT3_00.destroy();
                        DNT3_01.destroy();
                        DNT3_02.destroy();
                        DNT3_03.destroy();
                        sortie.destroy();
                        fondsNoir.setDepth(9000);
                    })
                }, this);  */
                //============
                //  CHEVALET 4
                //============
                // Le Parc de la Serna à Jumet
/*                 var chevaletDNP1 = this.add.rectangle(0, 0, 50, 75, 0x92623A).setInteractive().setDepth(9001);
                chevaletDNP1.on("pointerup", function(){
                    //======================================
                    let px = 500;
                    let py = 500;
                    parchemin = this.add.image(px,py,"parchemin").setDepth(998);
                    pierre_gravee = this.add.image(px+380,py-50,"pierre_gravee").setDepth(999).setScale(0.5);
                    this.add.text(px-950, py-250, "D", {fontFamily: "berry_rotunda",fontSize: 48,color: '#8a2828'}).setDepth(999);
                    this.add.text(px-900, py-235, "istrict Nord - Le Parc de la Serna à Jumet", {fontFamily: "berry_rotunda",fontSize: 32,color: '#000000'}).setDepth(999);
                    this.add.text(px+330, py+200, "Q", {fontFamily: "berry_rotunda",fontSize: 48,color: '#8a2828'}).setDepth(999);
                    this.add.text(px+375, py+215, "uitter", {fontFamily: "berry_rotunda",fontSize: 32,color: '#000000'}).setDepth(999);
                    var DNT4_00 = this.physics.add.image(px-300, py+110, "DNT4_00").setDepth(9101).setScale(0.4);
                    var DNT4_01 = this.physics.add.image(px-850, py-40, "DNT4_01").setDepth(9101).setScale(0.7);
                    var DNT4_02 = this.physics.add.image(px-850, py+160, "DNT4_02").setDepth(9101).setScale(0.75);
                    var DNT4_03 = this.physics.add.image(px-850, py+360, "DNT4_03").setDepth(9101).setScale(1);
                    let txt = "À deux pas de l’Aéroport de Gosselies, se trouve le Parc de la Serna,";
                    this.add.text(px-650, py+380, txt, {fontFamily: "berry_rotunda",fontSize: 16,color: '#000000'}).setDepth(999);
                    txt = "un des poumons verts de la région.";
                    this.add.text(px-650, py+420, txt, {fontFamily: "berry_rotunda",fontSize: 16,color: '#000000'}).setDepth(999);
                    //======================================
                    let x = 0;  let y = 0
                    fondsNoir.setDepth(9100);
                    var sortie = this.add.rectangle(x+150,y,50, 75, 0x92623A).setDepth(9101);
                    sortie.setInteractive();
                    sortie.on("pointerup", function(){
                        DNT4_00.destroy();
                        DNT4_01.destroy();
                        DNT4_02.destroy();
                        DNT4_03.destroy();
                        sortie.destroy();
                        fondsNoir.setDepth(9000);
                    })
                }, this);  */
                //============
                //  SORTIE
                //============
                sortieN.on("pointerup", function(){
                    layer40.setDepth(40);
                    player.setDepth(25);
                    //this.minimap.visible = true;
                    fondsNoir.setDepth(1);
                    portailN.setDepth(999);
                    pierre_gravee.destroy();
                    sortieN.destroy(0);
                    if(chevaletDNP1 != undefined){chevaletDNP1.destroy(0);}
                    //parchemin.setDepth(0);                    
                }, this);
            },this);
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
        // this.updateConnectedPlayers(this, game.players, game.playersBU, player);
        // this.movePlayers(this, game.players, plId);
        // this.stopPlayers(this, game.players);
    },
    changeScene: function(nameScene, gameData){
        this.scene.start(nameScene, gameData);
    },
    centerMap: function(myPlayer){
            //console.log(playerMap[myId].x + ","+playerMap[myId].y);
            //this.cameras.main.startFollow(myPlayer);
        //this.cameras.main.follow(playerMap[myId], Phaser.Camera.FOLLOW_LOCKON);
    },showPictures: function(refPic, x, y){
        switch(refPic){
            case "DC-P1":console.log("Affichage infos DC Picture1"); break;
            case "DC-P2":break;
            case "DC-P3":break;
            case "DC-P4":break;
            case "DE-P1":break;
            case "DE-P2":break;
            case "DE-P3":break;
            case "DE-P4":break;
            case "DN-P1":
                DNT1_00.setDepth(9101);
                console.log("Affichage infos DN Picture1"); break;
            case "DN-P2":break;
            case "DN-P3":break;
            case "DN-P4":break;
            case "DO-P1":break;
            case "DO-P2":break;
            case "DO-P3":break;
            case "DO-P4":break;
            case "DS-P1":break;
            case "DS-P2":break;
            case "DS-P3":break;
            case "DS-P4":break;            
        }
    },
    showImage: function(x,y){

    },
    showText: function(x,y){

    }
});