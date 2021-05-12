/**
 * 剑指 Offer 22. 链表中倒数第k个节点
 * @param {*} head
 * @param {*} k
 * @returns
 */
var getKthFromEnd = function (head, k) {
  if (!head) {
    return null
  }

  let fast = head, low = head

  let count = 0
  while (count < k - 1) {
    fast = fast.next
    count++
  }

  while (fast.next != null) {
    fast = fast.next
    low = low.next
  }

  return low
}
