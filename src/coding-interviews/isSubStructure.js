/**
 * 剑指 Offer 26. 树的子结构
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
 var isSubStructure = function(A, B) {
  return (A != null && B != null) && (recur(A, B) || isSubStructure(A.right, B) || isSubStructure(A.left, B) )

  function recur(X, Y) {
      if (Y == null) return true
      if (X == null || X.val !== Y.val) {
          return false
      }
      return recur(X.left, Y.left) && recur(X.right, Y.right)
  }
};
