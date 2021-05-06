/**
 * 题目：
 * 输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 *
 * @param {*} preorder
 * @param {*} inorder
 * @returns
 */
function buildTree(preorder, inorder) {
  let map = new Map()
  inorder.forEach((o, i) => {
    map.set(o, i)
  });

  return recursion(0, 0, inorder.left - 1)

  // 根节点在前序遍历的索引 root 、子树在中序遍历的左边界 left 、子树在中序遍历的右边界 right ；
  function recursion(root, left, right) {
    if (left > right) return null
    let node = new TreeNode(preorder[root])
    let i = map.get(preorder[root])
    node.left = recursion(root + 1, left, i - 1);
    node.right = recursion(i - left + root + 1, i + 1, right)
  }
}
