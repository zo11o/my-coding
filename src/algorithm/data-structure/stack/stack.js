"use strict";
var Stack = /** @class */ (function () {
    function Stack() {
        this.length = 0;
        this.items = {};
        this.length = 0;
    }
    Stack.prototype.push = function (node) {
        this.items[this.length] = node;
        this.length++;
    };
    Stack.prototype.pop = function () {
        if (this.isEmpty()) {
            return null;
        }
        this.length--;
        var node = this.items[this.length];
        delete this.items[this.length];
        return node;
    };
    Stack.prototype.isEmpty = function () {
        return this.length === 0;
    };
    // 获取栈顶节点
    Stack.prototype.peek = function () {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.length - 1];
    };
    Stack.prototype.clear = function () {
        this.items = {};
        this.length = 0;
    };
    return Stack;
}());
