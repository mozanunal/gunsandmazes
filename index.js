
const PIXI = require('pixi.js');
const Mouse = require('pixi.js-mouse');
//misc
const calc = require('./misc/calculation');
// sprites
const Man = require('./src/man');
const PlayerMan = require('./src/playerMan');
const sPlayerMan = require('./src/skinnedPlayerMan');

const drawMap = require('./src/map0');

var app = new PIXI.Application(1500, 700, { backgroundColor: 0x004400 });
document.body.appendChild(app.view);

const blocks = ['assets/BlueMan/Dg1.png', 'assets/BlueMan/Dg2.png', 'assets/BlueMan/Dg3.png', 'assets/BlueMan/Dg4.png', 'assets/BlueMan/Dg5.png'];
PIXI.loader
    .add('assets/BlueMan/BlueMan.json')
    .add('assets/BlueMan/SkinnedMan.json')
    .add(blocks)
    .load(onAssetsLoaded);

GS_LOAD = 0;
GS_ACTIVE = 1;

var blockTexts = [];
for (var i = 0; i < 5; i++) {
    blockTexts[i] = new PIXI.Texture.fromImage(blocks[i]);
}
function onAssetsLoaded() {
    // Settings
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    // GLOBAL
    var GAME_STATE = GS_LOAD;


   // var playerMan = PlayerMan(app, app.screen.width / 2, app.screen.height / 2, 0);
    //var playerMan = PlayerMan(app, app.screen.width / 2, (app.screen.height / 2)-50, 0);
    var playerMan = sPlayerMan(app, app.screen.width / 2, (app.screen.height / 2)-50, 0);

    app.stage.addChild(playerMan);
    console.log(blocks[0]);

    drawMap(app, blockTexts);
    var man1 = Man(app, 200, 200, 0);
    app.stage.addChild(man1);

    f = man1.fire();

    app.stage.position.set(app.screen.width / 2, app.screen.height / 2);
    app.stage.scale.set(0.75, 0.75);
    app.stage.pivot.copy(playerMan.position);
    GAME_STATE = GS_ACTIVE;


    var sinner = 0;
    app.stage.isShaking = false;
    // Animate the rotation
    app.ticker.add(function (delta) {
        if (GAME_STATE == GS_ACTIVE) {
            var t1 = performance.now;
            app.stage.children.forEach(function (sprite) {
                if (sprite.objTick != undefined) {
                    sprite.objTick(delta);
                }

            });
            var t2 = performance.now;
            //console.log("One tick", (t2-t1));
        }
        //playerMan.objCollider();
        //For shake the screen
        if(app.stage.isShaking) {
            sinner+=1;
            app.stage.position.set(app.screen.width / 2+2*Math.sin(sinner), app.screen.height / 2 +2*Math.sin(sinner));
            if(sinner>100) {
                app.stage.position.set(app.screen.width / 2, app.screen.height / 2);
                sinner = 0;
                app.stage.isShaking = false;
            }
        }
        
        app.stage.pivot.copy(playerMan.position);
    });

}





