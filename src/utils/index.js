"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 定义二叉树
 * @param {number} val
 */
var TreeNode = /** @class */ (function () {
    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }
    return TreeNode;
}());
/**
 * 将二叉树序列化
 * @param {TreeNodeType} root
 */
var serialize = function (root) {
    if (!root) {
        return '#,';
    }
    var left = serialize(root.left);
    var right = serialize(root.right);
    return root.val + "," + left + right;
};
/**
 * 序列化的二叉树返回二叉树
 * @param {string} data '1,2,3,#,#,4,5,#,#'
 */
var deserialize = function (data) {
    var list = data.split(',');
    var buildTree = function (list) {
        var rootVal = list.shift();
        if (rootVal == '#') {
            return null;
        }
        var node = new TreeNode(rootVal);
        node.left = buildTree(list);
        node.right = buildTree(list);
        return node;
    };
    return buildTree(list); // 构建的入口
};
var utils = {
    deserializeByString: deserialize,
};
exports.default = utils;
