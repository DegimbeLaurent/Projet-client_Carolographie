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
            this.load.spritesheet('playersheet', '/img/grey-shirt-with-snake4.png', {
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
            this.player = this.physics.add.sprite(1250,950,'playersheet').setDepth(25).setScale(0.7);
            this.anims.create({key:'left',frames: this.anims.generateFrameNumbers('playersheet', {start: 30,end: 35}),frameRate: 10,repeat: -1});
            this.anims.create({key:'right',frames: this.anims.generateFrameNumbers('playersheet', {start: 6,end: 11}),frameRate: 10,repeat: -1});
            //this.anims.create({key:'up',frames: this.anims.generateFrameNumbers('playersheet', {start: 18,end: 23}),frameRate: 10,repeat: -1});
            this.anims.create({key:'up',frames: this.anims.generateFrameNumbers('playersheet', {start: 6,end: 11}),frameRate: 10,repeat: -1});
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
            var layer30 = map.createLayer('buisson', [tileset10]).setDepth(30);
            //var layer40 = map.createLayer('tp', [tileset10]).setDepth(40);
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
            this.addHitboxDiag(350,250,-40,20,25,20);
            this.addHitboxDiag(500,350,-40,20,25,16);
        // Murs Ouest
            let coinsMurs = [[-550,500,250],[-2600,1660,100],[-3150,2150,100],[-3650,2700,100],[-3550,2800,100]];
            this.addHitbox(coinsMurs);
            this.addHitboxDiag(-710,580,-80,40,50,25);
            this.addHitboxDiag(-2600,1760,-80,40,50,8);
            this.addHitboxDiag(-3050,2250,-80,40,50,9);
            this.addHitboxDiag(-3450,2850,-80,40,50,6);
            this.addHitboxDiag(-3900,3100,80,40,50,11);
        // Mur Est
            this.addHitboxDiag(2400,1370,-80,40,50,15);
        // Chapelle & bâtiment Est
            let chapelle = [[650,1820,100],[700,1920,100],[790,1870,100],[540,1770,100],[500,1790,100],[700,2000,100],[260,1600,100]];
            this.addHitbox(chapelle);
        // Bâtiment Est
            let batimentEst = [[1000,2200,500],[500,2250,250],[300,2150,250],[700,2350,100],[1250,2600,500]];     
            this.addHitbox(batimentEst);       
        // Cloître

        // Grand mur à côté du saule, qui va jusqu'au bâtiment sud (bord map)
            this.addHitboxDiag(-230,1850,-80,40,50,8);
            let murSaulePorte = [
                [0,1710,50],[-870,2190,50],[-790,2240,50],[-710,2300,50],[-630,2340,50],[-550,2360,50],[-790,2380,50],[-870,2420,50],
                [-950,2460,50],[-1030,2470,25],[-1150,2530,25],[-1200,2570,50],[-1280,2610,50],[-1360,2690,50],[-1280,2730,50],[-1200,2770,50]            
            ];
            this.addHitbox(murSaulePorte);
            this.addHitboxDiag(-1440,2690,-80,40,50,21);
        // Bâtiment sud
            this.addHitbox([[-1840,2980,50],[-1740,3040,50]]);
            this.addHitboxDiag(-1740,3080,-80,40,50,9);
        // Mur Sud - Sud Est
            this.addHitboxDiag(-2380,3480,80,40,50,16);
            this.addHitboxDiag(-1100,4080,80,-40,50,17);
            this.addHitboxDiag(180,3320,80,-40,50,13);

        this.physics.add.collider(this.player,layer30);
            layer30.setCollisionBetween(245,247,true);
            layer30.setCollisionBetween(2147483894,2147483895,true);
            this.physics.add.collider(this.player,layer70);
            layer70.setCollisionBetween(127,214,true);
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
        var fondsNoir = this.add.rectangle(0, 0, 12600 , 6500, 0x6E5940).setDepth(1);           
        var portailN = this.physics.add.image(130,730,"portail_ferme").setInteractive().setDepth(999);
        var portailN_socle = this.physics.add.image(130,730,"portail_socle").setInteractive().setDepth(24);
        portailN.on("pointerup", function(){
            localStorage.setItem("insideRoom", true);
            Client.socket.emit("enterRoom");
            Client.socket.on("okEnterRoom", function(){
                //bruit_portail.play();
                location.href = '/website/portail-n.html';
            });
        })    
        var portailC = this.physics.add.image(540,1790,"portail_ferme").setInteractive().setDepth(999);
        var portailC_socle = this.physics.add.image(540,1790,"portail_socle").setInteractive().setDepth(24);
        portailC.on("pointerup", function(){
            localStorage.setItem("insideRoom", true);
            Client.socket.emit("enterRoom");
            Client.socket.on("okEnterRoom", function(){
                location.href = '/website/portail-c.html';
            });
        }) 
        var portailO = this.physics.add.image(-2040,1550,"portail_ferme").setInteractive().setDepth(999);
        var portailO_socle = this.physics.add.image(-2040,1550,"portail_socle").setInteractive().setDepth(24);
        portailO.on("pointerup", function(){
            localStorage.setItem("insideRoom", true);
            Client.socket.emit("enterRoom");
            Client.socket.on("okEnterRoom", function(){
                location.href = '/website/portail-o.html';
            });
        }) 
        var portailE = this.physics.add.image(140,2650,"portail_ferme").setInteractive().setDepth(999);
        var portailE_socle = this.physics.add.image(140,2650,"portail_socle").setInteractive().setDepth(24);
        portailE.on("pointerup", function(){
            localStorage.setItem("insideRoom", true);
            Client.socket.emit("enterRoom");
            Client.socket.on("okEnterRoom", function(){
                location.href = '/website/portail-e.html';
            });
        })         
        var portailS = this.physics.add.image(-1150,3290,"portail_ferme").setInteractive().setDepth(999);
        var portailS_socle = this.physics.add.image(-1150,3290,"portail_socle").setInteractive().setDepth(24);
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
        let plId = parseInt(localStorage.getItem("playerId"));
        const speed = 1800;
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
            console.log([x,y,type]);
            x += stepX;
            y += stepY;
        }    
    }
});