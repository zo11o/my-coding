interface IQueue<T> {
  // 从队列尾部进入
  push (node: T): void;
  // 从队列头部推出
  shift (): T | null;
  // 清空队列
  clear (): void;

  isEmpty (): boolean;

  size (): number;
}

interface IQ<T> {
  [index: number]: T
}

class Queue<T> implements IQueue<T> {

  private queue: IQ<T>;
  private length = 0;

  constructor() {
    this.queue = {};
  }

  push (node: T) {
    this.queue[this.length] = node;
    this.length++;
  }

  shift () {
    if (this.isEmpty()) {
      return null;
    }
    const node = this.queue[0];
    for (let i = 0; i < this.length; i++) {
      this.queue[i] = this.queue[i + 1];
    }
    delete this.queue[this.length - 1];
    this.length--;
    return node
  }

  isEmpty () {
    return this.length === 0;
  }

  clear () {
    this.queue = {}
    this.length = 0;
  }

  size () {
    return this.length;
  }
}

