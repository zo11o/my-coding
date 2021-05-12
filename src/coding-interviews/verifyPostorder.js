/**
 * 二叉搜索树的后序遍历序列
 * @link https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/
 */

/**
 * 递归法
 * @param {*} postorder
 * @returns
 */
 function verifyPostorder(postorder) {
  return helper(0, postorder.length - 1)

  function helper(left, right) {
    if (left >= right) {
      return true
    }

    let p = left, root = postorder[right]
    while (postorder[p] < root) {
      p++
    }

    let m = p
    while (postorder[p] > root) {
      p++
    }

    return p === right && helper(left, m - 1) && helper(m, right - 1)
  }
}

/**
 * 递归解释版
 * @param {*} postorder
 * @returns
 */
var verifyPostorder = function (postorder) {

  // 递归解法：
  // 必须要使用到二叉搜索树的特性
  // 特性1. 树的所有子节点都小于树的根节点
  // 特性2. 后续遍历的最后一个节点为根节点

  return helper(postorder, 0, postorder.length - 1);

  /**
   * @params
   */
  function helper(postorder, left, right) {
    // 只有一个值
    if (left >= right) {
      return true
    }

    let mid = left, root = postorder[right]

    // 需要先区分哪些是左子树的值，哪些是右子树的值，那通过什么方法找呢
    // 答案：找出左边第一个大于 root 节点的索引 mid，索引 mid 到 [mid, right] 的索引就是右子树的元素，[left, mid - 1] 就是左子树的值
    while (postorder[mid] < root) {
      mid++
    }

    // 这里是判断是否右子树存在小于根节点的值，如果存在就不符合二叉搜索树的要求
    let temp = mid
    while (temp < right) {
      if (postorder[temp++] < root) {
        return false
      }
    }

    // 第一个大于根节点的索引
    return helper(postorder, left, mid - 1) && helper(postorder, mid, right - 1)

  }
};
