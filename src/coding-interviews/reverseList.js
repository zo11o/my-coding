/**
 * 剑指 Offer 24. 反转链表
 * @param {*} head
 * @returns
 */
var reverseList = function(head) {
  let prev = null, cur = head, next

  while (cur) {
    next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }

  return prev
}
