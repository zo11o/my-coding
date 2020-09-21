// 这个文件写一些工具函数
// 比如通过数组构建链表，通过数组构建二叉树等

/**
 * 定义二叉树
 * @param {number} val
 */
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const serialize = function (root) {
  if (!root) {
    return '#,'
  }

  let left = serialize(root.left);
  let right = serialize(root.right);
  return `${root.val},${left}${right}`
};

/**
 *
 */
const deserialize = (data) => {
  var list = data.split(',');

  const buildTree = (list) => {
    const rootVal = list.shift();
    if (rootVal == '#') {
      return null
    }

    let node = new TreeNode(rootVal);
    node.left = buildTree(list);
    node.right = buildTree(list);
    return node;
  }
  return buildTree(list); // 构建的入口
};

function deserialize(data) {

}

var utils = {

}
