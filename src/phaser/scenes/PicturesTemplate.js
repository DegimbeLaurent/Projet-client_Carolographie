var PicturesTemplate = new Phaser.Class({
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
    createButtonReturnRoom: function(Game, roomName){
        let btn = Game.add.rectangle(400, 600, 50, 75, 0x92623A).setDepth(999);
        btn.setInteractive();
        btn.on('pointerup', function(){
            Game.changeScene(roomName);
        });
        return btn; 
    },
    changeScene: function(nameScene){
        this.scene.start(nameScene);
    },
})