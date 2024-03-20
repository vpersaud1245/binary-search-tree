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
    // Rebalance
  }

  deleteItem(value, currentNode = this.root) {
    if (currentNode === null) return null;
    if (
      currentNode.data === value &&
      currentNode.left === null &&
      currentNode.right === null
    ) {
      return null;
    }
    if (
      currentNode.data === value &&
      currentNode.left != null &&
      currentNode.right === null
    ) {
      currentNode.data = currentNode.left.data;
      currentNode.left = null;
      return currentNode;
      // rebalance
    }
    if (
      currentNode.data === value &&
      currentNode.left === null &&
      currentNode.right != null
    ) {
      currentNode.data = currentNode.right.data;
      currentNode.right = null;
      return currentNode;
      // rebalance
    }
    if (
      currentNode.data === value &&
      currentNode.left != null &&
      currentNode.right != null
    ) {
      const nextLowestValue = this.findNextLowestNode(currentNode.data).data;
      this.deleteItem(nextLowestValue);
      currentNode.data = nextLowestValue;
      // rebalance
    }

    if (value < currentNode.data) {
      currentNode.left = this.deleteItem(value, currentNode.left);
    } else if (value > currentNode.data) {
      currentNode.right = this.deleteItem(value, currentNode.right);
    }
    return currentNode;
  }

  find(value, node = this.root) {
    if (node === null) {
      return null;
    }
    let nodeFound;
    if (node.data === value) {
      nodeFound = node;
    } else {
      const checkLeft = this.find(value, node.left);
      const checkRight = this.find(value, node.right);
      if (checkLeft != null) {
        nodeFound = checkLeft;
      } else if (checkRight != null) {
        nodeFound = checkRight;
      }
    }

    return nodeFound;
  }

  findNextLowestNode(value, node = this.find(value)) {
    let nextLowestNode;
    if (node === null) return null;
    // Return right node if original node has no left node
    if (node.data === value && node.left === null && node.right != null)
      return node.right;

    if (node.data === value && node.left != null) {
      nextLowestNode = this.findNextLowestNode(value, node.left);
    }
    if (node.data < value && node.right !== null) {
      nextLowestNode = this.findNextLowestNode(value, node.right);
    } else if (node.data < value && node.right === null) {
      return node;
    }

    return nextLowestNode;
  }

  levelOrder(callback = null, queue = [this.root]) {
    const values = [];
    while (queue.length > 0) {
      const node = queue[0];
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
      if (callback !== null) {
        values.push(callback(queue.shift().data));
      } else {
        values.push(queue.shift().data);
      }
    }
    return values;
  }

  preOrder(callback = null) {
    const values = [];
    const traverse = (node) => {
      if (node === null) return; // Terminate recursion if node is null
      if (callback !== null) {
        values.push(callback(node.data)); // Process node data if callback is provided
      } else {
        values.push(node.data); // Otherwise, just push node data
      }
      traverse(node.left); // Recursively traverse left subtree
      traverse(node.right); // Recursively traverse right subtree
    };
    traverse(this.root);
    return values;
  }

  inOrder(callback = null) {
    const values = [];
    const traverse = (node) => {
      if (node === null) return; // Terminate recursion if node is null
      traverse(node.left); // Recursively traverse left subtree
      if (callback !== null)
        values.push(callback(node.data)); // Process node data if callback is provided
      else values.push(node.data); // Otherwise, just push node data
      traverse(node.right); // Recursively traverse right subtree
    };
    traverse(this.root);
    return values;
  }

  postOrder(callback = null) {
    const values = [];
    const traverse = (node) => {
      if (node === null) return; // Terminate recursion if node is null
      traverse(node.left); // Recursively traverse left subtree
      traverse(node.right); // Recursively traverse right subtree
      if (callback !== null)
        values.push(callback(node.data)); // Process node data if callback is provided
      else values.push(node.data); // Otherwise, just push node data
    };
    traverse(this.root);
    return values;
  }

  height(value, node = this.find(value)) {
    if (node === null) return null;
    if (node.left === null && node.right === null) {
      return 0;
    }
    const leftHeight = 1 + this.height(0, node.left);
    const rightHeight = 1 + this.height(0, node.right);

    if (leftHeight > rightHeight) return leftHeight;
    return rightHeight;
  }
}
