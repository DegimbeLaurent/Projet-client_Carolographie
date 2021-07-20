var TemplateScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function(config){
        Phaser.Scene.call(this, config);
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
        //console.log("visiteur connecté!");
        // var Client = {};
        // Client.socket = io.connect();
        if(localStorage.getItem('personalData') == null){
            //let coordEntrance = this.getCoordEntrance();
            let coordEntrance = [0,0];
            Client.socket.emit('newplayer', localStorage.getItem('pseudo'),coordEntrance, localStorage.getItem('insideRoom'));
            //console.log("localstorage créé!");
        }else{
            //console.log("localstorage existe...");
            //console.table(game.players);
        }
        Client.socket.on('personalData', function (data, tablePlayers) {
            let perso = Object.entries(data);
            //console.table(perso);
            //console.log(perso[0][1]);
            localStorage.setItem("personalData", perso);
            localStorage.setItem("playerId", parseInt(perso[0][1]));
            game.players = tablePlayers;
            game.selfConnected = true;
            //console.table(game.players);
            //===
            let plId = parseInt(perso[0][1]);
            let tabTemp = [];
            game.players.forEach((player) => {
                player.newX = player.x - 1;
                player.newY = player.y - 1;
                tabTemp.push(player);
                // if ((player.x != player.newX) || (player.y != player.newY)) {
                //     let tgtSoldier = new Phaser.Math.Vector2();
                //     tgtSoldier.x = player.newX;
                //     tgtSoldier.y = player.newY;     
                //     if (plId != player.id) {   
                //         Game.physics.moveToObject(playerMap[player.id], tgtSoldier, game.speed);
                //     }
                // }
            });
            game.players = tabTemp;
            //===
        });
        Client.sendClick = function (id, x, y) {
            Client.socket.emit('click', { id: id, x: x, y: y });
            //console.log("x="+x+" & y="+y);
        };
        Client.socket.on('move', function (id, data) {
            for(i=0;i<game.players.length;i++){
                if(game.players[i].id == id){
                    game.players[i].newX = Math.round(data.x);
                    game.players[i].newY = Math.round(data.y);
                }
            }
        });
        Client.socket.on('allplayers', function (data) {
            Client.socket.on('getNewplayer', function (data, tablePlayers) {
                game.players = tablePlayers;
                //console.log("Connexion nouveau joueur [" + data.id + "]");
                //console.table(game.players);
            }, this);
            Client.socket.on('remove', function (id, nickname) {
                //console.log("Removing ["+id+"] ["+nickname+"]");
                //console.table(game.players);
                //console.table(game.players[id]);
                let tabTemp = [];
                for(i=0;i<game.players.length;i++){
                    if(game.players[i].id == id){
                        game.players[i].remove = true;  
                        if(playerMap[game.players[i].id] != undefined){playerMap[game.players[i].id].destroy();}
                        if(playerMap[game.players[i].nickname] != undefined){playerMap[game.players[i].nickname].destroy();}
                        delete playerMap[game.players[i].id];
                        delete playerMap[game.players[i].nickname];
                    }else{
                        tabTemp.push(game.players[i]);
                    }
                }
                game.players = tabTemp;
                //console.log("Removed...");
                //console.table(game.players);
            });
            Client.socket.on('updateList', function (tablePlayers){
                game.players = tablePlayers;
                //console.table(game.players);
            });

        });
        return Client;
    },
    initLocalStorage: function(){
        let pseudo = localStorage.getItem("pseudo");
        let insideRoom = localStorage.getItem("insideRoom");
        localStorage.clear();
        localStorage.setItem("pseudo", pseudo);
        localStorage.setItem("insideRoom", insideRoom);
        localStorage.setItem("Players", []);
        localStorage.setItem("playerId", "");
        //console.log("initialisation...");
    },
    addShadows: function(dataArray){
        let arrayTemp = [];
        dataArray.forEach((item) => {
            //console.log(item.type);
            if(item.type == "Image"){
                arrayTemp.push(this.add.rectangle(item.x - 8, item.y + 8, item.width, item.height).setFillStyle(0x000000, 0.1).setDepth(9100));
            }else if(item.type == "Text"){
                //arrayTemp.push(this.add.rectangle(item.x, item.y, item.width, item.height).setFillStyle(0x000000, 0.1).setDepth(9100));
            }
        });
        return arrayTemp;
    },
    getItemNamed: function(Game, type, name) {
        let listItems = Game.add.scene.children.list;
        Game.add.scene.children.list.forEach((item) =>{
            //console.log(item.name+"/"+name);
            //console.log(item.type+"/"+type);
            //console.table(item.value);
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
            playerMap[id] = player;
        } else {
            playerMap[id] = Game.physics.add.sprite(x, y, 'playersheet').setDepth(25);
        }
        playerMap[id].id = id;
        playerMap[id].nickname = nickname;
        //playerMap[id].setBounce(0.1);
        playerMap[id].setCollideWorldBounds(true);
        playerMap[id].angle = 0;
        playerMap[id].setOrigin(0.5, 0.5);
        playerMap[nickname] = Game.add.text(x + this.centerName(nickname), y - 50, nickname, {
            fontFamily: "Arial Black",
            fontSize: 12,
        }).setDepth(25).setStroke('#000000', 4);
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
                //console.log("ok, joueur déco enlevé...");
                playerMap[player.nickname].destroy();
                playerMap[player.id].destroy();
                delete playerMap[player.id];
                delete playerMap[player.nickname];
            } else {
                tabTemp.push(player);
            }
        });
        //game.players = tabTemp;
        return tabTemp;
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
    movePlayers: function(Game, players, plId) { 
        players.forEach((player) => {
            if ((player.x != player.newX) || (player.y != player.newY)) {
                let tgtSoldier = new Phaser.Math.Vector2();
                tgtSoldier.x = player.newX;
                tgtSoldier.y = player.newY;     
                if (plId != player.id) {   
                    if(player.insideRoom == "false"){
                        if((player.x == 1)&&(player.y == 1)){
                            Game.physics.moveToObject(playerMap[player.id], tgtSoldier, 3000);                            
                        }else{
                            Game.physics.moveToObject(playerMap[player.id], tgtSoldier, game.speed);
                        }
                    }
                    //console.log("["+player.insideRoom+"]");
                }
            }
        });
    },
    stopPlayers: function(Game, players) {
        let myId = parseInt(localStorage.getItem("playerId"));
        players.forEach((player) => {
            if ((player.x != player.newX) || (player.y != player.newY)) {
                let distance = Phaser.Math.Distance.Between(playerMap[player.id].x, playerMap[player.id].y, player.newX, player.newY);
                // console.log("player.id = "+player.id);
                // console.log("playerMap[player.id] = "+playerMap[player.id]);
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
            playerMap[player.nickname].y = playerMap[player.id].y - 80;
        });
    },getIdPlayers:function(idPlayer){
        let max = game.players.length;
        //console.log("on passe ici!");
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
        Client.sendClick(id, pointer.x, pointer.y);
        console.log("on passe par ici!");
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
    }
});