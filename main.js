event_queue = new Array();
velocity = [0, 0];

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
            velocity[0] /= 2;
            if (velocity[0] > -1 || velocity[0] < 1)
                velocity[0] = 0;
            velocity[1] /= 2;
            if (velocity[1] > -1 || velocity[1] < 1)
                velocity[1] = 0;
        }

    //console.log(rect);
    //y = rect.y;
    //x = rect.x;
    //console.log(velocity[0]);
    //console.log(velocity[1]);
        rect.setY(rect.getY() - velocity[0]);
        rect.setX(rect.getX() - velocity[1]);

        if (event == 'up') {
            if (velocity[0] < 20)
                velocity[0] += 3;
        }
        if (event == 'down') {
            if (velocity[0] > -20)
                velocity[0] -= 3;
        }
        if (event == 'left') {
            if (velocity[1] < 20)
                velocity[1] += 3;
        }
        if (event == 'right') {
            if (velocity[1] > -20)
                velocity[1] -= 3;
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
