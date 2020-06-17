/**
 * 
 * @description Dom 结点
 * nodeType 和 nodeName
 */

var dom = document.getElementById('root');
console.log(dom.children)
console.log(dom.childNodes)
console.log('ownerDocument:',dom.ownerDocument);
console.log(dom.attributes);
var attributes = dom.attributes;
// attributes.removeNamedItem('style')
console.log(dom.attributes);

console.log(dom.style)

for (var i = 0; i < dom.style.length; i++) {
    var props = dom.style[i]
    var value = dom.style.getPropertyValue(props);
    console.log(props + ':' +value)
}

for (const node of dom.childNodes) {
    console.log(node.nodeType);
    console.log(node.nodeName);
}

var domToArr = Array.prototype.slice.call(dom.children)
console.log(domToArr);



/**
 * 节点属性
 */
// childNodes 子节点

// parentNode 父节点

// previousSibling && nextSibling

// firstChild & lastChild

// ownerDocument 指向 文档节点（document）

/**
 *  Dom 操作
 */
// appendChild  1. @return 返回新增节点 2. 如果

// insertBefore(insertNode, someNode)

// replaceChild(node, someNode.firstChild);

// 移除节点 removeChild()

// cloneNode（[true, false]） 深拷贝和浅拷贝



/**
 * 文本节点
 */
var span = document.getElementsByClassName("span");
// console.log(span.item(0).childNodes.item(0).appendData('你真是太帅了'));



/**
 * 事件委托
 */

 var ul = document.querySelector('.li-warp');

 ul.addEventListener('click', function (event) {
     console.log(event.target.firstChild.nodeValue)
  })