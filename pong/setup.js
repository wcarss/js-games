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
                Crafty.scene("reset");
            }
        })

    //the loading screen that will display while our assets load
    Crafty.scene("main", function () {
        Crafty.background("#000");
        main();
    });

    Crafty.scene("reset", function() {
        if(Crafty.isPaused())
            Crafty.pause();
        Crafty.scene("main");
    });
    //automatically play the loading scene
    Crafty.scene("main");
});
