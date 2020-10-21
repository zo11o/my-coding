function mergeNode(l1, l2) {

  while (l1 && l2) {
    var l1_temp = l1.next;
    var l2_temp = l2.next;

    l1.next = l2;
    l1 = l1_temp

    l2.next = l1
    l2 = l2_temp
  }
}
