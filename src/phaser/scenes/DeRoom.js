//config.key = "LoadScene2";
var DeRoom = new Phaser.Class({
    Extends: TemplateScene,
    initialize: function LoadScene(config){
        //Phaser.Scene.call(this, config);
        Phaser.Scene.call(this, {"key":"DeRoom"});
    },
    init: function(){
        playerMap = [];
    },
    preload: function(){
        this.load.image('set_district', '/assets/maps/set_district.png');
        this.load.tilemapTiledJSON("map_room", "/maps/district.json");
        this.load.image('sprite', '/img/sprite.png');
        this.load.image('minimap', '/img/minimap.png');
        this.load.image('chevalet_g', '/img/chevalet_g.png');
        this.load.image('chevalet_d', '/img/chevalet_d.png');
        this.load.image('portail_ferme', '/img/portail_ferme.png');
        this.load.image('portail_ouvert', '/img/portail_ouvert.png');
        // PICTURES
            // DISTRICT EST
                // this.load.image('DET1_00', '/img/visit/districtE/DE-T1/DET1_00.jpg');
                // this.load.image('DET1_01', '/img/visit/districtE/DE-T1/DET1_01.JPG');
                // this.load.image('DET1_02', '/img/visit/districtE/DE-T1/DET1_02.JPG');
                // this.load.image('DET1_03', '/img/visit/districtE/DE-T1/DET1_03.JPG');
                // this.load.image('DET1_04', '/img/visit/districtE/DE-T1/DET1_04.JPG');

                // this.load.image('DET2_00', '/img/visit/districtE/DE-T2/DET2_00.jpg');
                // this.load.image('DET2_01', '/img/visit/districtE/DE-T2/DET2_01.jpg');
                // this.load.image('DET2_02', '/img/visit/districtE/DE-T2/DET2_02.jpg');
                // this.load.image('DET2_03', '/img/visit/districtE/DE-T1/DET2_03.JPG');

                // this.load.image('DET3_00', '/img/visit/districtE/DE-T3/DET3_00.jpg');
                // this.load.image('DET3_01', '/img/visit/districtE/DE-T3/DET3_01.JPG');
                // this.load.image('DET3_02', '/img/visit/districtE/DE-T3/DET3_02.JPG');
                // this.load.image('DET3_03', '/img/visit/districtE/DE-T3/DET3_03.JPG');

                // this.load.image('DET4_00', '/img/visit/districtE/DE-T4/DET4_00.jpg');
                // this.load.image('DET4_01', '/img/visit/districtE/DE-T4/DET4_01.JPG');
                // this.load.image('DET4_02', '/img/visit/districtE/DE-T4/DET4_02.JPG');
                // this.load.image('DET4_03', '/img/visit/districtE/DE-T4/DET4_03.JPG');
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
        var map = this.add.tilemap('map_room');
        var tileset10 = map.addTilesetImage('set_district', 'set_district');
        var layer10 = map.createLayer('ground', [tileset10]).setDepth(10);
        var layer20 = map.createLayer('ground2', [tileset10]).setDepth(20);        
        var layer30 = map.createLayer('wall', [tileset10]).setDepth(30);        
        var layer40 = map.createLayer('wall2', [tileset10]).setDepth(40);        
        //==========================================
        //  AJOUT DU JOUEUR
        //==========================================
        player = this.physics.add.image(100,900,'sprite').setDepth(50).setScale(2);
        player.name = "myPlayer";
        player.setCollideWorldBounds(true);
        playerVelocity = 2;
        cursors = this.input.keyboard.createCursorKeys();
        //==========================================
        //  GESTION DE LA CAMERA
        //==========================================
        var mainCam = this.cameras.main.startFollow(player, true, 0.1, 0.1);
        var coeffZoom = 0.8;
        mainCam.setZoom(coeffZoom);
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
        //  PORTAIL EST
        //=================
            //============
            //  INIT
            //============         
            let x = 0; let y = 0; var px = 0; var py = 0; let txt = "";
            player.setDepth(9099);
            var fondsEcran = this.add.rectangle(0, 0, 12600 , 6500, 0xf4edde).setDepth(1); 
            var fontFam = "Montserrat";
            var fontSZ = 24;
            var fontSZLgd = 20;
            var colorTxt = '#000000';
            var lnSp = 10;
            var alignTxt = 'justify';
            var colTxt = px-100;
            var toDestroy = []; var toDestroy2 = []; var toDestroy3 = []; var toDestroy4 = [];
            camSubject = "room";
            var sortieE = this.physics.add.image(100,975,"portail_ouvert").setInteractive().setDepth(9100);
            var chevaletDEP1;
            var chevaletDEP2;
            var chevaletDEP3;
            var chevaletDEP4;
            //============
            //  CHEVALET 1
            //============
            // Le Terril de l’Epine à Montignies-sur-Sambre
            chevaletDEP1 = this.physics.add.image(-525,575,"chevalet_g").setInteractive().setDepth(9001);
            chevaletDEP1.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 1
                //======================================
                toDestroy.push(this.add.text(px-275, py-100, "District Est - Le Terril de l’Epine à Montignies-sur-Sambre", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy.push(this.physics.add.image(px, py+300, "DET1_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "Légende de la photo";
                toDestroy.push(this.add.text(px-400, py+650, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                        //toDestroy.push(this.physics.add.image(px-300, py+900, "DET1_01").setDepth(9101)); // Ajout image mini
                        txt = "xxx\n"; 
                        txt += "xxx\n";
                        //toDestroy.push(this.add.text(colTxt, py+770, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                        //toDestroy.push(this.physics.add.image(px-300, py+1200, "DET1_02").setDepth(9101));  // Ajout image mini
                        txt = "xxx\n";
                        //toDestroy.push(this.add.text(colTxt, py+1120, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                        //toDestroy.push(this.physics.add.image(px-300, py+1450, "DET1_03").setDepth(9101));  // Ajout image mini
                        txt = "xxx\n";
                        txt += "xxx\n";
                        //toDestroy.push(this.add.text(colTxt, py+1350, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                        //toDestroy.push(this.physics.add.image(px-300, py+1700, "DET1_04").setDepth(9101));  // Ajout image mini
                        txt = "xxx\n";
                        txt += "xxx";
                        //toDestroy.push(this.add.text(colTxt, py+1630, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                var arrayShadows = this.addShadows(toDestroy);
                arrayShadows.forEach((item) => {toDestroy.push(item);})
                camSubject = "chevalet";
                chevaletDEP1.setDepth(1);
                chevaletDEP2.setDepth(1);
                chevaletDEP3.setDepth(1);
                chevaletDEP4.setDepth(1);
                fondsEcran.setDepth(51);
                player.setDepth(1);
                player.x = 0;
                player.y = 300;
                mainCam.setZoom(1.0);
                var sortie1 = this.physics.add.image(x+50,y+2000,"portail_ferme").setDepth(9101);
                sortieE.setDepth(50);
                sortie1.setInteractive();
                sortie1.on("pointerup", function(){
                    sortie1.destroy();
                    toDestroy.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieE.setDepth(9100);
                    chevaletDEP1.setDepth(9001);
                    chevaletDEP2.setDepth(9001);
                    chevaletDEP3.setDepth(9001);
                    chevaletDEP4.setDepth(9001);
                    player.setDepth(9199);
                    player.x = 100;
                    player.y = 600;
                    camSubject = "room";
                    mainCam.setZoom(0.8);
                })
            }, this);             
            //============
            //  CHEVALET 2
            //============
            // Le Campus étudiant à Montignies-sur-Sambre
            chevaletDEP2 = this.physics.add.image(-140,380,"chevalet_g").setInteractive().setDepth(9001);
            chevaletDEP2.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 2
                //======================================
                toDestroy2.push(this.add.text(px-325, py-100, "District Est - Le Campus étudiant à Montignies-sur-Sambre", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy2.push(this.physics.add.image(px, py+300, "DET2_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "Légende de la photo";
                toDestroy2.push(this.add.text(px-200, py+650, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                        //toDestroy2.push(this.physics.add.image(px-300, py+900, "DET2_01").setDepth(9101)); // Ajout image mini
                        txt = "xxx"; 
                        txt += "xxx";
                        //toDestroy2.push(this.add.text(colTxt, py+770, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                        //toDestroy2.push(this.physics.add.image(px-300, py+1200, "DET2_02").setDepth(9101));  // Ajout image mini
                        txt = "xxx"; 
                        txt += "xxx";                    
                        //toDestroy2.push(this.add.text(colTxt, py+1120, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                        //toDestroy2.push(this.physics.add.image(px-300, py+1450, "DET2_03").setDepth(9101));  // Ajout image mini
                        txt = "xxx"; 
                        txt += "xxx";
                        //toDestroy2.push(this.add.text(colTxt, py+1350, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                        //toDestroy2.push(this.physics.add.image(px-300, py+1700, "DET2_04").setDepth(9101));  // Ajout image mini
                        txt = "xxx"; 
                        txt += "xxx";
                        //toDestroy2.push(this.add.text(colTxt, py+1630, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                var arrayShadows = this.addShadows(toDestroy2);
                arrayShadows.forEach((item) => {toDestroy2.push(item);})
                camSubject = "chevalet";
                chevaletDEP1.setDepth(1);
                chevaletDEP2.setDepth(1);
                chevaletDEP3.setDepth(1);
                chevaletDEP4.setDepth(1);
                fondsEcran.setDepth(51);
                player.setDepth(1);
                player.x = 0;
                player.y = 300;
                mainCam.setZoom(1.0);
                var sortie2 = this.physics.add.image(x+50,y+2000,"portail_ferme").setDepth(9101);
                sortieE.setDepth(50);
                sortie2.setInteractive();
                sortie2.on("pointerup", function(){
                    sortie2.destroy();
                    toDestroy2.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieE.setDepth(9100);
                    chevaletDEP1.setDepth(9001);
                    chevaletDEP2.setDepth(9001);
                    chevaletDEP3.setDepth(9001);
                    chevaletDEP4.setDepth(9001);
                    player.setDepth(9199);
                    player.x = 100;
                    player.y = 600;
                    camSubject = "room";
                    mainCam.setZoom(0.8);
                })
            }, this); 
            //============
            //  CHEVALET 3
            //============
            // Le Nouveau Grand Hôpital de Charleroi
            chevaletDEP3 = this.physics.add.image(375,380,"chevalet_d").setInteractive().setDepth(9001);
            chevaletDEP3.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 3
                //======================================
                toDestroy3.push(this.add.text(px-175, py-100, "District Est - Le Nouveau Grand Hôpital de Charleroi", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy3.push(this.physics.add.image(px, py+300, "DET3_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "Légende de la photo";
                toDestroy3.push(this.add.text(px-450, py+650, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                        //toDestroy3.push(this.physics.add.image(px-300, py+900, "DET3_01").setDepth(9101)); // Ajout image mini
                        txt = "xxx"; 
                        txt += "xxx";
                        //toDestroy3.push(this.add.text(colTxt, py+770, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                        //toDestroy3.push(this.physics.add.image(px-300, py+1200, "DET3_02").setDepth(9101));  // Ajout image mini
                        txt = "xxx"; 
                        txt += "xxx";                    
                        //toDestroy3.push(this.add.text(colTxt, py+1120, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                        //toDestroy3.push(this.physics.add.image(px-300, py+1450, "DET3_03").setDepth(9101));  // Ajout image mini
                        txt = "xxx"; 
                        txt += "xxx";
                        //toDestroy3.push(this.add.text(colTxt, py+1350, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                        //toDestroy3.push(this.physics.add.image(px-300, py+1700, "DET3_04").setDepth(9101));  // Ajout image mini
                        txt = "xxx"; 
                        txt += "xxx";
                        //toDestroy3.push(this.add.text(colTxt, py+1630, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                var arrayShadows = this.addShadows(toDestroy3);
                arrayShadows.forEach((item) => {toDestroy3.push(item);})
                camSubject = "chevalet";
                chevaletDEP1.setDepth(1);
                chevaletDEP2.setDepth(1);
                chevaletDEP3.setDepth(1);
                chevaletDEP4.setDepth(1);
                fondsEcran.setDepth(51);
                player.setDepth(1);
                player.x = 0;
                player.y = 300;
                mainCam.setZoom(1.0);
                var sortie3 = this.physics.add.image(x+50,y+2000,"portail_ferme").setDepth(9101);
                sortieE.setDepth(50);
                sortie3.setInteractive();
                sortie3.on("pointerup", function(){
                    sortie3.destroy();
                    toDestroy3.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieE.setDepth(9100);
                    chevaletDEP1.setDepth(9001);
                    chevaletDEP2.setDepth(9001);
                    chevaletDEP3.setDepth(9001);
                    chevaletDEP4.setDepth(9001);
                    player.setDepth(9199);
                    player.x = 100;
                    player.y = 600;
                    camSubject = "room";
                    mainCam.setZoom(0.8);
                })
            }, this); 
            //============
            //  CHEVALET 4
            //============
            // Le Cercle Saint-Charles à Montignies-sur-Sambre
            chevaletDEP4 = this.physics.add.image(755,575,"chevalet_d").setInteractive().setDepth(9001);
            chevaletDEP4.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 4
                //======================================
                toDestroy4.push(this.add.text(px-200, py-100, "District Est - Le Cercle Saint-Charles à Montignies-sur-Sambre", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy4.push(this.physics.add.image(px, py+300, "DET4_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "Légende de la photo";
                toDestroy4.push(this.add.text(px-300, py+650, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                        //toDestroy4.push(this.physics.add.image(px-300, py+900, "DET4_01").setDepth(9101)); // Ajout image mini
                        txt = "xxx"; 
                        txt += "xxx";
                        //toDestroy4.push(this.add.text(colTxt, py+770, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                        //toDestroy4.push(this.physics.add.image(px-300, py+1200, "DET4_02").setDepth(9101));  // Ajout image mini
                        txt = "xxx"; 
                        txt += "xxx";                    
                        //toDestroy4.push(this.add.text(colTxt, py+1120, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                        //toDestroy4.push(this.physics.add.image(px-300, py+1450, "DET4_03").setDepth(9101));  // Ajout image mini
                        txt = "xxx"; 
                        txt += "xxx";
                        //toDestroy4.push(this.add.text(colTxt, py+1350, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                        //toDestroy4.push(this.physics.add.image(px-300, py+1700, "DET4_04").setDepth(9101));  // Ajout image mini
                        txt = "xxx"; 
                        txt += "xxx";
                        //toDestroy4.push(this.add.text(colTxt, py+1630, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                var arrayShadows = this.addShadows(toDestroy4);
                arrayShadows.forEach((item) => {toDestroy4.push(item);})
                camSubject = "chevalet";
                chevaletDEP1.setDepth(1);
                chevaletDEP2.setDepth(1);
                chevaletDEP3.setDepth(1);
                chevaletDEP4.setDepth(1);
                fondsEcran.setDepth(51);
                player.setDepth(1);
                player.x = 0;
                player.y = 300;
                mainCam.setZoom(1.0);
                var sortie4 = this.physics.add.image(x+50,y+2000,"portail_ferme").setDepth(9101);
                sortieE.setDepth(50);
                sortie4.setInteractive();
                sortie4.on("pointerup", function(){
                    sortie4.destroy();
                    toDestroy4.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieE.setDepth(9100);
                    chevaletDEP1.setDepth(9001);
                    chevaletDEP2.setDepth(9001);
                    chevaletDEP3.setDepth(9001);
                    chevaletDEP4.setDepth(9001);
                    player.setDepth(9199);
                    player.x = 100;
                    player.y = 600;
                    camSubject = "room";
                    mainCam.setZoom(0.8);
                })
            }, this); 
            //============
            //  SORTIE
            //============
            sortieE.on("pointerup", function(){
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