/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 从中序遍历和后序遍历构建二叉树
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {

  const idxMap = {}
  let post_idx = 0;
  let POSTORDER = []
  let INORDER = []

  POSTORDER = postorder;
  INORDER = inorder;
  post_idx = postorder.length - 1;
  inorder.forEach((o, i) => {
    idxMap[o] = i
  })
  return helper(0, inorder.length - 1)

  function helper(inLeft, inRight) {
    if (inLeft > inRight) {
      return null
    }
    let rootVal = POSTORDER[post_idx]
    let tree = new TreeNode(rootVal)
    let index = idxMap[rootVal]

    post_idx--;
    tree.right = helper(index + 1, inRight);
    tree.left = helper(inLeft, index - 1)
    return tree
  }
};
