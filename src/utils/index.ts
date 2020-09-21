// 这个文件写一些工具函数
// 比如通过数组构建链表，通过数组构建二叉树等
type TreeNodeValueType = number | string | null | undefined;
type TreeNodeType = ITreeNode | null;

interface ITreeNode {
  val: TreeNodeValueType
  left: TreeNodeType
  right : TreeNodeType
}

/**
 * 定义二叉树
 * @param {number} val
 */
class TreeNode implements ITreeNode  {
  public val: TreeNodeValueType;
  public left: TreeNodeType;
  public right: TreeNodeType;

  constructor (val: TreeNodeValueType) {
    this.val = val;
    this.left = this.right = null
  }
}

/**
 * 将二叉树序列化
 * @param {TreeNodeType} root
 */
const serialize = (root: TreeNodeType): string => {
  if (!root) {
    return '#,'
  }

  let left = serialize(root.left);
  let right = serialize(root.right);
  return `${root.val},${left}${right}`
};

/**
 * 序列化的二叉树返回二叉树
 * @param {string} data '1,2,3,#,#,4,5,#,#'
 */
const deserialize = (data: string): TreeNodeType => {
  var list = data.split(',');

  const buildTree = (list: Array<TreeNodeValueType>) => {
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

var utils = {
  deserializeByString: deserialize,
}

export default utils
