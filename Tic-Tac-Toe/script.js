let cross = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];
let ai = "X"; // The computer is X
let human = "O"; // The human is O
let currentPlayer = human;
let w;
let h;

function setup() {
    createCanvas(350, 350);
    w = width / 3; // Column width
    h = height / 3; // Row width
}

function equals3(a, b, c) {
    return a == b && b == c && a != "";
}

function checkWinner() {
    let winner = null;

    for (let i = 0; i < 3; i++) {
        if (equals3(cross[i][0], cross[i][1], cross[i][2])) {
            winner = cross[i][0];
        }
    }

    for (let i = 0; i < 3; i++) {
        if (equals3(cross[0][i], cross[1][i], cross[2][i])) {
            winner = cross[0][i];
        }
    }

    if (equals3(cross[0][0], cross[1][1], cross[2][2])) {
        winner = cross[0][0];
    }
    if (equals3(cross[2][0], cross[1][1], cross[0][2])) {
        winner = cross[2][0];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (cross[i][j] == "") {
                openSpots++;
            }
        }
    }

    if (winner == null && openSpots == 0) {
        return "tie";
    } else {
        return winner;
    }
}

function mousePressed() {
    if (currentPlayer == human) {
        let i = floor(mouseX / w);
        let j = floor(mouseY / h);
        // If valid turn
        if (cross[i][j] == "") {
            cross[i][j] = human;
            currentPlayer = ai;
            bestMove();
        }
    }
}

function draw() {
    background(122, 211, 50);
    strokeWeight(6);
    stroke(80);
    line(0, 0, 0, height);
    line(0, 0, width, 0);
    line(height, 0, height, width);
    line(0, width, width, height);
    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);

    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            let x = w * i + w / 2;
            let y = h * j + h / 2;
            let spot = cross[i][j];
            textSize(32);
            let r = w / 6;
            if (spot == human) {
                noFill();
                circle(x, y, r*2);
            } 
            else if (spot == ai) {
                line(x - r, y - r, x + r, y + r);
                line(x + r, y - r, x - r, y + r);
            }
        }
    }

    let result = checkWinner();
    if (result != null) {
        noLoop();
        let resultP = createP("");
        resultP.style("font-size", "36pt");
        resultP.style("color", "black");
        resultP.style("margin-left", "100px");
        if (result == "tie") {
            resultP.html("Tie!");
        } else {
            resultP.html(`${result} wins!`);
        }
    }
}