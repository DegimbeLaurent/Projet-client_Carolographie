var RoomTemplate = new Phaser.Class({
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
    changeScene: function(nameScene, gameData){
        this.scene.start(nameScene, gameData);
    },
    ajouteChevalet: function(Game,x,y,zindex,title){
        var r = Game.add.rectangle(x, y, 50, 75, 0x92623A).setDepth(zindex);
        Game.add.text(x-20,y-65,title,{fontFamily: "Arial Black",fontSize: 12});
        return r;
    }
})