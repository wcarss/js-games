event_queue = new Array();

$(function() {
	canvas = $("#game");
    setup_keydown(canvas);
	context = setup_game(canvas[0]);
	main_loop();
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

function main_loop(){
    setInterval(check_queue, 50);
}

function check_queue() {
    if (event_queue.length > 0) {
        event = event_queue.pop();
        console.log(event);
    }
}

function key_array(obj) {
  arr = [];
  for (i in obj) {
    arr.push(i);
  }
  return arr.sort();
}

function setup_game(canvas) {
  context = canvas.getContext("2d");
  context.fillStyle = "rgb(80, 80, 240)";
  context.fillRect(0, 0, 500, 500);
}
