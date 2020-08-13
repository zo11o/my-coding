/*
  leetcode 146. LRU缓存机制 https://leetcode-cn.com/problems/lru-cache/
  运用你所掌握的数据结构， 设计和实现一个 LRU(最近最少使用) 缓存机制。 它应该支持以下操作： 获取数据 get 和 写入数据 put。

  获取数据 get(key) - 如果关键字(key) 存在于缓存中， 则获取关键字的值（ 总是正数）， 否则返回 - 1。
  写入数据 put(key, value) - 如果关键字已经存在， 则变更其数据值； 如果关键字不存在， 则插入该组「 关键字 / 值」。 当缓存容量达到上限时， 它应该在写入新数据之前删除最久未使用的数据值， 从而为新的数据值留出空间。

  在 O(1) 时间复杂度内完成这两种操作？

  来源： 力扣（ LeetCode）
  链接： https: //leetcode-cn.com/problems/lru-cache
    著作权归领扣网络所有。 商业转载请联系官方授权， 非商业转载请注明出处。
 */


// 解题
// 形成一种新的数据结构： 哈希链表 LinkedHashMap。
// 注意我们实现的双链表 API 只能从尾部插入，也就是说靠尾部的数据是最近使用的，靠头部的数据是最久为使用的。

/**
 * 链表节点
 * @param {*} k
 * @param {*} v
 */
function ListNode(k, v) {
  this.key = k;
  this.val = v;
}

/* ------------------------------------------------------------------------------------------------ */

/**
 * 双链表数据结构
 */
var DoubleList = function () {
  // 头尾虚节点
  this.head = new ListNode(0, 0);
  this.tail = new ListNode(0, 0);
  this.head.next = this.tail;
  this.tail.prev = this.head;
  // 链表元素数
  this.size = 0;
}

/**
 * 在链表尾部添加节点 x，时间 O(1)
 */
DoubleList.prototype.addLast = function (x) {
  // 修改新增节点prev next
  x.prev = this.tail.prev;
  x.next = this.tail;
  // 修改实际最后一个节点 tail.prev.next 和 虚拟尾节点 tail.prev
  this.tail.prev.next = x;
  this.tail.prev = x;
  this.size++;
}

/**
 *  删除链表中的 x 节点（x 一定存在）
 *  由于是双链表且给的是目标 Node 节点，时间 O(1)
 */
DoubleList.prototype.remove = function (x) {
  x.prev.next = x.next;
  x.next.prev = x.prev;
  this.size--;
}

DoubleList.prototype.removeFirst = function () {
  if (this.head.next == this.tail) {
    return;
  }

  let firstNode = this.head.next;
  this.remove(firstNode);
  return firstNode;
}

DoubleList.prototype.getSize = function () {
  return this.size;
}

/* ------------------------------------------------------------------------------------------------ */

/**
 * 容量
 * @param {number} capacity
 */
function LRUCache(capacity) {
  // hash表
  this.map = new Map();
  this.cache = new DoubleList();
  this.cap = capacity;
}

LRUCache.prototype.get = function (key) {
  if (!this.map.has(key)) {
    return -1;
  }
  this.makeRecently(key);
  return this.map.get(key).val;
}

LRUCache.prototype.put = function (key, value) {
  if (this.map.has(key)) {
    this.deleteKey(key);
    this.addRecently(key, value);
    return;
  }

  if (this.cap === this.cache.getSize()) {
    // 删除最久未使用的元素
    this.RemoveLeastRecently();
  }
  // 添加为最近使用
  this.addRecently(key, value);
}

/**
 * 提升某个 key 为最近使用
 * @param {*} key
 */
LRUCache.prototype.makeRecently = function (key) {
  let x = this.map.get(key);
  // 先从链表中删除这个节点
  this.cache.remove(x);
  // 重新插入到队尾
  this.cache.addLast(x);
}

LRUCache.prototype.addRecently = function (key, val) {
  let x = new ListNode(key, val);
  this.cache.addLast(x);
  this.map.set(key, x);
}

LRUCache.prototype.deleteKey = function (key) {
  let x = this.map.get(key);
  this.cache.remove(x);
  this.map.delete(key);
}

LRUCache.prototype.RemoveLeastRecently = function () {
  let deleteNode = this.cache.removeFirst();
  let deletedKey = deleteNode.key;
  this.map.delete(deletedKey);
}

/* ------------------------------------------------------------------------------------------------ */

// 你可以把 cache 理解成一个队列
// 假设左边是队头，右边是队尾
// 最近使用的排在队头，久未使用的排在队尾
// 圆括号表示键值对 (key, val)

var cacheIns = new LRUCache(2);

cacheIns.put(1, 1);
// cache = [(1, 1)]

cacheIns.put(2, 2);
// cache = [(2, 2), (1, 1)]

cacheIns.get(1); // 返回 1
// cache = [(1, 1), (2, 2)]
// 解释：因为最近访问了键 1，所以提前至队头
// 返回键 1 对应的值 1

cacheIns.put(3, 3);
// cache = [(3, 3), (1, 1)]
// 解释：缓存容量已满，需要删除内容空出位置
// 优先删除久未使用的数据，也就是队尾的数据
// 然后把新的数据插入队头

cacheIns.get(2); // 返回 -1 (未找到)
// cache = [(3, 3), (1, 1)]
// 解释：cache 中不存在键为 2 的数据

cacheIns.put(1, 4);
// cache = [(1, 4), (3, 3)]
// 解释：键 1 已存在，把原始值 1 覆盖为 4
// 不要忘了也要将键值对提前到队头

console.log(cacheIns.cache)


// 获取链表数据
var curr = cacheIns.cache.head.next;
while (curr !== cacheIns.cache.tail) {
  console.log(curr.val);
  console.log(curr)
  curr = curr.next;
}
