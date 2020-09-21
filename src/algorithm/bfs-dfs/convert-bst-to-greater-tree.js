function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

var serialize = function (root) {
  if (!root) {
    return '#,'
  }

  let leftSerial = serialize(root.left)
  let rightSerial = serialize(root.right)
  return `${root.val},${leftSerial}${rightSerial}`
}

var deserialize = function (data) {
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

function convertBST(root) {
  let sum = 0;
  const _convertBST = (root) => {
    if (root != null) {
      _convertBST(root.right);
      sum += parseInt(root.val)
      root.val = sum
      _convertBST(root.left)
    }
  }
  _convertBST(root)

  return root;
}

let t = '5,2,#,#,13,#,#'
const tree = deserialize(t)
console.log(tree)

let res = convertBST(tree);
console.log(res);
console.log(serialize(res));
