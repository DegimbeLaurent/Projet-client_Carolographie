function movePlayers(Game, players) {
    players.forEach((player) => {
        if ((player.x != player.newX) || (player.y != player.newY)) {
            let tgtSoldier = new Phaser.Math.Vector2();
            tgtSoldier.x = player.newX;
            tgtSoldier.y = player.newY;
            Game.physics.moveToObject(playerMap[player.id], tgtSoldier, game.speed);
        }
    });
};

function addNewPlayer(Game, dataPlayer) {
    let id = dataPlayer.id;
    let nickname = dataPlayer.nickname;
    let x = dataPlayer.x;
    let y = dataPlayer.y;
    let personalData = getPersonalData();
    if (personalData["id"] == id) {
        playerMap[id] = Game.physics.add.sprite(x, y, 'mysoldier');
    } else {
        playerMap[id] = Game.physics.add.sprite(x, y, 'soldier');
    }
    playerMap[id].id = id;
    playerMap[id].nickname = nickname;
    //playerMap[id].setBounce(0.1);
    playerMap[id].setCollideWorldBounds(true);
    playerMap[id].angle = 0;
    playerMap[id].setOrigin(0.5, 0.5);
    playerMap[nickname] = Game.add.text(x + centerName(nickname), y - 35, nickname, {
        fontFamily: 'Fresh Lychee',
        fontSize: 14,
        color: '#000000',
    });
    if (personalData["id"] == id) {
        Game.physics.add.collider(playerMap[id], bulletsMap, hitBullet, null, this);
        Game.input.mouse.disableContextMenu();
        Game.input.on('pointerup', function (pointer) {
            if (pointer.leftButtonReleased()) {
                rotateSprite(playerMap[id], pointer.x, pointer.y);
                Client.sendClick(id, pointer.x, pointer.y);
            } else if (pointer.rightButtonReleased()) {
                rotateSprite(playerMap[id], pointer.x, pointer.y);
                Client.sendFire(id, pointer.x, pointer.y);
            }
        }, Game);
        game.selfConnected = false;
    }
}

export {movePlayers};