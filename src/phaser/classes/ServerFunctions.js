function deleteDisconnectedPlayer(serverPlayers, disconnectedPlayer) {
    let index = serverPlayers.indexOf(disconnectedPlayer);
    if (index > -1) { serverPlayers.splice(index, 1); }
    return serverPlayers;
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

module.exports = {deleteDisconnectedPlayer, randomInt};