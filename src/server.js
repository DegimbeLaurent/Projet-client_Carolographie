//=================================
//  Initialisation serveur
//=================================
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const api_key = process.env.API_KEY;
const api_user = process.env.API_USERNAME;
const api_password = process.env.API_PASSWORD;

//===================================
//   Préfixes chemins accès virtuels
//===================================
// website
app.use('/', express.static(__dirname + '/'));
app.use('/css', express.static(__dirname + '/assets/css'));
app.use('/img', express.static(__dirname + '/assets/img'));
app.use('/js', express.static(__dirname + '/assets/js'));
app.use('/sounds', express.static(__dirname + '/assets/sounds'));
// Phaser
app.use('/maps', express.static(__dirname + '/assets/maps'));
app.use('/ph', express.static(__dirname + '/phaser'));
app.use('/ph_cl', express.static(__dirname + '/phaser/classes'));
app.use('/ph_sc', express.static(__dirname + '/phaser/scenes'));

//=================================
//   Déclaration des routes 
//=================================
let arrayRoutes = [
    {"route":"/",           "path":"/website/index.html"},
    {"route":"/visite",     "path":"/website/visite.html"},
    {"route":"/test_iso",     "path":"/website/test_iso.html"},
    {"route":"/pre-login",     "path":"/website/pre-login.html"},
    {"route":"/login",     "path":"/website/login.html"},
    {"route":"/remerciements",     "path":"/website/remerciements.html"}

];
var nbRoutes = arrayRoutes.length;
for (var i = 0; i < nbRoutes; i++) {
    let route = arrayRoutes[i]["route"];
    let path = arrayRoutes[i]["path"];
    app.get(route, function (req, res) {res.sendFile(__dirname + path);});
}
//======================================
//   Importation des fonctions serveur
//======================================
//const ServerFunctions = require('./phaser/classes/ServerFunctions.js');

//=========================================
//  Initialisation propriétés & variables
//=========================================
server.lastPlayerID = 0;
var serverPlayers = [];
//=================================
//  Lancement serveur
//=================================
server.listen(process.env.PORT || 3000, function () {
    console.log('Listening on ' + server.address().port);
});
//=================================
//  A l'écoute des clients...
//=================================
io.on('connection', function (socket) {
    console.log("visitor incoming...");
  	//=================================
  	//	Récup des variables dotenv
  	//=================================
  	socket.on('dotenv', function(){
		io.to(socket.id).emit("dotenv_const", api_key, api_user, api_password);
	})
    //=================================
    //  Création d'un joueur entrant
    //=================================
    socket.on('newplayer', function (nickname,posXY, inside) {         
        let now = new Date();
        socket.player = {
            id: server.lastPlayerID++,
            nickname: 'unknown',
            x: 1250,
            y: 950,
            newX: 1251,
            newY: 951,
            angle: 0,
            score: 0,
            hit: 0,
            bullets: 100,
            reload: now.getTime(),
            remove: false,
            insideRoom: inside
        };
        socket.player.nickname = nickname;
        socket.player.newX = posXY[0];
        socket.player.x = posXY[0];
        socket.player.newY = posXY[1];
        socket.player.y = posXY[1];
        //console.log(nickname + ' is connected ['+socket.player.id+']');
        serverPlayers.push(socket.player);
        io.to(socket.id).emit("personalData", socket.player, serverPlayers);
        socket.emit('allplayers', serverPlayers);
        io.emit('updateList', serverPlayers);
        //socket.broadcast.emit('getNewplayer', socket.player, serverPlayers);
        socket.on('tchatMsg', function (msg) {
            io.emit('tchat', socket.player, msg);
        });
        //=================================
        //  Joueur rentre dans une pièce
        //=================================
        socket.on('enterRoom', function(){
            socket.player.insideRoom = true;
            io.to(socket.id).emit("okEnterRoom");

            io.emit('remove', socket.player.id, socket.player.nickname);
            serverPlayers = deleteDisconnectedPlayer(serverPlayers, socket.player);

            // updateServerPlayers(socket.player);
            // io.emit('updateList', serverPlayers);
            console.log(socket.player.nickname+" entre dans le portail...");
        });
        //=================================
        //  Joueur sort d'une pièce
        //=================================
        socket.on('goOutRoom', function(){
            socket.player.insideRoom = false;
            io.to(socket.id).emit("okGoOutRoom");

            io.emit('remove', socket.player.id, socket.player.nickname);
            serverPlayers = deleteDisconnectedPlayer(serverPlayers, socket.player);
            
            // updateServerPlayers(socket.player);
            // io.emit('updateList', serverPlayers);
            console.log(socket.player.nickname+" sort du portail...");
        });
        //=================================
        //  Click pour se déplacer
        //=================================
        socket.on('click', function (data) {
            //console.log(socket.player.nickname + ' moves to ' + data.x - 5 + ', ' + data.y);
            socket.player.x = data.x;
            socket.player.y = data.y;
            io.emit('move', data.id, socket.player);
            for(i=0;i<serverPlayers.length;i++){
                if(serverPlayers[i].id == socket.player.id){
                    serverPlayers[i].newX = data.x;
                    serverPlayers[i].newY = data.y;
                }
            }
        });
        //=================================
        //  Déconnection d'un joueur
        //=================================
        socket.on('disconnect', function () {
            io.emit('remove', socket.player.id, socket.player.nickname);
            serverPlayers = deleteDisconnectedPlayer(serverPlayers, socket.player);
            //io.emit('updateList', serverPlayers);
        });
        socket.on('disconnect_map', function () {
            io.emit('remove', socket.player.id, socket.player.nickname);
            serverPlayers = deleteDisconnectedPlayer(serverPlayers, socket.player);
            //io.emit('updateList', serverPlayers);
        });
        socket.on('testjs', function(msg){
            console.log("MSG -> "+msg);
        });
    });

});
function deleteDisconnectedPlayer(serverPlayers, disconnectedPlayer) {
    let index = serverPlayers.indexOf(disconnectedPlayer);
    if (index > -1) { serverPlayers.splice(index, 1); }
    return serverPlayers;
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
function updateServerPlayers(playerData){
    for(let i=0; i<serverPlayers.length; i++){
        if(serverPlayers[i].nickname == playerData.nickname){
            serverPlayers[i] = playerData;
        }
    }
    io.emit('updateList', serverPlayers);
}