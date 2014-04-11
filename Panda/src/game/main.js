game.module(
    'game.main'
)
.require(
    'engine.core'
)
.body(function() {

//game.addAsset('logo.png', 'logo');

SceneGame = game.Scene.extend({
    backgroundColor: 0x808080,

    init: function() {
        var shape = new game.Circle(100);
        shape.anchor.set(0.5, 0.5);
        shape.position.set(game.system.width / 2, game.system.height / 2);
        this.stage.addChild(shape);
        
        var tween = new game.Tween(shape.position);
        tween.to({x: game.system.width / 2 - 10}, 500);
        tween.repeat();
        tween.yoyo();
        tween.start();
    }
});

game.start();

});