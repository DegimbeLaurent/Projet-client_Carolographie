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
});