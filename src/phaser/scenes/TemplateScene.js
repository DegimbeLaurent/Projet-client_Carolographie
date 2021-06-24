var TemplateScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function(){
    },
    init: function(){
    },
    preload: function(){
    },
    create: function(){
    },
    update: function(){

    },
    clientFunctions: function(){
        console.log("visiteur connecté!");
        var Client = {};
        Client.socket = io.connect();
        if(localStorage.getItem('personalData') == null){
            let coordEntrance = this.getCoordEntrance();
            Client.socket.emit('newplayer', localStorage.getItem('pseudo'),coordEntrance);
            console.log("localstorage créé!");
        }else{
            console.log("localstorage existe...");
            console.table(game.players);
        }
        Client.socket.on('personalData', function (data, tablePlayers) {
            let perso = Object.entries(data);
            console.table(perso);
            console.log(perso[0][1]);
            localStorage.setItem("personalData", perso);
            localStorage.setItem("playerId", parseInt(perso[0][1]));
            game.players = tablePlayers;
            game.selfConnected = true;
            console.table(game.players);
            //console.table(game);
            //movePlayers(this, game.players);
            //addNewPlayer(this, data);
        });
        Client.sendClick = function (id, x, y) {
            Client.socket.emit('click', { id: id, x: x, y: y });
            console.log("x="+x+" & y="+y);
        };
        Client.socket.on('move', function (id, data) {
            //movePlayer(data.id, data.nickname, data.x, data.y);
            //console.log(game.players[id].nickname + " moves to " + data.x + ", " + data.y);
            console.table(game.players);
            // localStorage.setItem("Players", game.players);
            console.log("id to move -> " + id);
            //console.table(game.players[id]);
            //let idPl = parseInt(this.getIdPlayers(parseInt(id)));
            // game.players.forEach((player) => {
            //     console.log("playerIndex -> " + player.indexOf);
            //     if(player.id == id){
            //         game.players[player.index].newX = data.x;
            //         game.players[player.index].newY = data.y;                    
            //     }
            // })
            for(i=0;i<game.players.length;i++){
                if(game.players[i].id == id){
                    game.players[i].newX = data.x;
                    game.players[i].newY = data.y;
                }
            }
            // if(idPl != -1){
            //     game.players[idPl].newX = data.x;
            //     game.players[idPl].newY = data.y;
            //     //console.table(game.players);
            // }
            //game.players[idPl].newX = data.x;
            //game.players[idPl].newY = data.y;
        });
        Client.socket.on('allplayers', function (data) {
            Client.socket.on('getNewplayer', function (data, tablePlayers) {
                game.players = tablePlayers;
                console.log("Connexion nouveau joueur [" + data.id + "]");
                console.table(game.players);
            }, this);
            Client.socket.on('remove', function (id, nickname, data) {
                game.players[id].remove = true;
            });
            Client.socket.on('updateList', function (tablePlayers){
                game.players = tablePlayers;
                console.table(game.players);
            });

        });
        return Client;
    },
    getItemNamed: function(Game, type, name) {
        let listItems = Game.add.scene.children.list;
        Game.add.scene.children.list.forEach((item) =>{
            console.log(item.name+"/"+name);
            console.log(item.type+"/"+type);
            console.table(item.value);
            if((item.type == type)&&(item.name == name)){return item.value;}
            if(item.name == name){return item;}
        });
        return null;
    },
    addNewPlayer: function(Game, dataPlayer, player) {
        let id = dataPlayer.id;
        let nickname = dataPlayer.nickname;
        let x = dataPlayer.x;
        let y = dataPlayer.y;
        let personalData = this.getPersonalData();
        if (personalData["id"] == id) {
            //playerMap[id] = Game.physics.add.sprite(x, y, 'sprite');
            playerMap[id] = player;
            // Game.cameras.main.startFollow(playerMap[id]);
            // Game.cameras.main.centerOn(x,y);
        } else {
            playerMap[id] = Game.physics.add.sprite(x, y, 'sprite');
        }
        playerMap[id].id = id;
        playerMap[id].nickname = nickname;
        //playerMap[id].setBounce(0.1);
        playerMap[id].setCollideWorldBounds(true);
        playerMap[id].angle = 0;
        playerMap[id].setOrigin(0.5, 0.5);
        playerMap[nickname] = Game.add.text(x + this.centerName(nickname), y - 50, nickname, {
            fontFamily: 'Fresh Lychee',
            fontSize: 12,
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: 5,
        });
        if (personalData["id"] == id) {
            //Game.physics.add.collider(playerMap[id], bulletsMap, hitBullet, null, this);
            // Game.input.mouse.disableContextMenu();
            // Game.input.on('pointerup', function (pointer) {
            //     if (pointer.leftButtonReleased()) {
            //         //rotateSprite(playerMap[id], pointer.x, pointer.y);
            //         //Client.sendClick(id, pointer.x, pointer.y);
            //         this.clickOnMap(id, pointer);
            //     }
            // }, Game);
            // game.selfConnected = false;
        }
    },
    getCoordEntrance: function(){
        let currentScene = localStorage.getItem('currentScene');
        let entrance = localStorage.getItem('entrance');
        let coordEntrance = this.getXYPassage(currentScene,entrance);
        return coordEntrance;
    },
    getXYPassage: function(currentScene, entrance){
        let allPassages = [];
        allPassages["A1"] = {"E":[450,450],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[400,400],"SW":[0,0],"W":[0,0]}
        allPassages["A2"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};
        allPassages["A3"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};
        allPassages["A4"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};
        allPassages["A5"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};

        allPassages["B1"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]}
        allPassages["B2"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};
        allPassages["B3"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};
        allPassages["B4"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};
        allPassages["B5"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};
        
        allPassages["C1"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]}
        allPassages["C2"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};
        allPassages["C3"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};
        allPassages["C4"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};
        allPassages["C5"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};

        return allPassages[currentScene][entrance];
    },
    removeDisconnectedPlayers: function(Game, players) {
        let tabTemp = [];
        players.forEach((player) => {
            if (player.remove == true) {
                playerMap[player.id].destroy();
                playerMap[player.nickname].destroy();
                delete playerMap[player.id];
                delete playerMap[player.nickname];
            } else {
                tabTemp.push(player);
            }
        });
        game.players = tabTemp;
    },
    compareArrays: function(play, playBU) {
        if (play.length != playBU.length) {
            //console.log("on passe par ici!!!");
            return false;
        }
        let i = 0;
        let max = play.length;
        while (i < max) {
            if (play[i]["id"] != playBU[i]["id"]) { return false; }
            i++;
        }
        return true;
    },
    presentInArray: function(needle, haystack) {
        let max = haystack.length;
        for (let i = 0; i < max; i++) {
            if (haystack[i]["id"] == needle) { return true; }
        }
        return false;
    },
    updateConnectedPlayers: function(Game, players, playersBU, player) {
        if (this.compareArrays(players, playersBU) == false) {
            let max = players.length;
            for (let i = 0; i < max; i++) {
                if (this.presentInArray(players[i]["id"], playersBU) == false) {
                    this.addNewPlayer(Game, players[i], player);
                }
            }
            let maxBU = playersBU.length;
            for (let j = 0; j < maxBU; j++) {
                if (this.presentInArray(playersBU[j]["id"], players) == false) {
                    //removePlayer();

                }
            }
            game.playersBU = players;
        }
    },
    getPersonalData: function() {
        let personalData = localStorage.getItem("personalData").split(",");
        let myObj = this.convertArrayToObject(personalData);
        return myObj;
    },
    movePlayers: function(Game, players) {    
        players.forEach((player) => {
            if ((player.x != player.newX) || (player.y != player.newY)) {
                let tgtSoldier = new Phaser.Math.Vector2();
                tgtSoldier.x = player.newX;
                tgtSoldier.y = player.newY;            
                Game.physics.moveToObject(playerMap[player.id], tgtSoldier, game.speed);
            }
        });
    },
    stopPlayers: function(Game, players) {
        let myId = parseInt(localStorage.getItem("playerId"));
        players.forEach((player) => {
            if ((player.x != player.newX) || (player.y != player.newY)) {
                let distance = Phaser.Math.Distance.Between(playerMap[player.id].x, playerMap[player.id].y, player.newX, player.newY);
                if (playerMap[player.id].body.speed > 0) {
                    if (distance < 4) {
                        playerMap[player.id].body.reset(player.newX, player.newY);
                        let idPl = this.getIdPlayers(player.id);
                        if (idPl != -1) {
                            game.players[idPl].x = player.newX;
                            game.players[idPl].y = player.newY;
                            if(idPl == myId){
                                player.x = player.newX;
                                player.y = player.newY;
                                //this.cameras.main.startFollow(this.player);
                                //this.cameras.main.setFollowOffset(-500, 500);
                            }
                            //console.table(game.players);
                        }
                    }
                }
            }
            playerMap[player.nickname].x = playerMap[player.id].x + this.centerName(player.nickname);
            playerMap[player.nickname].y = playerMap[player.id].y - 50;
        });
    },getIdPlayers:function(idPlayer){
        let max = game.players.length;
        console.log("on passe ici!");
        for (let i = 0; i < max; i++) {
            if (game.players[i]["id"] == idPlayer) { return i; }
        }
        return -1;
    },
    centerName: function(name) {
        let lgName = name.length;
        let posName = [30, 24, 20, 18, 16, 12, 8, 4];
        return posName[lgName - 1] - 30;
    },
    convertArrayToObject: function(array){
        let arrayK = array.map(w => array.indexOf(w) % 2 == 0 ? w : null).filter(w => w !== null);  // CREATE ARRAY KEYS
        let arrayV = array.map(w => array.indexOf(w) % 2 == 1 ? w : null).filter(w => w !== null);  // CREATE ARRAY VALUES
        let data = arrayK.map((x, index) => { return [x, arrayV[index]]; });
        return Object.fromEntries(data);
    },
    clickOnMap: function(id, pointer){
        //Client.sendClick(id, pointer.x, pointer.y);
        console.log("on passe par ici!");
    }
});