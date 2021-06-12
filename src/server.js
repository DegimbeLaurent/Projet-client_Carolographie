//=================================
//  Initialisation serveur
//=================================
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

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
    {"route":"/visite",     "path":"/website/visite.html"}
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
const ServerFunctions = require('./phaser/classes/ServerFunctions.js');

//=================================
//  Lancement serveur
//=================================
server.listen(process.env.PORT || 3000, function () {
    console.log('Listening on ' + server.address().port);
});
//=========================================
//  Initialisation propriétés & variables
//=========================================
server.lastPlayerID = 0;
var serverPlayers = [];
//=================================
//  A l'écoute des clients...
//=================================
io.on('connection', function (socket) {
    console.log("visitor incoming...");
        //=================================
        //  Création d'un joueur entrant
        //=================================
        socket.on('newplayer', function (nickname) {
            
            let aleaX = ServerFunctions.randomInt(100, 400);
            let aleaY = ServerFunctions.randomInt(100, 400);
            let now = new Date();
            socket.player = {
                id: server.lastPlayderID++,
                nickname: 'unknown',
                x: aleaX,
                y: aleaY,
                newX: 0,
                newY: 0,
                angle: 0,
                score: 0,
                hit: 0,
                bullets: 100,
                reload: now.getTime(),
                remove: false
            };
            socket.player.nickname = nickname;
            socket.player.newX = aleaX;
            socket.player.newY = aleaY;
            console.log(nickname + ' is connected');
            serverPlayers.push(socket.player);
            io.to(socket.id).emit("personalData", socket.player, serverPlayers);
            socket.emit('allplayers', serverPlayers);
            socket.broadcast.emit('newplayer', socket.player, serverPlayers);
            socket.on('tchatMsg', function (msg) {
                io.emit('tchat', socket.player, msg);
            });
        });
        //=================================
        //  Click pour se déplacer
        //=================================
        socket.on('click', function (data) {
            console.log("on passe ici...");
            //console.log(socket.player.nickname + ' moves to ' + data.x - 5 + ', ' + data.y);
            socket.player.x = data.x;
            socket.player.y = data.y;
            io.emit('move', data.id, socket.player);
        });
        //=================================
        //  Déconnection d'un joueur
        //=================================
        socket.on('disconnect', function () {
            io.emit('remove', socket.player.id, socket.player.nickname);
            serverPlayers = deleteDisconnectedPlayer(serverPlayers, socket.player);
            io.emit('updateList', serverPlayers);
        });

});