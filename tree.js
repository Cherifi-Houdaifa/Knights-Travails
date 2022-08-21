const Board = require("./board");

class Node {
    constructor(position) {
        this.position = position;
        // this["0"] = null;
        // this["1"] = null;
        // this["2"] = null;
        // this["3"] = null;
        // this["4"] = null;
        // this["5"] = null;
        // this["6"] = null;
        // this["7"] = null;
        this.childs = null;
    }
    addChilds() {
        this.childs = [];
        let legalMoves = new Board().getLegalMoves(...this.position);
        for (let i = 0; i < legalMoves.length; i++) {
            const newNode = new Node(legalMoves[i]);
            this.childs.push(newNode);
            this.childs[i].parent = this;
        }
        // sort the array
        this.childs = this.childs.sort((a, b) => {
            if (a.position[0] == b.position[0]) {
                return a.position[1] - b.position[1];
            }
            return a.position[0] - b.position[0];
        });
    }
}

class Tree {
    constructor(root) {
        this.root = root;
        this.movesLevel = 0;
    }
    addLevel(node = this.root) {
        let queue = [];
        queue.push(node);
        while (queue.length != 0) {
            const currentNode = queue[0];
            // if (currentNode.left !== null) {
            //     queue.push(currentNode.left);
            // }
            // if (currentNode.right !== null) {
            //     queue.push(currentNode.right);
            // }
            if (currentNode.childs !== null) {
                for (let i = 0; i < currentNode.childs.length; i++) {
                    queue.push(currentNode.childs[i]);
                }
            } else {
                currentNode.addChilds();
            }
            queue.shift();
        }
    }
    getPath(position, node = this.root) {
        let queue = [];
        queue.push(node);
        while (queue.length != 0) {
            const currentNode = queue[0];
            // do something
            if (
                JSON.stringify(currentNode.position) ===
                JSON.stringify(position)
            ) {
                return currentNode;
            }
            if (currentNode.childs !== null) {
                for (let i = 0; i < currentNode.childs.length; i++) {
                    queue.push(currentNode.childs[i]);
                }
            }
            queue.shift();
        }
        // the node is not available
        return null;
    }
}

module.exports = {
    Tree,
    Node,
};
