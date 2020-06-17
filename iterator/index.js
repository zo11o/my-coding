var arr = ['a', 'b', 'c'];

for (var o of arr) {
    console.log(o);
}

var it = arr[Symbol.iterator]();

// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

var obj = {
    name: 'zo11o',
    age: '26',
    level: '6'
}

Object.defineProperty(obj, Symbol.iterator, {
    configurable: true,
    enumerable: false,
    writable: false,
    value: function (params) {
        var idx = 0;
        var o = this;
        var ks = Object.keys(o);
        return {
            next: function (params) {
                return {
                    value: idx++,
                    done: (idx > ks.length)
                }
            },
        }
    }
})

var oIt = obj[Symbol.iterator]()
console.log(oIt.next())

for (var v of obj) { console.log( v ); }