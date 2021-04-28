/**
 * 实现一个方法，将 rgba(241, 112, 333) 转换为
 */
function rgba2num(str) {
  let reg = /rgb(?:a?)\((?:\s+)?(\d{1,3}),(?:\s+)?(\d{1,3}),(?:\s+)?(\d{1,3})\)/
  let match = str.match(reg)
  let res = ''

  if (!match) {
    return res
  }

  let [,v1,v2,v3] = match
  res = [v1,v2,v3].reduce((acc, cur)=> acc + Number(cur).toString(16).padStart(2, 0), '#')

  return res
}

let color = 'rgba(22,44,11)';
let color2 = 'rgb(212,144,11)';

let s1 = rgba2num(color)
console.log(s1)

let s2 = rgba2num(color2)
console.log(s2)
