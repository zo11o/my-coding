/**
 * 剑指 Offer 34. 二叉树中和为某一值的路径
 * @link  https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/
 */
var pathSum = function (root, target) {
  var res = []
  dfs(root, [])
  return res


  function dfs(node, temp) {
    if (!node) {
      return
    }

    temp.push(node.val);
    dfs(node.left, temp.slice())
    dfs(node.right, temp.slice())
    if (!node.left && !node.right) {
      let sum = temp.reduce((acc, cur) => Number(acc) + Number(cur), 0)
      if (sum == target) {
        res.push(temp)
      }
    }
  }
}
