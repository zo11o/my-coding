/*

输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树。

示例 1:

给定二叉树 [3,9,20,null,null,15,7]

    3
   / \
  9  20
    /  \
   15   7
返回 true 。

示例 2:

给定二叉树 [1,2,2,3,3,null,null,4,4]

       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
返回 false
 */

function isBalanced(root) {
  const f = (root) => {
    if (!root) {
      return 0;
    }

    let left = f(root.left);
    if (left == -1) {
      return -1;
    }
    let right = f(root.right);
    if (right == -1) {
      return -1;
    }

    return Math.abs(left - right) < 2 ? Math.max(left, right) + 1 : -1;
  };

  return f(root) != -1;
}
