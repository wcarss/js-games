event_queue = new Array();
xvelocity = [0, 0];
yvelocity = [0, 0];

$(function() {
    div = $("#game");
    setup_keydown(div);
    rect = setup_game();
    setInterval(main_loop(rect), 50);
});

function setup_keydown(canvas) {
    canvas.bind('keydown.down', function() {
        event_queue.push('down');
    });
    canvas.bind('keydown.left', function() {
        event_queue.push('left');
    });
    canvas.bind('keydown.right', function() {
        event_queue.push('right');
    });
    canvas.bind('keydown.up', function() {
        event_queue.push('up');
    });
    canvas.bind('keydown.p', function() {
        event_queue.push('pause');
    });
    canvas.bind('keydown.q', function() {
        event_queue.push('restart');
    });
    canvas.bind('keydown.space', function() {
        event_queue.push('color');
    });
}

function main_loop(rect) {
    return function() {
        if (event_queue.length > 0) {
            event = event_queue.pop();
            console.log(event);
        }
        else
        {
            event = null;
            yvelocity[0] /= 5;
            if (yvelocity[0] > -1 || yvelocity[0] < 1)
                yvelocity[0] = 0;
            yvelocity[1] /= 5;
            if (yvelocity[1] > -1 || yvelocity[1] < 1)
                yvelocity[1] = 0;
            xvelocity[0] /= 5;
            if (xvelocity[0] > -1 || yvelocity[0] < 1)
                xvelocity[0] = 0;
            xvelocity[1] /= 5;
            if (xvelocity[1] > -1 || yvelocity[1] < 1)
                xvelocity[1] = 0;
        }

    //console.log(rect);
    //y = rect.y;
    //x = rect.x;
    //console.log(rect.getX());
    //console.log(rect.getY());

        if (event == 'up') {
            //console.log('up');
            if (yvelocity[0] < 20)
                yvelocity[0] += 2;
            rect.setY(rect.getY()-yvelocity[0]);
            event == null;
        }
        if (event == 'down') {
            //console.log('down');
            if (yvelocity[1] < 20)
                yvelocity[1] += 2;
            rect.setY(rect.getY()+yvelocity[1]);
            event == null;
        }
        if (event == 'left') {
            //console.log('down');
            if (xvelocity[0] < 20)
                xvelocity[0] += 2;
            rect.setX(rect.getX()-xvelocity[0]);
            event == null;
        }
        if (event == 'right') {
            //console.log('down');
            if (xvelocity[1] < 20)
                xvelocity[1] += 2;
            rect.setX(rect.getX()+xvelocity[1]);
            event == null;
        }
        if (event == 'restart') {
            rect.setX(200);
            rect.setY(200);
        }
    }
}

function key_array(obj) {
  arr = [];
  for (i in obj) {
    arr.push(i);
  }
  return arr.sort();
}

function setup_game() {
    var stage = new Kinetic.Stage({
        container: "game",
        width: 500,
        height: 500
    });

    var layer = new Kinetic.Layer();

    var bg = new Kinetic.Rect({
        width: 500,
        height: 500,
        fill: "#6666BB",
        stroke: "black",
        strokeWidth: 1
    });

    var rect = new Kinetic.Rect({
        x: 239,
        y: 75,
        width: 100,
        height: 50,
        fill: "#DDDDDD",
        stroke: "black",
        strokeWidth: 1
    });

    console.log('x is');
    console.log(rect.getX());
    // add the shape to the layer
    layer.add(bg);
    layer.add(rect);

    // add the layer to the stage
    stage.add(layer);

    stage.onFrame(function() {
        layer.draw();
    });

    stage.start();
    return rect;
}
