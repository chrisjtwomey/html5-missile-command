import {Game} from './Game.js';

/*global window, require, canvas*/

require(["Loader"], function (loader) {
    "use strict";

    loader.addCompletionListener(function (e) {
        //==============================//
        // Main Loop
        //==============================//

        var game = new Game(canvas);

        game.start();

        var animationFrame =
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame || null;

        var then = Date.now();

        var main = function () {
            var now = Date.now(),
                dt = (now - then) / 1000;

            if (game.isStarted) {
                game.update(dt);
                game.render(canvas.getContext("2d"));
            }

            then = now;
        };

        if (animationFrame !== null) {
            var mainLoop = function () {
                main();
                animationFrame(mainLoop, canvas);
            }

            animationFrame(mainLoop, canvas);
        } else {
            // for IE9
            setInterval(main, 1000 / Game.MAX_FPS);
        }
    });

    loader.start();
});
