import Tree from "./tree";

const array = [9, 7, 1, 2, 3, 5, 6, 4, 8];

const tree = new Tree(array);
tree.prettyPrint();
tree.insert(39);
tree.prettyPrint();
