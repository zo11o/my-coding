# webpack

## 构建流程

1. 初始化参数：从配置文件和 `Shell` 语句中获取与合并参数，得出最终的参数
2. 开始编译：用上一步得到的参数初始化 `Compiler` 对象，加载所有配置的插件，执行对象 `run` 方法执行编译；
3. 确定入口：根据配置中的 `entry` 找出所有的入口文件
4. 编译模块：从入口文件出发，调用所有配置的 `Loader` 对模块进行编译，在找出该模块一来的模块，再递归本步骤知道所有入口依赖的文件都经过本步骤的处理
5. 完成模块编译：再经过第 4 步使用 `Loader` 翻译完所有模块后，的带每个模块被翻译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `Chunk`, 在吧每个 `Chunk` 转换成一个单独的文件加入到输出列表，这不是可以修改输出内容的最后机会
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。在以上过程中，`webpack` 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 `webpack` 提供的 `API` 改变 `webpack` 的运行结果

## Loader

`Loader` 就是一个翻译员，能把源文件经过转化后输出新的结果，并且一个文件还可以链式的经过多个翻译员翻译

1. `Loader` 是一个 `Node` 模块 `module.export = function(content){return fn}`
2. 获取源文件(字符串或则二进制),默认返回一个函数
3. 也可返回其他结果，调用 `this.callback` API

```js
this.callback(
    // 当无法转换原内容时，给 Webpack 返回一个 Error
    err: Error | null,
    // 原内容转换后的内容
    content: string | Buffer,
    // 用于把转换后的内容得出原内容的 Source Map，方便调试
    sourceMap?: SourceMap,
    // 如果本次转换为原内容生成了 AST 语法树，可以把这个 AST 返回，
    // 以方便之后需要 AST 的 Loader 复用该 AST，以避免重复生成 AST，提升性能
    abstractSyntaxTree?: AST
);
```

4. 可同步处理也可异步处理
5. 处理二进制数据 `module.exports.raw = true`
6. 缓存 `this.cacheable`