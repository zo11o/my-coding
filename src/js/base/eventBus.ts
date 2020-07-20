// 本节我们实现 一个发布订阅器

// 一 什么是 EventBus
/*
EventBus 是一个发布订阅器
我们需要实现方法
添加订阅者方法 on
添加订阅者方法并且只执行一次 on
触发事件方法 emit
移除监听者方法 off
移除所有监听者方法 offAll
 */

interface EventBus<K, V> {
  on (event: string, callback: Function): void;
  once (event: string, callback: Function): void;
  emit (event: string, params: any, isOff?: boolean): void;
  off (event: string): void;
  offAll (): void;
}

class EventBus<K, V> implements EventBus<K, V> {
  private eventMap = new Map();

  constructor() {

  }

  on (event: string, callback: Function) {
    if (this.eventMap.has(event)) {
      var callbackList = this.eventMap.get(event);
      callbackList.push(callback);
      this.eventMap.set(event, callbackList);
    } else {
      this.eventMap.set(event, [callback]);
    }
  }

  once (event: string, callback: Function) {
    // 这里才是全文的精髓
    let _self = this;
    function _handle () {
      _self.off(event)
      callback.apply(_self, arguments)
    }

    _handle.fn = callback;
    this.on(event, _handle)
  }

  emit (event: string, params: any, isOff?: boolean) {
    if (!this.eventMap.has(event)) {
      console.warn(`${event} 事件还没有订阅或者已经被移除`);
      return;
    }

    var callbackList = this.eventMap.get(event) || [];
    callbackList.forEach((fn: Function) => {
      fn(params);
    });

    if (isOff) {
      this.eventMap.delete(event)
    }
  }

  off (event: string) {
    this.eventMap.delete(event);
  }

  offAll () {
    if (this.eventMap.size === 0) {
      return;
    }

    this.eventMap.clear();
  }
}

// 测试用例
/*
 设想一个场景
 在房地产营销中， 购房者（订阅者）想要在有新房源出售的时候收到通知，
 而房地厂商（发布者）需要在有新房源时发送信息给订阅了房源信息的购房者
*/

class Customer {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  receive (params: any) {
    console.log(this.name + ": " + params + ' 已收到')
  }
}

var person1 = new Customer('zo11o');
var person2 = new Customer('james');

var ev = new EventBus();

// 发布房源
ev.on('publish', person1.receive.bind(person1))
ev.on('publish', person2.receive.bind(person2))

ev.emit('publish', '新房源推送');
ev.off('publish');
ev.emit('publish', '新房源推送');

// 发布新房源
ev.on('new', person2.receive.bind(person2))
ev.emit('new', '又有新房源啦');

// 只触发一次的活动
ev.once('activity', person2.receive.bind(person1))
ev.emit('activity', '有新活动啦')
ev.emit('activity', '有新活动啦')

// 结束事件
ev.on('ending', person2.receive.bind(person1))
ev.on('ending', person2.receive.bind(person2))

ev.emit('ending', '全部售罄');
ev.offAll();
ev.emit('ending', '全部售罄');
