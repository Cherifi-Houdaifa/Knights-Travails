class Board {
    constructor() {
        this.size = 8;
    }
    isValidCord(row, column) {
        if (row >= 0 && row < this.size && column >= 0 && column < this.size) {
            return true;
        }
        return false;
    }
    getLegalMoves(row, column) {
        let moves = [
            [-1, -2],
            [-1, 2],
            [-2, -1],
            [-2, 1],
            [1, -2],
            [1, 2],
            [2, -1],
            [2, 1],
        ];
        moves = moves.map((move) => {
            move = [row + move[0], column + move[1]];
            return move;
        });
        moves = moves.filter((move) => {
            return this.isValidCord(move[0], move[1]);
        });
        return moves;
    }
}

module.exports = Board;
