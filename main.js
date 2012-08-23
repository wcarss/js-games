event_queue = new Array();
velocity = [0, 0];
down_state = false;
up_state = false;
left_state = false;
right_state = false;

$(function() {
    div = $("#game");
    setup_keydown(div);
    rect = setup_game();
    setInterval(main_loop(rect), 50);
});

function setup_keydown(canvas) {
    canvas.bind('keydown.down', function() {
        down_state = true;
    });
    canvas.bind('keyup.down', function() {
        down_state = false;
    });
    canvas.bind('keydown.up', function() {
        up_state = true;
    });
    canvas.bind('keyup.up', function() {
        up_state = false;
    });
    canvas.bind('keydown.left', function() {
        left_state = true;
    });
    canvas.bind('keyup.left', function() {
        left_state = false;
    });
    canvas.bind('keydown.right', function() {
        right_state = true;
    });
    canvas.bind('keyup.right', function() {
        right_state = false;
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
        events = null;
        if (event_queue.length > 0) {
            events = event_queue.pop();
            console.log(events);
        }

        rect.setY(rect.getY() - velocity[0]);
        rect.setX(rect.getX() - velocity[1]);

        if (up_state == true) {
            if (velocity[0] < 0)
                velocity[0] = 0;
            if (velocity[0] < 20)
                velocity[0] += 4;
        }
        else if (down_state == true) {
            if (velocity[0] > 0)
                velocity[0] = 0;
            if (velocity[0] > -20)
                velocity[0] -= 4;
        }
        else {
            velocity[0] /= 2;
            if (velocity[0] > -1 || velocity[0] < 1)
                velocity[0] = 0;
        }
        if (left_state == true) {
            if (velocity[1] < 0)
                velocity[1] = 0;
            if (velocity[1] < 20)
                velocity[1] += 4;
        }
        else if (right_state == true) {
            if (velocity[1] > 0)
                velocity[1] = 0;
            if (velocity[1] > -20)
                velocity[1] -= 4;
        }
        else {
            velocity[1] /= 2;
            if (velocity[1] > -1 || velocity[1] < 1)
                velocity[1] = 0;
        }

        if (events == 'restart') {
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

//    console.log('x is');
  //  console.log(rect.getX());
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
