$(function() {
    var world_xsize = 1000;
    var world_ysize = 5000;
    var view_xsize = 640;
    var view_ysize = 480;
    Crafty.init(view_xsize, view_ysize);
    var hard_mute = false;

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
                Crafty.scene("reset");
            }
        })

    //the loading screen that will display while our assets load
    Crafty.scene("loading", function () {
        Crafty.background("#000");
        Crafty.load(["../images/bananabomber-sprites.png"], function () {
            Crafty.scene("main");
        });

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
        main(world_xsize, world_ysize, view_xsize, view_ysize);
    });

    Crafty.scene("reset", function() {
        if(Crafty.isPaused())
            Crafty.pause();
        Crafty.scene("main");
    });

    //automatically play the loading scene
    Crafty.scene("loading");
});
