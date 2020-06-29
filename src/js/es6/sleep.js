function _sleep(time) {
    return new Promise(resolve=> setTimeout(resolve, time))
}

async function test(time){
    var temple = await _sleep(5000);
    console.log(1)

    return temple
}

test();