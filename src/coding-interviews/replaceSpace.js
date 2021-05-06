/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 题目：
 输入一个链表，从尾到头打印链表每个节点的值。

 思路：
  利用栈来实现，首先根据头结点以此遍历链表节点，将节点加入到栈中。当遍历完成后，再将栈中元素弹出并打印，以此来实现。栈的
  实现可以利用 Array 的 push 和 pop 方法来模拟。
 */

/**
 * @param {ListNode} head
 * @return {number[]}
 */
 var reversePrint = function(head) {
  let cur = head
  var res = []
  while (cur != null) {
      res.unshift(cur.val)
      cur = cur.next
  }
  return res
};
