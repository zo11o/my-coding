"use strict";
// 本节我们用 ts 实现 《算法4》 第三章 二叉搜索树 算法 3.3
// 这里用 ts 完全是为了学习一下 ts
var BSTNode = /** @class */ (function () {
    function BSTNode(key, val, N) {
        this.key = key;
        this.val = val;
        this.N = N;
        this.left = null;
        this.right = null;
    }
    return BSTNode;
}());
var BST = /** @class */ (function () {
    function BST(root) {
        this.root = root;
    }
    BST.prototype.size = function () {
        return this._size(this.root);
    };
    BST.prototype._size = function (x) {
        if (x == null) {
            return 0;
        }
        else {
            return x.N;
        }
    };
    BST.prototype.get = function (key) {
        return this._get(this.root, key);
    };
    /**
     * _get
     */
    BST.prototype._get = function (x, key) {
        if (x == null)
            return null;
        var cmp = key - x.key;
        if (cmp < 0) {
            return this._get(x.left, key);
        }
        else if (cmp > 0) {
            return this._get(x.right, key);
        }
        else {
            return x.val;
        }
    };
    /**
     * put
     */
    BST.prototype.put = function (key, val) {
        this.root = this._put(this.root, key, val);
    };
    BST.prototype._put = function (x, key, val) {
        if (x == null) {
            return new BSTNode(key, val, 1);
        }
        var cmp = key - x.key;
        if (cmp < 0) {
            x.left = this._put(x.left, key, val);
        }
        else if (cmp > 0) {
            x.right = this._put(x.right, key, val);
        }
        else {
            x.val = val;
        }
        x.N = this._size(x.left) + this._size(x.right) + 1;
        return x;
    };
    return BST;
}());
