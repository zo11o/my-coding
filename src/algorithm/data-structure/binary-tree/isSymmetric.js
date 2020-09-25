/**
 * 判断节点是否对称节点
 * @param {*} root
 */
function isSymmetric(root) {
  const recur = (l, r) => {
    if (!l && !r) {
      return true;
    }

    if (!l || !r || l.val != r.val) {
      return false;
    }

    return recur(l.left, r.right) && recur(l.right, r.left);
  };

  return root == null ? null : recur(root.left, root.right);
}
