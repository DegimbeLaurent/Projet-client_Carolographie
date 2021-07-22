//config.key = "LoadScene2";
var DoRoom = new Phaser.Class({
    Extends: TemplateScene,
    initialize: function LoadScene(config){
        //Phaser.Scene.call(this, config);
        Phaser.Scene.call(this, {"key":"DoRoom"});
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
        this.load.image('nom_district', '/img/ouest.png');
        // PICTURES
            // DISTRICT OUEST
                this.load.image('DOT1_00', '/img/visit/districtO/DO-T1/DOT1_00.png');
                this.load.image('DOT1_01', '/img/visit/districtO/DO-T1/DOT1_01.jpg');
                this.load.image('DOT1_02', '/img/visit/districtO/DO-T1/DOT1_02.jpg');
                this.load.image('DOT1_03', '/img/visit/districtO/DO-T1/DOT1_03.jpg');
                this.load.image('DOT1_04', '/img/visit/districtO/DO-T1/DOT1_04.jpg');

                this.load.image('DOT2_00', '/img/visit/districtO/DO-T2/DOT2_00.jpg');
                this.load.image('DOT2_01', '/img/visit/districtO/DO-T2/DOT2_01.jpg');
                this.load.image('DOT2_02', '/img/visit/districtO/DO-T2/DOT2_02.jpg');
                this.load.image('DOT2_03', '/img/visit/districtO/DO-T2/DOT2_03.jpg');
                this.load.image('DOT2_04', '/img/visit/districtO/DO-T2/DOT2_04.jpg');

                this.load.image('DOT3_00', '/img/visit/districtO/DO-T3/DOT3_00.jpg');
                this.load.image('DOT3_01', '/img/visit/districtO/DO-T3/DOT3_01.jpg');
                this.load.image('DOT3_02', '/img/visit/districtO/DO-T3/DOT3_02.jpg');
                this.load.image('DOT3_03', '/img/visit/districtO/DO-T3/DOT3_03.jpg');
                this.load.image('DOT3_04', '/img/visit/districtO/DO-T3/DOT3_04.jpg');

                this.load.image('DOT4_00', '/img/visit/districtO/DO-T4/DOT4_00.jpg');
                this.load.image('DOT4_01', '/img/visit/districtO/DO-T4/DOT4_01.jpg');
                this.load.image('DOT4_02', '/img/visit/districtO/DO-T4/DOT4_02.JPG');
                this.load.image('DOT4_03', '/img/visit/districtO/DO-T4/DOT4_03.JPG');
                this.load.image('DOT4_04', '/img/visit/districtO/DO-T4/DOT4_04.JPG');
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
        this.nomDistrict = this.physics.add.image(120,1200,'nom_district').setDepth(40);
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
        //  PORTAIL OUEST
        //=================
            //============
            //  INIT
            //============         
            let x = 0; let y = 0; var px = 0; var py = 0; let txt = "";
            //player.setDepth(9099);
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
            //var sortieO = this.physics.add.image(100,975,"portail_ouvert").setInteractive().setDepth(9100);
            //===
            var sortieO_socle = this.physics.add.image(100,975,"portail_socle").setInteractive().setDepth(24);
            sortieO = this.physics.add.image(100,975,"portail_ferme").setInteractive().setDepth(999);
            sortieO.name = "o";
            this.physics.add.overlap(sortieO,this.player,this.closeToPortail,()=>{},this);
            var activePtO = this.physics.add.sprite(100,1045,"cb25-25").setDepth(999).setBounce(1,1).setCollideWorldBounds(true).setImmovable(true);
            activePtO.name = "o";
            this.physics.add.collider(activePtO, this.player,this.hitPortail,()=>{},this);
            //===
            posSortie = 1500;
            var chevaletDOP1;
            var chevaletDOP2;
            var chevaletDOP3;
            var chevaletDOP4;
            //============
            //  CHEVALET 1
            //============
            // Le Canal Charleroi-Bruxelles à Roux
            chevaletDOP1 = this.physics.add.image(-525,700,"chevalet_g").setInteractive().setDepth(9001);
            chevaletDOP1.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 1
                //======================================
                toDestroy.push(this.add.text(px-275, py-100, "District Ouest - Le Canal Charleroi-Bruxelles à Roux", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy.push(this.physics.add.image(px, py+300, "DOT1_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "Se balader le long du Canal Charleroi-Bruxelles du côté de Roux est toujours agréable , \net encore plus en fin de journée!";
                toDestroy.push(this.add.text(px-400, py+650, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                        //txt = "Le canal a été imaginé au 19ème siècle pour relier le bassin industriel carolo à Bruxelles, la capitale du pays.\n";
                        toDestroy.push(this.physics.add.image(px-390, py+900, "DOT1_01").setDepth(9101)); // Ajout image mini
                        txt = "Le canal a été imaginé au 19ème siècle pour relier \nle bassin industriel carolo à Bruxelles, la capitale du pays.\n"; 
                        txt += "À l’époque, le Pays Noir est l’un des moteurs \n économiques de la Belgique.\n";
                        txt += "Il s’avère alors essentiel d’acheminer le charbon \net les produits fabriqués par les industries dans toute la Belgique.\n";
                        txt += " Des écluses, qui existent encore (à Viesville, Gosselies, …),\n sont aménagées le long du cours d’eau.\n";
                        toDestroy.push(this.add.text(colTxt, py+770, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                        toDestroy.push(this.physics.add.image(px-320, py+1250, "DOT1_02").setDepth(9101));  // Ajout image mini
                        txt = "Comme vous pouvez le voir sur la photo ci-dessus, le canal\n est toujours utilisé pour le transport de marchandises.\n";
                        toDestroy.push(this.add.text(colTxt, py+1250, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                        toDestroy.push(this.physics.add.image(px+-320, py+1550, "DOT1_03").setDepth(9101));  // Ajout image mini
                        txt = "Et le chemin de halage est devenu une « autoroute » \npour les cyclistes qui souhaitent se balader ou \nrejoindre rapidement \nMarchienne-au-Pont et Charleroi. \n";
                       // txt += "xxx\n";
                        toDestroy.push(this.add.text(colTxt, py+1450, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                        toDestroy.push(this.physics.add.image(px-320, py+1850, "DOT1_04").setDepth(9101));  // Ajout image mini
                        txt = "La passerelle photographiée permet de traverser le canal à Roux. \nLa ville est coupée en deux par le canal.\n";
                        txt += "Se trouvant sur le tracé du RAVeL (Réseau Autonome des Voies Lentes), \nelle est fréquentée par les cyclistes et les marcheurs. \nDu côté de Jumet, elle donne accès au Bois de Heigne.";
                        toDestroy.push(this.add.text(colTxt, py+1750, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                bruit_feu.stop();
                bruit_ambiance.play();
                centerPlayer = true;
                lecture = true;
                var arrayShadows = this.addShadows(toDestroy);
                arrayShadows.forEach((item) => {toDestroy.push(item);})
                camSubject = "chevalet";
                chevaletDOP1.setDepth(1).disableInteractive();
                chevaletDOP2.setDepth(1).disableInteractive();
                chevaletDOP3.setDepth(1).disableInteractive();
                chevaletDOP4.setDepth(1).disableInteractive();
                activePtO.body.enable = false;
                fondsEcran.setDepth(51);
                // player.setDepth(1);
                // player.x = 0;
                // player.y = 300;
                mainCam.setZoom(1.0);
                var sortie1 = this.physics.add.image(x+50,y+2400,"portail_ferme").setDepth(9101);
                posSortie = sortie1.y;
                sortieO.setDepth(50);
                sortie1.setInteractive();
                sortie1.on("pointerup", function(){
                    bruit_ambiance.stop();
                    bruit_feu.play();
                    sortie1.destroy();
                    toDestroy.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieO.setDepth(9100);
                    chevaletDOP1.setDepth(9001).setInteractive();
                    chevaletDOP2.setDepth(9001).setInteractive();
                    chevaletDOP3.setDepth(9001).setInteractive();
                    chevaletDOP4.setDepth(9001).setInteractive();
                    activePtO.body.enable = true;
                    // player.setDepth(9199);
                    // player.x = 100;
                    // player.y = 600;
                    camSubject = "room";
                    mainCam.setZoom(0.8);
                    resetPlayer = true;
                    centerPlayer = false;
                    lecture = false
                    localStorage.setItem("repop",[-525,825]);
                })
            }, this);             
            //============
            //  CHEVALET 2
            //============
            // Le Site du Martinet à Roux
            chevaletDOP2 = this.physics.add.image(-140,510,"chevalet_g").setInteractive().setDepth(9001);
            chevaletDOP2.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 2
                //======================================
                toDestroy2.push(this.add.text(px-325, py-100, "District Ouest - Le Site du Martinet à Roux", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy2.push(this.physics.add.image(px, py+300, "DOT2_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "L’ancien site minier du Martinet à Roux représente toute l’histoire minière de la région.";
                txt += "\nSur le lieu-dit du Martinet, les premières traces officielles d’exploitation du charbon datent de 1722.";
                txt += "\nGrâce à l’arrivée de nouvelles techniques, le charbonnage s’industrialise. \nEn 1936, un Triage Lavoir Central est installé et le charbonnage devient l’un des plus performants d’Europe." ;
                toDestroy2.push(this.add.text(px-450, py+650, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                        toDestroy2.push(this.physics.add.image(px-320, py+900, "DOT2_01").setDepth(9101)); // Ajout image mini
                        txt = "Après la fermeture du puits, en 1974, une entreprise souhaite \ny extraire les charbons restants …"; 
                        txt += "mais elle fait face à un comité \nde riverains attachés au site. \nCréée de haute lutte, son histoire entre définitivement \ndans les livres en 1995 quand la région wallonne décide \nde classer le Martinet"; 
                        toDestroy2.push(this.add.text(colTxt, py+770, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                        toDestroy2.push(this.physics.add.image(px-400, py+1250, "DOT2_02").setDepth(9101));  // Ajout image mini
                        txt = "Aujourd’hui, les installations restantes, qui se composent \nde la salle des pendus, du hangar à locomotives, \nde la salle des machines et du bâtiment des ingénieurs, \nont été rénovées. \nDes sentiers permettent de partir à la découverte \ndes deux terrils et le site est traversé par le sentier \nde Grande Randonnée GR412. "; 
                        //txt += "";                    
                       toDestroy2.push(this.add.text(colTxt, py+1100, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                        toDestroy2.push(this.physics.add.image(px-320, py+1600, "DOT2_03").setDepth(9101));  // Ajout image mini
                        txt = "Ce site à l’histoire riche continue de vivre.Des projets s’y sont implantés."; 
                        //txt += "xxx";
                        toDestroy2.push(this.add.text(colTxt, py+1550, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                        toDestroy2.push(this.physics.add.image(px-320, py+1900, "DOT2_04").setDepth(9101));  // Ajout image mini
                        txt = "Production de bières par la Manufacture Urbaine, \nimplantation du vignoble Monceau Valley, etc."; 
                        txt += "\nAvec toutes ces initiatives, l’avenir de ce site emblématique du \nPays Noir ne peut-être que rayonnant!";
                        toDestroy2.push(this.add.text(colTxt, py+1850, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                centerPlayer = true;
                lecture = true;
                var arrayShadows = this.addShadows(toDestroy2);
                arrayShadows.forEach((item) => {toDestroy2.push(item);})
                camSubject = "chevalet";
                chevaletDOP1.setDepth(1).disableInteractive();
                chevaletDOP2.setDepth(1).disableInteractive();
                chevaletDOP3.setDepth(1).disableInteractive();
                chevaletDOP4.setDepth(1).disableInteractive();
                activePtO.body.enable = false;
                fondsEcran.setDepth(51);
                // player.setDepth(1);
                // player.x = 0;
                // player.y = 300;
                mainCam.setZoom(1.0);
                var sortie2 = this.physics.add.image(x+50,y+2250,"portail_ferme").setDepth(9101);
                posSortie = sortie2.y;
                sortieO.setDepth(50);
                sortie2.setInteractive();
                sortie2.on("pointerup", function(){
                    sortie2.destroy();
                    toDestroy2.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieO.setDepth(9100);
                    chevaletDOP1.setDepth(9001).setInteractive();
                    chevaletDOP2.setDepth(9001).setInteractive();
                    chevaletDOP3.setDepth(9001).setInteractive();
                    chevaletDOP4.setDepth(9001).setInteractive();
                    activePtO.body.enable = true;
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
            // Le Château de Monceau-sur-Sambre
            chevaletDOP3 = this.physics.add.image(375,510,"chevalet_d").setInteractive().setDepth(9001);
            chevaletDOP3.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 3
                //======================================
                toDestroy3.push(this.add.text(px-175, py-100, "District Ouest - Le Château de Monceau-sur-Sambre", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy3.push(this.physics.add.image(px, py+300, "DOT3_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "Apprécié par les joggeurs, le parc Nelson Mandela de Monceau-sur-Sambre abrite \nune demeure seigneuriale datant du 17ème siècle.";
                toDestroy3.push(this.add.text(px-450, py+650, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                        toDestroy3.push(this.physics.add.image(px-320, py+900, "DOT3_01").setDepth(9101)); // Ajout image mini
                        txt = "Néogothique, le château a appartenu à diverses familles nobles \navant de devenir propriété de la ville de Charleroi. \nIl présente un plan en U. Saccagé et reconstruit, \nil est classé patrimoine depuis 1989."; 
                        txt += "\nL’ASBL « Les Amis du Château de Monceau-sur-Sambre » \ns’occupe de préserver ce très bel écrin de notre patrimoine local.";
                        toDestroy3.push(this.add.text(colTxt, py+770, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                        toDestroy3.push(this.physics.add.image(px-320, py+1200, "DOT3_02").setDepth(9101));  // Ajout image mini
                        txt = "Domaine à l’anglaise, le parc Nelson Mandela s’étend sur une \nsurface de 67 ha et doit son nom aux 67 années de lutte en \nAfrique du Sud."; 
                        //txt += "xxx";                    
                        toDestroy3.push(this.add.text(colTxt, py+1120, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                        toDestroy3.push(this.physics.add.image(px-320, py+1550, "DOT3_03").setDepth(9101));  // Ajout image mini
                        txt = "Outre une piste finlandaise et un parcours santé, \ndes arbres remarquables participent à la beauté du site.                        "; 
                        //txt += "xxx";
                        toDestroy3.push(this.add.text(colTxt, py+1500, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                        toDestroy3.push(this.physics.add.image(px-320, py+1850, "DOT3_04").setDepth(9101));  // Ajout image mini
                        txt = "Le parc accueille même un arboretum. \nVous y découvrirez des essences d’arbres d’intérêt : un chêne \nd’Amérique, un cornouiller mâle ou encore des tulipiers de Virginie. "; 
                        txt += "\nDe nombreux animaux ont également élu domicile dans le Parc.";
                        txt += "\n\nSur la photo exposée, vous pouvez découvrir l’ambiance qui y \nrègne de nuit. \nLe château et le parcours étant éclairés, \nc’est l’endroit parfait pour une balade nocturne avant d’aller dormir.";
                        toDestroy3.push(this.add.text(colTxt, py+1750, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                centerPlayer = true;
                lecture = true;
                var arrayShadows = this.addShadows(toDestroy3);
                arrayShadows.forEach((item) => {toDestroy3.push(item);})
                camSubject = "chevalet";
                chevaletDOP1.setDepth(1).disableInteractive();
                chevaletDOP2.setDepth(1).disableInteractive();
                chevaletDOP3.setDepth(1).disableInteractive();
                chevaletDOP4.setDepth(1).disableInteractive();
                activePtO.body.enable = false;
                fondsEcran.setDepth(51);
                // player.setDepth(1);
                // player.x = 0;
                // player.y = 300;
                mainCam.setZoom(1.0);
                var sortie3 = this.physics.add.image(x+50,y+2250,"portail_ferme").setDepth(9101);
                posSortie = sortie3.y;
                sortieO.setDepth(50);
                sortie3.setInteractive();
                sortie3.on("pointerup", function(){
                    sortie3.destroy();
                    toDestroy3.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieO.setDepth(9100);
                    chevaletDOP1.setDepth(9001).setInteractive();
                    chevaletDOP2.setDepth(9001).setInteractive();
                    chevaletDOP3.setDepth(9001).setInteractive();
                    chevaletDOP4.setDepth(9001).setInteractive();
                    activePtO.body.enable = true;
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
            // Coopéco à Marchienne-au-Pont
            chevaletDOP4 = this.physics.add.image(755,700,"chevalet_d").setInteractive().setDepth(9001);
            chevaletDOP4.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 4
                //======================================
                toDestroy4.push(this.add.text(px-200, py-100, "District Ouest - Coopéco à Marchienne-au-Pont", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy4.push(this.physics.add.image(px, py+300, "DOT4_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "Situé à Marchienne-au-Pont, Coopéco est le supermarché collectif et participatif de Charleroi.";
                toDestroy4.push(this.add.text(px-300, py+650, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                        toDestroy4.push(this.physics.add.image(px-320, py+900, "DOT4_01").setDepth(9101)); // Ajout image mini
                        txt = "Créée en 2016, c’est une coopérative qui regroupe aujourd’hui \nplus de 350 bénévoles. \nImaginé pour et par des citoyens, Coopéco est une alternative \nà la grande distribution. \nElle permet à ses adhérents de manger sainement de façon abordable. "; 
                        //txt += "xxx";
                        toDestroy4.push(this.add.text(colTxt, py+815, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                        toDestroy4.push(this.physics.add.image(px-320, py+1200, "DOT4_02").setDepth(9101));  // Ajout image mini
                        txt = "Comment cela fonctionne-t-il concrètement ? \n\nChaque coopérateur est invité à mettre \nà profit ses compétences pour la coopérative."; 
                        txt += "\nLes tâches sont nombreuses : recherche de financement, \ncommunication, gestion des achats, recherche des producteurs… \nEn s’investissant à raison d’un minimum de trois heures par mois, \nl’adhérent a ensuite accès au magasin. ";                    
                        toDestroy4.push(this.add.text(colTxt, py+1055, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                        toDestroy4.push(this.physics.add.image(px-340, py+1550, "DOT4_03").setDepth(9101));  // Ajout image mini
                        txt = "Ce supermarché s’inscrit dans une démarche \nenvironnementale globale."; 
                        txt += "\nLes produits locaux, de saison, bio et de circuit-court sont vendus. \nLes invendus sont transformés en confiture ou en soupe.";
                        toDestroy4.push(this.add.text(colTxt, py+1450, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                        toDestroy4.push(this.physics.add.image(px-340, py+1900, "DOT4_04").setDepth(9101));  // Ajout image mini
                        txt = "L’aspect social est également primordial chez Coopéco."; 
                        txt += "\nRecréer du lien entre les personnes et organiser \ndes activités avec les habitants et les associations \nfont partie intégrante du projet.";
                        toDestroy4.push(this.add.text(colTxt, py+1830, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                centerPlayer = true;
                lecture = true;
                var arrayShadows = this.addShadows(toDestroy4);
                arrayShadows.forEach((item) => {toDestroy4.push(item);})
                camSubject = "chevalet";
                chevaletDOP1.setDepth(1).disableInteractive();
                chevaletDOP2.setDepth(1).disableInteractive();
                chevaletDOP3.setDepth(1).disableInteractive();
                chevaletDOP4.setDepth(1).disableInteractive();
                activePtO.body.enable = false;
                fondsEcran.setDepth(51);
                // player.setDepth(1);
                // player.x = 0;
                // player.y = 300;
                mainCam.setZoom(1.0);
                var sortie4 = this.physics.add.image(x+50,y+2250,"portail_ferme").setDepth(9101);
                posSortie = sortie4.y;
                sortieO.setDepth(50);
                sortie4.setInteractive();
                sortie4.on("pointerup", function(){
                    sortie4.destroy();
                    toDestroy4.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieO.setDepth(9100);
                    chevaletDOP1.setDepth(9001).setInteractive();
                    chevaletDOP2.setDepth(9001).setInteractive();
                    chevaletDOP3.setDepth(9001).setInteractive();
                    chevaletDOP4.setDepth(9001).setInteractive();
                    activePtO.body.enable = true;
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
            sortieO.on("pointerup", function(){
                if(camSubject == "room"){
                    localStorage.setItem("insideRoom", false);
                    localStorage.setItem("repop",[-2190,1650]);
                    Client.socket.emit("goOutRoom");
                    Client.socket.on("okGoOutRoom", function(){
                        location.href = '/website/visite.html';
                    });
                };            
            }, this);
        },
        update: function(time, delta){
            if(localStorage.getItem("touchingPt")){
                if(!this.physics.overlap(this.player,sortieO)){
                    sortieO.setTexture("portail_ferme");
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
                localStorage.setItem("repop",[-2190,1650]);
                Client.socket.emit("enterRoom");
                Client.socket.on("okEnterRoom", function(){location.href = '/website/visite.html';});
        },
        closeToPortail: function(portail){
            sortieO.setTexture("portail_ouvert");
            localStorage.setItem("touchingPt",true);
        }
});