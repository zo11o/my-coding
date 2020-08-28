"use strict";
/**
 * UF Union-Find 类
 */
var UF = /** @class */ (function () {
    function UF(n) {
        // 连通分量
        this.count = 0;
        // 存储一棵树
        this.parents = [];
        // 每棵树的重量
        this.size = [];
        this.count = n;
        for (var i = 0; i < n; i++) {
            // 由于一开始没有连通，所有节点为根节点，所以将所有节点的父节点指向自己
            this.parents[i] = i;
            // 每个连通的重量为 1
            this.size[i] = 1;
        }
    }
    /**
     * 连通两个节点
     * @param p
     * @param q
     */
    UF.prototype.union = function (p, q) {
        var rootP = this.find(p);
        var rootQ = this.find(q);
        if (rootP === rootQ) {
            return;
        }
        // 小树连通在大树上
        if (this.size[rootP] > this.size[rootQ]) {
            this.parents[rootQ] = rootP;
            this.size[rootP] += this.size[rootQ];
        }
        else {
            this.parents[rootP] = rootQ;
            this.size[rootQ] += this.size[rootP];
        }
        // 连通分量减一
        this.count--;
    };
    /**
     * 判断两个节点是否已经连通
     * @param p
     * @param q
     */
    UF.prototype.connected = function (p, q) {
        var rootP = this.find(p);
        var rootQ = this.find(q);
        return rootP === rootQ;
    };
    /**
     * 获取节点的根节点
     * @param p
     */
    UF.prototype.find = function (x) {
        // 根节点的 parent[x] = x;
        while (this.parents[x] != x) {
            var parents = this.parents;
            // 优化 进行路径压缩
            parents[x] = parents[parents[x]];
            x = parents[x];
        }
        return x;
    };
    /**
     * 获取图中的连通分量
     */
    UF.prototype.getCount = function () {
        return this.count;
    };
    return UF;
}());
var uf = new UF(5);
console.log(uf);
uf.union(1, 3);
console.log(uf);
console.log(uf.connected(1, 3));
console.log(uf.getCount());
