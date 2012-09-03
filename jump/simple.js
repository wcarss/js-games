$(function() {
    var world_xsize = 1000;
    var world_ysize = 5050;
    var view_xsize = 640;
    var view_ysize = 480;
    Crafty.init(view_xsize, view_ysize);
    //Crafty.viewport.x = 0;
    Crafty.viewport.y = 480;
    //Crafty.viewport.init(600, 400);

    Crafty.scene("loading", function () {
        Crafty.background("#000");
        //load takes an array of assets and a callback when complete
        Crafty.load(["../images/bananabomber-sprites.png"], function () {
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
        var tile_xsize = 16;
        var tile_ysize = 16;
        var x_tiles = world_xsize/tile_xsize;
        var y_tiles = world_ysize/tile_ysize;
        console.log(x_tiles);
        console.log(y_tiles);

        Crafty.sprite(tile_xsize, "../images/bananabomber-sprites.png", {
            grass1: [0, 0],
            grass2: [1, 0],
            grass3: [2, 0],
            grass4: [3, 0],
            flower: [0, 1],
            bush1: [0, 2],
            bush2: [1, 2],
            player: [0, 3],
            enemy: [0, 3],
            banana: [4, 0],
            empty: [4, 0]
        });

        function land(x_pos, y_pos, speed) {
            grassType = Crafty.math.randomInt(1,4);
            Crafty.e("Ground, 2D, DOM, grass" + grassType)
                .attr({
                    x: x_pos,
                    dX: speed,
                    y: y_pos,
                    z: 1
                })
                .bind('EnterFrame', function() {
                    this.x += this.dX;
                    if (this.x > world_xsize || this.x < 0) {
                        this.dX *= -1;
                    }
                });
        }

        for (var i = 0; i < x_tiles; i++) {
            land(i*tile_xsize, tile_ysize, 0);
        }
        number_of_blocks = Crafty.math.randomInt(300, 400);
        for (var i = 0; i < number_of_blocks; i++) {
            x_spot = Crafty.math.randomInt(0, world_xsize);
            y_spot = Crafty.math.randomInt(0, -world_ysize);
            land(x_spot, y_spot, Crafty.math.randomInt(-3, 3));
        }

        var dude = Crafty.e("Dude, 2D, DOM, player, Twoway, Gravity, Collision")
                .attr({
                    x: 500,
                    y: -100,
                    z: 2,
                    hp: 10,
                    laps: 0
                })
                .twoway(4)
                .gravity("Ground")
                .gravityConst(0.18)
                .bind('EnterFrame', function() {
                    var dude_y = this.y-world_ysize*this.laps;
                    Crafty("Height").each(function() {
                        this.y = -(Crafty.viewport.y - 20);
                        this.x = -(Crafty.viewport.x - 20);
                        this.text("Height: " + parseInt(-dude_y));
                    });
                    Crafty("Highest").each(function() {
                        this.y = -(Crafty.viewport.y - 20);
                        this.x = -(Crafty.viewport.x - 550);
                        if (dude_y < this.highest) {
                            this.highest = dude_y;
                            this.text("Highest: " + parseInt(-dude_y));
                        }
                    });
                    if (this.y > 0) {
                        this.y = -world_ysize;
                        this.laps -= 1;
                        Crafty.viewport.y = -(this.y) + view_ysize/2;
                    }
                    else if (this.y < -world_ysize) {
                        this.y = 0;
                        this.laps += 1;
                        Crafty.viewport.y = -(this.y) + view_ysize/2;
                    }
                    Crafty.viewport.x = -(this.x) + view_xsize/2;
                    if (Crafty.viewport.y + this.y < 100) {
                    //    console.log("falling: y = " + (Crafty.viewport.y + this.y));
                        Crafty.viewport.y += 4;
                    }
                    else if (Crafty.viewport.y + this.y > 380) {
                    //    console.log("rising: y = " + (Crafty.viewport.y + this.y));
                        Crafty.viewport.y -= 16;
                    }                 
                })

            Crafty.e("Height, DOM, 2D, Text")
                .attr({
                        x: 200,
                        y: -350,
                        z: 2,
                    })
                .text("Height: " + dude.y)
                .textColor("#FFF")

            Crafty.e("Highest, DOM, 2D, Text")
                .attr({
                        x: 200,
                        y: -350,
                        z: 2,
                        highest: 0
                    })
                .text("Highest: " + dude.highest)
                .textColor("#FFF")

        //Crafty.viewport.clampToEntities = false;
        //Crafty.viewport.follow(dude, 0, 170);
    });

    Crafty.scene("loading");
});
