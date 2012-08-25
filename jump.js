function main() {
    Crafty.sprite(16, "bananabomber-sprites.png", {
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

    function land(x_pos, y_pos) {
        grassType = Crafty.math.randomInt(1,4);
        Crafty.e("Ground, 2D, DOM, grass" + grassType)
            .attr({
                x: x_pos,
                y: y_pos,
                z: 1
            });
    }

    for (var i = 0; i < 38; i++) {
        for (var j = 21; j < 25; j++) {
            land(i*16, j*16);
        }
    }
    number_of_blocks = Crafty.math.randomInt(0, 20);
    for (var i = 0; i < number_of_blocks; i++) {
        x_spot = Crafty.math.randomInt(0, 600);
        y_spot = Crafty.math.randomInt(150, 300);
        land(x_spot, y_spot);
    }

    Crafty.e("Dude, 2D, DOM, player, Twoway, Gravity, Collision")
        .attr({
            x: 40,
            y: 300,
            z: 2,
            hp: 10
        })
        .twoway(3)
        .gravity("Ground")
        .gravityConst(0.235)
        .bind('EnterFrame', function() {
            if (this.x < -16) {
                this.x = 600;
            }
            if (this.x > 601) {
                this.x = -15;
            }
            if(Crafty.math.randomInt(1, 50) > 49) {
                var direction = Crafty.math.randomInt(0, 1);
                Crafty.e("macguffin, 2D, DOM, banana")
                    .attr({
                        x: direction ? 0 : 600,
                        y: Crafty.math.randomInt(220, 320),
                        dX: Crafty.math.randomInt(1, 4) * (direction ? 1 : -1)
                    })
                    .bind('EnterFrame', function() {
                        this.x += this.dX;
                        if (this.x < 0 || this.x > 600) {
                            this.destroy();
                            Crafty("HP").each(function() {
                                this.text(--this.hp + " hp");
                            });
                        }
                    });
            }
            Crafty("HP").each(function(){
                if (this.hp < 1) {
                    Crafty.pause();
                    Crafty("instructions").each(function() {
                        this.text("Lost your bananas!");
                    });
                    setTimeout(function() {
                        Crafty.scene("Reset");
                    }, 1500);
                }
            });
        })
       .onHit('macguffin', function() {
            //console.log(this.hit("macguffin"));
            this.hit("macguffin")[0].obj.destroy();
            Crafty("Score").each(function() {
                this.text("Score: " + ++this.score);
            });
        });

    Crafty.e("instructions, DOM, 2D, Text")
        .attr({ x: 225, y: 20, w: 180, h: 20, score: 0 })
        .text("Collect Bananas!")
        .textColor("green");
    Crafty.e("Score, DOM, 2D, Text")
        .attr({ x: 20, y: 20, w: 100, h: 20, score: 0 })
        .text("Score: 0")
        .textColor("green");
    Crafty.e("HP, DOM, 2D, Text")
        .attr({ x: 515, y: 20, w: 100, h: 20, hp: 10 })
        .text("10 HP")
        .textColor("green");
}
