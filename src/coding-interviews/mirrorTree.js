
/**
 * 剑指 Offer 27. 二叉树的镜像
 * 请完成一个函数，输入一个二叉树，该函数输出它的镜像。
 * @link https://leetcode-cn.com/problems/er-cha-shu-de-jing-xiang-lcof/
 * @param {Tree} root
 * @returns
 */
var mirrorTree = function(root) {
  if (!root) {
    return null
  }

  let dum = new TreeNode(root.val)
  dum.left = mirrorTree(root.right)
  dum.right = mirrorTree(root.left)
  return dum
}
