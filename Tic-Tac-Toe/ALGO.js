function bestMove() {
    let bestScore = -999999;
    let move;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (cross[i][j] == "") {
                // Is the spot available
                cross[i][j] = ai;
                let score = ALGO(cross, 0, false);
                cross[i][j] = "";
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }
    cross[move.i][move.j] = ai;
    currentPlayer = human;
}

let scores = {
    X: 10,
    O: -10,
    tie: 0,
};

function ALGO(cross, depth, isMaximizing) {
    let result = checkWinner();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -999999;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (cross[i][j] == "") {
                    cross[i][j] = ai;
                    let score = ALGO(cross, depth + 1, false);
                    cross[i][j] = "";
                    bestScore = max(score, bestScore);
                }
            }
        }
        return bestScore;
    } 
    else {
        let bestScore = 999999;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (cross[i][j] == "") {
                    cross[i][j] = human;
                    let score = ALGO(cross, depth + 1, true);
                    cross[i][j] = "";
                    bestScore = min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}