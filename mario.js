function main() {
    Crafty.sprite(40, "sprite-sheet-mario.png", {
        ffpeace_left: [0, 0],
        left_turn3: [1, 0], 
        left_turn2: [2, 0], 
        left_turn1: [3, 0], 
        left_turn0: [4, 0], 
        right_turn0: [5, 0], 
        right_turn1: [6, 0], 
        right_turn2: [7, 0], 
        right_turn3: [8, 0], 
        ffpeace_right: [9, 0], 

        left_run4: [0, 1], 
        left_walk4: [1, 1], 
        left_walk3: [2, 1], 
        left_walk2: [3, 1], 
        left_walk1: [4, 1], 
        right_walk1: [5, 1], 
        right_walk2: [6, 1], 
        right_walk3: [7, 1], 
        right_walk4: [8, 1], 
        right_run4: [9, 1], 

        left_run3: [0, 2], 
        left_run2: [1, 2], 
        left_run1: [2, 2], 
        left_run0: [3, 2], 
        left_walk0: [4, 2], 
        right_walk0: [5, 2], 
        right_run0: [6, 2], 
        right_run1: [7, 2], 
        right_run2: [8, 2], 
        right_run3: [9, 2], 

        left_run5: [0, 3], 
        left_fly1: [1, 3], 
        left_fly0: [2, 3], 
        left_spin1: [3, 3], 
        left_spin0: [4, 3], 
        right_spin0: [5, 3], 
        right_spin1: [6, 3], 
        right_fly0: [7, 3], 
        right_fly1: [8, 3], 
        right_run5: [9, 3]
    });

    Crafty.e("Heya, 2D, DOM, Text")
        .attrs({
            x: 200,
            y: 100,
            text: "Nothing here yet!"
        })
}
