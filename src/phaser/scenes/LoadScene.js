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
        this.load.image('portail_socle', '/img/sol_portail.png');
        this.load.image('btn_quitter', '/img/quitter.jpg');
        //this.load.bitmapFont('myfont', '/assets/fonts/Berry-Rotunda.png','/assets/fonts/BerryRotunda.xml');
        // PLAYER
            this.load.image('player-diagonale-gauche-haut', '/img/diagonal-back-left.png');
            this.load.image('player-diagonale-gauche-bas', '/img/diagonal-front-left.png');
            this.load.image('player-diagonale-droite-haut', '/img/diagonal-back-right.png');
            this.load.image('player-diagonale-droite-bas', '/img/diagonal-front-right.png');
            this.load.image('player-gauche', '/img/front-left.png');
            this.load.image('player-droite', '/img/front-right.png');
            this.load.image('player-haut', '/img/front-back.png');
            this.load.image('player-bas', '/img/front-front.png');
            this.load.spritesheet('playersheet', '/img/grey-shirt-with-snake.png', {
                frameWidth: 85,
                frameHeight: 169
            });
            this.load.spritesheet('playersheetMain', '/img/blue-water-shirt.png', {
                frameWidth: 85,
                frameHeight: 169
            });

        // BARRES COLLISIONS
            this.load.image('cb25-25', '/img/collisions/cb25-25.png');
            this.load.image('cb50-50', '/img/collisions/cb50-50.png');
            this.load.image('cb100-100', '/img/collisions/cb100-100.png');
            this.load.image('cb250-250', '/img/collisions/cb250-250.png');
            this.load.image('cb500-500', '/img/collisions/cb500-500.png');

        // SONS & BRUITAGES
        this.load.audio('course', '/assets/sounds/course.mp3');
        this.load.audio('campagne', '/assets/sounds/ambiance_campagne.mp3');
        this.load.audio('feu', '/assets/sounds/feu.mp3');
        this.load.audio('portail', '/assets/sounds/portail.mp3');
    },
    create: function(config){
        console.log("on passe ici...");
        game.backgroundColor='#6E5940';
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
        map = this.add.tilemap('map_visite');
        // map_collisions = this.add.tilemap('map_collisions');
        var tileset10 = map.addTilesetImage('set_tuile', 'set_tuile');
        // var tilesetHitbox = map_collisions.addTilesetImage('hitbox', 'hitbox');
        var layer10 = map.createLayer('ground', [tileset10]).setDepth(10);
        var layer20 = map.createLayer('flower', [tileset10]).setDepth(20);        
            //==========================================
            //  AJOUT DU JOUEUR
            //==========================================
            let repop = localStorage.getItem("repop").split(",");
            let repopX =parseInt(repop[0]);
            let repopY =parseInt(repop[1]);
            this.player = this.physics.add.sprite(repopX,repopY,'playersheetMain').setDepth(25).setScale(0.7);
            this.anims.create({key:'left',frames: this.anims.generateFrameNumbers('playersheetMain', {start: 30,end: 35}),frameRate: 10,repeat: -1});
            this.anims.create({key:'right',frames: this.anims.generateFrameNumbers('playersheetMain', {start: 6,end: 11}),frameRate: 10,repeat: -1});
            //this.anims.create({key:'up',frames: this.anims.generateFrameNumbers('playersheetMain', {start: 18,end: 23}),frameRate: 10,repeat: -1});
            this.anims.create({key:'up',frames: this.anims.generateFrameNumbers('playersheetMain', {start: 6,end: 11}),frameRate: 10,repeat: -1});
            this.anims.create({key:'down',frames: this.anims.generateFrameNumbers('playersheetMain', {start: 36,end: 41}),frameRate: 10,repeat: -1});
            this.anims.create({key:'diagLUp',frames: this.anims.generateFrameNumbers('playersheetMain', {start: 24,end: 29}),frameRate: 10,repeat: -1});
            this.anims.create({key:'diagLDown',frames: this.anims.generateFrameNumbers('playersheetMain', {start: 42,end: 47}),frameRate: 10,repeat: -1});
            this.anims.create({key:'diagRUp',frames: this.anims.generateFrameNumbers('playersheetMain', {start: 12,end: 17}),frameRate: 10,repeat: -1});
            this.anims.create({key:'diagRDown',frames: this.anims.generateFrameNumbers('playersheetMain', {start: 0,end: 5}),frameRate: 10,repeat: -1});            
            this.anims.create({key: 'turn',frames: [{key: 'playersheetMain',frame: 45}],frameRate: 20})
            this.player.name = "myPlayer";
            playerVelocity = 2;            
            this.player.body.setVelocity(1,2).setBounce(1, 1).setCollideWorldBounds(true);
            cursors = this.input.keyboard.createCursorKeys();
            //==========================================    
            var layer30 = map.createLayer('buisson', [tileset10]).setDepth(30);
            //var layer40 = map.createLayer('tp', [tileset10]).setDepth(40);
            var layer50 = map.createLayer('ruine stage 2', [tileset10]).setDepth(50);
            var layer60 = map.createLayer('ruine top', [tileset10]).setDepth(60);
            var layer70 = map.createLayer('ruine bottom', [tileset10]).setDepth(70);            
            var layer80 = map.createLayer('ruine stage', [tileset10]).setDepth(80);
            var layer85 = map.createLayer('murtest', [tileset10]).setDepth(85);

            var layer90 = map.createLayer('building bottom', [tileset10]).setDepth(90);
            var layer100 = map.createLayer('building top ', [tileset10]).setDepth(100);
            var layer110 = map.createLayer('building transparanse', [tileset10]).setDepth(110);
            var layer120 = map.createLayer('correction', [tileset10]).setDepth(120);
            var layer130 = map.createLayer('roof 2', [tileset10]).setDepth(130);
            var layer140 = map.createLayer('roof 1', [tileset10]).setDepth(140);
            var layer150 = map.createLayer('tronc', [tileset10]).setDepth(150);
            var layer160 = map.createLayer('arbre', [tileset10],0,0).setDepth(160);

        //const layer160 = map.createStaticLayer('arbre', [tileset10]).setDepth(160);
        var layer170 = map.createLayer('chappelle', [tileset10]).setDepth(170);
        var layer180 = map.createLayer('chappelle center', [tileset10]).setDepth(180);
        var layer190 = map.createLayer('chappelle top', [tileset10]).setDepth(190);
        //==========================================
        //  AJOUT DES COLLISIONS
        //==========================================
        // Mur Nord
            this.addHitboxDiag(2480,1280,-80,-40,50,27);
        // Serre
            this.addHitboxDiag(350,250,-40,20,25,20); // diagonale côté mur
            this.addHitboxDiag(510,350,-40,20,25,16); // diagonale côté fleurs
        // Murs Ouest
            let coinsMurs = [[-550,500,250],[-2750,1710,100],[-3250,2220,100],[-3750,2950,100],[-3850,3000,100]]; // quelques coins de murs
            this.addHitbox(coinsMurs);
            this.addHitboxDiag(-710,580,-80,40,50,26); // 1ère section de mur en partant du haut
            this.addHitboxDiag(-2760,1840,-80,40,50,7); // 2ème section
            this.addHitboxDiag(-3290,2330,-80,40,50,7); // 3ème section
            this.addHitboxDiag(-3750,2650,0,60,50,5); // 4ème section
            this.addHitboxDiag(-3900,3100,80,40,50,11);  // portion de mur qui rejoint le bâtiment sud
        // Mur Est
            this.addHitboxDiag(2400,1370,-80,40,50,21);
        // Chapelle & bâtiment Est
            let chapelle = [[650,1820,100],[700,1920,100],[790,1870,100],[540,1770,100],[500,1790,100],[700,2000,100],[260,1600,100]];
            this.addHitbox(chapelle);
        // Bâtiment Est
            let batimentEst = [[1240,2870,50]];     
            this.addHitbox(batimentEst);    
            this.addHitboxDiag(205,2275,50,-25,25,9); // façade ouest
            this.addHitboxDiag(205,2300,50,25,25,22); // façade sud
        // Cloître
            let cloitre = [[100,3270,25],[890,2900,25]];
            this.addHitbox(cloitre);
            this.addHitboxDiag(-740,2875,50,25,25,13); // mur sud - partie 1
            this.addHitboxDiag(0,3250,50,25,25,2); // mur sud - partie 2
            this.addHitboxDiag(-690,2850,50,-25,25,3); // mur ouest - partie 1
            this.addHitboxDiag(-490,2750,50,-25,25,13); // mur ouest - partie 2
            this.addHitboxDiag(160,3270,50,-25,25,13); // mur est - partie 1
            this.addHitboxDiag(140,2450,50,25,25,3); // mur nord - partie 1
            this.addHitboxDiag(360,2560,50,25,25,13); // mur nord - partie 2
        // Grand mur à côté du saule, qui va jusqu'au bâtiment sud (bord map)
            this.addHitboxDiag(-230,1850,-80,40,50,8);
            let murSaulePorte = [
                [0,1710,50],[-870,2190,50],[-790,2240,50],[-710,2300,50],[-630,2340,50],[-550,2360,50],[-790,2380,50],[-870,2420,50],
                [-950,2460,50],[-1030,2470,25],[-1150,2530,25],[-1200,2570,50],[-1280,2610,50],[-1360,2690,50],[-1280,2730,50],[-1200,2770,50]            
            ];
            this.addHitbox(murSaulePorte);
            this.addHitboxDiag(-1440,2690,-80,40,50,21); // dernière portion du mur qui passe derrière le bâtiment sud
        // Bâtiment sud
            this.addHitbox([[-1840,2980,50],[-1740,3040,50]]); // facade nord
            this.addHitboxDiag(-1740,3080,-80,40,50,9); // facade est
        // Mur Sud - Sud Est
            this.addHitboxDiag(-2380,3480,80,40,50,16); // diagonale côté sud
            this.addHitboxDiag(-1100,4080,80,-40,50,15); // diagonale (50px) côté est
            this.addHitboxDiag(80,3500,50,-25,25,26); // diagonale (25px) côté est
        // Arbres & pancarte
            let arbres = [[-630,700,50],[-760,750,50],[-890,800,50],[-510,870,50],[-1530,1160,50],[-2040,1410,50],[-2810,2020,50],[-2940,2470,50],
            [-3190,2690,50],[-1140,2110,50],[1920,1190,50],[1660,1450,50],[1410,1450,50],[1160,1740,50],[0,2550,50]];
            this.addHitbox(arbres);
            this.addHitbox([[1060,760,50]]); // pancarte
        //==========================================
        //  GESTION DE LA CAMERA
        //==========================================
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        var coeffZoom = 0.8;
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
        //==========================================
        //  CREATION DE LA MINIMAP
        //==========================================  
        let lgMax = Math.round(DEFAULT_WIDTH / 4);
        let htMax = Math.round(DEFAULT_HEIGHT / 4);
        this.minimap = this.cameras.add(DEFAULT_WIDTH - lgMax, DEFAULT_HEIGHT - htMax, lgMax, htMax).setZoom(0.1).setName('mini').startFollow(this.player, true, 0.1, 0.1);
        this.minimap.setBackgroundColor(0x002244);
        this.minimap.scrollX = 1600;
        this.minimap.scrollY = 900;
        //==========================================
        //  AJOUT BOUTON QUITTER
        //==========================================
        var btnQuitter = this.add.sprite(1350, 900,"btn_quitter").setInteractive().setDepth(999);
        btnQuitter.on("pointerup", function(){
            location.href = '/website/remerciements.html';
        })
        //==========================================
        //  AJOUT DES SONS
        //==========================================
        bruit_course = this.sound.add("course", { loop: true });
        bruit_course.allowMultiple = false;
        bruit_ambiance = this.sound.add("campagne", { loop: true });
        bruit_ambiance.allowMultiple = false;
        bruit_ambiance.play();
        bruit_feu = this.sound.add("feu", { loop: true });
        bruit_feu.allowMultiple = false;
        bruit_portail = this.sound.add("portail", { loop: false });
        bruit_portail.allowMultiple = false;
        //==========================================
        //  AJOUT DES PORTAILS
        //==========================================
        localStorage.setItem("touchingPt",false);
        var fondsNoir = this.add.rectangle(0, 0, 12600 , 6500, 0x6E5940).setDepth(1);           
            //================
            // NORD
            //================
            var portailN_socle = this.physics.add.image(130,730,"portail_socle").setInteractive().setDepth(24);
            portailN = this.physics.add.image(130,730,"portail_ferme").setInteractive().setDepth(999);
            portailN.name = "n";
            this.physics.add.overlap(portailN,this.player,this.closeToPortail,()=>{},this);
            var activePtN = this.physics.add.sprite(130,800,"cb25-25").setDepth(999).setBounce(1,1).setCollideWorldBounds(true).setImmovable(true);
            activePtN.name = "n";
            this.physics.add.collider(activePtN, this.player,this.hitPortail,()=>{},this);
            //================
            // CENTRE
            //================
            var portailC_socle = this.physics.add.image(540,1790,"portail_socle").setInteractive().setDepth(24);
            portailC = this.physics.add.image(540,1790,"portail_ferme").setInteractive().setDepth(999);
            portailC.name = "c";
            this.physics.add.overlap(portailC,this.player,this.closeToPortail,()=>{},this);
            var activePtC = this.physics.add.sprite(540,1860,"cb25-25").setDepth(999).setBounce(1,1).setCollideWorldBounds(true).setImmovable(true);
            activePtC.name = "c";
            this.physics.add.collider(activePtC, this.player,this.hitPortail,()=>{},this);
            //================
            // OUEST
            //================
            portailO = this.physics.add.image(-2040,1550,"portail_ferme").setInteractive().setDepth(999);
            var portailO_socle = this.physics.add.image(-2040,1550,"portail_socle").setInteractive().setDepth(24);
            portailO.name = "o";
            this.physics.add.overlap(portailO,this.player,this.closeToPortail,()=>{},this);
            var activePtO = this.physics.add.sprite(-2040,1620,"cb25-25").setDepth(999).setBounce(1,1).setCollideWorldBounds(true).setImmovable(true);
            activePtO.name = "o";
            this.physics.add.collider(activePtO, this.player,this.hitPortail,()=>{},this);
            //================
            // EST
            //================
            portailE = this.physics.add.image(140,2650,"portail_ferme").setInteractive().setDepth(999);
            var portailE_socle = this.physics.add.image(140,2650,"portail_socle").setInteractive().setDepth(24);
            portailE.name = "e";
            this.physics.add.overlap(portailE,this.player,this.closeToPortail,()=>{},this);
            var activePtE = this.physics.add.sprite(140,2720,"cb25-25").setDepth(999).setBounce(1,1).setCollideWorldBounds(true).setImmovable(true);
            activePtE.name = "e";
            this.physics.add.collider(activePtE, this.player,this.hitPortail,()=>{},this);
            //================
            // SUD
            //================
            portailS = this.physics.add.image(-1150,3290,"portail_ferme").setInteractive().setDepth(999);
            var portailS_socle = this.physics.add.image(-1150,3290,"portail_socle").setInteractive().setDepth(24);
            portailS.name = "s";
            this.physics.add.overlap(portailS,this.player,this.closeToPortail,()=>{},this);
            var activePtS = this.physics.add.sprite(-1150,3360,"cb25-25").setDepth(999).setBounce(1,1).setCollideWorldBounds(true).setImmovable(true);
            activePtS.name = "s";
            this.physics.add.collider(activePtS, this.player,this.hitPortail,()=>{},this);
},
update: function(time, delta){
        if(localStorage.getItem("touchingPt")){
            let nbPtClosed = 0;
            if(!this.physics.overlap(this.player,portailN)){portailN.setTexture("portail_ferme"); nbPtClosed++;}
            if(!this.physics.overlap(this.player,portailC)){portailC.setTexture("portail_ferme"); nbPtClosed++;}
            if(!this.physics.overlap(this.player,portailO)){portailO.setTexture("portail_ferme"); nbPtClosed++;}
            if(!this.physics.overlap(this.player,portailE)){portailE.setTexture("portail_ferme"); nbPtClosed++;}
            if(!this.physics.overlap(this.player,portailS)){portailS.setTexture("portail_ferme"); nbPtClosed++;}
            if(nbPtClosed == 5){localStorage.setItem("touchingPt",false);}
        }
        controls.update(delta);
        let plId = parseInt(localStorage.getItem("playerId"));
        const speed = 800;
        const prevVelocity = this.player.body.velocity.clone();
        //this.player.body.setVelocity(0);
        
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
        var mousePointer = this.input.activePointer;
        game.players = this.removeDisconnectedPlayers(this, game.players);
        this.updateConnectedPlayers(this, game.players, game.playersBU, this.player);
        this.movePlayers(this, game.players, plId);
        this.stopPlayers(this, game.players);
    },
    changeScene: function(nameScene, gameData){
        this.scene.start(nameScene, gameData);
    },
    addHitbox: function(data){
        let type = "";
        data.forEach((item)=>{
            type = "cb"+item[2]+"-"+item[2];
            return this.physics.add.collider(this.player, this.physics.add.sprite(item[0],item[1],type).setDepth(999).setBounce(1,1).setCollideWorldBounds(true).setImmovable(true));
        })
    },
    addHitboxDiag: function(x,y,stepX,stepY,type,qty){
        for(let i=0; i<qty; i++){
            this.physics.add.collider(this.player, this.physics.add.sprite(x,y,"cb"+type+"-"+type).setDepth(999).setBounce(1,1).setCollideWorldBounds(true).setImmovable(true));
            //console.log([x,y,type]);
            x += stepX;
            y += stepY;
        }    
    },
    hitPortail: function(portail){
        localStorage.setItem("insideRoom", true);
        if(portail.name == "n"){
            localStorage.setItem("repop",[0,900]);
            Client.socket.emit("enterRoom");
            Client.socket.on("okEnterRoom", function(){location.href = '/website/portail-n.html';});
        }
        if(portail.name == "s"){
            localStorage.setItem("repop",[-1300,3390]);
            Client.socket.emit("enterRoom");
            Client.socket.on("okEnterRoom", function(){location.href = '/website/portail-s.html';});
        }
        if(portail.name == "o"){
            localStorage.setItem("repop",[-2190,1650]);
            Client.socket.emit("enterRoom");
            Client.socket.on("okEnterRoom", function(){location.href = '/website/portail-o.html';});
        }
        if(portail.name == "e"){
            localStorage.setItem("repop",[0,2750]);
            Client.socket.emit("enterRoom");
            Client.socket.on("okEnterRoom", function(){location.href = '/website/portail-e.html';});
        }
        if(portail.name == "c"){
            localStorage.setItem("repop",[470,1910]);
            console.log("touché portail centre!");
            Client.socket.emit("enterRoom");
            Client.socket.on("okEnterRoom", function(){location.href = '/website/portail-c.html';});
        }
    },
    closeToPortail: function(portail){
        if(portail.name == "n"){portailN.setTexture("portail_ouvert");}
        if(portail.name == "s"){portailS.setTexture("portail_ouvert");}
        if(portail.name == "o"){portailO.setTexture("portail_ouvert");}
        if(portail.name == "e"){portailE.setTexture("portail_ouvert");}
        if(portail.name == "c"){portailC.setTexture("portail_ouvert");}
        localStorage.setItem("touchingPt",true);
    }
});