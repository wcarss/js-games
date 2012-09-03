$(function() {
    var hard_mute = false;
    Crafty.init(600, 400);

    Crafty.e("DOM")
        .bind('KeyDown', function(e) {
            if(e.key == Crafty.keys['P']) {
                Crafty.pause();
                if (Crafty.isPaused()) {
                    if (!Crafty.audio.muted) {
                        Crafty.audio.mute();
                    }
                }
                if (!Crafty.isPaused()) {
                    if (Crafty.audio.muted && !hard_mute) {
                        Crafty.audio.mute();
                    }
                }
            }
            if(e.key == Crafty.keys['M']) {
                if(!Crafty.isPaused()) {
                    Crafty.audio.mute();
                }
                hard_mute = !hard_mute;
                console.log(hard_mute);
            }
            if(e.key == Crafty.keys['X']) {
                Crafty.scene("main");
            }
        })

    //the loading screen that will display while our assets load
    Crafty.scene("loading", function () {
        Crafty.background("#000");
        //load takes an array of assets and a callback when complete
        Crafty.load(["../images/sprite-sheet-mario.png", "../images/bananabomber-sprites.png", '../sounds/music/spike.mp3'], function () {
            Crafty.audio.add('background', '../sounds/music/spike.mp3');
            Crafty.scene("main"); //when everything is loaded, run the main scene
        });

        //black background with some loading text
        Crafty.e("2D, DOM, Text")
            .attr({ 
                w: 100,
                h: 20, 
                x: 150, 
                y: 120
            })
            .text("Loading")
            .css({ "text-align": "center" });
    });

    Crafty.scene("main", function () {
        if (!hard_mute)
            Crafty.audio.play('background', -1, 0.2);
        main();
    });

    Crafty.scene("reset", function() {
        if(Crafty.isPaused())
            Crafty.pause();
        Crafty.scene("main");
    });

    //automatically play the loading scene
    Crafty.scene("loading");
});
