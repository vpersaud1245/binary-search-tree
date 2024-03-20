import Tree from "./tree";

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function generateRandomArray() {
  const array = [];
  for (let i = 0; i < 10; i += 1) {
    const randomInt = getRandomInt(0, 100);
    if (array.indexOf(randomInt) === -1) array.push(randomInt);
  }
  return array;
}

const tree = new Tree(generateRandomArray());
tree.prettyPrint();
console.log("Confirm tree is balanced");
console.log("tree.isBalanced() = ", tree.isBalanced());
console.log("\n\n");
console.log("Print out all elements in level, pre, post, and in order.");
console.log("tree.preOrder() = ", tree.preOrder());
console.log("tree.inOrder() = ", tree.inOrder());
console.log("tree.postOrder() = ", tree.postOrder());
console.log("\n\n");
console.log("Unbalance the tree by adding 3 numbers > 100");
for (let i = 0; i <= 3; i += 1) {
  tree.insert(100 + i);
}
tree.prettyPrint();
console.log("Confirm that the tree is unbalanced by calling isBalanced.");
console.log("tree.isBalanced() = ", tree.isBalanced());
console.log("\n\n");
console.log("Balance the tree by calling rebalance.");
tree.rebalance();
tree.prettyPrint();
console.log("Confirm that the tree is unbalanced by calling isBalanced.");
console.log("tree.isBalanced() = ", tree.isBalanced());
console.log("\n\n");
console.log("Print out all elements in level, pre, post, and in order.");
console.log("tree.preOrder() = ", tree.preOrder());
console.log("tree.inOrder() = ", tree.inOrder());
console.log("tree.postOrder() = ", tree.postOrder());
