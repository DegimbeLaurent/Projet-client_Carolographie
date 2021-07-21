//config.key = "LoadScene2";
var DsRoom = new Phaser.Class({
    Extends: TemplateScene,
    initialize: function LoadScene(config){
        //Phaser.Scene.call(this, config);
        Phaser.Scene.call(this, {"key":"DsRoom"});
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
        this.load.image('portail_socle', '/img/sol_portail.png');
        this.load.spritesheet('playersheet', '/img/simple-grey-shirt.png', {
            frameWidth: 85,
            frameHeight: 169
        });
        // PICTURES
            // DISTRICT SUD
                this.load.image('DST1_00', '/img/visit/districtS/DS-T1/DST1_00.png');
                this.load.image('DST1_01', '/img/visit/districtS/DS-T1/DST1_01.png');
                this.load.image('DST1_02', '/img/visit/districtS/DS-T1/DST1_02.png');
                this.load.image('DST1_03', '/img/visit/districtS/DS-T1/DST1_03.png');
                // this.load.image('DST1_04', '/img/visit/districtS/DS-T1/DST1_04.png');

                this.load.image('DST2_00', '/img/visit/districtS/DS-T2/DST2_00.png');
                this.load.image('DST2_01', '/img/visit/districtS/DS-T2/DST2_01.png');
                this.load.image('DST2_02', '/img/visit/districtS/DS-T2/DST2_02.png');
                this.load.image('DST2_03', '/img/visit/districtS/DS-T2/DST2_03.png');

                this.load.image('DST3_00', '/img/visit/districtS/DS-T3/DST3_00.png');
                this.load.image('DST3_01', '/img/visit/districtS/DS-T3/DST3_01.png');
                this.load.image('DST3_02', '/img/visit/districtS/DS-T3/DST3_02.png');
                this.load.image('DST3_03', '/img/visit/districtS/DS-T3/DST3_03.png');

                this.load.image('DST4_00', '/img/visit/districtS/DS-T4/DST4_00.png');
                this.load.image('DST4_01', '/img/visit/districtS/DS-T4/DST4_01.png');
                this.load.image('DST4_02', '/img/visit/districtS/DS-T4/DST4_02.png');
                this.load.image('DST4_03', '/img/visit/districtS/DS-T4/DST4_03.png');
        // SONS & BRUITAGES
        this.load.audio('course', '/assets/sounds/course.mp3');
        this.load.audio('campagne', '/assets/sounds/ambiance_campagne.mp3');
        this.load.audio('feu', '/assets/sounds/feu.mp3');
        this.load.audio('portail', '/assets/sounds/portail.mp3');
        // BARRES COLLISIONS
        this.load.image('cb25-25', '/img/collisions/cb25-25.png');
        this.load.image('cb50-50', '/img/collisions/cb50-50.png');
        this.load.image('cb100-100', '/img/collisions/cb100-100.png');
        this.load.image('cb250-250', '/img/collisions/cb250-250.png');
        this.load.image('cb500-500', '/img/collisions/cb500-500.png');
    },
    create: function(config){
        game.backgroundColor='#000000';
        //==========================================
        //  AJOUT DES SONS
        //==========================================
        bruit_course = this.sound.add("course", { loop: true });
        bruit_course.allowMultiple = false;
        bruit_ambiance = this.sound.add("campagne", { loop: true });
        bruit_ambiance.allowMultiple = false;
        // bruit_ambiance.play();
        bruit_feu = this.sound.add("feu", { loop: true });
        bruit_feu.allowMultiple = false;
        bruit_feu.play();
        bruit_portail = this.sound.add("portail", { loop: false });
        bruit_portail.allowMultiple = false;
        bruit_portail.play();
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
        
        var layer23 = map.createLayer('tapis', [tileset10]).setDepth(23);  
        var layer26 = map.createLayer('tapis2', [tileset10]).setDepth(26);  

        var layer30 = map.createLayer('wall', [tileset10]).setDepth(30);        
        var layer40 = map.createLayer('wall2', [tileset10]).setDepth(40);        

        var layer50 = map.createLayer('chaise2', [tileset10]).setDepth(41);        
        var layer60 = map.createLayer('meuble', [tileset10]).setDepth(43);        
        var layer70 = map.createLayer('chaise', [tileset10]).setDepth(44);        
        var layer80 = map.createLayer('lampe', [tileset10]).setDepth(45);        
        //==========================================
        //  AJOUT DU JOUEUR
        //==========================================
        this.player = this.physics.add.sprite(100,900,'playersheet').setDepth(49).setScale(0.7);
        this.anims.create({key:'left',frames: this.anims.generateFrameNumbers('playersheet', {start: 30,end: 35}),frameRate: 10,repeat: -1});
        this.anims.create({key:'right',frames: this.anims.generateFrameNumbers('playersheet', {start: 6,end: 11}),frameRate: 10,repeat: -1});
        this.anims.create({key:'up',frames: this.anims.generateFrameNumbers('playersheet', {start: 18,end: 23}),frameRate: 10,repeat: -1});
        this.anims.create({key:'down',frames: this.anims.generateFrameNumbers('playersheet', {start: 36,end: 41}),frameRate: 10,repeat: -1});
        this.anims.create({key:'diagLUp',frames: this.anims.generateFrameNumbers('playersheet', {start: 24,end: 29}),frameRate: 10,repeat: -1});
        this.anims.create({key:'diagLDown',frames: this.anims.generateFrameNumbers('playersheet', {start: 42,end: 47}),frameRate: 10,repeat: -1});
        this.anims.create({key:'diagRUp',frames: this.anims.generateFrameNumbers('playersheet', {start: 12,end: 17}),frameRate: 10,repeat: -1});
        this.anims.create({key:'diagRDown',frames: this.anims.generateFrameNumbers('playersheet', {start: 0,end: 5}),frameRate: 10,repeat: -1});            
        this.anims.create({key: 'turn',frames: [{key: 'playersheet',frame: 45}],frameRate: 20})
        this.player.name = "myPlayer";
        playerVelocity = 2;
        this.player.body.setVelocity(1,2).setBounce(1, 1).setCollideWorldBounds(true);
        cursors = this.input.keyboard.createCursorKeys();
        //==========================================
        //  AJOUT DES COLLISIONS
        //==========================================
        // this.input.on('pointerup', function (pointer) {
        //     if (pointer.leftButtonReleased()) {
        //         console.log("["+Math.round(pointer.worldX)+"-"+Math.round(pointer.worldY)+"]");
        //     }
        // }, this);
        // Murs
            this.addHitboxDiag(150,175,50,25,25,23); // Mur nord
            this.addHitboxDiag(-1000,740,50,-25,25,23); // Mur ouest
            this.addHitboxDiag(-1000,850,50,25,25,23); // Mur Sud
            this.addHitboxDiag(150,1400,50,-25,25,23); // Mur Est
        // Mobilier
            let chaises = [[925,790,25],[915,840,25],[70,540,25],[185,540,25]];
            this.addHitbox(chaises);
            let tables = [[-820,690,25],[-760,710,25],[-720,670,25],[210,280,25],[260,310,25],[320,310,25],[-195,770,25],[-105,750,50],[-65,745,25],[450,770,25],[320,740,25],[360,740,50]];
            this.addHitbox(tables);
            let coffres = [[1075,660,25],[1030,660,25],[-315,410,25],[-260,400,25],[150,210,25]];
            this.addHitbox(coffres);
            let lampes = [[120,520,25],[120,490,25],[510,1145,25],[510,1100,25],[-255,1145,25],[-255,1100,25],[-890,820,25],[-580,600,25],[-510,560,25]];
            this.addHitbox(lampes);
            let chevalets = [[-490,730,25],[-525,755,25],[-115,540,25],[-145,560,25],[370,540,25],[400,560,25],[740,730,25],[785,755,25]];
            this.addHitbox(chevalets);
            let armoires = [[-170,340,25],[-130,310,25],[-420,460,25],[-390,450,25],[375,310,25],[415,340,25],[450,325,25]];
            this.addHitbox(armoires);
            let feuOuvert = [[750,540,25],[790,520,25],[700,530,25],[650,520,25],[620,510,25]];
            this.addHitbox(feuOuvert);
            let divers = [[1275,780,25]];
            this.addHitbox(divers);
        //==========================================
        //  GESTION DE LA CAMERA
        //==========================================
        var mainCam = this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
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
        //  PORTAIL SUD
        //=================
            //============
            //  INIT
            //============         
            let x = 0; let y = 0; var px = 0; var py = 0; let txt = "";
            //this.player.setDepth(9099);
            resetPlayer = false;
            centerPlayer = false;
            lecture = false;
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
            //var sortieS = this.physics.add.image(100,975,"portail_ouvert").setInteractive().setDepth(9100);
            //===
            var sortieS_socle = this.physics.add.image(100,975,"portail_socle").setInteractive().setDepth(24);
            sortieS = this.physics.add.image(100,975,"portail_ferme").setInteractive().setDepth(999);
            sortieS.name = "s";
            this.physics.add.overlap(sortieS,this.player,this.closeToPortail,()=>{},this);
            var activePtS = this.physics.add.sprite(100,1045,"cb25-25").setDepth(999).setBounce(1,1).setCollideWorldBounds(true).setImmovable(true);
            activePtS.name = "s";
            this.physics.add.collider(activePtS, this.player,this.hitPortail,()=>{},this);
            //===
            posSortie = 1500;
            var chevaletDSP1;
            var chevaletDSP2;
            var chevaletDSP3;
            var chevaletDSP4;
            //============
            //  CHEVALET 1
            //============
            // Le Musée de la Photographie à Mont-sur-Marchienne
            chevaletDSP1 = this.physics.add.image(-520,700,"chevalet_g").setInteractive().setDepth(9001);
            chevaletDSP1.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 1
                //======================================
                toDestroy.push(this.add.text(px-325, py-100, "District Sud - Le Centre de délassement de Marcinelle", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy.push(this.physics.add.image(px, py+300, "DST1_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "Le Bois du Prince et le centre de délassement de Marcinelle, \nle dépaysement garanti à quelques minutes en voiture du Charleroi.";
                toDestroy.push(this.add.text(px-475, py+650, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                        toDestroy.push(this.physics.add.image(px-300, py+890, "DST1_01").setDepth(9101)); // Ajout image mini
                        txt = "Un peu au nord du hameau Bultia, ce site est une vaste \nétendue verte. Son caractère bucolique remonte à plusieurs \ndécennies. Dans les années 50, l’échevin de Marcinelle, \nLucien Harmegnies, souhaite préserver ces espaces \nde l’urbanisation.\n"; 
                        txt += "\nLa décision d’aménager un espace de loisirs est prise.\n";
                        toDestroy.push(this.add.text(colTxt, py+770, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                        toDestroy.push(this.physics.add.image(px-300, py+1200, "DST1_02").setDepth(9101));  // Ajout image mini
                        txt = "Des architectes locaux participent à l’élaboration du projet. \nD’ailleurs, le quartier du Chêniat à Loverval regorge \nde villas art déco imaginées par Jacques Depelsenaire, \nMarcel Leborgne, …\n";
                        txt += "À la suite des discussions, un complexe de récréation sportive \net culturel est imaginé.";
                        txt += "Il est composé de terrains de tennis, \nd’un minigolf et d’un espace aquatique. Par ailleurs,";
                        txt += "le site \nregorge de lieux dits comme le site des Templiers, \nla carrière de Borgnery ou la Grotte des Sarrasins.\n";
                        toDestroy.push(this.add.text(colTxt, py+1075, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                        toDestroy.push(this.physics.add.image(px-300, py+1575, "DST1_03").setDepth(9101));  // Ajout image mini
                        txt = "Ces derniers temps, nous avons adoré nous balader \ndans les zones humides. Autour du ruisseau du Fond des Haies, ces zones, \nsituées à l’interface entre milieux terrestres et aquatiques, \nprésentent une biodiversité incroyable.\n";
                        txt += "\nPour le plaisir des promeneurs, \nl’ASBL Charleroi Nature y a installé des pancartes \nexplicatives, des passerelles, … \net les espaces sont bien entretenus.\n";
                        toDestroy.push(this.add.text(colTxt, py+1450, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                        //toDestroy.push(this.physics.add.image(px-300, py+1700, "DST1_04").setDepth(9101));  // Ajout image mini
                        // txt = "xxx\n";
                        // txt += "xxx";
                        //toDestroy.push(this.add.text(colTxt, py+1630, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                bruit_feu.stop();
                bruit_ambiance.play();
                centerPlayer = true;
                lecture = true;
                var arrayShadows = this.addShadows(toDestroy);
                arrayShadows.forEach((item) => {toDestroy.push(item);})
                camSubject = "chevalet";
                chevaletDSP1.setDepth(1).disableInteractive();
                chevaletDSP2.setDepth(1).disableInteractive();
                chevaletDSP3.setDepth(1).disableInteractive();
                chevaletDSP4.setDepth(1).disableInteractive();
                activePtS.body.enable = false;
                fondsEcran.setDepth(51);
                // player.setDepth(1);
                // player.x = 0;
                // player.y = 300;
                mainCam.setZoom(1.0);
                var sortie1 = this.physics.add.image(x+50,y+2000,"portail_ferme").setDepth(9101);
                posSortie = sortie1.y;
                sortieS.setDepth(50);
                sortie1.setInteractive();
                sortie1.on("pointerup", function(){
                    bruit_ambiance.stop();
                    bruit_feu.play();
                    sortie1.destroy();
                    toDestroy.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieS.setDepth(9100);
                    chevaletDSP1.setDepth(9001).setInteractive();
                    chevaletDSP2.setDepth(9001).setInteractive();
                    chevaletDSP3.setDepth(9001).setInteractive();
                    chevaletDSP4.setDepth(9001).setInteractive();
                    activePtS.body.enable = true;
                    // player.setDepth(9199);
                    // player.x = 100;
                    // player.y = 600;
                    camSubject = "room";
                    mainCam.setZoom(0.8);
                    resetPlayer = true;
                    centerPlayer = false;
                    lecture = false;
                    localStorage.setItem("repop",[-525,825]);
                })
            }, this);             
            //============
            //  CHEVALET 2
            //============
            // Le Bois du Cazier à Marcinelle
            chevaletDSP2 = this.physics.add.image(-140,510,"chevalet_g").setInteractive().setDepth(9001);
            chevaletDSP2.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 2
                //======================================
                toDestroy2.push(this.add.text(px-325, py-100, "District Sud - Les Espaces Composite à Marcinelle", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy2.push(this.physics.add.image(px, py+300, "DST2_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "Composite, espaces créatifs partagés, est une communauté de créateurs localisée dans une ancienne menuiserie à Marcinelle.";
                toDestroy2.push(this.add.text(px-495, py+650, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                        toDestroy2.push(this.physics.add.image(px-300, py+870, "DST2_01").setDepth(9101)); // Ajout image mini
                        txt = "Réseau solidaire, Composite réunit des créateurs \nde divers horizons.\n"; 
                        txt += "En plus de proposer des espaces de travail à des indépendants, \n\'Composite\' est une véritable communauté dans laquelle \nchacun est invité à se nourrir des expériences et savoir-faire \nde chacun et de partager les siens.\n";
                        toDestroy2.push(this.add.text(colTxt, py+770, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                        toDestroy2.push(this.physics.add.image(px-300, py+1150, "DST2_02").setDepth(9101));  // Ajout image mini
                        txt = "\nDans ce secteur créatif alternatif de Charleroi, \nune trentaine de personnes se côtoient. Du peintre \nà la bijoutière, en passant par le menuisier, le ferronnier, \nla couturière ou l’architecte paysagiste, les créateurs vivent \nleur passion dans des ateliers partagés de près de 1.000 m².\n"; 
                        // txt += "xxx";                    
                        toDestroy2.push(this.add.text(colTxt, py+975, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                        toDestroy2.push(this.physics.add.image(px-300, py+1425, "DST2_03").setDepth(9101));  // Ajout image mini
                        txt = "\nComme vous pouvez le voir sur les photos, \nnous avons eu la chance de rencontrer des acteurs du projet. \nNous avons notamment été touchés par la patience du travail\nde Marianne dans sa Roulotte …\n "; 
                        // txt += "\n";
                        toDestroy2.push(this.add.text(colTxt, py+1175, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                        // toDestroy2.push(this.physics.add.image(px-300, py+1700, "DST2_04").setDepth(9101));  // Ajout image mini
                        txt = "\net par la bonne humeur et le sérieux qui résident dans les bureaux\ndes architectes paysagistes de Landsign.\n"; 
                        // txt += "xxx";
                        toDestroy2.push(this.add.text(colTxt, py+1350, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                centerPlayer = true;
                lecture = true;
                var arrayShadows = this.addShadows(toDestroy2);
                arrayShadows.forEach((item) => {toDestroy2.push(item);})
                camSubject = "chevalet";
                chevaletDSP1.setDepth(1).disableInteractive();
                chevaletDSP2.setDepth(1).disableInteractive();
                chevaletDSP3.setDepth(1).disableInteractive();
                chevaletDSP4.setDepth(1).disableInteractive();
                activePtS.body.enable = false;
                fondsEcran.setDepth(51);
                // player.setDepth(1);
                // player.x = 0;
                // player.y = 300;
                mainCam.setZoom(1.0);
                var sortie2 = this.physics.add.image(x+50,y+2000,"portail_ferme").setDepth(9101);
                posSortie = sortie2.y;
                sortieS.setDepth(50);
                sortie2.setInteractive();
                sortie2.on("pointerup", function(){
                    sortie2.destroy();
                    toDestroy2.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieS.setDepth(9100);
                    chevaletDSP1.setDepth(9001).setInteractive();
                    chevaletDSP2.setDepth(9001).setInteractive();
                    chevaletDSP3.setDepth(9001).setInteractive();
                    chevaletDSP4.setDepth(9001).setInteractive();
                    activePtS.body.enable = true;
                    // player.setDepth(9199);
                    // player.x = 100;
                    // player.y = 600;
                    camSubject = "room";
                    mainCam.setZoom(0.8);
                    resetPlayer = true;
                    lecture = false;
                    localStorage.setItem("repop",[-145,630]);
                })
            }, this); 
            //============
            //  CHEVALET 3
            //============
            // Le Centre de délassement de Marcinelle
            chevaletDSP3 = this.physics.add.image(375,510,"chevalet_d").setInteractive().setDepth(9001);
            chevaletDSP3.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 3
                //======================================
                toDestroy3.push(this.add.text(px-275, py-100, "District Sud - Le Bois du Cazier à Marcinelle", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy3.push(this.physics.add.image(px, py+300, "DST3_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "« J’aime ces travailleurs animant nos rivages, \net le chant des mineurs égayant nos villages après leurs durs labeurs »";
                toDestroy3.push(this.add.text(px-450, py+650, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                        toDestroy3.push(this.physics.add.image(px-300, py+900, "DST3_01").setDepth(9101)); // Ajout image mini
                        txt = "Il est difficile d’exprimer le sentiment que l’on ressent \nen se baladant sur ce site emblématique du Pays Noir.\n"; 
                        txt += "De la grille à l’entrée jusqu’aux chevalements, on \npense aux centaines de milliers de personnes qui ont \ntout quitté du jour au lendemain pour travailler dans \nles charbonnages belges … \n";
                        txt += "\nLe 8 août 1956,\n";
                        txt += "262 personnes, descendues dans les profondeurs de la mine, \nne reverront jamais la lumière du jour. \nLa photo à gauche est une photo capturée par Camille Detraux, \nle jour de la catastrophe. ";
                        txt += "Suite à cet événement, \nl’Italie décide de suspendre les accords charbon avec \nla Belgique.";
                        toDestroy3.push(this.add.text(colTxt, py+750, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                        toDestroy3.push(this.physics.add.image(px-300, py+1225, "DST3_02").setDepth(9101));  // Ajout image mini
                        txt = "Par la suite, de plus en plus de sites miniers ferment \nleurs portes."; 
                        txt += "Le Bois du Cazier arrête de fonctionner en 1967 et \ntombe dans l’abandon. \n";   
                        txt += " Gravé dans la mémoire collective des carolos, \nun projet de revalorisation voit le jour dans les années 90. \nLe musée ouvre en 2002.\n";                 
                        toDestroy3.push(this.add.text(colTxt, py+1250, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                        toDestroy3.push(this.physics.add.image(px-300, py+1550, "DST3_03").setDepth(9101));  // Ajout image mini
                        txt = "Inscrit au Patrimoine mondial de l’UNESCO, le site est \ndevenu un site de mémoire sur lequel on retrouve 5 espaces: \nles terrils, l’espace 8 août 1956 en souvenir de la \ncatastrophe, le musée de l’industrie, le musée du verre et \nles ateliers.\n"; 
                        // txt += "xxx\n";
                        toDestroy3.push(this.add.text(colTxt, py+1500, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                        // toDestroy3.push(this.physics.add.image(px-300, py+1700, "DST3_04").setDepth(9101));  // Ajout image mini
                        // txt = "Et c’est surtout un lieu à découvrir pour en apprendre plus sur \nl’histoire du Pays Noir et de ses habitants.\n"; 
                        txt = "\nÀ travers cet article, nous souhaitons saluer tous nos proches \ndont les grands-parents ont travaillé \ndans les charbonnages et les industries carolos. \nSans eux, nos vies seraient bien différentes.\n";
                        toDestroy3.push(this.add.text(colTxt, py+1655, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                centerPlayer = true;
                lecture = true;
                var arrayShadows = this.addShadows(toDestroy3);
                arrayShadows.forEach((item) => {toDestroy3.push(item);})
                camSubject = "chevalet";
                chevaletDSP1.setDepth(1).disableInteractive();
                chevaletDSP2.setDepth(1).disableInteractive();
                chevaletDSP3.setDepth(1).disableInteractive();
                chevaletDSP4.setDepth(1).disableInteractive();
                activePtS.body.enable = false;
                fondsEcran.setDepth(51);
                // player.setDepth(1);
                // player.x = 0;
                // player.y = 300;
                mainCam.setZoom(1.0);
                var sortie3 = this.physics.add.image(x+50,y+2000,"portail_ferme").setDepth(9101);
                posSortie = sortie3.y;
                sortieS.setDepth(50);
                sortie3.setInteractive();
                sortie3.on("pointerup", function(){
                    sortie3.destroy();
                    toDestroy3.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieS.setDepth(9100);
                    chevaletDSP1.setDepth(9001).setInteractive();
                    chevaletDSP2.setDepth(9001).setInteractive();
                    chevaletDSP3.setDepth(9001).setInteractive();
                    chevaletDSP4.setDepth(9001).setInteractive();
                    activePtS.body.enable = true;
                    // player.setDepth(9199);
                    // player.x = 100;
                    // player.y = 600;
                    camSubject = "room";
                    mainCam.setZoom(0.8);
                    resetPlayer = true;
                    lecture = false;
                    localStorage.setItem("repop",[375,630]);
                })
            }, this); 
            //============
            //  CHEVALET 4
            //============
            // Les Espaces Composite à Marcinelle
            chevaletDSP4 = this.physics.add.image(755,700,"chevalet_d").setInteractive().setDepth(9001);
            chevaletDSP4.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 4
                //======================================
                toDestroy4.push(this.add.text(px-425, py-100, "District Sud - Le Musée de la Photographie à Mont-sur-Marchienne", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy4.push(this.physics.add.image(px, py+300, "DST4_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "Le plus grand Musée d’Europe dédié à la Photographie se trouve dans l’ancien Carmel de Mont-sur-Marchienne.";
                toDestroy4.push(this.add.text(px-450, py+635, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                        toDestroy4.push(this.physics.add.image(px-300, py+925, "DST4_01").setDepth(9101)); // Ajout image mini
                        txt = "L’histoire du Carmel remonte au 19ème siècle quand le \nCarmel de Tournai souhaite ériger un monastère dans la région.\n"; 
                        txt += "C’est à Charleroi que la communauté de sœurs s’implante \nd’abord.\n";
                        txt += "\nPar la suite, un espace vert sur lequel se trouve le château \nd’un industriel, attire l’attention des Carmélites.\n"; 
                        toDestroy4.push(this.add.text(colTxt, py+795, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                        toDestroy4.push(this.physics.add.image(px-300, py+1350, "DST4_02").setDepth(9101));  // Ajout image mini
                        txt = "Elles achètent la propriété, y construisent un Carmel \nnéogothique en briques pour emménager en 1888. Après avoir \nvécu là pendant presque un siècle, les religieuses \nvendent le monastère."; 
                        txt += " La commune de Mont-sur-Marchienne \ndevient alors propriétaire.\n";                    
                        toDestroy4.push(this.add.text(colTxt, py+1120, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                        toDestroy4.push(this.physics.add.image(px-300, py+1650, "DST4_03").setDepth(9101));  // Ajout image mini
                        txt = "Dans les années 70, une ASBL prend de plus en plus \nd’importance à Charleroi … c’est l’ASBL \n\'Photographie ouverte\' qui avait regroupé une collection \nde photos et de matériels photographiques. \nOn y voit l’opportunité de créer un musée consacré à \nla photographie sur le site de l’ancien Carmel.\n"; 
                        txt += "\nInauguré en 1987, le musée est devenu le plus grand musée \nd’Europe dédié à la photographie.\n";
                        toDestroy4.push(this.add.text(colTxt, py+1350, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                        //toDestroy4.push(this.physics.add.image(px-300, py+1700, "DST4_04").setDepth(9101));  // Ajout image mini
                        txt = "Possédant une collection de plus de 80 000 photos, \n1,5 millions de négatifs et 4000 appareils \nphotographiques, il propose de découvrir une dizaine \nd’expositions permanentes et d’autres temporaires.\n"; 
                        txt += "C’est une vraie mine d’or pour les amateurs et \nles photographes en quête d’inspiration!";
                        toDestroy4.push(this.add.text(colTxt, py+1660, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                centerPlayer = true;
                lecture = true;
                var arrayShadows = this.addShadows(toDestroy4);
                arrayShadows.forEach((item) => {toDestroy4.push(item);})
                camSubject = "chevalet";
                chevaletDSP1.setDepth(1).disableInteractive();
                chevaletDSP2.setDepth(1).disableInteractive();
                chevaletDSP3.setDepth(1).disableInteractive();
                chevaletDSP4.setDepth(1).disableInteractive();
                activePtS.body.enable = false;
                fondsEcran.setDepth(51);
                // player.setDepth(1);
                // player.x = 0;
                // player.y = 300;
                mainCam.setZoom(1.0);
                var sortie4 = this.physics.add.image(x+50,y+2000,"portail_ferme").setDepth(9101);
                posSortie = sortie4.y;
                sortieS.setDepth(50);
                sortie4.setInteractive();
                sortie4.on("pointerup", function(){
                    sortie4.destroy();
                    toDestroy4.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieS.setDepth(9100);
                    chevaletDSP1.setDepth(9001).setInteractive();
                    chevaletDSP2.setDepth(9001).setInteractive();
                    chevaletDSP3.setDepth(9001).setInteractive();
                    chevaletDSP4.setDepth(9001).setInteractive();
                    activePtS.body.enable = true;
                    // player.setDepth(9199);
                    // player.x = 100;
                    // player.y = 600;
                    camSubject = "room";
                    mainCam.setZoom(0.8);
                    resetPlayer = true;
                    lecture = false;
                    localStorage.setItem("repop",[785,825]);
                })
            }, this); 
            //============
            //  SORTIE
            //============
            sortieS.on("pointerup", function(){
                if(camSubject == "room"){
                    localStorage.setItem("insideRoom", false);
                    localStorage.setItem("repop",[-1300,3390]);
                    Client.socket.emit("goOutRoom");
                    Client.socket.on("okGoOutRoom", function(){
                        location.href = '/website/visite.html';
                    });
                };            
            }, this);
        },
        update: function(time, delta){
            if(localStorage.getItem("touchingPt")){
                if(!this.physics.overlap(this.player,sortieS)){
                    sortieS.setTexture("portail_ferme");
                    localStorage.setItem("touchingPt",false);
                }
            }
            if(resetPlayer == true){
                let repop = localStorage.getItem("repop").split(",");
                let repopX =parseInt(repop[0]);
                let repopY =parseInt(repop[1]);
                this.player.x = repopX;
                this.player.y = repopY;
                resetPlayer = false;
            }
            if(centerPlayer == true){
                this.player.x = 100;
                this.player.y = 300;
                centerPlayer = false;
            }
            controls.update(delta);
            const speed = 500;
            const prevVelocity = this.player.body.velocity.clone();
            let plId = parseInt(localStorage.getItem("playerId"));
            if(lecture){
                if (cursors.up.isDown){
                    this.player.y -= Math.round(playerVelocity*3);
                    Client.socket.emit('click', { id: plId, x: this.player.x, y: this.player.y });
                }else if (cursors.down.isDown && posSortie >= this.player.y){
                    //console.log(posSortie + " - " + this.player.y);
                    this.player.y += Math.round(playerVelocity*3);
                    Client.socket.emit('click', { id: plId, x: this.player.x, y: this.player.y })
                }      
                bruit_course.stop();          
            }else{
                if(cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown){
                    if (cursors.left.isDown){
                        if(cursors.up.isDown){
                            //if(!cursors.right.isDown && !cursors.down.isDown){this.player.body.setVelocityX(-speed);}
                            if(!cursors.right.isDown && !cursors.down.isDown){this.player.body.setVelocityX(-speed);}
                        }else if(cursors.down.isDown){
                            if(!cursors.right.isDown){this.player.body.setVelocityY(speed);}
                        }else{
                            this.player.body.setVelocityX(-speed);                 
                            this.player.body.setVelocityY(speed);
                        }
                        Client.socket.emit('click', { id: plId, x: this.player.x, y: this.player.y })
                    }
                    if (cursors.right.isDown){
                        if(cursors.up.isDown){   
                            if(!cursors.left.isDown && !cursors.down.isDown){this.player.body.setVelocityY(-speed);}
                        }else if(cursors.down.isDown){
                            if(!cursors.left.isDown){this.player.body.setVelocityX(speed);}
                        }else{
                            this.player.body.setVelocityX(speed);
                            this.player.body.setVelocityY(-speed);
                        }
                        Client.socket.emit('click', { id: plId, x: this.player.x, y: this.player.y })
                    }
                    if (cursors.up.isDown){
                        if(!cursors.left.isDown && !cursors.right.isDown){
                            this.player.body.setVelocityX(-speed);
                            this.player.body.setVelocityY(-speed);
                            Client.socket.emit('click', { id: plId, x: this.player.x, y: this.player.y })
                        }
                    }
                    if (cursors.down.isDown){
                        if(!cursors.left.isDown && !cursors.right.isDown){
                            this.player.body.setVelocityX(speed);
                            this.player.body.setVelocityY(speed);
                            Client.socket.emit('click', { id: plId, x: this.player.x, y: this.player.y })
                        }
                    }   
                }
                this.player.body.velocity.normalize().scale(speed);
                if(cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown){
                    if (cursors.left.isDown){
                        if(cursors.up.isDown){
                            if(!cursors.right.isDown && !cursors.down.isDown){this.player.anims.play('diagLUp', true);}
                        }else if(cursors.down.isDown){
                            if(!cursors.right.isDown){this.player.anims.play('diagLDown', true);}
                        }else{this.player.anims.play('left', true);}
                    }
                    if (cursors.right.isDown){
                        if(cursors.up.isDown){   
                            if(!cursors.left.isDown && !cursors.down.isDown){this.player.anims.play('diagRUp', true);}
                        }else if(cursors.down.isDown){
                            if(!cursors.left.isDown){this.player.anims.play('diagRDown', true);}
                        }else{this.player.anims.play('right', true);}
                    }
                    if (cursors.up.isDown){
                        if(!cursors.left.isDown && !cursors.right.isDown){this.player.anims.play('up', true);}
                    }
                    if (cursors.down.isDown){
                        if(!cursors.left.isDown && !cursors.right.isDown){this.player.anims.play('down', true);}
                    }   
                }else{
                    this.player.setVelocityX(0);
                    this.player.setVelocityY(0);
                    this.player.anims.stop();
                    bruit_course.play();  
                    //if(prevVelocity.x < 0){this.player.anims.play('turn');}       
                }
            }
            var mousePointer = this.input.activePointer;
            game.players = this.removeDisconnectedPlayers(this, game.players);
            this.movePlayers(this, game.players, plId);
        },
        changeScene: function(nameScene, gameData){
            this.scene.start(nameScene, gameData);
        },
        hitPortail: function(portail){
            localStorage.setItem("insideRoom", true);
                localStorage.setItem("repop",[-1300,3390]);
                Client.socket.emit("enterRoom");
                Client.socket.on("okEnterRoom", function(){location.href = '/website/visite.html';});
        },
        closeToPortail: function(portail){
            sortieS.setTexture("portail_ouvert");
            localStorage.setItem("touchingPt",true);
        }
});