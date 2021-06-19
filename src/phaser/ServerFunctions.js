function deleteDisconnectedPlayer(serverPlayers, disconnectedPlayer) {
    let index = serverPlayers.indexOf(disconnectedPlayer);
    if (index > -1) { serverPlayers.splice(index, 1); }
    return serverPlayers;
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
// function centerName(name) {
//     let lgName = name.length;
//     let posName = [30, 24, 20, 18, 16, 12, 8, 4];
//     return posName[lgName - 1] - 40;
// }

// function addNewPlayer(Game, dataPlayer) {
//     let id = dataPlayer.id;
//     let nickname = dataPlayer.nickname;
//     let x = dataPlayer.x;
//     let y = dataPlayer.y;
//     let personalData = getPersonalData();
//     if (personalData["id"] == id) {
//         playerMap[id] = Game.physics.add.sprite(x, y, 'sprite');
//     } else {
//         playerMap[id] = Game.physics.add.sprite(x, y, 'sprite');
//     }
//     playerMap[id].id = id;
//     playerMap[id].nickname = nickname;
//     //playerMap[id].setBounce(0.1);
//     playerMap[id].setCollideWorldBounds(true);
//     playerMap[id].angle = 0;
//     playerMap[id].setOrigin(0.5, 0.5);
//     playerMap[nickname] = Game.add.text(x + centerName(nickname), y - 35, nickname, {
//         fontFamily: 'Fresh Lychee',
//         fontSize: 14,
//         color: '#000000',
//     });
//     if (personalData["id"] == id) {
//         //Game.physics.add.collider(playerMap[id], bulletsMap, hitBullet, null, this);
//         Game.input.mouse.disableContextMenu();
//         Game.input.on('pointerup', function (pointer) {
//             if (pointer.leftButtonReleased()) {
//                 //rotateSprite(playerMap[id], pointer.x, pointer.y);
//                 //Client.sendClick(id, pointer.x, pointer.y);
//                 clickOnMap(id, pointer);
//             }
//         }, Game);
//         game.selfConnected = false;
//     }
// }

// function removeDisconnectedPlayers(Game, players) {
//     let tabTemp = [];
//     players.forEach((player) => {
//         if (player.remove == true) {
//             playerMap[player.id].destroy();
//             playerMap[player.nickname].destroy();
//             delete playerMap[player.id];
//             delete playerMap[player.nickname];
//         } else {
//             tabTemp.push(player);
//         }
//     });
//     game.players = tabTemp;
// }
function rotateSprite(spriteToRotate, newX, newY) {
    let x = spriteToRotate.x;
    let y = spriteToRotate.y;
    let currentPoint = new Phaser.Geom.Point(x, y);
    let pointToMove = new Phaser.Geom.Point(newX, newY);
    spriteToRotate.rotation = Phaser.Math.Angle.BetweenPoints(currentPoint, pointToMove);
}
// function compareArrays(play, playBU) {
//     if (play.length != playBU.length) {
//         //console.log("on passe par ici!!!");
//         return false;
//     }
//     let i = 0;
//     let max = play.length;
//     while (i < max) {
//         if (play[i]["id"] != playBU[i]["id"]) { return false; }
//         i++;
//     }
//     return true;
// }
// function presentInArray(needle, haystack) {
//     let max = haystack.length;
//     for (let i = 0; i < max; i++) {
//         if (haystack[i]["id"] == needle) { return true; }
//     }
//     return false;
// }
// function updateConnectedPlayers(Game, players, playersBU) {
//     if (compareArrays(players, playersBU) == false) {
//         let max = players.length;
//         for (let i = 0; i < max; i++) {
//             if (presentInArray(players[i]["id"], playersBU) == false) {
//                 addNewPlayer(Game, players[i]);
//             }
//         }
//         let maxBU = playersBU.length;
//         for (let j = 0; j < maxBU; j++) {
//             if (presentInArray(playersBU[j]["id"], players) == false) {
//                 //removePlayer();

//             }
//         }
//         game.playersBU = players;
//     }
// }

// function stopPlayers(Game, players) {
//     players.forEach((player) => {
//         if ((player.x != player.newX) || (player.y != player.newY)) {
//             let distance = Phaser.Math.Distance.Between(playerMap[player.id].x, playerMap[player.id].y, player.newX, player.newY);
//             if (playerMap[player.id].body.speed > 0) {
//                 if (distance < 4) {
//                     playerMap[player.id].body.reset(player.newX, player.newY);
//                     let idPl = getIdPlayers(player.id);
//                     if (idPl != -1) {
//                         game.players[idPl].x = player.newX;
//                         game.players[idPl].y = player.newY;
//                         //console.table(game.players);
//                     }
//                 }
//             }
//         }
//         playerMap[player.nickname].x = playerMap[player.id].x + centerName(player.nickname);
//         playerMap[player.nickname].y = playerMap[player.id].y - 35;
//     });
// }
// function movePlayers(Game, players) {    
//     players.forEach((player) => {
//         if ((player.x != player.newX) || (player.y != player.newY)) {
//             let tgtSoldier = new Phaser.Math.Vector2();
//             tgtSoldier.x = player.newX;
//             tgtSoldier.y = player.newY;            
//             Game.physics.moveToObject(playerMap[player.id], tgtSoldier, game.speed);
//         }
//     });
// };
// function getPersonalData() {
//     let personalData = localStorage.getItem("personalData").split(",");
//     let myObj = convertArrayToObject(personalData);
//     return myObj;
// }

function updatePersonalData(obj) {
    let myArray = convertObjectToArray(obj);
    localStorage.setItem("personalData", myArray);
}

function convertObjectToArray(obj) {
    return Object.entries(obj);
}

// let convertArrayToObject = (array) => {
//     let arrayK = array.map(w => array.indexOf(w) % 2 == 0 ? w : null).filter(w => w !== null);  // CREATE ARRAY KEYS
//     let arrayV = array.map(w => array.indexOf(w) % 2 == 1 ? w : null).filter(w => w !== null);  // CREATE ARRAY VALUES
//     let data = arrayK.map((x, index) => { return [x, arrayV[index]]; });
//     return Object.fromEntries(data);
// }
// function getIdPlayers(idPlayer) {
//     let max = game.players.length;
//     for (let i = 0; i < max; i++) {
//         if (game.players[i]["id"] == idPlayer) { return i; }
//     }
//     return -1;
// }
function progressBar(Game){
    var progressBar = Game.add.graphics();
    var progressBox = Game.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);            
    var width = Game.cameras.main.width;
    var height = Game.cameras.main.height;
    var loadingText = Game.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);            
    var percentText = Game.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);
    Game.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(250, 280, 300 * value, 30);
    });
    Game.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
    });
}
function hitPassage(){
    localStorage.setItem("Players",game.players);
    location.href = '/website/'+this;
}
// function getXYPassage(currentScene, entrance){
//     let allPassages = [];
//     allPassages["A1"] = {"E":[450,450],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[400,400],"SW":[0,0],"W":[0,0]}
//     allPassages["A2"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};
//     allPassages["A3"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};
//     allPassages["A4"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};
//     allPassages["A5"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};

//     allPassages["B1"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]}
//     allPassages["B2"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};
//     allPassages["B3"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};
//     allPassages["B4"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};
//     allPassages["B5"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};
    
//     allPassages["C1"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]}
//     allPassages["C2"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};
//     allPassages["C3"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};
//     allPassages["C4"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};
//     allPassages["C5"] = {"E":[0,0],"N":[0,0],"NE":[0,0],"NW":[0,0],"SE":[0,0],"S":[0,0],"SW":[0,0],"W":[0,0]};

//     return allPassages[currentScene][entrance];
// }
// function getCoordEntrance(){
//     let currentScene = localStorage.getItem('currentScene');
//     let entrance = localStorage.getItem('entrance');
//     let coordEntrance = getXYPassage(currentScene,entrance);
//     return coordEntrance;
// }
//module.exports = {deleteDisconnectedPlayer, randomInt};