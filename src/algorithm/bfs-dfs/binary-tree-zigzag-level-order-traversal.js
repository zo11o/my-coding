/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * 迭代模式
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  if (!root) {
    return []
  }

  var res = [];
  let queue = [];
  queue.push(root);
  let cur = null
  var level = 0;
  while (queue.length) {
    let len = queue.length;

    while (len--) {
      cur = queue.shift();
      if (res[level] == null) {
        res[level] = []
      }
      if (level % 2 == 0) {
        res[level].push(cur.val);
      } else {
        res[level].unshift(cur.val)
      }
      cur.left ? queue.push(cur.left) : ''
      cur.right ? queue.push(cur.right) : ''
    }
    level++
  }
  console.log(res)
  return res;
}

/**
 * 递归模式
 * @param {*} root
 */
var zigzagLevelOrder = function (root) {
  var ans = []
    traverse(root, 0);
    return ans;

    function traverse(node, level) {
        if (!node) {
            return
        }

        // 此处十分巧妙
        if (ans.length <= level) {
            ans[level] = []
        }

        if (level % 2) {
            ans[level].unshift(node.val)
        } else {
            ans[level].push(node.val)
        }

        traverse(node.left, level + 1);
        traverse(node.right, level + 1);
    }
}



var t = {
  val: 3,
  left: {
    val: 9,
    left: null,
    right: null
  },
  right: {
    val: 20,
    left: {
      val: 15,
      left: null,
      right: null
    },
    right: {
      val: 7,
      left: null,
      right: null
    }
  }
}

zigzagLevelOrder(t)
