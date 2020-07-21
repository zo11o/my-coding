// 本节主要是二叉树的序列化与反序列化

function TreeNode(val, left, right) {
  this.val = val;
  this.left = left;
  this.right = right
}

// 序列化
var serialize = function (root) {
  if (root == null) return '#,'                 // 遇到null节点
  const leftSerialized = serialize(root.left)   //左子树的序列化字符串
  const rightSerialized = serialize(root.right) //右子树的序列化字符串
  return root.val + ',' + leftSerialized + rightSerialized
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  const list = data.split(',')       // 转成list数组
  var result = buildTree(list)
  return result
};

const buildTree = (list) => {        // dfs函数
  const nodeVal = list.shift()       // 当前考察的节点
  if (nodeVal == '#') return null    // 是X，返回null给父调用
  const node = new TreeNode(nodeVal) // 创建node节点
  node.left = buildTree(list)        // 构建node的左子树
  node.right = buildTree(list)       // 构建node的右子树
  return node                        // 返回以node为根节点的子树给父调用
}

/**
 * Your functions will be called as such:
 *
 */
var prevTree = deserialize('1,2,#,#,3,4,#,#,5,#,#,')

var tree = deserialize(serialize(prevTree));
console.log('====================================');
console.log(tree);
console.log('====================================');
