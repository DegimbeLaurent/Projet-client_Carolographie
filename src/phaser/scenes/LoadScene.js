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

        // BARRES COLLISIONS
            this.load.image('barre-256-10', '/img/collisions/barre-256-10.png');

        // SONS & BRUITAGES
        this.load.audio('course', '/assets/sounds/course.mp3');
        this.load.audio('campagne', '/assets/sounds/ambiance_campagne.mp3');
        this.load.audio('feu', '/assets/sounds/feu.mp3');
        this.load.audio('portail', '/assets/sounds/portail.mp3');
    },
    create: function(config){
        console.log("on passe ici...");
        game.backgroundColor='#6E5940';
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
        map = this.add.tilemap('map_visite');
        var tileset10 = map.addTilesetImage('set_tuile', 'set_tuile');
        var layer10 = map.createLayer('ground', [tileset10]).setDepth(10);
        var layer20 = map.createLayer('flower', [tileset10]).setDepth(20);        
            //==========================================
            //  AJOUT DU JOUEUR
            //==========================================
            this.player = this.physics.add.sprite(1250,950,'playersheet').setDepth(25).setScale(0.7);
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
            // this.player.setCollideWorldBounds(true);
            playerVelocity = 2;            
            //crate = this.physics.add.sprite(1250,700,'sprite').setDepth(999);
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
            var layer160 = map.createLayer('arbre', [tileset10]).setDepth(160);
            layer160.setCollisionByProperty({collides: true});
            this.physics.add.collider(this.player, layer160);
        //const layer160 = map.createStaticLayer('arbre', [tileset10]).setDepth(160);
        var layer170 = map.createLayer('chappelle', [tileset10]).setDepth(170);
        var layer180 = map.createLayer('chappelle center', [tileset10]).setDepth(180);
        var layer190 = map.createLayer('chappelle top', [tileset10]).setDepth(190);
        
//layer160.setCollisionByProperty({collides:true});
        //==========================================
        //  GESTION DE LA CAMERA
        //==========================================
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        var coeffZoom = 1.0;
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
        this.minimap = this.cameras.add(DEFAULT_WIDTH - lgMax, DEFAULT_HEIGHT - htMax, lgMax, htMax).setZoom(0.1).setName('mini').startFollow(this.player, true, 0.1, 0.1);
        this.minimap.setBackgroundColor(0x002244);
        this.minimap.scrollX = 1600;
        this.minimap.scrollY = 900;
        //this.minimap.visible = false;
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
        //==========================================
        //  AJOUT DES COLLISIONS
        //==========================================
        // var blocsCollisions = [];
        // stopCourse = false;

        // this.bloc1 = this.physics.add.sprite(1250,850,"barre-256-10").setDepth(999).setBounce(1,1);
        // this.bloc1.body.setBounce(1,1).setCollideWorldBounds(true);
        // this.bloc1.setImmovable(true);

        // mcrate = this.physics.add.sprite(1250,700,'sprite').setDepth(999);
        // mcrate.body.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);
        // this.physics.add.collider(this.player, this.bloc1,function(){stopCourse = true;console.log("touché barre horizontale...["+stopCourse+"]");},null,this);
        // this.physics.add.collider(this.bloc1, this.player);
},
update: function(time, delta){
        // if(stopCourse){this.player.anims.play('turn');console.log("stoppé net!");}
        //this.physics.world.collide(mcrate, this.bloc1);
        // this.physics.world.collide(this.player, mcrate);
        //this.physics.world.collide(this.player, this.bloc1);
        // this.physics.world.collide(this.bloc1, this.player);
        //===
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
    }
});
        // if(cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown){
        //     if (cursors.left.isDown){
        //         if(cursors.up.isDown){
        //             if(!cursors.right.isDown && !cursors.down.isDown){
        //                 //this.player.anims.play('diagLUp', true);
        //                 //this.player.x -= Math.round(playerVelocity*2);
        //                 this.player.body.setVelocityX(-speed);
        //             }
        //         }else if(cursors.down.isDown){
        //             if(!cursors.right.isDown){
        //                 this.player.anims.play('diagLDown', true);
        //                 //this.player.y += Math.round(playerVelocity*2);
        //                 this.player.body.setVelocityY(speed);
        //             }
        //         }else{
        //             this.player.anims.play('left', true);
        //             //this.player.x -= Math.round(playerVelocity*2);
        //             this.player.body.setVelocityX(-speed);
        //             //this.player.y += Math.round(playerVelocity);                   
        //             this.player.body.setVelocityY(speed);
        //         }
        //         Client.socket.emit('click', { id: plId, x: this.player.x, y: this.player.y })
        //     }
        //     if (cursors.right.isDown){
        //         if(cursors.up.isDown){   
        //             if(!cursors.left.isDown && !cursors.down.isDown){                 
        //                 this.player.anims.play('diagRUp', true);
        //                 //this.player.y -= Math.round(playerVelocity);
        //                 this.player.body.setVelocityY(-speed);
        //             }
        //         }else if(cursors.down.isDown){
        //             if(!cursors.left.isDown){
        //                 this.player.anims.play('diagRDown', true);
        //                 //this.player.x += Math.round(playerVelocity*2);
        //                 this.player.body.setVelocityX(speed);
        //             }
        //         }else{
        //             this.player.anims.play('right', true);
        //             //this.player.x += Math.round(playerVelocity*2);
        //             this.player.body.setVelocityX(speed);
        //             //this.player.y -= Math.round(playerVelocity);
        //             this.player.body.setVelocityY(-speed);
        //         }
        //         Client.socket.emit('click', { id: plId, x: this.player.x, y: this.player.y })
        //     }
        //     // Mouvements verticaux joueur
        //     if (cursors.up.isDown){
        //         if(!cursors.left.isDown && !cursors.right.isDown){
        //             this.player.anims.play('up', true);
        //             //this.player.x -= Math.round(playerVelocity*2);
        //             this.player.body.setVelocityX(-speed);
        //             //this.player.y -= Math.round(playerVelocity);
        //             this.player.body.setVelocityY(-speed);
        //             Client.socket.emit('click', { id: plId, x: this.player.x, y: this.player.y })
        //         }
        //     }
        //     if (cursors.down.isDown){
        //         if(!cursors.left.isDown && !cursors.right.isDown){
        //             this.player.anims.play('down', true);
        //             //this.player.x += Math.round(playerVelocity*2);
        //             this.player.body.setVelocityX(speed);
        //             //this.player.y += Math.round(playerVelocity);
        //             this.player.body.setVelocityY(speed);
        //             Client.socket.emit('click', { id: plId, x: this.player.x, y: this.player.y })
        //         }
        //     }   
        //     //bruit_course.stop();
        // }else{
        //     //this.player.anims.play('turn');
        //     this.player.anims.stop();
        //     bruit_course.play();         
        // }