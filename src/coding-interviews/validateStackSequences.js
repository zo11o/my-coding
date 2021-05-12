

var validateStackSequences = function (pushed, popped) {

  let stack = []

  let i = 0;

  pushed.forEach(p => {
    stack.push(p)

    while(stack.length && stack[stack.length - 1] === popped[i]) {
      stack.pop()
      i++
    }
  });
  return stack.length === 0
};
