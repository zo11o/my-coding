const CHARCODE_a = 'a'.charCodeAt();
const NODE_ARR_LEN = 26; // 数组的长度
const EMPTY_ARR = []; // 代表空的数组

// 构造方法
const Trie = function () {
  this.root = new Array(NODE_ARR_LEN).fill(EMPTY_ARR);
};

// 插入
Trie.prototype.insert = function (word) {
  let node = this.root;
  for (const c of word) {
    const idx = c.charCodeAt() - CHARCODE_a;
    if (node[idx] == EMPTY_ARR) { // 如果是空的，就创建新数组
      node = node[idx] = new Array(NODE_ARR_LEN).fill(EMPTY_ARR);
    } else { // 如果不为空，则node指向这个数组
      node = node[idx];
    }
  }
  node.isPrefix = true; // 标记这个节点是前缀
};

// 判断是否存在这个输入串
Trie.prototype.search = function (word) {
  let node = this.root;
  for (const c of word) {
    const idx = c.charCodeAt() - CHARCODE_a;
    if ((node = node[idx]) == EMPTY_ARR) return false;
  }
  return !!node.isPrefix;
};

// 判断是否存在这个前缀
Trie.prototype.startsWith = function (word) {

  let node = this.root;
  for (const c of word) {
    const idx = c.charCodeAt() - CHARCODE_a;
    if ((node = node[idx]) == EMPTY_ARR) return false;
  }
  return true;
};
