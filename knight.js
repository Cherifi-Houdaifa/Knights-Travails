const { Tree, Node } = require("./tree");
const Board = require("./board");

function knightMoves(start, end) {
    const board = new Board();
    if (!board.isValidCord(...start) || !board.isValidCord(...end)) {
        throw Error("Invalid Starting or Ending position");
    }
    const tree = new Tree(new Node(start));
    let endNode = null;
    while (true) {
        endNode = tree.getPath(end);
        if (Boolean(endNode)) {
            break;
        }
        tree.addLevel();
    }
    let path = [];
    path.push(endNode.position);
    while (endNode.parent != undefined) {
        endNode = endNode.parent;
        path.push(endNode.position);
    }
    path.reverse();
    console.log(
        `=> You made it in ${path.length - 1} moves!  Here's your path:`
    );
    path.forEach((elem) => {
        console.log(`   [${elem}]`);
    });
}
knightMoves([3, 3], [4, 3]);
// Output:
// => You made it in 3 moves!  Here's your path:
//    [3,3]
//    [1,2]
//    [2,4]
//    [4,3]