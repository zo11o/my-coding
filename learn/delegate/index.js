// 1. 一下为“原型基础”：
// 父类
/* 
function Widget(width, height) {
    this.width = width || 50;
    this.height = height || 50;
    this.$elem = null;
}

Widget.prototype.render = function ($where) {
    if (this.$elem) {
        this.$elem.css({
            width: this.width + "px",
            height: this.height + "px"
        }).appendTo($where);
    }
}; // 子类

function Button(width, height, label) { 
    // 调用“super”构造函数
    Widget.call( this, width, height );
    this.label = label || "Default";
    this.$elem = $("<button>").text(this.label);
}
// 让 Button“继承”Widget
Button.prototype = Object.create(Widget.prototype);
// 重写 render(..)
Button.prototype.render = function ($where) { //“super”调用
    Widget.prototype.render.call( this, $where );
    this.$elem.click(this.onClick.bind(this));
};
Button.prototype.onClick = function (evt) {
    console.log("Button '" + this.label + "' clicked!");
};

$(document).ready(function () {
    var $body = $(document.body);
    var btn1 = new Button(125, 30, "Hello");
    console.log(btn1)
    var btn2 = new Button(150, 40, "World");
    btn1.render($body);
    btn2.render($body);
}); */

// 2. 一下为委托设计模式

var Widget = {
    init: function (width, height) {
        this.width = width || 50;
        this.height = height || 150;
        this.$elem = null;
    },
    insert: function ($where) {
        if (!this.$elem) {
            this.$elem
                .css({
                    width: this.width + "px",
                    height: this.height + "px",
                })
                .appendTo($where);
        }
    },
};

var Button = Object.create(Widget);

Button.setup = function (width, height, label) {
    // 委托调用
    this.init(width, height);
    this.label = label || "Default";
    this.$elem = $("<button>").text(this.label);
};

Button.build = function ($where) {
    this.insert($where);
    this.$elem.click(this.onClick.bind(this));
};

Button.onClick = function (evt) {
    console.log("Button '" + this.label + "' clicked!");
};

$(document).ready(function () {
    var $body = $(document.body);
    var btn1 = Object.create(Button);
    btn1.setup(125, 30, "Hello");
    var btn2 = Object.create(Button);
    btn2.setup(150, 40, "World");
    btn1.build($body);
    btn2.build($body);
});

var counter = [];
function radixSort(arr, maxDigit) {
    var mod = 10;
    var dev = 1;
    for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for (var j = 0; j < arr.length; j++) {
            var bucket = parseInt((arr[j] % mod) / dev);
            if (counter[bucket] == null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        var pos = 0;
        for (var j = 0; j < counter.length; j++) {
            var value = null;
            if (counter[j] != null) {
                while ((value = counter[j].shift()) != null) {
                    arr[pos++] = value;
                }
            }
        }
    }
    return arr;
}

var arr = radixSort([3, 6, 2, 77, 2, 1, -1, 6, 10, 77, 25, 44, 12, 151], 3);
console.log("====================================");
console.log(arr);
console.log("====================================");
