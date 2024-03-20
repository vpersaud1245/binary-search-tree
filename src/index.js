import Tree from "./tree";

const array = [9, 7, 1, 2, 3, 5, 6, 4, 8];

const tree = new Tree(array);
console.log("Original");
tree.prettyPrint();
console.log("Insert 39");
tree.insert(39);
tree.prettyPrint();
console.log("Delete 39");
tree.deleteItem(39);
tree.prettyPrint();
console.log("Delete 4");
tree.deleteItem(4);
tree.prettyPrint();
console.log("Insert 4");
tree.insert(4);
tree.prettyPrint();
console.log("Insert 0");
tree.insert(0);
tree.prettyPrint();
console.log("Remove 1");
tree.deleteItem(1);
tree.prettyPrint();
console.log("Remove 3");
tree.deleteItem(3);
tree.prettyPrint();
tree.insert(-1);
tree.insert(3);
tree.insert(1);
tree.prettyPrint();
tree.deleteItem(2);
tree.prettyPrint();
function times2(number) {
  return number * 2;
}
console.log(tree.levelOrder(times2));
console.log(tree.height(5));
console.log(tree.depth(0));
