"use strict";
var Queue = /** @class */ (function () {
    function Queue() {
        this.length = 0;
        this.queue = {};
    }
    Queue.prototype.push = function (node) {
        this.queue[this.length] = node;
        this.length++;
    };
    Queue.prototype.shift = function () {
        if (this.isEmpty()) {
            return null;
        }
        var node = this.queue[0];
        for (var i = 0; i < this.length; i++) {
            this.queue[i] = this.queue[i + 1];
        }
        delete this.queue[this.length - 1];
        this.length--;
        return node;
    };
    Queue.prototype.isEmpty = function () {
        return this.length === 0;
    };
    Queue.prototype.clear = function () {
        this.queue = {};
        this.length = 0;
    };
    Queue.prototype.size = function () {
        return this.length;
    };
    return Queue;
}());
