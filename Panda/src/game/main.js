game.module(
    'game.main'
)
.require(
    'engine.core'
)
.body(function() {

game.addAsset('logo.png', 'logo');

SceneGame = game.Scene.extend({
    backgroundColor: 0x808080,

    init: function() {
        var logo = new game.Sprite('logo');
        logo.anchor.set(0.5, 0.5);
        logo.position.set(game.system.width / 2, game.system.height / 2);
        this.stage.addChild(logo);
        
        var tween = new game.Tween(logo.position);
        tween.to({x: game.system.width / 2 - 10}, 500);
        tween.repeat();
        tween.yoyo();
        tween.start();
        
        var logo2 = new game.Sprite('logo');
        logo2.anchor.set(0.5, 0.5);
        logo2.alpha = 0.5;
        logo2.position.set(game.system.width / 2, game.system.height / 2);
        this.stage.addChild(logo2);
        
        var tween = new game.Tween(logo2.position);
        tween.to({y: game.system.width / 2 - 10}, 500);
        tween.repeat();
        tween.yoyo();
        tween.start();
    }
});

game.start();

});