//config.key = "LoadScene2";
var DeRoom = new Phaser.Class({
    Extends: TemplateScene,
    initialize: function LoadScene(config) {
        //Phaser.Scene.call(this, config);
        Phaser.Scene.call(this, { "key": "DeRoom" });
    },
    init: function () {
        playerMap = [];
    },
    preload: function () {
        this.load.image('set_district', '/assets/maps/set_district.png');
        this.load.tilemapTiledJSON("map_room", "/maps/district.json");
        this.load.image('sprite', '/img/sprite.png');
        this.load.image('minimap', '/img/minimap.png');
        this.load.image('chevalet_g', '/img/chevalet_g.png');
        this.load.image('chevalet_d', '/img/chevalet_d.png');
        this.load.image('portail_ferme', '/img/portail_ferme.png');
        this.load.image('portail_ouvert', '/img/portail_ouvert.png');
        this.load.spritesheet('playersheet', '/img/simple-grey-shirt.png', {
            frameWidth: 85,
            frameHeight: 169
        });
        // PICTURES
        // DISTRICT EST
        this.load.image('DET1_00', '/img/visit/districtE/DE-T1/DET1_00.jpg');
        this.load.image('DET1_01', '/img/visit/districtE/DE-T1/DET1_01.jpg');
        this.load.image('DET1_02', '/img/visit/districtE/DE-T1/DET1_02.jpg');
        this.load.image('DET1_03', '/img/visit/districtE/DE-T1/DET1_03.jpg');
        this.load.image('DET1_04', '/img/visit/districtE/DE-T1/DET1_04.jpg');

        this.load.image('DET2_00', '/img/visit/districtE/DE-T2/DET2_00.jpg');
        this.load.image('DET2_01', '/img/visit/districtE/DE-T2/DET2_01.jpg');
        this.load.image('DET2_02', '/img/visit/districtE/DE-T2/DET2_02.jpg');
        this.load.image('DET2_03', '/img/visit/districtE/DE-T2/DET2_03.jpg');
        this.load.image('DET2_04', '/img/visit/districtE/DE-T2/DET2_04.jpg');

        this.load.image('DET3_00', '/img/visit/districtE/DE-T3/DET3_00.jpg');
        this.load.image('DET3_01', '/img/visit/districtE/DE-T3/DET3_01.jpg');
        this.load.image('DET3_02', '/img/visit/districtE/DE-T3/DET3_02.jpg');

        this.load.image('DET4_00', '/img/visit/districtE/DE-T4/DET4_00.jpg');
        this.load.image('DET4_01', '/img/visit/districtE/DE-T4/DET4_01.jpg');
        this.load.image('DET4_02', '/img/visit/districtE/DE-T4/DET4_02.jpg');
        this.load.image('DET4_03', '/img/visit/districtE/DE-T4/DET4_03.jpg');
        this.load.image('DET4_04', '/img/visit/districtE/DE-T4/DET4_04.jpg');
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
    create: function (config) {
        game.backgroundColor = '#000000';
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
        //  PORTAIL EST
        //=================
        //============
        //  INIT
        //============         
        let x = 0; let y = 0; var px = 0; var py = 0; let txt = "";
        //player.setDepth(9099);
        resetPlayer = false;
        centerPlayer = false;
        lecture = false;
        var fondsEcran = this.add.rectangle(0, 0, 12600, 6500, 0xf4edde).setDepth(1);
        var fontFam = "Montserrat";
        var fontSZ = 24;
        var fontSZLgd = 20;
        var colorTxt = '#000000';
        var lnSp = 10;
        var alignTxt = 'justify';
        var colTxt = px - 100;
        var toDestroy = []; var toDestroy2 = []; var toDestroy3 = []; var toDestroy4 = [];
        camSubject = "room";
        var sortieE = this.physics.add.image(100, 975, "portail_ouvert").setInteractive().setDepth(9100);
        posSortie = 1500;
        var chevaletDEP1;
        var chevaletDEP2;
        var chevaletDEP3;
        var chevaletDEP4;
        //============
        //  CHEVALET 1
        //============
        // Le Terril de l’Epine à Montignies-sur-Sambre
        chevaletDEP1 = this.physics.add.image(-520, 700, "chevalet_g").setInteractive().setDepth(9001);
        chevaletDEP1.on("pointerup", function () {
            //======================================
            //  PHOTOS & TEXTES - CHEVALET 1
            //======================================
            toDestroy.push(this.add.text(px - 340, py - 100, "District Est - Le Terril de l’Epine à Montignies-sur-Sambre", { fontFamily: fontFam, fontSize: 32, color: '#000000' }).setDepth(9101));  // Ajout titre
            toDestroy.push(this.physics.add.image(px, py + 300, "DET1_00").setDepth(9101));   // Ajout image principale (960 px x ...)
            txt = "« Qui s’y frotte, s’y pique » \n"
            txt += "La vue depuis le terril de l’Epine de Montignies vous laissera sans voix.";
            toDestroy.push(this.add.text(px - 300, py + 650, txt, { fontFamily: fontFam, fontSize: fontSZLgd, color: colorTxt, fontStyle: 'italic' }).setDepth(9101));  // Ajout légende
            // Mini 1
            toDestroy.push(this.physics.add.image(px - 300, py + 900, "DET1_01").setDepth(9101)); // Ajout image mini
            txt = "Chaque district de Charleroi possède un ou plusieurs terril(s).\n";
            txt += "Dans le district Est, du côté de Montignies-sur-Sambre, \nse dresse le terril de l’Epine.\n";
            toDestroy.push(this.add.text(colTxt, py + 850, txt, { fontFamily: fontFam, fontSize: fontSZ, color: colorTxt, align: alignTxt, lineSpacing: lnSp }).setDepth(9101));  // Ajout texte
            // Mini 2
            toDestroy.push(this.physics.add.image(px - 300, py + 1150, "DET1_02").setDepth(9101));  // Ajout image mini
            txt = "Constitué fin du XIXe siècle, il se distingue de ses voisins par \nses vastes zones ouvertes peu boisées.\n";
            toDestroy.push(this.add.text(colTxt, py + 1120, txt, { fontFamily: fontFam, fontSize: fontSZ, color: colorTxt, align: alignTxt, lineSpacing: lnSp }).setDepth(9101));  // Ajout texte
            // Mini 3
            toDestroy.push(this.physics.add.image(px - 300, py + 1400, "DET1_03").setDepth(9101));  // Ajout image mini
            txt = "Au sommet du terril, on retrouve un plateau qui est limité par des versants irréguliers.\nDepuis ses zones marécageuses, l’Epine offre une vue imprenable sur Charleroi,\nla « Tour Bleue »,à savoir l’hôtel de police de Charleroi, le terril du Boubier de Châtelet\net les villes de Montignies-sur-Sambre et Gilly.\n";
            txt += "Sur ses 28 hectares, l’Epine offre une incroyable diversité de groupements végétaux et des prairies.\n";
            toDestroy.push(this.add.text(colTxt, py + 1300, txt, { fontFamily: fontFam, fontSize: fontSZ, color: colorTxt, align: alignTxt, lineSpacing: lnSp }).setDepth(9101));  // Ajout texte
            // Mini 4
            toDestroy.push(this.physics.add.image(px - 300, py + 1650, "DET1_04").setDepth(9101));  // Ajout image mini
            txt = "Les chants des oiseaux vous berceront lors de votre randonnée sur les chemins du terril.\n";
            txt += "On vous conseille de vous y rendre au lever ou au coucher du soleil pour profiter\npleinement du panorama. ";
            toDestroy.push(this.add.text(colTxt, py + 1600, txt, { fontFamily: fontFam, fontSize: fontSZ, color: colorTxt, align: alignTxt, lineSpacing: lnSp }).setDepth(9101));  // Ajout texte
            //======================================
            bruit_feu.stop();
            bruit_ambiance.play();
            centerPlayer = true;
            lecture = true;
            var arrayShadows = this.addShadows(toDestroy);
            arrayShadows.forEach((item) => { toDestroy.push(item); })
            camSubject = "chevalet";
            chevaletDEP1.setDepth(1).disableInteractive();
            chevaletDEP2.setDepth(1).disableInteractive();
            chevaletDEP3.setDepth(1).disableInteractive();
            chevaletDEP4.setDepth(1).disableInteractive();
            fondsEcran.setDepth(51);
            // player.setDepth(1);
            // player.x = 0;
            // player.y = 300;
            mainCam.setZoom(1.0);
            var sortie1 = this.physics.add.image(x + 50, y + 2000, "portail_ferme").setDepth(9101);
            posSortie = sortie1.y;
            sortieE.setDepth(50);
            sortie1.setInteractive();
            sortie1.on("pointerup", function () {
                bruit_ambiance.stop();
                bruit_feu.play();
                sortie1.destroy();
                toDestroy.forEach((item) => { item.destroy(); })
                fondsEcran.setDepth(1);
                sortieE.setDepth(9100);
                chevaletDEP1.setDepth(9001).setInteractive();
                chevaletDEP2.setDepth(9001).setInteractive();
                chevaletDEP3.setDepth(9001).setInteractive();
                chevaletDEP4.setDepth(9001).setInteractive();
                // player.setDepth(9199);
                // player.x = 100;
                // player.y = 600;
                camSubject = "room";
                mainCam.setZoom(0.8);
                resetPlayer = true;
                centerPlayer = false;
                lecture = false;
            })
        }, this);
        //============
        //  CHEVALET 2
        //============
        // Le Campus étudiant à Montignies-sur-Sambre
        chevaletDEP2 = this.physics.add.image(-140, 510, "chevalet_g").setInteractive().setDepth(9001);
        chevaletDEP2.on("pointerup", function () {
            //======================================
            //  PHOTOS & TEXTES - CHEVALET 2
            //======================================
            toDestroy2.push(this.add.text(px - 375, py - 100, "District Est - Le Campus étudiant à Montignies-sur-Sambre", { fontFamily: fontFam, fontSize: 32, color: '#000000' }).setDepth(9101));  // Ajout titre
            toDestroy2.push(this.physics.add.image(px, py + 300, "DET2_00").setDepth(9101));   // Ajout image principale (960 px x ...)
            txt = "À Montignies-sur-Sambre, le campus étudiant de la Haute Ecole Louvain en Hainaut et de l’UCLouvain prend de plus en plus d’importance! ";
            toDestroy2.push(this.add.text(px - 550, py + 650, txt, { fontFamily: fontFam, fontSize: fontSZLgd, color: colorTxt, fontStyle: 'italic' }).setDepth(9101));  // Ajout légende
            // Mini 1
            toDestroy2.push(this.physics.add.image(px - 300, py + 925, "DET2_01").setDepth(9101)); // Ajout image mini
            txt = "Malgré ce que l’on peut penser, oui, il est possible d’étudier à Charleroi \net cela sera encore plus le cas \nà l’avenir. Dans la région, deux campus étudiants sont en train de se développer : \nl’un dans le centre-ville et l’autre à Montignies-sur-Sambre. \n";
            txt += "\nLa HELHa est née de la fusion de trois Hautes Ecoles Catholiques hennuyères. \nSur ses 17 implantations, elle propose plusieurs formations. ";
            toDestroy2.push(this.add.text(colTxt, py + 825, txt, { fontFamily: fontFam, fontSize: fontSZ, color: colorTxt, align: alignTxt, lineSpacing: lnSp }).setDepth(9101));  // Ajout texte
            // Mini 2
            toDestroy2.push(this.physics.add.image(px - 300, py + 1200, "DET2_02").setDepth(9101));  // Ajout image mini
            txt = "À Montignies,on retrouve : une formation en ergothérapie,\nle bachelier et master en kinésithérapie ou des études en relations publiques. \n";
            txt += "\nSur le même site, l’UCLouvain est aussi en train d’élargir son offre avec l’arrivée d’un bachelier \nen sciences informatiques, dès septembre 2021. ";
            toDestroy2.push(this.add.text(colTxt, py + 1120, txt, { fontFamily: fontFam, fontSize: fontSZ, color: colorTxt, align: alignTxt, lineSpacing: lnSp }).setDepth(9101));  // Ajout texte
            // Mini 3
            toDestroy2.push(this.physics.add.image(px - 300, py + 1450, "DET2_03").setDepth(9101));  // Ajout image mini
            txt = "À propos du campus de Charleroi, le Centre Universitaire Zénobe Gramme, \nil est développé par l’Université du Travail, l’UMons et l’ULB.\n";
            txt += "\nActuellement, les travaux de rénovation des bâtiments historiques de \nl’Université du Travail sont en cours.";
            toDestroy2.push(this.add.text(colTxt, py + 1400, txt, { fontFamily: fontFam, fontSize: fontSZ, color: colorTxt, align: alignTxt, lineSpacing: lnSp }).setDepth(9101));  // Ajout texte
            // Mini 4
            toDestroy2.push(this.physics.add.image(px - 300, py + 1700, "DET2_04").setDepth(9101));  // Ajout image mini
            txt = "Fondée en 1903 par le marcinellois Paul Pastur dans la métropole carolo, \nl’Université du Travail est la Haute Ecole provinciale de la région. \nElle propose des formations dans l’agronomie, l’économie, le paramédical, la pédagogie, \nle social et le technique. ";
            toDestroy2.push(this.add.text(colTxt, py + 1630, txt, { fontFamily: fontFam, fontSize: fontSZ, color: colorTxt, align: alignTxt, lineSpacing: lnSp }).setDepth(9101));  // Ajout texte
            //======================================
            centerPlayer = true;
            lecture = true;
            var arrayShadows = this.addShadows(toDestroy2);
            arrayShadows.forEach((item) => { toDestroy2.push(item); })
            camSubject = "chevalet";
            chevaletDNP1.setDepth(1).disableInteractive();
            chevaletDNP2.setDepth(1).disableInteractive();
            chevaletDNP3.setDepth(1).disableInteractive();
            chevaletDNP4.setDepth(1).disableInteractive();
            fondsEcran.setDepth(51);
            // player.setDepth(1);
            // player.x = 0;
            // player.y = 300;
            mainCam.setZoom(1.0);
            var sortie2 = this.physics.add.image(x + 50, y + 2000, "portail_ferme").setDepth(9101);
            posSortie = sortie2.y;
            sortieE.setDepth(50);
            sortie2.setInteractive();
            sortie2.on("pointerup", function () {
                sortie2.destroy();
                toDestroy2.forEach((item) => { item.destroy(); })
                fondsEcran.setDepth(1);
                sortieE.setDepth(9100);
                chevaletDNP1.setDepth(9001).setInteractive();
                chevaletDEP2.setDepth(9001).setInteractive();
                chevaletDEP3.setDepth(9001).setInteractive();
                chevaletDEP4.setDepth(9001).setInteractive();
                // player.setDepth(9199);
                // player.x = 100;
                // player.y = 600;
                camSubject = "room";
                mainCam.setZoom(0.8);
                resetPlayer = true;
                lecture = false;
            })
        }, this);
        //============
        //  CHEVALET 3
        //============
        // Le Nouveau Grand Hôpital de Charleroi
        chevaletDEP3 = this.physics.add.image(375, 510, "chevalet_d").setInteractive().setDepth(9001);
        chevaletDEP3.on("pointerup", function () {
            //======================================
            //  PHOTOS & TEXTES - CHEVALET 3
            //======================================
            toDestroy3.push(this.add.text(px - 325, py - 100, "District Est - Le Nouveau Grand Hôpital de Charleroi", { fontFamily: fontFam, fontSize: 32, color: '#000000' }).setDepth(9101));  // Ajout titre
            toDestroy3.push(this.physics.add.image(px, py + 300, "DET3_00").setDepth(9101));   // Ajout image principale (960 px x ...)
            txt = "Sur le site des Viviers à Gilly, l’hôpital du futur est en train d’être construit.";
            toDestroy3.push(this.add.text(px - 300, py + 650, txt, { fontFamily: fontFam, fontSize: fontSZLgd, color: colorTxt, fontStyle: 'italic' }).setDepth(9101));  // Ajout légende
            // Mini 1
            toDestroy3.push(this.physics.add.image(px - 300, py + 900, "DET3_01").setDepth(9101)); // Ajout image mini
            txt = "C’est là que verra le jour le nouveau Grand Hôpital de Charleroi. \nLe projet est de fusionner les différents hôpitaux du GHdC en un seul site.\n";
            txt += "Le Nouveau GHDC est érigé sur le plateau du terril des Viviers, \nau croisement des autoroutes R90 et R3. ";
            toDestroy3.push(this.add.text(colTxt, py + 825, txt, { fontFamily: fontFam, fontSize: fontSZ, color: colorTxt, align: alignTxt, lineSpacing: lnSp }).setDepth(9101));  // Ajout texte
            // Mini 2
            toDestroy3.push(this.physics.add.image(px - 300, py + 1250, "DET3_02").setDepth(9101));  // Ajout image mini
            txt = "Le site est répertorié comme site de Grand Intérêt Biologique (SGIB).\nDes populations de crapauds calamites ont élu domicile dans les plans d’eau.\nEn danger de disparition, ces amphibiens apprécient les pentes schisteuses des terrils. \nLeur préservation est donc indispensable et une zone d’habitat, éloignée des travaux,\na été créée. ";
            txt += "\nLe nouvel hôpital sera l’un des plus grands du pays et tout a été fait pour que les patients\ns’y sentent bien.";
            toDestroy3.push(this.add.text(colTxt, py + 1120, txt, { fontFamily: fontFam, fontSize: fontSZ, color: colorTxt, align: alignTxt, lineSpacing: lnSp }).setDepth(9101));  // Ajout texte
            //======================================
            centerPlayer = true;
            lecture = true;
            var arrayShadows = this.addShadows(toDestroy3);
            arrayShadows.forEach((item) => { toDestroy3.push(item); })
            camSubject = "chevalet";
            chevaletDNP1.setDepth(1).disableInteractive();
            chevaletDNP2.setDepth(1).disableInteractive();
            chevaletDNP3.setDepth(1).disableInteractive();
            chevaletDNP4.setDepth(1).disableInteractive();
            fondsEcran.setDepth(51);
            // player.setDepth(1);
            // player.x = 0;
            // player.y = 300;
            mainCam.setZoom(1.0);
            var sortie3 = this.physics.add.image(x + 50, y + 2000, "portail_ferme").setDepth(9101);
            posSortie = sortie3.y;
            sortieE.setDepth(50);
            sortie3.setInteractive();
            sortie3.on("pointerup", function () {
                sortie3.destroy();
                toDestroy3.forEach((item) => { item.destroy(); })
                fondsEcran.setDepth(1);
                sortieE.setDepth(9100);
                chevaletDNP1.setDepth(9001).setInteractive();
                chevaletDEP2.setDepth(9001).setInteractive();
                chevaletDEP3.setDepth(9001).setInteractive();
                chevaletDEP4.setDepth(9001).setInteractive();
                // player.setDepth(9199);
                // player.x = 100;
                // player.y = 600;
                camSubject = "room";
                mainCam.setZoom(0.8);
                resetPlayer = true;
                lecture = false
            })
        }, this);
        //============
        //  CHEVALET 4
        //============
        // Le Cercle Saint-Charles à Montignies-sur-Sambre
        chevaletDEP4 = this.physics.add.image(755, 700, "chevalet_d").setInteractive().setDepth(9001);
        chevaletDEP4.on("pointerup", function () {
            //======================================
            //  PHOTOS & TEXTES - CHEVALET 4
            //======================================
            toDestroy4.push(this.add.text(px - 400, py - 100, "District Est - Le Cercle Saint-Charles à Montignies-sur-Sambre", { fontFamily: fontFam, fontSize: 32, color: '#000000' }).setDepth(9101));  // Ajout titre
            toDestroy4.push(this.physics.add.image(px, py + 300, "DET4_00").setDepth(9101));   // Ajout image principale (960 px x ...)
            txt = "Le Cercle Saint-Charles, un ancien cercle paroissial dans le centre de Montignies-sur-Sambre, est en train de renaitre.";
            toDestroy4.push(this.add.text(px - 475, py + 650, txt, { fontFamily: fontFam, fontSize: fontSZLgd, color: colorTxt, fontStyle: 'italic' }).setDepth(9101));  // Ajout légende
            // Mini 1
            toDestroy4.push(this.physics.add.image(px - 300, py + 900, "DET4_01").setDepth(9101)); // Ajout image mini
            txt = "C’était autrefois un lieu culturel où les montagnards aimaient se rassembler\npour passer de chouettes moments et profiter de spectacles.\n";
            txt += "\nUne fois déserté et mis en vente, un groupe de 4 amis tombe sous\nle charme de l’endroit et décide de l’acheter en 2019 afin de perpétuer son âme.\n";
            toDestroy4.push(this.add.text(colTxt, py + 800, txt, { fontFamily: fontFam, fontSize: fontSZ, color: colorTxt, align: alignTxt, lineSpacing: lnSp }).setDepth(9101));  // Ajout texte
            // Mini 2
            toDestroy4.push(this.physics.add.image(px - 300, py + 1200, "DET4_02").setDepth(9101));  // Ajout image mini
            txt = "Dans ce lieu, les 3 propriétaires souhaitent mettre en avant les productions locales et\nles artistes carolos, par le biais d’expositions ou d’événements.\n";
            txt += "Lors de sa première année de réouverture, les premiers événements organisés étaient,\npar exemple, des vides dressing,des concours de belote, des concerts,\ndes marchés de fruits et légumes, … ";
            toDestroy4.push(this.add.text(colTxt, py + 1120, txt, { fontFamily: fontFam, fontSize: fontSZ, color: colorTxt, align: alignTxt, lineSpacing: lnSp }).setDepth(9101));  // Ajout texte
            // Mini 3
            toDestroy4.push(this.physics.add.image(px - 300, py + 1450, "DET4_03").setDepth(9101));  // Ajout image mini
            txt = "Le Cercle est avant tout un lieu de vie, de rencontres, …\ndans lequel n’importe quel inconnu se sentira accueilli comme un ami.\nUn endroit qui représente tout simplement l’esprit et la convivialité des carolos. ";
            toDestroy4.push(this.add.text(colTxt, py + 1500, txt, { fontFamily: fontFam, fontSize: fontSZ, color: colorTxt, align: alignTxt, lineSpacing: lnSp }).setDepth(9101));  // Ajout texte
            // Mini 4
            toDestroy4.push(this.physics.add.image(px - 300, py + 1700, "DET4_04").setDepth(9101));  // Ajout image mini
            txt = "xxx";
            txt += "xxx";
            //toDestroy4.push(this.add.text(colTxt, py+1630, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
            //======================================
            centerPlayer = true;
            lecture = true;
            var arrayShadows = this.addShadows(toDestroy4);
            arrayShadows.forEach((item) => { toDestroy4.push(item); })
            camSubject = "chevalet";
            chevaletDNP1.setDepth(1).disableInteractive();
            chevaletDNP2.setDepth(1).disableInteractive();
            chevaletDNP3.setDepth(1).disableInteractive();
            chevaletDNP4.setDepth(1).disableInteractive();
            fondsEcran.setDepth(51);
            // player.setDepth(1);
            // player.x = 0;
            // player.y = 300;
            mainCam.setZoom(1.0);
            var sortie4 = this.physics.add.image(x + 50, y + 2000, "portail_ferme").setDepth(9101);
            posSortie = sortie4.y;
            sortieE.setDepth(50);
            sortie4.setInteractive();
            sortie4.on("pointerup", function () {
                sortie4.destroy();
                toDestroy4.forEach((item) => { item.destroy(); })
                fondsEcran.setDepth(1);
                sortieE.setDepth(9100);
                chevaletDNP1.setDepth(9001).setInteractive();
                chevaletDEP2.setDepth(9001).setInteractive();
                chevaletDEP3.setDepth(9001).setInteractive();
                chevaletDEP4.setDepth(9001).setInteractive();
                // player.setDepth(9199);
                // player.x = 100;
                // player.y = 600;
                camSubject = "room";
                mainCam.setZoom(0.8);
                resetPlayer = true;
                lecture = false;
            })
        }, this);
        //============
        //  SORTIE
        //============
        sortieE.on("pointerup", function () {
            if (camSubject == "room") {
                localStorage.setItem("insideRoom", false);
                Client.socket.emit("goOutRoom");
                Client.socket.on("okGoOutRoom", function () {
                    location.href = '/website/visite.html';
                });
            };
        }, this);
    },
    update: function (time, delta) {
            if(resetPlayer == true){
                this.player.x = 100;
                this.player.y = 900;
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
    changeScene: function (nameScene, gameData) {
        this.scene.start(nameScene, gameData);
    }
});