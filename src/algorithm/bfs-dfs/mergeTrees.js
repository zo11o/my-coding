function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

var serialize = function (root) {
  if (!root) {
    return "#,";
  }

  let leftSerial = serialize(root.left);
  let rightSerial = serialize(root.right);
  return `${root.val},${leftSerial}${rightSerial}`;
};

var deserialize = function (data) {
  var list = data.split(",");

  const buildTree = (list) => {
    const rootVal = list.shift();
    if (rootVal == "#") {
      return null;
    }

    let node = new TreeNode(Number(rootVal));
    node.left = buildTree(list);
    node.right = buildTree(list);
    return node;
  };
  return buildTree(list); // 构建的入口
};

/**
 * 合并两颗二叉树
 * @param {*} t1 树1
 * @param {*} t2 树2
 */
function mergeTrees(t1, t2) {
  if (t1 == null) {
    return t2;
  }

  if (t2 == null) {
    return t1;
  }

  let merged = new TreeNode(t1.val + t2.val);
  merged.left = mergeTrees(t1.left, t2.left);
  merged.right = mergeTrees(t1.right, t2.right);
  return merged;
}

let t1 = deserialize("1,3,5,#,#,#,2,#,#");
let t2 = deserialize("2,1,#,4,#,#,3,#,7,#,#");
var res = mergeTrees(t1, t2);
console.log(res);
