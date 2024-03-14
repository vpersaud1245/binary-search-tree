import Node from "./node";

function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

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
    this.root = this.buildTree(formatArray(array), 0, array.length - 1);
    console.log(this.root);
    prettyPrint(this.root);
  }

  buildTree(array, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }
}
