var LoadScene = new Phaser.Class({
    Extends: TemplateScene,
    initialize: function LoadScene(config){
        Phaser.Scene.call(this, config);
        //Phaser.Scene.call(this, {"key":"LoadScene"});
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
        this.load.image('portail_ferme', '/img/portail_ferme.png');
        this.load.image('portail_ouvert', '/img/portail_ouvert.png');
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
        //this.minimap.visible = false;
        //==========================================
        //  AJOUT DES PORTAILS
        //==========================================
        var fondsNoir = this.add.rectangle(0, 0, 12600 , 6500, 0x000000).setDepth(1);   
        //=================
        //  PORTAIL NORD
        //=================
        // console.log("Scene A");
        // var buttonTest = this.add.rectangle(100,100, 30, 30, 0xaabb22).setDepth(9101).setInteractive();
        // buttonTest.on("pointerup", function(){
        //     window.open("http://www.google.com", "_blank");
        //     console.log("on clique sur le bouton!...");
        // });
        // var testText = this.add.text(100,200,"Aujourd’hui, des stigmates de l’incendie y sont encore visibles, \ncomme en témoignent les photos. On vous invite à regarder notamment les photos du bois brûlé de l’escalier signe du l’endroit où la propagation des flammes a pu être interrompue. ").setDepth(9101);
        // testText.lines = 5;
        // testText.width = 250;
        // testText.setTextBounds(100,200,200,400);
        //this.graphics.strokeRect(100,200,200,400);
        //var portailN = this.add.rectangle(0, 0, 50, 75, 0x92623A).setDepth(999).setInteractive();
        var portailN = this.physics.add.image(130,730,"portail_ferme").setInteractive().setDepth(999);
        portailN.on("pointerup", function(){
            localStorage.setItem("insideRoom", true);
            Client.socket.emit("enterRoom");
            Client.socket.on("okEnterRoom", function(){
                location.href = '/website/portail-n.html';
            });
        })    
        var portailC = this.physics.add.image(540,1790,"portail_ferme").setInteractive().setDepth(999);
        portailC.on("pointerup", function(){
            localStorage.setItem("insideRoom", true);
            Client.socket.emit("enterRoom");
            Client.socket.on("okEnterRoom", function(){
                location.href = '/website/portail-c.html';
            });
        }) 
        var portailO = this.physics.add.image(-2040,1550,"portail_ferme").setInteractive().setDepth(999);
        portailO.on("pointerup", function(){
            localStorage.setItem("insideRoom", true);
            Client.socket.emit("enterRoom");
            Client.socket.on("okEnterRoom", function(){
                location.href = '/website/portail-o.html';
            });
        }) 
        var portailE = this.physics.add.image(140,2650,"portail_ferme").setInteractive().setDepth(999);
        portailE.on("pointerup", function(){
            localStorage.setItem("insideRoom", true);
            Client.socket.emit("enterRoom");
            Client.socket.on("okEnterRoom", function(){
                location.href = '/website/portail-e.html';
            });
        })         
        var portailS = this.physics.add.image(-1150,3290,"portail_ferme").setInteractive().setDepth(999);
        portailS.on("pointerup", function(){
            localStorage.setItem("insideRoom", true);
            Client.socket.emit("enterRoom");
            Client.socket.on("okEnterRoom", function(){
                location.href = '/website/portail-s.html';
            });
        }) 
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
        this.updateConnectedPlayers(this, game.players, game.playersBU, player);
        this.movePlayers(this, game.players, plId);
        this.stopPlayers(this, game.players);
    },
    changeScene: function(nameScene, gameData){
        this.scene.start(nameScene, gameData);
    }
});