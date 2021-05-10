/**
 * 剑指 Offer 25. 合并两个排序的链表
 * @param {*} l1 链表1
 * @param {*} l2 链表2
 */

/**
 * 递归法
 * @param {*} l1
 * @param {*} l2
 */
var mergeTwoLists = function (l1, l2) {
  let l
  if (l1 && !l2) {
    return l1
  } else if (l2 && !l1) {
    return l2
  } else if (!l1 && !l2) {
    return null
  }

  if (l1.val < l2.val) {
    l = new ListNode(l1.val)
    l.next = mergeTwoLists(l1.next, l2)
  } else {
    l = new ListNode(l2.val)
    l.next = mergeTwoLists(l1, l2.next)
  }

  return l
}


/**
 * 遍历法
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  let dum = new ListNode(null), cur = dum

  while (l1 && l2) {
    if (l1.val < l2.val) {
      cur.next = l1
      l1 = l1.next
    } else {
      cur.next = l2
      l2 = l2.next
    }
    cur = cur.next
  }
  cur.next = l1 ? l1 : l2
  return dum.next
};
