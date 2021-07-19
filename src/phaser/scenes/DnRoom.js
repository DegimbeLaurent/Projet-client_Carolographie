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
        this.load.image('set_district', '/assets/maps/set_district.png');
        this.load.tilemapTiledJSON("map_room", "/maps/district.json");
        this.load.image('sprite', '/img/sprite.png');
        this.load.image('minimap', '/img/minimap.png');
        this.load.image('parchemin', '/img/parchemin.jpg');
        this.load.image('pierre_gravee', '/img/pierre_gravee.png');
        this.load.image('chevalet_g', '/img/chevalet_g.png');
        this.load.image('chevalet_d', '/img/chevalet_d.png');
        this.load.image('portail_ferme', '/img/portail_ferme.png');
        this.load.image('portail_ouvert', '/img/portail_ouvert.png');
        this.load.image('player-bas', '/img/front-front.png');
        this.load.spritesheet('playersheet', '/img/simple-grey-shirt.png', {
            frameWidth: 85,
            frameHeight: 169
        });
        // PICTURES
            // DISTRICT NORD
                this.load.image('DNT1_00', '/img/visit/districtN/DN-T1/DNT1_00.jpg');
                this.load.image('DNT1_01', '/img/visit/districtN/DN-T1/DNT1_01.JPG');
                this.load.image('DNT1_02', '/img/visit/districtN/DN-T1/DNT1_02.JPG');
                this.load.image('DNT1_03', '/img/visit/districtN/DN-T1/DNT1_03.JPG');
                this.load.image('DNT1_04', '/img/visit/districtN/DN-T1/DNT1_04.jpg');

                this.load.image('DNT2_00', '/img/visit/districtN/DN-T2/DNT2_00.jpg');
                this.load.image('DNT2_01', '/img/visit/districtN/DN-T2/DNT2_01.jpg');
                this.load.image('DNT2_02', '/img/visit/districtN/DN-T2/DNT2_02.jpg');
                this.load.image('DNT2_03', '/img/visit/districtN/DN-T2/DNT2_03.jpg');
                this.load.image('DNT2_04', '/img/visit/districtN/DN-T2/DNT2_04.jpg');

                this.load.image('DNT3_00', '/img/visit/districtN/DN-T3/DNT3_00.jpg');
                this.load.image('DNT3_01', '/img/visit/districtN/DN-T3/DNT3_01.jpg');
                this.load.image('DNT3_02', '/img/visit/districtN/DN-T3/DNT3_02.jpg');
                this.load.image('DNT3_03', '/img/visit/districtN/DN-T3/DNT3_03.jpg');
                this.load.image('DNT3_04', '/img/visit/districtN/DN-T3/DNT3_04.jpg');

                this.load.image('DNT4_00', '/img/visit/districtN/DN-T4/DNT4_00.jpg');
                this.load.image('DNT4_01', '/img/visit/districtN/DN-T4/DNT4_01.jpg');
                this.load.image('DNT4_02', '/img/visit/districtN/DN-T4/DNT4_02.jpg');
                this.load.image('DNT4_03', '/img/visit/districtN/DN-T4/DNT4_03.jpg');
                this.load.image('DNT4_04', '/img/visit/districtN/DN-T4/DNT4_04.jpg');
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
        //  PORTAIL NORD
        //=================
            //============
            //  INIT
            //============         
            let x = 0; let y = 0; var px = 0; var py = 0; let txt = "";
            //this.player.setDepth(9099);
            resetPlayer = false;
            centerPlayer = false;
            lecture = false;
            //var pierre_gravee = this.add.image(px+380,py-50,"pierre_gravee").setDepth(999).setScale(0.5);
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
            //var sortieN = this.add.rectangle(x+350,y+100,50, 75, 0xffffff).setDepth(9100).setInteractive();
            var sortieN = this.physics.add.image(100,975,"portail_ouvert").setInteractive().setDepth(9100);
            posSortie = 1500;
            var chevaletDNP1;
            var chevaletDNP2;
            var chevaletDNP3;
            var chevaletDNP4;
            //============
            //  CHEVALET 1
            //============
            // Le Parc de la Serna à Jumet
            chevaletDNP1 = this.physics.add.image(-520,700,"chevalet_g").setInteractive().setDepth(9001);
            chevaletDNP1.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 1
                //======================================
                toDestroy.push(this.add.text(px-275, py-100, "District Nord - Le Parc de la Serna à Jumet", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy.push(this.physics.add.image(px, py+300, "DNT1_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "À deux pas de l’Aéroport de Gosselies, se trouve le Parc de la Serna, un des poumons verts de la région.";
                toDestroy.push(this.add.text(px-400, py+650, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                    toDestroy.push(this.physics.add.image(px-300, py+1000, "DNT1_01").setDepth(9101)); // Ajout image mini
                    txt = "Le Parc de la Serna est un domaine de 16 hectares de bois, dans \nlequel les promeneurs peuvent se ressourcer le corps et l’esprit.\n"; 
                    txt += "\nIls peuvent y découvrir trois étangs, de nombreuses espèces animales\net des arbres séculaires. Une des particularités de ce parc, \n";
                    txt += "c’est qu’il assume la fonction d’arboretum grâce à son circuit écologique.\n\nLe circuit présente des espèces d’arbres, tels que des mélèzes,\naulnes, hêtres, bouleaux ou chênes.";
                    toDestroy.push(this.add.text(colTxt, py+770, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                    toDestroy.push(this.physics.add.image(px-300, py+1500, "DNT1_02").setDepth(9101));  // Ajout image mini
                    txt = "À la fin du mois d’avril, les espaces du bois se couvrent de jacinthes, \ndes jolies petites fleurs violettes. \nCe spectacle éphémère donne un tout autre visage au site.";
                    toDestroy.push(this.add.text(colTxt, py+1350, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                    toDestroy.push(this.physics.add.image(px-300, py+1930, "DNT1_03").setDepth(9101));  // Ajout image mini
                    txt = "Les sentiers, les abords des étangs et les espaces ludiques pour les enfants \nfont de la Serna un endroit où il est bon de se rassembler.\n";
                    txt += "Un jogging revigorant, une partie de pétanque entre amis, une balade en \nfamille, … sont toutes des activités que l’on peut y faire.";
                    toDestroy.push(this.add.text(colTxt, py+1760, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                    toDestroy.push(this.physics.add.image(px-300, py+2300, "DNT1_04").setDepth(9101));  // Ajout image mini
                    txt = "De nuit, l’ambiance qui y règne est totalement différente.  La photo ci-contre \nnous fait penser à la peinture « L’Empire des lumières » du peintre \nRéné Magritte.";
                    txt += "  Pour l’anecdote, ce peintre surréaliste connu mondialement \nest un enfant du Pays de Charleroi.  Il a effectivement vécu sa jeunesse entre \nLessines, Châtelet et Charleroi.";
                    toDestroy.push(this.add.text(colTxt, py+2200, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                bruit_feu.stop();
                bruit_ambiance.play();
                centerPlayer = true;
                lecture = true;
                var arrayShadows = this.addShadows(toDestroy);
                arrayShadows.forEach((item) => {toDestroy.push(item);})
                camSubject = "chevalet";
                chevaletDNP1.setDepth(1);
                chevaletDNP2.setDepth(1);
                chevaletDNP3.setDepth(1);
                chevaletDNP4.setDepth(1);
                fondsEcran.setDepth(51);
                // player.setDepth(1);
                // player.x = 0;
                // player.y = 300;
                mainCam.setZoom(1.0);
                var sortie1 = this.physics.add.image(x+50,y+2600,"portail_ferme").setDepth(9101);
                posSortie = sortie1.y;
                sortieN.setDepth(50);
                sortie1.setInteractive();
                sortie1.on("pointerup", function(){
                    bruit_ambiance.stop();
                    bruit_feu.play();
                    sortie1.destroy();
                    toDestroy.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieN.setDepth(9100);
                    chevaletDNP1.setDepth(9001);
                    chevaletDNP2.setDepth(9001);
                    chevaletDNP3.setDepth(9001);
                    chevaletDNP4.setDepth(9001);
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
            // L’Aéroport et l’Aéropole de Gosselies
            chevaletDNP2 = this.physics.add.image(-140,510,"chevalet_g").setInteractive().setDepth(9001);
            chevaletDNP2.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 2
                //======================================
                toDestroy2.push(this.add.text(px-325, py-100, "District Nord - L’Aéroport et l’Aéropole de Gosselies", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy2.push(this.physics.add.image(px, py+300, "DNT2_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "Gosselies et l’aviation, une grande histoire d’amour!";
                toDestroy2.push(this.add.text(px-200, py+650, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                        toDestroy2.push(this.physics.add.image(px-300, py+1000, "DNT2_01").setDepth(9101)); // Ajout image mini
                        txt = "Cette histoire a débuté il y a plus d’un siècle, après la 1ère \nGuerre Mondiale. \n\nEn 1919, le roi Albert 1er inaugure la première école belge de \npilotage sur le Mont des Bergers à Gosselies.";
                        txt += "  Autour de l’école, \nune entreprise est fondée par le Commandant Jacquet : la Société \nGénérale d’Aéronautique. Elle s’occupe de l’entretien des machines.\n"; 
                        txt += "\nEn 1931, l’entreprise britannique Fairey Aviation Company vient \ns’implanter sur le site.  \nLa région carolo est en pleine croissance économique. \nLes britanniques trouvent que c’est l’endroit parfait pour construire \ndes avions.";
                        txt += "\n\nEn 1978, cette entreprise devient la SONACA, Société Nationale \nde Construction Aéronautique.";
                        toDestroy2.push(this.add.text(colTxt, py+770, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                        toDestroy2.push(this.physics.add.image(px-300, py+1550, "DNT2_02").setDepth(9101));  // Ajout image mini
                        txt = "Aujourd’hui, l’Aéroport (BSCA) existe toujours et il est même devenu\nl’un des plus importants de Belgique.";
                        txt +=" Vu le nombre croissant de passagers, \ndes travaux d’agrandissement de la piste ont débuté en 2019.";
                        txt += "\n\nD’ailleurs, cet été, les Diables Rouges décolleront et atterriront à Gosselies \ndurant leur campagne européenne!"; 
                        toDestroy2.push(this.add.text(colTxt, py+1430, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                        toDestroy2.push(this.physics.add.image(px-300, py+2000, "DNT2_03").setDepth(9101));  // Ajout image mini
                        txt = "Autour de l’aéroport, l’Aéropole et le Biopark se sont développés.  \nCe parc scientifique accueille 1700 entreprises dans des secteurs d’avenir.";
                        txt += "\n\nFondé originellement par l’ULB, le Biopark est un écosystème majeur \npour les industries des sciences de la vie."; 
                        toDestroy2.push(this.add.text(colTxt, py+1790, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                        toDestroy2.push(this.physics.add.image(px-300, py+2450, "DNT2_04").setDepth(9101));  // Ajout image mini
                        txt = "Un aéroport, des entreprises technologiques, des scientifiques expérimentés, \ndes laboratoires de pointe, … ";
                        txt += "permettent à Gosselies de se positionner \ncomme un atout indispensable à la Belgique."; 
                        toDestroy2.push(this.add.text(colTxt, py+2370, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                centerPlayer = true;
                lecture = true;
                var arrayShadows = this.addShadows(toDestroy2);
                arrayShadows.forEach((item) => {toDestroy2.push(item);})
                camSubject = "chevalet";
                chevaletDNP1.setDepth(1);
                chevaletDNP2.setDepth(1);
                chevaletDNP3.setDepth(1);
                chevaletDNP4.setDepth(1);
                fondsEcran.setDepth(51);
                // player.setDepth(1);
                // player.x = 0;
                // player.y = 300;
                mainCam.setZoom(1.0);
                var sortie2 = this.physics.add.image(x+50,y+2750,"portail_ferme").setDepth(9101);
                posSortie = sortie2.y;
                sortieN.setDepth(50);
                sortie2.setInteractive();
                sortie2.on("pointerup", function(){
                    sortie2.destroy();
                    toDestroy2.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieN.setDepth(9100);
                    chevaletDNP1.setDepth(9001);
                    chevaletDNP2.setDepth(9001);
                    chevaletDNP3.setDepth(9001);
                    chevaletDNP4.setDepth(9001);
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
            // Jumet.bio
            chevaletDNP3 = this.physics.add.image(375,510,"chevalet_d").setInteractive().setDepth(9001);
            chevaletDNP3.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 3
                //======================================
                toDestroy3.push(this.add.text(px-175, py-100, "District Nord - Jumet.bio", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy3.push(this.physics.add.image(px, py+300, "DNT3_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "« Rien ne se perd, tout se transforme »   C’est certainement l’une des devises des membres de l’ASBL Jumet.bio !";
                toDestroy3.push(this.add.text(px-450, py+650, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                        toDestroy3.push(this.physics.add.image(px-300, py+900, "DNT3_01").setDepth(9101)); // Ajout image mini
                        txt = "Mandatée par les sœurs Notre-Dame de Jumet pour convertir \nune partie de leur couvent en une véritable ferme urbaine,";
                        txt += "la \nfondation « Générations Bio » a réfléchi pendant deux ans \npour lancer son projet de permaculture au cours de l’année 2020."; 
                        txt += "\n\nEn août de la même année, le projet a vu le jour sous la forme \nd’une ASBL citoyenne.";
                        toDestroy3.push(this.add.text(colTxt, py+780, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                        toDestroy3.push(this.physics.add.image(px-300, py+1400, "DNT3_02").setDepth(9101));  // Ajout image mini
                        txt = "Générateur d’emplois et encourageant la transmission de \nsavoirs entre les générations, Jumet.bio offre la possibilité \nde cultiver ";
                        txt += "des légumes rares et oubliés, d’élever des animaux ou \nencore de transformer les produits en confitures, jus ou soupes."; 
                        toDestroy3.push(this.add.text(colTxt, py+1150, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                        toDestroy3.push(this.physics.add.image(px-300, py+1900, "DNT3_03").setDepth(9101));  // Ajout image mini
                        txt = "Ce projet est une ferme urbaine du futur. \nElle se base sur le principe de la permaculture pour cultiver \nécologiquement et solidairement."; 
                        toDestroy3.push(this.add.text(colTxt, py+1800, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                        toDestroy3.push(this.physics.add.image(px-300, py+2250, "DNT3_04").setDepth(9101));  // Ajout image mini
                        txt = "De plus, l’initiative s’inscrit dans un projet plus large :\nla Ceinture Alimentaire de Charleroi Métropole.\n";
                        txt += "\nLa Ceinture réunit une quarantaine d’acteurs.  Ces acteurs \ncoopèrent pour atteindre un objectif : permettre ";
                        txt += "à \ntous les carolos de bénéficier d’une alimentation locale \net biologique de qualité. "; 
                        toDestroy3.push(this.add.text(colTxt, py+2130, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                centerPlayer = true;
                lecture = true;
                var arrayShadows = this.addShadows(toDestroy3);
                arrayShadows.forEach((item) => {toDestroy3.push(item);})
                camSubject = "chevalet";
                chevaletDNP1.setDepth(1);
                chevaletDNP2.setDepth(1);
                chevaletDNP3.setDepth(1);
                chevaletDNP4.setDepth(1);
                fondsEcran.setDepth(51);
                // player.setDepth(1);
                // player.x = 0;
                // player.y = 300;
                mainCam.setZoom(1.0);
                var sortie3 = this.physics.add.image(x+50,y+2600,"portail_ferme").setDepth(9101);
                posSortie = sortie3.y;
                sortieN.setDepth(50);
                sortie3.setInteractive();
                sortie3.on("pointerup", function(){
                    sortie3.destroy();
                    toDestroy3.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieN.setDepth(9100);
                    chevaletDNP1.setDepth(9001);
                    chevaletDNP2.setDepth(9001);
                    chevaletDNP3.setDepth(9001);
                    chevaletDNP4.setDepth(9001);
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
            //  CHEVALET 4
            //============
            // Le Métro Carolorégien
            chevaletDNP4 = this.physics.add.image(755,700,"chevalet_d").setInteractive().setDepth(9001);
            chevaletDNP4.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 4
                //======================================
                toDestroy4.push(this.add.text(px-200, py-100, "District Nord - Le Métro Carolorégien", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy4.push(this.physics.add.image(px, py+300, "DNT4_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "« Dans les années 70, le Métro Léger de Charleroi – MLC a vu le jour.";
                toDestroy4.push(this.add.text(px-300, py+650, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                        toDestroy4.push(this.physics.add.image(px-300, py+900, "DNT4_01").setDepth(9101)); // Ajout image mini
                        txt = "Ce réseau de transport en commun aux voitures jaunes dessert \ntrois communes : Charleroi, Fontaine-l’Evêque et Anderlues";
                        txt += " \net compte 48 stations pour 4 lignes. \n\nEn 2013, la boucle entre le centre-ville et Gosselies a été inaugurée.  ";
                        txt += "\n\nPassant par Gosselies, Jumet, Lodelinsart et Dampremy, elle \nrelie le District Nord au District Centre. ";
                        txt += "\nAu cours des travaux, la nouvelle chaussée de Bruxelles, d’où la photo \nexposée est prise, a été refaite de fond en comble.";
                        toDestroy4.push(this.add.text(colTxt, py+780, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                        toDestroy4.push(this.physics.add.image(px-300, py+1330, "DNT4_02").setDepth(9101));  // Ajout image mini
                        txt = "Une toute nouvelle station a vu le jour à Jumet Madeleine permettant \nde fermer la boucle traversant Gosselies avant la "; 
                        txt += "descente vers le centre-\nville. "; 
                        txt += "\n\nDes projets d’agrandissement du réseau actuel sont encore discutés. \nDans le cadre du développement de la mobilité douce,";
                        txt += " un projet d’antenne \nvers le nouveau GHdC, sur le site des Viviers à Gilly, est mis sur la table. ";
                        txt += "\nCette ligne pourrait être prolongée jusqu’au centre-ville de Châtelet. ";                    
                        toDestroy4.push(this.add.text(colTxt, py+1220, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                        toDestroy4.push(this.physics.add.image(px-300, py+1850, "DNT4_03").setDepth(9101));  // Ajout image mini
                        txt = "Notre équipe a été plus que séduite par le point de vue qu’offre la \nchaussée de Bruxelles avec ses airs de San Fransisco."; 
                        toDestroy4.push(this.add.text(colTxt, py+1600, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                        toDestroy4.push(this.physics.add.image(px-300, py+2350, "DNT4_04").setDepth(9101));  // Ajout image mini
                        txt = "Appréciez donc la découverte des environs de San Charlisco \nen Carolofornie!"; 
                        toDestroy4.push(this.add.text(colTxt, py+2240, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                centerPlayer = true;
                lecture = true;
                var arrayShadows = this.addShadows(toDestroy4);
                arrayShadows.forEach((item) => {toDestroy4.push(item);})
                camSubject = "chevalet";
                chevaletDNP1.setDepth(1);
                chevaletDNP2.setDepth(1);
                chevaletDNP3.setDepth(1);
                chevaletDNP4.setDepth(1);
                fondsEcran.setDepth(51);
                // player.setDepth(1);
                // player.x = 0;
                // player.y = 300;
                mainCam.setZoom(1.0);
                var sortie4 = this.physics.add.image(x+50,y+2700,"portail_ferme").setDepth(9101);
                posSortie = sortie4.y;
                sortieN.setDepth(50);
                sortie4.setInteractive();
                sortie4.on("pointerup", function(){
                    sortie4.destroy();
                    toDestroy4.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieN.setDepth(9100);
                    chevaletDNP1.setDepth(9001);
                    chevaletDNP2.setDepth(9001);
                    chevaletDNP3.setDepth(9001);
                    chevaletDNP4.setDepth(9001);
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
        changeScene: function(nameScene, gameData){
            this.scene.start(nameScene, gameData);
        }
});