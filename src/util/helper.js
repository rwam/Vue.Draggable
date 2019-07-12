function getConsole() {
  if (typeof window !== "undefined") {
    return window.console;
  }
  return global.console;
}
const console = getConsole();

function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

const regex = /-(\w)/g;
const camelize = cached(str =>
  str.replace(regex, (_, c) => (c ? c.toUpperCase() : ""))
);

function removeNode(node) {
  if (node.parentElement !== null) {
    node.parentElement.removeChild(node);
  }
}

function removeNodes(nodes) {
  nodes.forEach(node => {
    removeNode(node);
  });
}

function insertNodeAt(fatherNode, node, position) {
  const refNode =
    position === 0
      ? fatherNode.children[0]
      : fatherNode.children[position - 1].nextSibling;
  fatherNode.insertBefore(node, refNode);
}

function insertNodesAt(fatherNode, nodes, position) {
  const refNode =
    position === 0
      ? fatherNode.children[0]
      : fatherNode.children[position - 1].nextSibling;
  nodes.forEach(node => {
    fatherNode.insertBefore(node, refNode);
  });
}

export {
  insertNodeAt,
  insertNodesAt,
  camelize,
  console,
  removeNode,
  removeNodes
};
