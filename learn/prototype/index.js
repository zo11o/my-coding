var myObject = {
    b:2
}

Object.defineProperty(myObject, "foo", {
    // writable: true,
   
})

var antherObject = Object.create(myObject);

// myObject.a = '1';
console.log(myObject.__proto__);
console.log(antherObject);

antherObject.foo = 'bar'
console.log(antherObject.foo);



