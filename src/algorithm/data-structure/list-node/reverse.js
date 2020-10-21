
function ListNode (val) {
  this.val = val;
  this.next = null;
}

function reverseList (head) {
  var prev = null;
  var curr = head;
  var temp

  while (curr != null) {
    temp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = temp;
  }

  return prev;
}
