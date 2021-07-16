//config.key = "LoadScene2";
var DcRoom = new Phaser.Class({
    Extends: TemplateScene,
    initialize: function LoadScene(config){
        //Phaser.Scene.call(this, config);
        Phaser.Scene.call(this, {"key":"DcRoom"});
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
            // DISTRICT CENTRE
                this.load.image('DCT1_00', '/img/visit/districtC/DC-T1/DCT1_00.png');
                this.load.image('DCT1_01', '/img/visit/districtC/DC-T1/DCT1_01.png');
                this.load.image('DCT1_02', '/img/visit/districtC/DC-T1/DCT1_02.png');
                this.load.image('DCT1_03', '/img/visit/districtC/DC-T1/DCT1_03.png');
                this.load.image('DCT1_04', '/img/visit/districtC/DC-T1/DCT1_04.png');

                this.load.image('DCT2_00', '/img/visit/districtC/DC-T2/DCT2_00.png');
                this.load.image('DCT2_01', '/img/visit/districtC/DC-T2/DCT2_01.png');
                this.load.image('DCT2_02', '/img/visit/districtC/DC-T2/DCT2_02.png');
                this.load.image('DCT2_03', '/img/visit/districtC/DC-T2/DCT2_03.png');
                this.load.image('DCT2_04', '/img/visit/districtC/DC-T2/DCT2_04.png');

                this.load.image('DCT3_00', '/img/visit/districtC/DC-T3/DCT3_00.png');
                this.load.image('DCT3_01', '/img/visit/districtC/DC-T3/DCT3_01.png');
                this.load.image('DCT3_02', '/img/visit/districtC/DC-T3/DCT3_02.png');
                this.load.image('DCT3_03', '/img/visit/districtC/DC-T3/DCT3_03.png');
                this.load.image('DCT3_04', '/img/visit/districtC/DC-T3/DCT3_04.png');

                this.load.image('DCT4_00', '/img/visit/districtC/DC-T4/DCT4_00.png');
                this.load.image('DCT4_01', '/img/visit/districtC/DC-T4/DCT4_01.png');
                this.load.image('DCT4_02', '/img/visit/districtC/DC-T4/DCT4_02.png');
                this.load.image('DCT4_03', '/img/visit/districtC/DC-T4/DCT4_03.png');
                this.load.image('DCT4_04', '/img/visit/districtC/DC-T4/DCT4_04.png');
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
        //  PORTAIL CENTRE
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
            //var sortieC = this.add.rectangle(x+350,y+100,50, 75, 0xffffff).setDepth(9100).setInteractive();
            var sortieC = this.physics.add.image(100,975,"portail_ouvert").setInteractive().setDepth(9100);
            var chevaletDCP1;
            var chevaletDCP2;
            var chevaletDCP3;
            var chevaletDCP4;
            //============
            //  CHEVALET 1
            //============
            // La Chaîne des Terrils à Dampremy
            chevaletDCP1 = this.physics.add.image(-525,575,"chevalet_g").setInteractive().setDepth(9001);
            chevaletDCP1.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 1
                //======================================
                toDestroy.push(this.add.text(px-325, py-100, "District Centre - La Chaîne des Terrils à Dampremy", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy.push(this.physics.add.image(px, py+300, "DCT1_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "Véritables petites montagnes coniques dans l’horizon de la Carolofornie, les terrils ont vu le jour \nsuite à l’accumulation des déchets provenant des exploitations minières.";
                toDestroy.push(this.add.text(px-480, py+650, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                        toDestroy.push(this.physics.add.image(px-300, py+900, "DCT1_01").setDepth(9101)); // Ajout image mini
                        txt = "Composés de résidus miniers, les terrils étaient sombres \nà leur formation. Néanmoins, au fil du temps, \nchacune de ces collines artificielles a développé \nsa faune et sa flore.\n"; 
                        txt += "\nActuellement, il existe une trentaine de terrils dans la région, \ndont 14 sont classés dans le patrimoine historique et \nculturel de Charleroi. Certains sont recouverts par de la \nvégétation ou des zones boisées, mais on peut encore y \nretrouver des zones en combustion.\n";
                        toDestroy.push(this.add.text(colTxt, py+770, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                        toDestroy.push(this.physics.add.image(px-300, py+1200, "DCT1_02").setDepth(9101));  // Ajout image mini
                        txt = "\nDepuis la fermeture des exploitations minières, les terrils \nsont devenus des terrains de jeu à part entière pour les carolos :\n";
                        txt += "Randonnée, cyclisme, pistes de luge, lieux de rencontre, \nde rendez-vous, …";
                        txt += "Chacun a ses propres souvenirs sur \nces grands espaces verts qui ne laissent pas indifférents.\n";
                        txt += "Il n’y a d’ailleurs rien de mieux que de prendre un peu de \nhauteur en se baladant sur un terril pour admirer la région.\n";
                        toDestroy.push(this.add.text(colTxt, py+1095, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                        toDestroy.push(this.physics.add.image(px-300, py+1450, "DCT1_03").setDepth(9101));  // Ajout image mini
                        txt = "\nLa vue depuis le sommet du terril de la Blanchisserie.\n";
                
                        toDestroy.push(this.add.text(colTxt, py+1390, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                        toDestroy.push(this.physics.add.image(px-300, py+1700, "DCT1_04").setDepth(9101));  // Ajout image mini
                        txt = "Parmi les terrils les plus connus, le terril des Piges est \ncertainement le plus emblématique et le plus visité. \nS’il n’est pas aisément accessible, une fois arrivé au sommet, \nun panorama magnifique sur Charleroi et les alentours \nse dessine sous vos yeux.\n";
                        // txt += "C’est l’endroit parfait pour une photo souvenir!\n";
                        // txt += "La vue depuis le sommet du terril des Piges Martin, Augustin et Alexis\n";
                        toDestroy.push(this.add.text(colTxt, py+1580, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                var arrayShadows = this.addShadows(toDestroy);
                arrayShadows.forEach((item) => {toDestroy.push(item);})
                camSubject = "chevalet";
                chevaletDCP1.setDepth(1);
                chevaletDCP2.setDepth(1);
                chevaletDCP3.setDepth(1);
                chevaletDCP4.setDepth(1);
                fondsEcran.setDepth(51);
                player.setDepth(1);
                player.x = 0;
                player.y = 300;
                mainCam.setZoom(1.0);
                var sortie1 = this.physics.add.image(x+50,y+2000,"portail_ferme").setDepth(9101);
                sortieC.setDepth(50);
                sortie1.setInteractive();
                sortie1.on("pointerup", function(){
                    sortie1.destroy();
                    toDestroy.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieC.setDepth(9100);
                    chevaletDCP1.setDepth(9001);
                    chevaletDCP2.setDepth(9001);
                    chevaletDCP3.setDepth(9001);
                    chevaletDCP4.setDepth(9001);
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
            // Charleroi District Créatif
            chevaletDCP2 = this.physics.add.image(-140,380,"chevalet_g").setInteractive().setDepth(9001);
            chevaletDCP2.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 2
                //======================================
                toDestroy2.push(this.add.text(px-275, py-100, "District Centre - Charleroi District Créatif", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy2.push(this.physics.add.image(px, py+300, "DCT2_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "Après la Ville Basse, c’est maintenant au tour de la Ville Haute d’avoir droit à son relooking! \nAvec son programme de rénovation du quartier, Charleroi District Créatif apporte la solution.";
                toDestroy2.push(this.add.text(px-475, py+650, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                        toDestroy2.push(this.physics.add.image(px-300, py+900, "DCT2_01").setDepth(9101)); // Ajout image mini
                        txt = "Par le biais de ce programme, la Ville de Charleroi souhaite \nrevitaliser l’espace urbain en rénovant les bâtiments, \naménageant des espaces verts, des piétonniers agréables \net en développant un véritable campus étudiant.\n"; 
                        txt += "\nLe Palais des Expos, le Palais des Beaux-Arts ou le BPS22, … \nle plan s’attaque à des bâtiments emblématiques en vue \nde les rénover et de les moderniser.\n";
                        toDestroy2.push(this.add.text(colTxt, py+770, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                        toDestroy2.push(this.physics.add.image(px-300, py+1200, "DCT2_02").setDepth(9101));  // Ajout image mini
                        txt = "Le Palais des Expositions sera nommé dorénavant le \n« Grand Palais »."; 
                        txt += "Par le passé, le bâtiment accueillait \négalement la caserne des pompiers, un bowling, \ndes terrains de tennis et même un skate-park.\n";
                        txt += "\nL’objectif du chantier est de moderniser, de rénover les halls \net d’ouvrir l’édifice sur son environnement.\n";                   
                        toDestroy2.push(this.add.text(colTxt, py+1080, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                        toDestroy2.push(this.physics.add.image(px-300, py+1450, "DCT2_03").setDepth(9101));  // Ajout image mini
                        txt = "\nSur la photo de gauche, le Palais des Expositions \nen travaux\n";
                        txt += "\nUne fois les travaux finis, toute la ville sera passée au \npeigne fin afin de redonner un coup de lumière \nsur le Pays Noir.\n";
                        txt += "\nCharleroi District Créatif a pour ambition de donner \nun nouveau souffle à Charleroi afin qu’elle devienne \nun pôle culturel et événementiel incontournable de Wallonie \net de Belgique.\n";
                        toDestroy2.push(this.add.text(colTxt, py+1300, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                        toDestroy2.push(this.physics.add.image(px-300, py+1775, "DCT2_04").setDepth(9101));  // Ajout image mini
                        txt = "\nLa façade photographiée, sur laquelle le Bisous M’chou \na été peint par l’artiste new yorkais Steve Powers, sera \nbien évidemment conservée.\n";
                         
                        // txt += "xxx";
                        toDestroy2.push(this.add.text(colTxt, py+1700, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                var arrayShadows = this.addShadows(toDestroy2);
                arrayShadows.forEach((item) => {toDestroy2.push(item);})
                camSubject = "chevalet";
                chevaletDCP1.setDepth(1);
                chevaletDCP2.setDepth(1);
                chevaletDCP3.setDepth(1);
                chevaletDCP4.setDepth(1);
                fondsEcran.setDepth(51);
                player.setDepth(1);
                player.x = 0;
                player.y = 300;
                mainCam.setZoom(1.0);
                var sortie2 = this.physics.add.image(x+50,y+2000,"portail_ferme").setDepth(9101);
                sortieC.setDepth(50);
                sortie2.setInteractive();
                sortie2.on("pointerup", function(){
                    sortie2.destroy();
                    toDestroy2.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieC.setDepth(9100);
                    chevaletDCP1.setDepth(9001);
                    chevaletDCP2.setDepth(9001);
                    chevaletDCP3.setDepth(9001);
                    chevaletDCP4.setDepth(9001);
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
            // Le Passage de la Bourse à Charleroi
            chevaletDCP3 = this.physics.add.image(375,380,"chevalet_d").setInteractive().setDepth(9001);
            chevaletDCP3.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 3
                //======================================
                toDestroy3.push(this.add.text(px-325, py-100, "District Centre - Le Passage de la Bourse à Charleroi", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy3.push(this.physics.add.image(px, py+300, "DCT3_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "Le Passage de la Bourse, un lieu incontournable du centre-ville de Charleroi!";
                toDestroy3.push(this.add.text(px-325, py+650, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                        toDestroy3.push(this.physics.add.image(px-300, py+950, "DCT3_01").setDepth(9101)); // Ajout image mini
                        txt = "Dans le courant du 19ème siècle, la ville décide \nde se doter d’une rue commerçante couverte, comme \nd’autres grandes villes de l’époque.\n"; 
                        txt += "Inauguré en 1892, le Passage de la Bourse est édifié \nà partir des plans de l’architecte bruxellois \nEdmond Legraive.\n";
                        txt += "Les façades néoclassiques sont classées depuis 1990. \nElles ont été rénovées ces dernières années \nlors de la création du centre commercial Rive Gauche. \n";
                        toDestroy3.push(this.add.text(colTxt, py+700, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                        toDestroy3.push(this.physics.add.image(px +150, py+1150, "DCT3_02").setDepth(9101));  // Ajout image mini
                        txt = "La galerie est lumineuse grâce à sa verrière réalisée \nen acier et en verre, des matériaux qui n’ont aucun secret \npour les industries carolos.\n"; 
                        txt += "\nLe Passage a toujours accueilli des commerces : cinéma, \nlibrairie, imprimerie … \n";                    
                        toDestroy3.push(this.add.text(colTxt, py+1275, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                        toDestroy3.push(this.physics.add.image(px-300, py+1825, "DCT3_03").setDepth(9101));  // Ajout image mini
                        txt = "À l’heure actuelle, on peut notamment y retrouver l’emblématique librairie Fafouille \net des commerces plus récents : le café librairie Livre ou Verre, \nl’opticien Lionel Devillers, le restaurant Tapas \n\'y mas by Gusto Gusto\' ou le concept store Mama&Son.\n"; 
                        // txt += "xxx\n";
                        toDestroy3.push(this.add.text(colTxt, py+1500, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                        toDestroy3.push(this.physics.add.image(px-300, py+1450, "DCT3_04").setDepth(9101));  // Ajout image mini
                        txt = "à gauche, a librairie Fafouille\n";
                        txt += "\nTout ce beau monde s’y retrouve pour re-donner vie \nà cet endroit qui mérite clairement le coup d’œil!\n"; 
                        // txt += "xxx\n";
                        toDestroy3.push(this.add.text(colTxt, py+1700, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                var arrayShadows = this.addShadows(toDestroy3);
                arrayShadows.forEach((item) => {toDestroy3.push(item);})
                camSubject = "chevalet";
                chevaletDCP1.setDepth(1);
                chevaletDCP2.setDepth(1);
                chevaletDCP3.setDepth(1);
                chevaletDCP4.setDepth(1);
                fondsEcran.setDepth(51);
                player.setDepth(1);
                player.x = 0;
                player.y = 300;
                mainCam.setZoom(1.0);
                var sortie3 = this.physics.add.image(x+50,y+2000,"portail_ferme").setDepth(9101);
                sortieC.setDepth(50);
                sortie3.setInteractive();
                sortie3.on("pointerup", function(){
                    sortie3.destroy();
                    toDestroy3.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieC.setDepth(9100);
                    chevaletDCP1.setDepth(9001);
                    chevaletDCP2.setDepth(9001);
                    chevaletDCP3.setDepth(9001);
                    chevaletDCP4.setDepth(9001);
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
            // Les Quais de Sambre à Charleroi
            chevaletDCP4 = this.physics.add.image(755,575,"chevalet_d").setInteractive().setDepth(9001);
            chevaletDCP4.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 4
                //======================================
                toDestroy4.push(this.add.text(px-325, py-150, "District Centre - Les Quais de Sambre à Charleroi", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy4.push(this.physics.add.image(px, py+250, "DCT4_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "On ne peut parler de Charleroi sans évoquer la Sambre, la rivière qui la traverse!";
                toDestroy4.push(this.add.text(px-325, py+600, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                        toDestroy4.push(this.physics.add.image(px-300, py+750, "DCT4_01").setDepth(9101)); // Ajout image mini
                        txt = "En 2014, à l’occasion des fêtes de Wallonie, les nouveaux \nQuais de Sambre et « la Placerelle » ont été inaugurés.\n"; 
                        txt += "C’est en 2016 que le Quai de Brabant a été renommé \nQuai Arthur Rimbaud afin de rendre hommage \nau poète français. En 1870, lors d’un séjour à Charleroi, \nRimbaud a écrit son poème « Au cabaret vert ».\n";
                        toDestroy4.push(this.add.text(colTxt, py+655, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                        toDestroy4.push(this.physics.add.image(px-300, py+1050, "DCT4_02").setDepth(9101));  // Ajout image mini
                        txt = "« La Placerelle » à l’avant-plan et le Quai10 à l’arrière-plan.\n";                    
                        txt += "Dans le bâtiment qui accueillait la Banque Nationale de \nBelgique, se trouve le Quai10. L’édifice a été construit \ndans les années 60 à partir des plans \nde M. Van Goethem. \n\nInauguré en 2017, le Quai10 met en avant la culture \ngrâce à ses salles de cinéma. On y retrouve également \nun espace gaming et une brasserie.\n"; 
                        toDestroy4.push(this.add.text(colTxt, py+925, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                        toDestroy4.push(this.physics.add.image(px-300, py+1400, "DCT4_03").setDepth(9101));  // Ajout image mini
                        txt = "De l’autre côté de la Sambre, la Gare de Charleroi-Sud \ntrône fièrement. Mise en service en 1943, le bâtiment, \ncomposé d’un pavillon central et de deux ailes, \na été inauguré en 1874.\n"; 
                        // txt += "xxx\n";
                        toDestroy4.push(this.add.text(colTxt, py+1275, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                        toDestroy4.push(this.physics.add.image(px-300, py+1775, "DCT4_04").setDepth(9101));  // Ajout image mini
                        txt = "À côté de celle-ci, on retrouve A6K/E6K, deux projets \nrassemblés sur un plateau de l’ancien Tri Postal. Ces projets \nvisent à promouvoir l’innovation technologique, d’une part, \net l’éducation aux technologies du numérique, d’autre part.\n"; 
                        // txt += "xxx\n";
                        toDestroy4.push(this.add.text(colTxt, py+1580, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                var arrayShadows = this.addShadows(toDestroy4);
                arrayShadows.forEach((item) => {toDestroy4.push(item);})
                camSubject = "chevalet";
                chevaletDCP1.setDepth(1);
                chevaletDCP2.setDepth(1);
                chevaletDCP3.setDepth(1);
                chevaletDCP4.setDepth(1);
                fondsEcran.setDepth(51);
                player.setDepth(1);
                player.x = 0;
                player.y = 300;
                mainCam.setZoom(1.0);
                var sortie4 = this.physics.add.image(x+50,y+2000,"portail_ferme").setDepth(9101);
                sortieC.setDepth(50);
                sortie4.setInteractive();
                sortie4.on("pointerup", function(){
                    sortie4.destroy();
                    toDestroy4.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieC.setDepth(9100);
                    chevaletDCP1.setDepth(9001);
                    chevaletDCP2.setDepth(9001);
                    chevaletDCP3.setDepth(9001);
                    chevaletDCP4.setDepth(9001);
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
            sortieC.on("pointerup", function(){
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