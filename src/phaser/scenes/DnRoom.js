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
        // PICTURES
            // DISTRICT NORD
                this.load.image('DNT1_00', '/img/visit/districtN/DN-T1/DNT1_00.jpg');
                this.load.image('DNT1_01', '/img/visit/districtN/DN-T1/DNT1_01.JPG');
                this.load.image('DNT1_02', '/img/visit/districtN/DN-T1/DNT1_02.JPG');
                this.load.image('DNT1_03', '/img/visit/districtN/DN-T1/DNT1_03.JPG');
                this.load.image('DNT1_04', '/img/visit/districtN/DN-T1/DNT1_04.JPG');

                this.load.image('DNT2_00', '/img/visit/districtN/DN-T2/DNT2_00.jpg');
                this.load.image('DNT2_01', '/img/visit/districtN/DN-T2/DNT2_01.jpg');
                this.load.image('DNT2_02', '/img/visit/districtN/DN-T2/DNT2_02.jpg');
                this.load.image('DNT2_03', '/img/visit/districtN/DN-T2/DNT2_03.JPG');
                this.load.image('DNT2_04', '/img/visit/districtN/DN-T2/DNT2_04.JPG');

                this.load.image('DNT3_00', '/img/visit/districtN/DN-T3/DNT3_00.jpg');
                // this.load.image('DNT3_01', '/img/visit/districtN/DN-T3/DNT3_01.JPG');
                // this.load.image('DNT3_02', '/img/visit/districtN/DN-T3/DNT3_02.JPG');
                // this.load.image('DNT3_03', '/img/visit/districtN/DN-T3/DNT3_03.JPG');

                this.load.image('DNT4_00', '/img/visit/districtN/DN-T4/DNT4_00.jpg');
                // this.load.image('DNT4_01', '/img/visit/districtN/DN-T4/DNT4_01.JPG');
                // this.load.image('DNT4_02', '/img/visit/districtN/DN-T4/DNT4_02.JPG');
                // this.load.image('DNT4_03', '/img/visit/districtN/DN-T4/DNT4_03.JPG');
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
        //  PORTAIL NORD
        //=================
            //============
            //  INIT
            //============         
            let x = 0; let y = 0; var px = 0; var py = 0; let txt = "";
            player.setDepth(9099);
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
            var chevaletDNP1;
            var chevaletDNP2;
            var chevaletDNP3;
            var chevaletDNP4;
            //============
            //  CHEVALET 1
            //============
            // Le Parc de la Serna à Jumet
            chevaletDNP1 = this.physics.add.image(-525,575,"chevalet_g").setInteractive().setDepth(9001);
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
                var arrayShadows = this.addShadows(toDestroy);
                arrayShadows.forEach((item) => {toDestroy.push(item);})
                camSubject = "chevalet";
                chevaletDNP1.setDepth(1);
                chevaletDNP2.setDepth(1);
                chevaletDNP3.setDepth(1);
                chevaletDNP4.setDepth(1);
                fondsEcran.setDepth(51);
                player.setDepth(1);
                player.x = 0;
                player.y = 300;
                mainCam.setZoom(1.0);
                var sortie1 = this.physics.add.image(x+50,y+2600,"portail_ferme").setDepth(9101);
                sortieN.setDepth(50);
                sortie1.setInteractive();
                sortie1.on("pointerup", function(){
                    sortie1.destroy();
                    toDestroy.forEach((item) => {item.destroy();})
                    fondsEcran.setDepth(1);
                    sortieN.setDepth(9100);
                    chevaletDNP1.setDepth(9001);
                    chevaletDNP2.setDepth(9001);
                    chevaletDNP3.setDepth(9001);
                    chevaletDNP4.setDepth(9001);
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
            // L’Aéroport et l’Aéropole de Gosselies
            chevaletDNP2 = this.physics.add.image(-140,380,"chevalet_g").setInteractive().setDepth(9001);
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
                var arrayShadows = this.addShadows(toDestroy2);
                arrayShadows.forEach((item) => {toDestroy2.push(item);})
                camSubject = "chevalet";
                chevaletDNP1.setDepth(1);
                chevaletDNP2.setDepth(1);
                chevaletDNP3.setDepth(1);
                chevaletDNP4.setDepth(1);
                fondsEcran.setDepth(51);
                player.setDepth(1);
                player.x = 0;
                player.y = 300;
                mainCam.setZoom(1.0);
                var sortie2 = this.physics.add.image(x+50,y+2750,"portail_ferme").setDepth(9101);
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
            // Jumet.bio
            chevaletDNP3 = this.physics.add.image(375,380,"chevalet_d").setInteractive().setDepth(9001);
            chevaletDNP3.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 3
                //======================================
                toDestroy3.push(this.add.text(px-175, py-100, "District Nord - Jumet.bio", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy3.push(this.physics.add.image(px, py+300, "DNT3_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "« Rien ne se perd, tout se transforme »   C’est certainement l’une des devises des membres de l’ASBL Jumet.bio !";
                toDestroy3.push(this.add.text(px-450, py+650, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                    //toDestroy3.push(this.physics.add.image(px-300, py+900, "DNT3_01").setDepth(9101)); // Ajout image mini
                    txt = "xxx"; 
                    txt += "xxx";
                    //toDestroy3.push(this.add.text(colTxt, py+770, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                    //toDestroy3.push(this.physics.add.image(px-300, py+1200, "DNT3_02").setDepth(9101));  // Ajout image mini
                    txt = "xxx"; 
                    txt += "xxx";                    
                    //toDestroy3.push(this.add.text(colTxt, py+1120, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                    //toDestroy3.push(this.physics.add.image(px-300, py+1450, "DNT3_03").setDepth(9101));  // Ajout image mini
                    txt = "xxx"; 
                    txt += "xxx";
                    //toDestroy3.push(this.add.text(colTxt, py+1350, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                    //toDestroy3.push(this.physics.add.image(px-300, py+1700, "DNT3_04").setDepth(9101));  // Ajout image mini
                    txt = "xxx"; 
                    txt += "xxx";
                    //toDestroy3.push(this.add.text(colTxt, py+1630, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                var arrayShadows = this.addShadows(toDestroy3);
                arrayShadows.forEach((item) => {toDestroy3.push(item);})
                camSubject = "chevalet";
                chevaletDNP1.setDepth(1);
                chevaletDNP2.setDepth(1);
                chevaletDNP3.setDepth(1);
                chevaletDNP4.setDepth(1);
                fondsEcran.setDepth(51);
                player.setDepth(1);
                player.x = 0;
                player.y = 300;
                mainCam.setZoom(1.0);
                var sortie3 = this.physics.add.image(x+50,y+2000,"portail_ferme").setDepth(9101);
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
            // Le Métro Carolorégien
            chevaletDNP4 = this.physics.add.image(755,575,"chevalet_d").setInteractive().setDepth(9001);
            chevaletDNP4.on("pointerup", function(){
                //======================================
                //  PHOTOS & TEXTES - CHEVALET 4
                //======================================
                toDestroy4.push(this.add.text(px-200, py-100, "District Nord - Le Métro Carolorégien", {fontFamily: fontFam, fontSize: 32,color: '#000000'}).setDepth(9101));  // Ajout titre
                toDestroy4.push(this.physics.add.image(px, py+300, "DNT4_00").setDepth(9101));   // Ajout image principale (960 px x ...)
                txt = "« Dans les années 70, le Métro Léger de Charleroi – MLC a vu le jour.";
                toDestroy4.push(this.add.text(px-300, py+650, txt, {fontFamily: fontFam,fontSize: fontSZLgd,color: colorTxt,fontStyle:'italic'}).setDepth(9101));  // Ajout légende
                    // Mini 1
                    //toDestroy4.push(this.physics.add.image(px-300, py+900, "DNT4_01").setDepth(9101)); // Ajout image mini
                    txt = "xxx"; 
                    txt += "xxx";
                    //toDestroy4.push(this.add.text(colTxt, py+770, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 2
                    //toDestroy4.push(this.physics.add.image(px-300, py+1200, "DNT4_02").setDepth(9101));  // Ajout image mini
                    txt = "xxx"; 
                    txt += "xxx";                    
                    //toDestroy4.push(this.add.text(colTxt, py+1120, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 3
                    //toDestroy4.push(this.physics.add.image(px-300, py+1450, "DNT4_03").setDepth(9101));  // Ajout image mini
                    txt = "xxx"; 
                    txt += "xxx";
                    //toDestroy4.push(this.add.text(colTxt, py+1350, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                    // Mini 4
                    //toDestroy4.push(this.physics.add.image(px-300, py+1700, "DNT4_04").setDepth(9101));  // Ajout image mini
                    txt = "xxx"; 
                    txt += "xxx";
                    //toDestroy4.push(this.add.text(colTxt, py+1630, txt, {fontFamily: fontFam,fontSize: fontSZ,color: colorTxt, align: alignTxt, lineSpacing: lnSp}).setDepth(9101));  // Ajout texte
                //======================================
                var arrayShadows = this.addShadows(toDestroy4);
                arrayShadows.forEach((item) => {toDestroy4.push(item);})
                camSubject = "chevalet";
                chevaletDNP1.setDepth(1);
                chevaletDNP2.setDepth(1);
                chevaletDNP3.setDepth(1);
                chevaletDNP4.setDepth(1);
                fondsEcran.setDepth(51);
                player.setDepth(1);
                player.x = 0;
                player.y = 300;
                mainCam.setZoom(1.0);
                var sortie4 = this.physics.add.image(x+50,y+2000,"portail_ferme").setDepth(9101);
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