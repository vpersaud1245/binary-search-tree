import Node from "./node";

function removeDuplicates(array) {
  return array.filter((value, index) => array.indexOf(value) === index);
}

function sort(array) {
  return array.sort((a, b) => a - b);
}

function formatArray(array) {
  const sortedArray = sort(array);
  return removeDuplicates(sortedArray);
}

export default class Tree {
  constructor(array) {
    if (array) {
      this.root = this.buildTree(formatArray(array), 0, array.length - 1);
    } else this.root = null;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  buildTree(array, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  insert(value) {
    // Add condition for if value inserted is already in tree
    if (this.root === null) {
      this.root = new Node(value);
    }
    let currentNode = this.root;
    while (currentNode != null) {
      if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = new Node(value);
          return;
        }
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = new Node(value);
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }
}
