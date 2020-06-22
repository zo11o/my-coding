function sleep(time) {
    return new Promise(resolve=> setTimeout(resolve, time))
}

 (async function () { 
    await sleep(5000);
console.log(3424)

})()
