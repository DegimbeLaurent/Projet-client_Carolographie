console.log("visiteur connecté!");
var Client = {};
Client.socket = io.connect();
Client.socket.on('personalData', function (data, tablePlayers) {
    //let perso = [data.id, data.nickname];
    let perso = Object.entries(data);
    localStorage.setItem("personalData", perso);
    //console.table(data);
    //showUsersConnected(players);
    game.players = tablePlayers;
    game.selfConnected = true;
    //refreshScores();
    console.table(game.players);
});