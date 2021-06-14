console.log("visiteur connecté!");
var Client = {};
Client.socket = io.connect();
Client.socket.on('personalData', function (data, tablePlayers) {
    let perso = Object.entries(data);
    localStorage.setItem("personalData", perso);
    game.players = tablePlayers;
    game.selfConnected = true;
    console.table(game.players);
    //movePlayers(this, game.players);
    //addNewPlayer(this, data);
});
Client.sendClick = function (id, x, y) {
    Client.socket.emit('click', { id: id, x: x, y: y });
};
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
    Client.socket.on('move', function (id, data) {
        //movePlayer(data.id, data.nickname, data.x, data.y);
        //console.log(game.players[id].nickname + " moves to " + data.x + ", " + data.y);
        //console.table(game.players);
        //console.log("id to move -> " + id);
        //console.table(game.players[id]);
        let idPl = getIdPlayers(id);
        if (idPl != -1) {
            game.players[idPl].newX = data.x;
            game.players[idPl].newY = data.y;
            //console.table(game.players);
        }
        //game.players[idPl].newX = data.x;
        //game.players[idPl].newY = data.y;
    });
});