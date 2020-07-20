"use strict";
// 本节我们实现 一个发布订阅器
var EventBus = /** @class */ (function () {
    function EventBus() {
        this.eventMap = new Map();
    }
    EventBus.prototype.on = function (event, callback) {
        if (this.eventMap.has(event)) {
            var callbackList = this.eventMap.get(event);
            callbackList.push(callback);
            this.eventMap.set(event, callbackList);
        }
        else {
            this.eventMap.set(event, [callback]);
        }
    };
    EventBus.prototype.once = function (event, callback) {
        // 这里才是全文的精髓
        var _self = this;
        function _handle() {
            _self.off(event);
            callback.apply(_self, arguments);
        }
        _handle.fn = callback;
        this.on(event, _handle);
    };
    EventBus.prototype.emit = function (event, params, isOff) {
        if (!this.eventMap.has(event)) {
            console.warn(event + " \u4E8B\u4EF6\u8FD8\u6CA1\u6709\u8BA2\u9605\u6216\u8005\u5DF2\u7ECF\u88AB\u79FB\u9664");
            return;
        }
        var callbackList = this.eventMap.get(event) || [];
        callbackList.forEach(function (fn) {
            fn(params);
        });
        if (isOff) {
            this.eventMap.delete(event);
        }
    };
    EventBus.prototype.off = function (event) {
        this.eventMap.delete(event);
    };
    EventBus.prototype.offAll = function () {
        if (this.eventMap.size === 0) {
            return;
        }
        this.eventMap.clear();
    };
    return EventBus;
}());
// 测试用例
/*
 设想一个场景
 在房地产营销中， 购房者（订阅者）想要在有新房源出售的时候收到通知，
 而房地厂商（发布者）需要在有新房源时发送信息给订阅了房源信息的购房者
*/
var Customer = /** @class */ (function () {
    function Customer(name) {
        this.name = name;
    }
    Customer.prototype.receive = function (params) {
        console.log(this.name + ": " + params + ' 已收到');
    };
    return Customer;
}());
var person1 = new Customer('zo11o');
var person2 = new Customer('james');
var ev = new EventBus();
// 发布房源
ev.on('publish', person1.receive.bind(person1));
ev.on('publish', person2.receive.bind(person2));
ev.emit('publish', '新房源推送');
ev.off('publish');
ev.emit('publish', '新房源推送');
// 发布新房源
ev.on('new', person2.receive.bind(person2));
ev.emit('new', '又有新房源啦');
// 只触发一次的活动
ev.once('activity', person2.receive.bind(person1));
ev.emit('activity', '有新活动啦');
ev.emit('activity', '有新活动啦');
// 结束事件
ev.on('ending', person2.receive.bind(person1));
ev.on('ending', person2.receive.bind(person2));
ev.emit('ending', '全部售罄');
ev.offAll();
ev.emit('ending', '全部售罄');
