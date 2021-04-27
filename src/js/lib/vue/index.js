// vue 2.0 双向绑定原理主要是通过 数据劫持 依赖收集 依赖发布 实现的
// 有三个 比较重要的类 Observer Watcher Dep

// 1. 通过 对象data 属性数据的劫持observe  set get


const utils = {
  warn(msg) {
    console.warn(msg)
  },
  proxy(vm, sourceKey, key) {
    Object.defineProperty(vm, key, {
      enumerable: true,
      configurable: true,
      get () {
        return vm[sourceKey][key]
      },
      set (val) {
        vm[sourceKey][key] = val
      }
    })
  },
  isObject(value) {
    return value !== null && typeof value === 'object'
  }
}

function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

// =-------------------------------------------------------------

class VNode {
  // component placeholder node
  constructor (
    tag,
    data,
    children,
    text,
    elm,
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.parent = undefined

  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child () {
    return this.componentInstance
  }
}

function complierHtmlToFunction(source) {

  // 这里主要使用了 正则匹配 和 获取属性标签 分析 template 生成抽象语法数
  // 然后 通过抽象语法树AST 生成 render 方法

  // 在线网站 将 template 转为 ast 语法树之后再生成render 方法  https://template-explorer.vuejs.org/
  // 我们的演示代码为
  // <div id="app">
  //   <p>{{ name }}</p>
  //   <ui>
  //     <li>{{ age }} </li>
  //   </ui>
  // </div>

  return new Function(`with(this) {
    return _c('div', {
        attrs: {
          "id": "app"
        }
      }, [_c('p', [_v(_s(name))]), _c('ui', [_c('li', [_v(_s(age) + " ")])])],
      1)
  }`)
}

// ------------------------------------------------

/**
 * 初始化方法
 * @param {*} Vue
 */
function initMixin(Vue) {

  Vue.prototype._init = function(vm) {
    initState(vm)
  }

}

function initState(vm) {

  const options = vm.$options;
  if (options.data) {
    initData(vm)
  }

  // let renderFn = options.render
  // if (!renderFn) {

  //   if (options.template) {
  //     // 获取template
  //   } else {
  //     const $el = document.querySelector(options.el)
  //     if (!$el) {
  //       warn('您没有任何渲染模板')
  //     }
  //     vm.$el = $el
  //     let temp = $el.outerHTML;
  //     // TODO: 将模板 转化为 render 方法
  //     let render = complierHtmlToFunction(temp)
  //     console.log(render)
  //     renderFn = render
  //   }
  // }
  // renderFn.call(vm)
}

/**
 * 初始化 data
 */
function initData(vm) {
  let options = vm.$options
  let data = vm._data = typeof vm.$options.data === 'function' ? options.data.call(vm) : options.data

  for (var k in data) {
    utils.proxy(vm, '_data', k)
  }

  observe(data)

}

function observe(value) {
  if (!utils.isObject(value)) {
    return
  }
  return new Observer(value)
}

function definedReactive(obj, key, val) {
  val = obj[key]
  let dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  const getter = property && property.get
  const setter = property && property.set

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('取值咯')
      if (Dep.target) {
        dep.depend()
      }
      // TODO：数据劫持
      return val
    },
    set(newVal) {
      // 发布消息
      val = newVal
      dep.notify()
    }
  })

}

class Dep {

  notify () {

  }
}

class Observer {
  constructor(value) {
    // let dep = new Dep()
    console.log(value)
    def(value, '__ob__', this)
    console.log(this)
    this.walk(value)
  }

  walk(value) {
    for(let k in value) {
      definedReactive(value, k, value[k])
    }
  }
}


class Watcher {

}

class Vue {
  constructor(options) {
    const vm = this
    vm.$options = options
    this._init(this)
  }
}

initMixin(Vue)

