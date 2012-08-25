function main() {
    Crafty.e("AIPaddle, 2D, DOM, Color, Multiway")
        .color('rgb(0,255,0)')
        .attr({ x: 20, y: 100, w: 10, h: 100 })
        .multiway(6, { W: -90, S: 90 });

    Crafty.e("Paddle, 2D, DOM, Color, Multiway")
        .color('rgb(0,255,0)')
        .attr({ x: 580, y: 100, w: 10, h: 100 })
        .multiway(6, { UP_ARROW: -90, DOWN_ARROW: 90 });

    Crafty.e("Ball, 2D, DOM, Color, Collision").color('green')
        .attr({
            x: 300, y: 150, w: 10, h: 10, 
            dX: Crafty.math.randomInt(2, 5), 
            dY: Crafty.math.randomInt(2, 5)
        })
        .bind('EnterFrame', function () {
            //hit floor or roof
            if (this.y <= 0 || this.y >= 390)
                this.dY *= -1;

            if (this.x > 600) {
                this.x = 300;
                Crafty("LeftPoints").each(function () { 
                    this.text(++this.points + " Points") });
            }
            if (this.x < 10) {
                this.x = 300;
                Crafty("RightPoints").each(function () { 
                    this.text(++this.points + " Points") });
            }

            var ball_x = this.x;
            var ball_y = this.y;
            Crafty("AIPaddle").each(function() {
                if ((ball_x - this.x) < 50) {
                    if (ball_y < this.y) {
                        this.y -= 10;
                    }
                    else if(ball_y > this.y) {
                        this.y += 10;
                    }
                }
            });
            this.x += this.dX;
            this.y += this.dY;
        })
        .onHit('Paddle', function () {
            this.dX *= -1;
        })
        .onHit('AIPaddle', function () {
            this.dX *= -1;
        })

    //Score boards
    Crafty.e("LeftPoints, DOM, 2D, Text")
        .attr({ x: 20, y: 20, w: 100, h: 20, points: 0 })
        .text("0 Points")
        .textColor("green");
    Crafty.e("RightPoints, DOM, 2D, Text")
        .attr({ x: 515, y: 20, w: 100, h: 20, points: 0 })
        .text("0 Points")
        .textColor("green");
    Crafty.e("MiddleLine, DOM, 2D, Color")
        .attr({ x: 299, y: 0, w: 2, h: 400 })
        .color("green");
}
