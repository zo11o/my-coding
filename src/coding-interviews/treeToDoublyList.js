/**
 * 二叉搜索树与双向链表
 * @param {*} root
 */
var treeToDoublyList = function (root) {
  if (!root) {
    return null
  }
  // head 为头节点，prev 为当前遍历节点的前驱节点
  let prev, head

  dfs(root)

  prev.right = head;
  head.left = prev

  return head;

  function dfs(cur) {
    if (!cur) {
      return
    }
    dfs(cur.left)
    if (prev != null) {
      prev.right = cur
    } else {
      head = cur
    }
    cur.left = prev;
    prev = cur
    dfs(cur.right)
  }
}
