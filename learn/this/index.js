// function foo() {
//     var a = "aaa";
//     console.log(this === window);
//     this.bar();
// }

// function bar(params) {
//     console.log("bar");
//     console.log(a); // 报错
// }

// foo();

/** 
 * forEach 上下文
 */

// function foo(el) {
//     console.log(el, this.id);
// }
// var obj = { id: "awesome" }; // 调用 foo(..) 时把 this 绑定到 ob 
// [1, 2, 3].forEach( foo, obj );

/**
 * 软绑定
 */
function fn1(a,b,c) {
    var curried = [].slice.call(arguments, 1);
    console.log(curried);
    console.log(arguments);
    var cc = curried.concat.apply( curried, arguments )
    console.log('cc:',cc)
}

fn1(1,2,3)


if (!Function.prototype.softBind) {
    Function.prototype.softBind = function(obj) {
        var fn = this; // 捕获所有 curried 参数
        console.log(fn)
        var curried = [].slice.call( arguments, 1 );
        console.log(curried)
        var tArgs =curried.concat.apply( curried, arguments )
        console.log(tArgs);
        
        var bound = function() {
            return fn.apply(
                (!this || this === (window || global)) ? obj : this,
                tArgs
            );
        };
        bound.prototype = Object.create( fn.prototype );
        return bound;
    };
}

function foo() { console.log("name: " + this.name); }
var obj = { name: "obj" }, obj2 = { name: "obj2" }, obj3 = { name: "obj3" };
var fooOBJ = foo.softBind( obj ); fooOBJ(); // name: obj 
obj2.foo = foo.softBind(obj); 
obj2.foo(); // name: obj2 <---- 看！！！ 
fooOBJ.call( obj3 ); // name: obj3 <---- 看！ 
setTimeout( obj2.foo, 10 )